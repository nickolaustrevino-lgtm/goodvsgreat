/**
 * CAPI tRPC router
 *
 * Exposes a single public procedure `capi.track` that the browser calls
 * after firing the client-side Pixel event. The server then forwards the
 * event to the Meta Conversions API, providing server-side redundancy.
 *
 * Using publicProcedure intentionally — event tracking must work for
 * unauthenticated visitors (the vast majority of site traffic).
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { sendCapiEvent } from "../capi";

export const capiRouter = router({
  track: publicProcedure
    .input(
      z.object({
        /** Standard Meta event name */
        eventName: z.string().min(1).max(64),
        /** Browser-generated event ID for Pixel deduplication */
        eventId: z.string().optional(),
        /** Page URL where the event fired */
        sourceUrl: z.string().url().optional(),
        /** Optional custom data (content_name, value, currency, etc.) */
        customData: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Extract match-quality signals from the incoming request
      const forwardedFor = ctx.req.headers["x-forwarded-for"];
      const clientIp =
        (typeof forwardedFor === "string" ? forwardedFor.split(",")[0]?.trim() : undefined) ??
        ctx.req.ip ??
        undefined;

      const userAgent = ctx.req.headers["user-agent"] ?? undefined;

      // Fire-and-forget — do not block the response on CAPI latency
      sendCapiEvent({
        eventName: input.eventName,
        eventId: input.eventId,
        sourceUrl: input.sourceUrl,
        clientIp,
        userAgent,
        customData: input.customData,
      }).catch((err) => {
        console.error("[CAPI router] Unhandled error:", err);
      });

      return { queued: true };
    }),
});
