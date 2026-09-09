import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  OPENAI_CONTENTS_VIEWED_EVENT,
  OPENAI_PAGE_VIEWED_EVENT,
  trackOpenAiBlogContentsViewed,
  trackOpenAiHomepageViewed,
} from "./openAiPixel";

const blogNavigationSources = [
  ["router visit tracker", new URL("../App.tsx", import.meta.url), 2],
  ["navbar Blog link", new URL("../components/Navbar.tsx", import.meta.url), 2],
  ["subscribe page Blog links", new URL("../pages/Subscribe.tsx", import.meta.url), 3],
  ["article page Blog links", new URL("../pages/WritingPost.tsx", import.meta.url), 4],
  ["not-found Blog button", new URL("../pages/NotFound.tsx", import.meta.url), 2],
] as const;

describe("OpenAI blog conversion tracking", () => {
  let oaiq: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    const storage = new Map<string, string>();
    oaiq = vi.fn();

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        oaiq,
        sessionStorage: {
          clear: () => storage.clear(),
          getItem: (key: string) => storage.get(key) ?? null,
          setItem: (key: string, value: string) => storage.set(key, value),
        },
      },
    });
  });

  afterEach(() => {
    Reflect.deleteProperty(globalThis, "window");
  });

  it("measures contents_viewed with the approved contents type", () => {
    const tracked = trackOpenAiBlogContentsViewed();

    expect(tracked).toBe(true);
    expect(oaiq).toHaveBeenCalledWith(
      "measure",
      OPENAI_CONTENTS_VIEWED_EVENT,
      { type: "contents" },
    );
  });

  it("deduplicates an immediate navigation click and subsequent blog-page visit", () => {
    expect(trackOpenAiBlogContentsViewed()).toBe(true);
    expect(trackOpenAiBlogContentsViewed()).toBe(false);
    expect(oaiq).toHaveBeenCalledTimes(1);
  });

  it("measures homepage page_viewed with the approved contents type", () => {
    const tracked = trackOpenAiHomepageViewed();

    expect(tracked).toBe(true);
    expect(oaiq).toHaveBeenCalledWith(
      "measure",
      OPENAI_PAGE_VIEWED_EVENT,
      { type: "contents" },
    );
  });

  it("deduplicates rapid homepage view tracking", () => {
    expect(trackOpenAiHomepageViewed()).toBe(true);
    expect(trackOpenAiHomepageViewed()).toBe(false);
    expect(oaiq).toHaveBeenCalledTimes(1);
  });

  it("instruments every internal Blog navigation entry point", () => {
    for (const [label, sourceUrl, minimumReferences] of blogNavigationSources) {
      const source = readFileSync(sourceUrl, "utf8");
      const references = source.match(/trackOpenAiBlogContentsViewed/g) ?? [];

      expect(references, label).toHaveLength(minimumReferences);
    }
  });

  it("limits page_viewed tracking to the homepage route", () => {
    const appSource = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");

    expect(appSource).toContain('if (canonicalPath === "/") trackOpenAiHomepageViewed();');
  });
});
