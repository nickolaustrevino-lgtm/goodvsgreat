/**
 * Transactional email helper — uses Gmail SMTP via Nodemailer.
 * Credentials are injected from GMAIL_USER and GMAIL_APP_PASSWORD env vars.
 *
 * Usage:
 *   await sendEmail({
 *     to: "visitor@example.com",
 *     subject: "Thanks for reaching out",
 *     html: "<p>...</p>",
 *   });
 */

import nodemailer from "nodemailer";
import { ENV } from "./_core/env";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

function createTransport() {
  if (!ENV.gmailUser || !ENV.gmailAppPassword) {
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.gmailUser,
      pass: ENV.gmailAppPassword,
    },
  });
}

/**
 * Sends a transactional email via Gmail SMTP.
 * Returns true on success, false if credentials are missing or sending fails.
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  const transport = createTransport();
  if (!transport) {
    console.warn("[Email] GMAIL_USER or GMAIL_APP_PASSWORD not set — skipping email");
    return false;
  }

  try {
    await transport.sendMail({
      from: `"Good vs. Great" <${ENV.gmailUser}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });
    return true;
  } catch (err) {
    console.error("[Email] Failed to send email:", err);
    return false;
  }
}

/**
 * Sends the booking confirmation email to a visitor who just submitted the form.
 */
