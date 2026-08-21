import { describe, expect, it } from "vitest";
import { getVideoMimeType, normalizeVideoSource } from "./videoEmbed";

describe("video embed helpers", () => {
  it("accepts permanent site-storage MP4 sources", () => {
    expect(
      normalizeVideoSource(" /manus-storage/ActorGovernanceFramework-Animation_4999dfe4.mp4 "),
    ).toBe("/manus-storage/ActorGovernanceFramework-Animation_4999dfe4.mp4");
  });

  it("accepts HTTPS video URLs and identifies their MIME type", () => {
    const source = "https://cdn.example.com/framework.webm?version=1";
    expect(normalizeVideoSource(source)).toBe(source);
    expect(getVideoMimeType(source)).toBe("video/webm");
  });

  it("rejects non-video and unsafe sources", () => {
    expect(normalizeVideoSource("javascript:alert(1)")).toBeNull();
    expect(normalizeVideoSource("/manus-storage/not-a-video.png")).toBeNull();
  });
});
