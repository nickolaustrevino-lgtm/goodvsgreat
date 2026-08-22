import { randomBytes } from "crypto";
import { recordEmailDispatch } from "./db";
import { upsertSubscriberWithToken } from "./db.subscribers";
import { buildNewSubscriberConfirmationEmail } from "./emailTemplates";
import { sendEmail } from "./mailer";

export async function sendSubscriberConfirmation({
  email,
  firstName,
  source,
  baseUrl,
}: {
  email: string;
  firstName?: string;
  source?: string;
  baseUrl: string;
}) {
  const token = randomBytes(24).toString("hex");
  const confirmUrl = `${baseUrl}/subscribe/confirm?token=${token}`;

  await upsertSubscriberWithToken({
    email,
    name: firstName ?? null,
    source: source ?? "subscribe-page",
    confirmToken: token,
  });

  const { html, text } = buildNewSubscriberConfirmationEmail({ firstName, confirmUrl });

  try {
    await sendEmail({
      to: email,
      subject: "Confirm your subscription to The Media Decision Letter",
      html,
      text,
    });
    const dispatchId = await recordEmailDispatch({
      kind: "subscriber_confirmation",
      recipient: email,
      subject: "Confirm your subscription to The Media Decision Letter",
      status: "accepted",
      metadata: JSON.stringify({ source: source ?? "subscribe-page", confirmation: true }),
    });
    return { confirmUrl, dispatchId };
  } catch (error) {
    await recordEmailDispatch({
      kind: "subscriber_confirmation",
      recipient: email,
      subject: "Confirm your subscription to The Media Decision Letter",
      status: "failed",
      metadata: JSON.stringify({ source: source ?? "subscribe-page", confirmation: true }),
    }).catch(() => {});
    throw error;
  }
}
