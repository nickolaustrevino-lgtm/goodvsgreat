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
    .logo { font-family: monospace; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: #2F6FFF; text-transform: uppercase; margin-bottom: 32px; }
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
    <div class="logo">good vs. Great</div>
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
