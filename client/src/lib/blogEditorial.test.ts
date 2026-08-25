import { describe, expect, it } from "vitest";
import { calculateReadingProgress, calculateReadingTime } from "./blogEditorial";

describe("blog editorial helpers", () => {
  it("calculates a minimum one-minute reading label from HTML content", () => {
    expect(calculateReadingTime("<p>One two three.</p>")).toBe("1 min read");
  });

  it("rounds a longer article to the nearest minute", () => {
    const article = Array.from({ length: 360 }, () => "signal").join(" ");
    expect(calculateReadingTime(article)).toBe("2 min read");
  });

  it("clamps reading progress between zero and one", () => {
    expect(calculateReadingProgress(-120, 600)).toBe(0);
    expect(calculateReadingProgress(300, 600)).toBe(0.5);
    expect(calculateReadingProgress(900, 600)).toBe(1);
    expect(calculateReadingProgress(0, 0)).toBe(0);
  });
});
