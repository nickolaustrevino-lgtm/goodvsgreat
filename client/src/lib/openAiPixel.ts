declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

export const OPENAI_CONTENTS_VIEWED_EVENT = "contents_viewed";

const BLOG_VIEW_STORAGE_KEY = "gvg-openai-blog-contents-viewed-at";
const BLOG_VIEW_DEDUPE_MS = 1_000;

/**
 * Sends the approved OpenAI contents-viewed conversion event for the blog.
 * The session-level guard prevents an immediate Blog navigation click and the
 * following /blog page-load effect from producing duplicate conversions.
 */
export function trackOpenAiBlogContentsViewed(): boolean {
  if (typeof window === "undefined" || typeof window.oaiq !== "function") return false;

  const now = Date.now();
  const previous = Number(window.sessionStorage.getItem(BLOG_VIEW_STORAGE_KEY));

  if (Number.isFinite(previous) && now - previous < BLOG_VIEW_DEDUPE_MS) {
    return false;
  }

  window.sessionStorage.setItem(BLOG_VIEW_STORAGE_KEY, String(now));
  window.oaiq("measure", OPENAI_CONTENTS_VIEWED_EVENT, { type: "contents" });
  return true;
}
