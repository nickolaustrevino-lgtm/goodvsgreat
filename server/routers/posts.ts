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
});
