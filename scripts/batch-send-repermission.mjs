/**
 * Batch re-permission email sender.
 * Reads the subscriber CSV, skips nick@goodvsgreat.ai and nickolaus.trevino@gmail.com,
 * generates a unique token for each, upserts into DB, and sends the branded HTML email.
 */

import nodemailer from "nodemailer";
import mysql from "mysql2/promise";
import { randomBytes } from "crypto";
import { readFileSync } from "fs";

// ── Config ────────────────────────────────────────────────────────────────────

const SKIP_EMAILS = new Set([
  "nick@goodvsgreat.ai",
  "nickolaus.trevino@gmail.com", // already sent test
]);

const BASE_URL = "https://goodvsgreat.ai";
const DELAY_MS = 1500; // polite delay between sends

// ── Env ───────────────────────────────────────────────────────────────────────

let dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  try {
    const env = readFileSync("/home/ubuntu/goodvsgreat/.env", "utf8");
    const match = env.match(/DATABASE_URL=(.+)/);
    if (match) dbUrl = match[1].trim();
  } catch {}
}
if (!dbUrl) throw new Error("DATABASE_URL not set");

const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_APP_PASSWORD;
if (!gmailUser || !gmailPass) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD not set");

// ── Parse CSV ─────────────────────────────────────────────────────────────────

const csvText = readFileSync("/home/ubuntu/upload/goodvsgreat-subscribers-clean.csv", "utf8");
const rows = csvText.trim().split("\n").slice(1); // skip header

const subscribers = rows
  .map((line) => {
    const [email, firstName] = line.split(",").map((s) => s.trim());
    return { email, firstName: firstName || null };
  })
  .filter(({ email }) => email && !SKIP_EMAILS.has(email));

console.log(`Sending to ${subscribers.length} subscribers (skipping ${SKIP_EMAILS.size}):\n`);
subscribers.forEach(({ email, firstName }) =>
  console.log(`  ${email}${firstName ? ` (${firstName})` : ""}`)
);
console.log();

// ── Nodemailer transport ──────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: gmailUser, pass: gmailPass },
});

// ── DB connection ─────────────────────────────────────────────────────────────

const conn = await mysql.createConnection(dbUrl);

// ── Email template ────────────────────────────────────────────────────────────

function buildEmail(firstName, confirmUrl) {
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const logoUrl =
    "https://goodvsgreat.ai/manus-storage/GoodvsGreatBlueBannerLogoOnly_158951cf.png";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirm your subscription — Good vs. Great</title>
</head>
<body style="margin:0;padding:0;background-color:#0D1117;font-family:'IBM Plex Mono',Courier,monospace;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#0D1117;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
               style="max-width:560px;background-color:#111827;border:1px solid #1E2A3A;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background-color:#2979FF;height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" style="padding:32px 40px 24px;">
              <img src="${logoUrl}" alt="Good vs. Great" width="200"
                   style="display:block;max-width:200px;height:auto;border:0;" />
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px;">
              <div style="border-top:1px solid #1E2A3A;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 0;color:#C9D1D9;font-size:15px;line-height:1.7;">
              <p style="margin:0 0 16px;">${greeting}</p>
              <p style="margin:0 0 16px;">A quick note from the Good vs. Great team.</p>
              <p style="margin:0 0 16px;">
                We recently moved our subscriber list to a new platform, and we want to make sure
                you keep receiving the writing you signed up for &mdash; media systems architecture,
                attribution strategy, and the ideas behind
                <a href="https://goodvsgreat.ai" style="color:#2979FF;text-decoration:none;">goodvsgreat.ai</a>.
              </p>
              <p style="margin:0 0 24px;">One click confirms your spot on the list:</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 40px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:6px;background-color:#2979FF;">
                    <a href="${confirmUrl}"
                       style="display:inline-block;padding:14px 32px;color:#ffffff;font-family:'IBM Plex Mono',Courier,monospace;font-size:14px;font-weight:600;letter-spacing:0.04em;text-decoration:none;border-radius:6px;">
                      Click to Subscribe &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;color:#6B7280;font-size:12px;line-height:1.6;text-align:center;">
              Button not working? Copy and paste this link into your browser:<br />
              <a href="${confirmUrl}" style="color:#2979FF;word-break:break-all;">${confirmUrl}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px;">
              <div style="border-top:1px solid #1E2A3A;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;color:#4B5563;font-size:12px;line-height:1.6;text-align:center;">
              <p style="margin:0 0 8px;"><strong style="color:#6B7280;">Good vs. Great</strong> &mdash; Media Systems Architecture</p>
              <p style="margin:0 0 8px;"><a href="https://goodvsgreat.ai" style="color:#2979FF;text-decoration:none;">goodvsgreat.ai</a></p>
              <p style="margin:0;">You are receiving this because you previously subscribed to Good vs. Great content.
              If you no longer want updates, simply ignore this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `${greeting}

A quick note from the Good vs. Great team.

We recently moved our subscriber list to a new platform, and we want to make sure you keep receiving the writing you signed up for — media systems architecture, attribution strategy, and the ideas behind goodvsgreat.ai.

One click confirms your spot on the list:

→ Click to Subscribe: ${confirmUrl}

If you no longer want to receive updates, simply ignore this email — no action needed.

---
Good vs. Great | Media Systems Architecture
https://goodvsgreat.ai

You are receiving this because you previously subscribed to Good vs. Great content.`;

  return { html, text };
}

// ── Send loop ─────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let sent = 0;
let failed = 0;

for (const { email, firstName } of subscribers) {
  const token = randomBytes(24).toString("hex");
  const confirmUrl = `${BASE_URL}/subscribe/confirm?token=${token}`;

  try {
    // Upsert subscriber with fresh token
    await conn.execute(
      `INSERT INTO subscribers (email, name, source, confirmToken)
       VALUES (?, ?, 're-permission', ?)
       ON DUPLICATE KEY UPDATE confirmToken = VALUES(confirmToken), confirmedAt = NULL`,
      [email, firstName ?? null, token]
    );

    const { html, text } = buildEmail(firstName, confirmUrl);

    await transporter.sendMail({
      from: `"Good vs. Great" <${gmailUser}>`,
      to: email,
      subject: "One quick step to stay connected — Good vs. Great",
      html,
      text,
    });

    console.log(`✓ Sent to ${email}`);
    sent++;
  } catch (err) {
    console.error(`✗ Failed for ${email}: ${err.message}`);
    failed++;
  }

  await sleep(DELAY_MS);
}

await conn.end();

console.log(`\n── Summary ──────────────────────────────`);
console.log(`Sent:   ${sent}`);
console.log(`Failed: ${failed}`);
console.log(`Total:  ${subscribers.length}`);
