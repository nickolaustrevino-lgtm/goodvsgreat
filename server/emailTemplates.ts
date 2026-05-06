/**
 * GvG branded HTML email templates.
 * All styles are inlined for maximum email-client compatibility.
 */

export function buildConfirmationEmail({
  firstName,
  confirmUrl,
}: {
  firstName?: string;
  confirmUrl: string;
}): { html: string; text: string } {
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

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#0D1117;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
               style="max-width:560px;background-color:#111827;border:1px solid #1E2A3A;border-radius:8px;overflow:hidden;">

          <!-- Top accent bar -->
          <tr>
            <td style="background-color:#2979FF;height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Logo header -->
          <tr>
            <td align="center" style="padding:32px 40px 24px;">
              <img src="${logoUrl}"
                   alt="Good vs. Great"
                   width="200"
                   style="display:block;max-width:200px;height:auto;border:0;" />
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="border-top:1px solid #1E2A3A;"></div>
            </td>
          </tr>

          <!-- Body copy -->
          <tr>
            <td style="padding:32px 40px 0;color:#C9D1D9;font-size:15px;line-height:1.7;">
              <p style="margin:0 0 16px;">${greeting}</p>
              <p style="margin:0 0 16px;">
                A quick note from the Good vs. Great team.
              </p>
              <p style="margin:0 0 16px;">
                We recently moved our subscriber list to a new platform, and we want to make sure
                you keep receiving the writing you signed up for — media systems architecture,
                attribution strategy, and the ideas behind
                <a href="https://goodvsgreat.ai" style="color:#2979FF;text-decoration:none;">goodvsgreat.ai</a>.
              </p>
              <p style="margin:0 0 24px;">
                One click confirms your spot on the list:
              </p>
            </td>
          </tr>

          <!-- CTA button -->
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

          <!-- Fallback link -->
          <tr>
            <td style="padding:0 40px 32px;color:#6B7280;font-size:12px;line-height:1.6;text-align:center;">
              Button not working? Copy and paste this link into your browser:<br />
              <a href="${confirmUrl}" style="color:#2979FF;word-break:break-all;">${confirmUrl}</a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="border-top:1px solid #1E2A3A;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;color:#4B5563;font-size:12px;line-height:1.6;text-align:center;">
              <p style="margin:0 0 8px;">
                <strong style="color:#6B7280;">Good vs. Great</strong> &mdash; Media Systems Architecture
              </p>
              <p style="margin:0 0 8px;">
                <a href="https://goodvsgreat.ai" style="color:#2979FF;text-decoration:none;">goodvsgreat.ai</a>
              </p>
              <p style="margin:0;">
                You are receiving this because you previously subscribed to Good vs. Great content.
                If you no longer want updates, simply ignore this email.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

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
