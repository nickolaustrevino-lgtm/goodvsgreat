import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({ recordEmailDispatch: vi.fn() }));
vi.mock("./db.subscribers", () => ({ upsertSubscriberWithToken: vi.fn() }));
vi.mock("./emailTemplates", () => ({ buildNewSubscriberConfirmationEmail: vi.fn() }));
vi.mock("./mailer", () => ({ sendEmail: vi.fn() }));

import { recordEmailDispatch } from "./db";
import { upsertSubscriberWithToken } from "./db.subscribers";
import { buildNewSubscriberConfirmationEmail } from "./emailTemplates";
import { sendEmail } from "./mailer";
import { sendSubscriberConfirmation } from "./subscriberConfirmation";

describe("subscriber confirmation dispatch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(buildNewSubscriberConfirmationEmail).mockReturnValue({ html: "<p>Confirm</p>", text: "Confirm" });
    vi.mocked(recordEmailDispatch).mockResolvedValue(11);
    vi.mocked(sendEmail).mockResolvedValue();
  });

  it("sends and audits a new subscription confirmation", async () => {
    const result = await sendSubscriberConfirmation({
      email: "reader@example.com",
      firstName: "Reader",
      source: "subscribe-page",
      baseUrl: "https://goodvsgreat.ai",
    });

    expect(result.dispatchId).toBe(11);
    expect(result.confirmUrl).toMatch(/^https:\/\/goodvsgreat\.ai\/subscribe\/confirm\?token=/);
    expect(upsertSubscriberWithToken).toHaveBeenCalledWith(expect.objectContaining({ email: "reader@example.com" }));
    expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({
      to: "reader@example.com",
      subject: "Confirm your subscription to The Media Decision Letter",
    }));
    expect(recordEmailDispatch).toHaveBeenCalledWith(expect.objectContaining({
      kind: "subscriber_confirmation",
      status: "accepted",
    }));
  });
});
