import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPostBySlug,
  getPublishedPosts,
  getAllPosts,
} from "../db.posts";
import { invokeLLM } from "../_core/llm";

// Slug helper — lowercase, hyphens only
function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

const postInput = z.object({
  title: z.string().min(1).max(512),
  excerpt: z.string().max(1000).optional(),
  content: z.string().min(1),
  coverUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).default("draft"),
  slug: z.string().min(1).max(255).optional(), // auto-generated if omitted
});

export const postsRouter = router({
  /** Public: list all published posts (for the /writing page) */
  listPublished: publicProcedure.query(async () => {
    return getPublishedPosts();
  }),

  /** Public: get a single published post by slug */
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await getPostBySlug(input.slug);
      if (!post || post.status !== "published") {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }
      return post;
    }),

  /** Admin: list ALL posts (drafts + published) */
  adminList: adminProcedure.query(async () => {
    return getAllPosts();
  }),

  /** Admin: get any post by id (for editing) */
  adminGetById: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const post = await getPostById(input.id);
      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      return post;
    }),

  /** Admin: create a new post */
  create: adminProcedure.input(postInput).mutation(async ({ ctx, input }) => {
    const slug = input.slug?.trim() || slugify(input.title);
    const publishedAt =
      input.status === "published" ? new Date() : undefined;
    return createPost({
      authorId: ctx.user.id,
      slug,
      title: input.title,
      excerpt: input.excerpt ?? null,
      content: input.content,
      coverUrl: input.coverUrl || null,
      status: input.status,
      publishedAt: publishedAt ?? null,
    });
  }),

  /** Admin: update an existing post */
  update: adminProcedure
    .input(z.object({ id: z.number().int().positive() }).merge(postInput.partial()))
    .mutation(async ({ input }) => {
      const { id, ...fields } = input;
      const existing = await getPostById(id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });

      const updates: Record<string, unknown> = { ...fields };

      // Auto-set publishedAt when first publishing
      if (fields.status === "published" && existing.status !== "published") {
        updates.publishedAt = new Date();
      }

      // Regenerate slug from title if title changed and no explicit slug given
      if (fields.title && !fields.slug) {
        updates.slug = slugify(fields.title);
      }

      return updatePost(id, updates as Parameters<typeof updatePost>[1]);
    }),

  /** Admin: delete a post */
  delete: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const existing = await getPostById(input.id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      await deletePost(input.id);
      return { success: true };
    }),

  /**
   * Admin: import an article from a URL.
   * Fetches the raw HTML, strips it to readable text, then uses the LLM to
   * extract title, excerpt, publish date, and clean HTML body content.
   * Saves the result as a draft post for review.
   */
  importFromUrl: adminProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      // 1. Fetch the page
      let html: string;
      try {
        const resp = await fetch(input.url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; GvGImporter/1.0)",
            "Accept": "text/html,application/xhtml+xml",
          },
          signal: AbortSignal.timeout(15_000),
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        html = await resp.text();
      } catch (err) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Could not fetch URL: ${(err as Error).message}`,
        });
      }

      // 2. Strip HTML to plain text (keep structure hints)
      const stripped = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<nav[\s\S]*?<\/nav>/gi, "")
        .replace(/<footer[\s\S]*?<\/footer>/gi, "")
        .replace(/<header[\s\S]*?<\/header>/gi, "")
        .replace(/<aside[\s\S]*?<\/aside>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s{3,}/g, "\n\n")
        .trim()
        .slice(0, 24_000); // stay well within LLM context

      // 3. Ask the LLM to extract structured content
      let parsed: {
        title: string;
        excerpt: string;
        publishedDate: string | null;
        htmlContent: string;
      };

      try {
        const result = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are an expert content extractor. Given raw text scraped from a web article, extract the article's content and return a JSON object with exactly these fields:
- title: string — the article headline
- excerpt: string — a 1-2 sentence summary (max 280 chars)
- publishedDate: string | null — ISO 8601 date if found (e.g. "2024-03-15"), otherwise null
- htmlContent: string — the full article body as clean semantic HTML using only: <h2>, <h3>, <p>, <strong>, <em>, <ul>, <ol>, <li>, <blockquote>, <hr>, <a href="...">. Do NOT include the title in htmlContent. Preserve all meaningful content, formatting, and structure. Return ONLY valid JSON, no markdown fences.`,
            },
            {
              role: "user",
              content: `Source URL: ${input.url}\n\nRaw text:\n${stripped}`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "article_import",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  excerpt: { type: "string" },
                  publishedDate: { type: ["string", "null"] },
                  htmlContent: { type: "string" },
                },
                required: ["title", "excerpt", "publishedDate", "htmlContent"],
                additionalProperties: false,
              },
            },
          },
        });

        const raw = result?.choices?.[0]?.message?.content;
        if (!raw) throw new Error("Empty LLM response");
        parsed = JSON.parse(typeof raw === "string" ? raw : JSON.stringify(raw));
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Content extraction failed: ${(err as Error).message}`,
        });
      }

      // 4. Build slug
      const slug = parsed.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 200);

      // 5. Resolve publishedAt
      let publishedAt: Date | null = null;
      if (parsed.publishedDate) {
        const d = new Date(parsed.publishedDate);
        if (!isNaN(d.getTime())) publishedAt = d;
      }

      // 6. Save as draft
      const post = await createPost({
        authorId: ctx.user.id,
        slug,
        title: parsed.title,
        excerpt: parsed.excerpt || null,
        content: parsed.htmlContent,
        coverUrl: null,
        status: "draft",
        publishedAt,
      });

      return { post, slug };
    }),
});
