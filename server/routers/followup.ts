/**
 * Follow-up router — exposes a scheduled-task endpoint that:
 *   1. Queries booking_requests created 20-28 hours ago with no follow-up sent.
 *   2. Sends the approved 24-hour follow-up email to each lead.
 *   3. Marks followUpSentAt on each row to prevent duplicate sends.
 *   4. Notifies the owner with a summary.
 *
 * The endpoint is accessible to authenticated users (role = "user") so the
 * Manus scheduled task cookie (which grants "user" role) can call it.
 */

import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getUnfollowedUpLeads, markFollowUpSent } from "../db";
import { sendFollowUpEmail } from "../email";
import { notifyOwner } from "../_core/notification";

export const followupRouter = router({
  /**
   * Send follow-up emails to all leads created ~24 hours ago.
   * Designed to be called by a Manus scheduled task once per hour.
   */
  run: protectedProcedure
    .input(z.object({}).optional())
    .mutation(async () => {
      const leads = await getUnfollowedUpLeads();

      if (leads.length === 0) {
        return { sent: 0, skipped: 0 };
      }

      let sent = 0;
      let skipped = 0;

      for (const lead of leads) {
        try {
          const ok = await sendFollowUpEmail({
            firstName: lead.firstName,
            email: lead.email,
          });

          if (ok) {
            await markFollowUpSent(lead.id);
            sent++;
          } else {
            skipped++;
          }
        } catch (err) {
          console.error(`[followup] Failed for lead ${lead.id}:`, err);
          skipped++;
        }
      }

      // Notify owner with a summary
      if (sent > 0) {
        await notifyOwner({
          title: `Follow-up emails sent: ${sent}`,
          content: [
            `Sent: ${sent}`,
            `Skipped/failed: ${skipped}`,
            `Recipients:`,
            ...leads
              .slice(0, sent)
              .map((l) => `  - ${l.firstName} ${l.lastName} <${l.email}>`),
          ].join("\n"),
        }).catch(() => {});
      }

      return { sent, skipped };
    }),
});
