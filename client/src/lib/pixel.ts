/**
 * Meta Pixel event helpers - GvG
 * Pixel ID: 1170717808472225
 *
 * Wraps window.fbq calls with a safety guard so events are silently
 * dropped in environments where the pixel hasn't loaded (e.g. ad blockers,
 * server-side rendering, or test environments).
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire a standard Meta Pixel event (e.g. 'Lead', 'Contact', 'PageView') */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  }
}

/** Fire a custom Meta Pixel event */
export function trackCustomEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("trackCustom", eventName, params);
    } else {
      window.fbq("trackCustom", eventName);
    }
  }
}
