import { describe, expect, it } from "vitest";
import { BLOG_MASTHEAD } from "./blogMasthead";

describe("Media Decision Letter masthead", () => {
  it("uses the approved editorial title and subtitle", () => {
    expect(BLOG_MASTHEAD.eyebrow).toBe("The Media Decision Letter");
    expect(BLOG_MASTHEAD.title).toBe(
      "Strategic notes on media effectiveness, measurement systems, AI, and growth.",
    );
    expect(BLOG_MASTHEAD.subtitle).toBe(
      "Frameworks, case studies, and perspectives on what separates good media from great media.",
    );
  });
});
