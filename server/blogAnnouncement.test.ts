import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./email", () => ({ sendEmail: vi.fn() }));
vi.mock("./db", () => ({ recordEmailDispatch: vi.fn() }));

import { recordEmailDispatch } from "./db";
import { sendEmail } from "./email";
import { buildAugust21Announcement, sendAuditedAugust21AnnouncementProduction, sendAuditedAugust21AnnouncementTest } from "./blogAnnouncement";

describe("August 21 blog announcement", () => {
  beforeEach(() => vi.clearAllMocks());

  it("builds the approved article CTA and text-free email payload", () => {
    const announcement = buildAugust21Announcement();
    expect(announcement.subject).toBe("Your login screen does not prove a human is behind it anymore.");
    expect(announcement.html).toContain("ai-search-changed-discovery-ai-agents-change-attribution");
    expect(announcement.text).toContain("Actor Governance");
  });

  it("audits a successful test send automatically", async () => {
    vi.mocked(sendEmail).mockResolvedValue(true);
    vi.mocked(recordEmailDispatch).mockResolvedValue(42);

    const result = await sendAuditedAugust21AnnouncementTest("nickolaus.trevino@gmail.com");

    expect(result).toMatchObject({ accepted: true, dispatchId: 42 });
    expect(recordEmailDispatch).toHaveBeenCalledWith(expect.objectContaining({
      recipient: "nickolaus.trevino@gmail.com",
      kind: "blog_announcement_test",
      status: "accepted",
    }));
  });

  it("uses production audit classification for a live announcement", async () => {
    vi.mocked(sendEmail).mockResolvedValue(true);
    vi.mocked(recordEmailDispatch).mockResolvedValue(43);

    await sendAuditedAugust21AnnouncementProduction("reader@example.com");

    expect(recordEmailDispatch).toHaveBeenCalledWith(expect.objectContaining({
      kind: "blog_announcement_send",
      metadata: expect.stringContaining('"test":false'),
    }));
  });
});
