import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../_core/trpc";
import { storagePut } from "../storage";
import { insertUpload, getUploadsByUser, deleteUploadById } from "../db.uploads";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const filesRouter = router({
  /**
   * Upload a file.
   * Expects base64-encoded file content, filename, mimeType, and size.
   */
  upload: protectedProcedure
    .input(
      z.object({
        filename: z.string().min(1).max(255),
        mimeType: z.string().min(1).max(128),
        size: z.number().int().positive().max(MAX_SIZE_BYTES),
        base64: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const buffer = Buffer.from(input.base64, "base64");
      const safeFilename = input.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const relKey = `uploads/${ctx.user.id}/${safeFilename}`;

      const { key, url } = await storagePut(relKey, buffer, input.mimeType);

      await insertUpload({
        userId: ctx.user.id,
        filename: input.filename,
        fileKey: key,
        url,
        mimeType: input.mimeType,
        size: input.size,
      });

      return { key, url, filename: input.filename };
    }),

  /**
   * List all files uploaded by the current user.
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    return getUploadsByUser(ctx.user.id);
  }),

  /**
   * Delete a file record by ID (owner-only).
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership before deleting
      const files = await getUploadsByUser(ctx.user.id);
      const owned = files.find((f) => f.id === input.id);
      if (!owned) {
        throw new TRPCError({ code: "FORBIDDEN", message: "File not found or not owned by you" });
      }
      await deleteUploadById(input.id, ctx.user.id);
      return { success: true };
    }),
});