export async function sendBookingConfirmation(params: {
  firstName: string;
  lastName: string;
  email: string;
  org: string;
  challenge: string;
}): Promise<boolean> {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thanks for reaching out</title>
  <style>
    body { margin: 0; padding: 0; background: #0D0D1A; font-family: 'Inter', Arial, sans-serif; color: #E8E8F0; }
    .container { max-width: 560px; margin: 40px auto; padding: 40px 32px; background: #12121F; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); }
    .logo { margin-bottom: 32px; }
    .logo img { height: 40px; width: auto; display: block; border-radius: 4px; }
    h1 { font-size: 22px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px; line-height: 1.3; }
    p { font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.65); margin: 0 0 16px; }
    .highlight { color: rgba(255,255,255,0.85); }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 28px 0; }
    .footer { font-size: 12px; color: rgba(255,255,255,0.25); text-align: center; margin-top: 32px; }
    a { color: #2F6FFF; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo"><img src="https://goodvsgreat.ai/manus-storage/GoodvsGreatBlueBannerLogoOnly_4fd6e606.png" alt="Good vs. Great" /></div>
    <h1>Thanks, ${params.firstName} — I'll be in touch shortly.</h1>
    <p>
      I've received your request and will review it within <span class="highlight">24 hours</span>.
      If you haven't already, you can also pick a time directly using the calendar link that just opened.
    </p>
    <hr class="divider" />
    <p style="font-size:13px; color:rgba(255,255,255,0.35);">
      <strong style="color:rgba(255,255,255,0.5);">What you submitted:</strong><br />
      Organisation: <span class="highlight">${params.org}</span><br />
      Primary challenge: <span class="highlight">${params.challenge}</span>
    </p>
    <hr class="divider" />
    <p>
      In the meantime, feel free to explore the
      <a href="https://goodvsgreat.ai/#proof">case studies</a> or
      <a href="https://goodvsgreat.ai/writing">articles</a> on the site.
    </p>
    <div class="footer">
      Good vs. Great &mdash; Media Systems Architecture<br />
      <a href="https://goodvsgreat.ai">goodvsgreat.ai</a>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `Thanks, ${params.firstName} — I'll be in touch within 24 hours.\n\nWhat you submitted:\n- Organisation: ${params.org}\n- Primary challenge: ${params.challenge}\n\nGood vs. Great | goodvsgreat.ai`;

  return sendEmail({
    to: params.email,
    subject: `Thanks for reaching out, ${params.firstName} — I'll be in touch shortly`,
    html,
    text,
  });
}

/**
 * Sends the 24-hour follow-up email to a visitor who has not yet booked a call.
 */
export async function sendFollowUpEmail(params: {
  firstName: string;
  email: string;
}): Promise<boolean> {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Still thinking it over?</title>
</head>
<body style="margin:0;padding:0;background:#0D0D1A;font-family:'Inter',Arial,sans-serif;color:#E8E8F0;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0D0D1A;">
    <tr>
      <td style="padding:40px 0 0;">
        <table width="560" cellpadding="0" cellspacing="0" border="0" align="center"
          style="max-width:560px;width:100%;background:#12121F;border-radius:12px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">

          <!-- Logo -->
          <tr>
            <td style="padding:36px 36px 0;">
              <a href="https://goodvsgreat.ai" target="_blank" style="display:inline-block;text-decoration:none;">
                <img src="https://goodvsgreat.ai/manus-storage/GoodvsGreatBlueBannerLogoOnly_4fd6e606.png"
                  alt="Good vs. Great" width="160" height="auto"
                  style="display:block;border:0;outline:none;border-radius:4px;" />
              </a>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding:28px 36px 0;">
              <h1 style="font-size:22px;font-weight:700;color:#FFFFFF;margin:0 0 16px;line-height:1.35;letter-spacing:-0.02em;">
                Still thinking it over, ${params.firstName}?
              </h1>
              <p style="font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);margin:0 0 16px;">
                You submitted a request yesterday and I wanted to check in. No pressure, just making sure
                you have everything you need to decide if a conversation makes sense.
              </p>
              <p style="font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);margin:0 0 16px;">
                If you haven't booked a time yet, the calendar is still open. It's a
                <span style="color:rgba(255,255,255,0.85);font-weight:600;">30-minute, no-pitch diagnostic</span>
                — I'll tell you exactly where your attribution model is leaking and what it would take to fix it.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 36px 0;">
              <a href="https://goodvsgreat.ai/#booking-form" target="_blank"
                style="display:inline-block;background:#2979FF;color:#FFFFFF;font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:0.02em;text-decoration:none;padding:13px 28px;border-radius:6px;">
                Book a 30-min diagnostic
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:28px 36px 0;"><hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:0;" /></td></tr>

          <!-- What to expect -->
          <tr>
            <td style="padding:24px 36px 0;">
              <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.3);margin:0 0 14px;">What to expect in 30 minutes</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="padding:0 0 10px;"><span style="display:inline-block;width:6px;height:6px;background:#2979FF;border-radius:50%;vertical-align:middle;margin-right:10px;"></span><span style="font-size:14px;color:rgba(255,255,255,0.7);">A clear read on where your current attribution model breaks down</span></td></tr>
                <tr><td style="padding:0 0 10px;"><span style="display:inline-block;width:6px;height:6px;background:#2979FF;border-radius:50%;vertical-align:middle;margin-right:10px;"></span><span style="font-size:14px;color:rgba(255,255,255,0.7);">One specific lever you can pull this week to improve signal quality</span></td></tr>
                <tr><td style="padding:0 0 0;"><span style="display:inline-block;width:6px;height:6px;background:#2979FF;border-radius:50%;vertical-align:middle;margin-right:10px;"></span><span style="font-size:14px;color:rgba(255,255,255,0.7);">An honest answer on whether working together makes sense</span></td></tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:24px 36px 0;"><hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:0;" /></td></tr>

          <!-- Closing -->
          <tr>
            <td style="padding:20px 36px 0;">
              <p style="font-size:14px;line-height:1.7;color:rgba(255,255,255,0.45);margin:0;">
                If the timing isn't right, no worries. Just reply to this email and let me know.
                I'll remove you from follow-ups and reach out again only if you ask.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 36px 36px;">
              <p style="font-size:12px;color:rgba(255,255,255,0.2);text-align:center;margin:0;">
                Good vs. Great | Media Systems Architecture<br />
                <a href="https://goodvsgreat.ai" style="color:rgba(255,255,255,0.25);text-decoration:none;">goodvsgreat.ai</a>
                &nbsp;|&nbsp;
                <a href="https://goodvsgreat.ai" style="color:rgba(255,255,255,0.25);text-decoration:none;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `Still thinking it over, ${params.firstName}?\n\nYou submitted a request yesterday. If you haven't booked a time yet, the calendar is still open:\nhttps://goodvsgreat.ai/#booking-form\n\nGood vs. Great | goodvsgreat.ai`;

  return sendEmail({
    to: params.email,
    subject: `Still thinking it over, ${params.firstName}?`,
    html,
    text,
  });
}
