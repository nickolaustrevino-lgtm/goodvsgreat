import { recordEmailDispatch } from "./db";
import { sendEmail } from "./email";

const articleSlug = "ai-search-changed-discovery-ai-agents-change-attribution";
const articleUrl = `https://goodvsgreat.ai/blog/${articleSlug}`;
const subject = "Your login screen does not prove a human is behind it anymore.";

export function buildAugust21Announcement() {
  const html = `
<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>AI Search Changed Discovery. AI Agents Will Change Attribution.</title></head>
  <body style="margin:0;padding:0;background:#0D0D1A;font-family:Arial,sans-serif;color:#E8E8F0;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">AI search changed discovery. AI agents are about to change what your attribution data means.</div>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0D0D1A;"><tr><td style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width:560px;width:100%;background:#12121F;border:1px solid rgba(255,255,255,0.08);border-radius:14px;overflow:hidden;">
        <tr><td style="padding:36px 36px 0;"><a href="https://goodvsgreat.ai" target="_blank" style="text-decoration:none;display:inline-block;"><img src="https://goodvsgreat.ai/manus-storage/GoodvsGreatBlueBannerLogoOnly_4fd6e606.png" alt="Good vs. Great" width="160" style="display:block;border:0;border-radius:4px;" /></a></td></tr>
        <tr><td style="padding:30px 36px 0;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#6FA0FF;">The Media Decision Letter</p>
          <h1 style="margin:0 0 18px;font-size:27px;line-height:1.2;letter-spacing:-0.5px;color:#FFFFFF;font-weight:700;">AI search changed discovery. AI agents will change attribution.</h1>
          <p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:rgba(255,255,255,0.78);font-weight:600;">Your login screen does not prove a human is behind it anymore.</p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);">AI search already changed how customers discover a brand. AI agents will change how they transact, forcing media and measurement teams to distinguish human-led, AI-assisted, and agent-executed actions.</p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);">The same conversion can now carry materially different attribution signals. An AI assistant recommending a product, a person completing a purchase with AI support, and an agent executing a task end to end should not be interpreted the same way in your reporting.</p>
          <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);">The new article introduces <strong style="color:#FFFFFF;">Actor Governance</strong>, a practical framework for making that distinction operational before data starts to mislead the business.</p>
        </td></tr>
        <tr><td style="padding:26px 36px 0;"><a href="${articleUrl}" target="_blank" style="display:inline-block;padding:14px 24px;border-radius:7px;background:#2979FF;color:#FFFFFF;font-size:14px;font-weight:700;letter-spacing:0.2px;text-decoration:none;">Read the article &#8594;</a></td></tr>
        <tr><td style="padding:30px 36px 0;"><div style="height:1px;background:rgba(255,255,255,0.08);"></div></td></tr>
        <tr><td style="padding:22px 36px 36px;"><p style="margin:0;font-size:13px;line-height:1.65;color:rgba(255,255,255,0.44);">If you are responsible for media effectiveness, measurement systems, or growth, this is the shift to start planning for now.</p><p style="margin:22px 0 0;font-size:12px;line-height:1.7;color:rgba(255,255,255,0.28);">Good vs. Great | Media Systems Architecture<br /><a href="https://goodvsgreat.ai" style="color:rgba(255,255,255,0.34);text-decoration:none;">goodvsgreat.ai</a> | <a href="https://goodvsgreat.ai" style="color:rgba(255,255,255,0.34);text-decoration:none;">Unsubscribe</a></p></td></tr>
      </table>
    </td></tr></table>
  </body>
</html>`.trim();

  const text = `AI search changed discovery. AI agents will change attribution.\n\nYour login screen does not prove a human is behind it anymore.\n\nAI search already changed how customers discover a brand. AI agents will change how they transact, forcing media and measurement teams to distinguish human-led, AI-assisted, and agent-executed actions.\n\nThe new article introduces Actor Governance, a practical framework for making that distinction operational before data starts to mislead the business.\n\nRead the article: ${articleUrl}\n\nGood vs. Great | goodvsgreat.ai`;

  return { articleSlug, articleUrl, subject, html, text };
}

export async function sendAuditedAugust21Announcement(
  recipient: string,
  mode: "test" | "production" = "test"
) {
  const announcement = buildAugust21Announcement();
  const accepted = await sendEmail({
    to: recipient,
    subject: announcement.subject,
    html: announcement.html,
    text: announcement.text,
  });

  const status: "accepted" | "failed" = accepted ? "accepted" : "failed";
  const isTest = mode === "test";
  const dispatchId = await recordEmailDispatch({
    kind: isTest ? "blog_announcement_test" : "blog_announcement_send",
    recipient,
    subject: announcement.subject,
    status,
    metadata: JSON.stringify({ articleSlug: announcement.articleSlug, test: isTest, transportAccepted: accepted }),
  });

  return { accepted, dispatchId, subject: announcement.subject, articleSlug: announcement.articleSlug };
}

export async function sendAuditedAugust21AnnouncementTest(recipient: string) {
  return sendAuditedAugust21Announcement(recipient, "test");
}

export async function sendAuditedAugust21AnnouncementProduction(recipient: string) {
  return sendAuditedAugust21Announcement(recipient, "production");
}
