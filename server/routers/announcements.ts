import { z } from "zod";
import { notifyOwner } from "../_core/notification";
import { adminProcedure, router } from "../_core/trpc";
import { sendAuditedAugust21AnnouncementProduction, sendAuditedAugust21AnnouncementTest } from "../blogAnnouncement";

export const announcementsRouter = router({
  /** Admin-only: sends the approved August 21 announcement and automatically audits the outcome. */
  sendAugust21Test: adminProcedure
    .input(z.object({ recipient: z.string().email() }))
    .mutation(async ({ input }) => {
      const result = await sendAuditedAugust21AnnouncementTest(input.recipient);
      await notifyOwner({
        title: `Blog announcement test ${result.accepted ? "sent" : "failed"}`,
        content: `Recipient: ${input.recipient}\nSubject: ${result.subject}\nArticle: ${result.articleSlug}\nAudit ID: ${result.dispatchId ?? "unavailable"}`,
      }).catch(() => {});
      return result;
    }),

  /** Admin-only: sends the approved August 21 announcement as a live subscriber message and audits the outcome. */
  sendAugust21Production: adminProcedure
    .input(z.object({ recipient: z.string().email() }))
    .mutation(async ({ input }) => {
      const result = await sendAuditedAugust21AnnouncementProduction(input.recipient);
      await notifyOwner({
        title: `Blog announcement send ${result.accepted ? "accepted" : "failed"}`,
        content: `Recipient: ${input.recipient}\nSubject: ${result.subject}\nArticle: ${result.articleSlug}\nAudit ID: ${result.dispatchId ?? "unavailable"}`,
      }).catch(() => {});
      return result;
    }),
});
