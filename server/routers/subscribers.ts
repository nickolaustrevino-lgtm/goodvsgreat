import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { addSubscriber, getAllSubscribers, getSubscriberByEmail, getSubscriberByToken, confirmSubscriber } from "../db.subscribers";
import { notifyOwner } from "../_core/notification";

export const subscribersRouter = router({
  /** Public: subscribe with email (and optional name) */
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().max(255).optional(),
        source: z.string().max(255).optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Check if already subscribed
      const existing = await getSubscriberByEmail(input.email);
      if (existing) {
        return { success: true, alreadySubscribed: true };
      }

      await addSubscriber({
        email: input.email,
        name: input.name ?? null,
        source: input.source ?? "blog",
      });

      // Notify owner of new subscriber
      await notifyOwner({
        title: "New subscriber",
        content: `${input.name ? `${input.name} (${input.email})` : input.email} subscribed via ${input.source ?? "blog"}.`,
      }).catch(() => {}); // non-blocking

      return { success: true, alreadySubscribed: false };
    }),

  /** Public: confirm subscription via one-time token */
  confirm: publicProcedure
    .input(z.object({ token: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const sub = await getSubscriberByToken(input.token);
      if (!sub) return { success: false, message: "Invalid or expired confirmation link." };
      if (sub.confirmedAt) return { success: true, alreadyConfirmed: true };
      await confirmSubscriber(sub.id);
      return { success: true, alreadyConfirmed: false };
    }),

  /** Admin: list all subscribers */
  list: adminProcedure.query(async () => {
    return getAllSubscribers();
  }),
});
