/**
 * Booking router — handles server-side actions triggered by the booking form.
 *
 * Exposes a single `booking.notify` public procedure that:
 *   1. Validates the submitted form fields.
 *   2. Sends the owner a Manus notification with the visitor's details.
 *   3. Returns success/failure so the client can log silently.
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { insertBookingRequest } from "../db";

export const bookingRouter = router({
  notify: publicProcedure
    .input(
      z.object({
        firstName:  z.string().min(1),
        lastName:   z.string().min(1),
        email:      z.string().email(),
        org:        z.string().min(1),
        spend:      z.string().min(1),
        challenge:  z.string().min(1),
        details:    z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 1. Persist to database (fire-and-forget; notification still sends even if DB fails)
      await insertBookingRequest({
        firstName: input.firstName,
        lastName:  input.lastName,
        email:     input.email,
        org:       input.org,
        spend:     input.spend,
        challenge: input.challenge,
        details:   input.details ?? null,
      }).catch((err) => {
        console.error("[booking.notify] DB insert error:", err);
      });

      // 2. Build notification content
      const content = [
        `👤 Name:        ${input.firstName} ${input.lastName}`,
        `📧 Email:       ${input.email}`,
        `🏢 Org:         ${input.org}`,
        `💰 Spend:       ${input.spend}`,
        `🎯 Challenge:   ${input.challenge}`,
        ...(input.details ? [`📝 Details:\n${input.details}`] : []),
      ].join("\n");

      const sent = await notifyOwner({
        title: `New booking request — ${input.firstName} ${input.lastName} (${input.org})`,
        content,
      }).catch((err) => {
        console.error("[booking.notify] notifyOwner error:", err);
        return false;
      });

      return { sent };
    }),
});
