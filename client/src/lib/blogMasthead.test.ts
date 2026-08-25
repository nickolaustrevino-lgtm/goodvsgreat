import { describe, expect, it } from "vitest";
import { BLOG_MASTHEAD } from "./blogMasthead";

describe("Media Decision Letter masthead", () => {
  it("uses the approved editorial title and subtitle", () => {
    expect(BLOG_MASTHEAD.title).toBe("The Media Decision Letter");
    expect(BLOG_MASTHEAD.subtitle).toBe(
      "Strategic notes on media effectiveness, measurement systems, AI, and growth.",
    );
  });
});
