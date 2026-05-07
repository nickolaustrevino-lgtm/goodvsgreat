/**
 * Instagram feed router — serves cached Instagram posts from the database.
 *
 * Posts are synced into the `instagram_posts` table by the scheduled task
 * at /api/scheduled/instagram-sync (see server/routers/instagramSync.ts).
 * This router simply reads from the DB, so it works in the deployed runtime.
 */

import { desc } from "drizzle-orm";
import { z } from "zod";
import { instagramPosts } from "../../drizzle/schema";
import { getDb } from "../db";
import { publicProcedure, router } from "../_core/trpc";

export const instagramRouter = router({
  /**
   * Returns the most recent Instagram posts from the DB cache.
   */
  feed: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(12).default(9) }).optional())
    .query(async ({ input }) => {
      const limit = input?.limit ?? 9;
      const db = await getDb();
      if (!db) return { posts: [] };

      const rows = await db
        .select()
        .from(instagramPosts)
        .orderBy(desc(instagramPosts.postedAt))
        .limit(limit);

      return {
        posts: rows.map((r) => ({
          id: r.id,
          type: r.postType as "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM",
          caption: r.caption ?? "",
          link: r.link,
          likes: r.likes,
          comments: r.comments,
          postedAt: r.postedAt.toISOString(),
          thumbnailUrl: r.thumbnailUrl ?? undefined,
        })),
      };
    }),
});
