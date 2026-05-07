/**
 * Instagram Sync Router — scheduled task endpoint.
 *
 * The Manus scheduler calls POST /api/scheduled/instagram-sync every 6 hours.
 * The scheduled task agent:
 *   1. Calls the Instagram MCP to fetch the latest 9 posts
 *   2. POSTs the results as JSON to this endpoint
 *
 * This endpoint upserts the posts into the `instagram_posts` table.
 * Role "user" is allowed so the scheduler's auto-injected cookie works.
 */

import { z } from "zod";
import { instagramPosts } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";

const postSchema = z.object({
  id:           z.string(),
  type:         z.enum(["IMAGE", "VIDEO", "CAROUSEL_ALBUM"]).default("IMAGE"),
  caption:      z.string().optional().default(""),
  link:         z.string().url(),
  likes:        z.number().int().min(0).default(0),
  comments:     z.number().int().min(0).default(0),
  thumbnailUrl: z.string().url().optional(),
  postedAt:     z.string(), // ISO string
});

export const instagramSyncRouter = router({
  /**
   * Upserts a batch of Instagram posts into the DB cache.
   * Called by the Manus scheduled task agent.
   */
  sync: protectedProcedure
    .input(z.object({ posts: z.array(postSchema) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { synced: 0 };

      const now = new Date();
      let synced = 0;

      for (const post of input.posts) {
        try {
          await db
            .insert(instagramPosts)
            .values({
              id:           post.id,
              postType:     post.type,
              caption:      post.caption ?? null,
              link:         post.link,
              likes:        post.likes,
              comments:     post.comments,
              thumbnailUrl: post.thumbnailUrl ?? null,
              postedAt:     new Date(post.postedAt),
              syncedAt:     now,
            })
            .onDuplicateKeyUpdate({
              set: {
                caption:      post.caption ?? null,
                likes:        post.likes,
                comments:     post.comments,
                thumbnailUrl: post.thumbnailUrl ?? null,
                syncedAt:     now,
              },
            });
          synced++;
        } catch (err) {
          console.error(`[instagramSync] Failed to upsert post ${post.id}:`, err);
        }
      }

      console.log(`[instagramSync] Synced ${synced}/${input.posts.length} posts`);
      return { synced };
    }),
});
