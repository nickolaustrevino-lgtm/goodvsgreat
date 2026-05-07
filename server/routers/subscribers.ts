import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import {
  addSubscriber,
  getAllSubscribers,
  getSubscriberByEmail,
  getSubscriberByToken,
  confirmSubscriber,
  upsertSubscriberWithToken,
} from "../db.subscribers";
import { notifyOwner } from "../_core/notification";
import { sendEmail } from "../mailer";
import { buildConfirmationEmail } from "../emailTemplates";
import { randomBytes } from "crypto";

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

  /**
   * Admin: send a branded HTML confirmation email to a single subscriber.
   * Generates a fresh token, upserts it in the DB, then sends the email.
   */
  sendConfirmation: adminProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().optional(),
        /** Base URL for the confirm link — defaults to production site */
        baseUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const token = randomBytes(24).toString("hex");
      const base = input.baseUrl ?? "https://goodvsgreat.ai";
      const confirmUrl = `${base}/subscribe/confirm?token=${token}`;

      // Upsert subscriber row with fresh token
      await upsertSubscriberWithToken({
        email: input.email,
        name: input.firstName ?? null,
        source: "re-permission",
        confirmToken: token,
      });

      const { html, text } = buildConfirmationEmail({
        firstName: input.firstName,
        confirmUrl,
      });

      await sendEmail({
        to: input.email,
        subject: "One quick step to stay connected — Good vs. Great",
        html,
        text,
      });

      // Notify owner that a confirmation email was dispatched
      await notifyOwner({
        title: `Confirmation email sent — ${input.email}`,
        content: [
          `📧 To:      ${input.email}`,
          ...(input.firstName ? [`👤 Name:    ${input.firstName}`] : []),
          `🔗 Link:    ${confirmUrl}`,
          `📅 Sent at: ${new Date().toUTCString()}`,
        ].join("\n"),
      }).catch(() => {}); // non-blocking

      return { success: true, confirmUrl };
    }),
});
