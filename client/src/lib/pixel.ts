/**
 * Meta Pixel + Conversions API (CAPI) event helpers — GvG
 * Pixel ID: 1170717808472225
 *
 * Every `trackEvent` call:
 *   1. Fires the browser-side Pixel (window.fbq) as before.
 *   2. Generates a unique event_id and POSTs the same event to the
 *      server-side CAPI endpoint so Meta can deduplicate and attribute
 *      events that the browser Pixel missed (ad blockers, iOS ITP, etc.).
 *
 * The shared event_id is the deduplication key — Meta counts only one
 * conversion when both the Pixel and CAPI report the same event_id.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Generate a UUID-like event ID for Pixel / CAPI deduplication */
function generateEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export interface CapiIdentity {
  /** SHA-256 hashed email (lowercase, no salt) */
  hashedEmail?: string;
  /** SHA-256 hashed first name (lowercase, no salt) */
  hashedFirstName?: string;
  /** SHA-256 hashed last name (lowercase, no salt) */
  hashedLastName?: string;
}

/**
 * SHA-256 hash a string value for Meta match quality.
 * Lowercases and trims the input before hashing, per Meta spec.
 */
export async function sha256(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();
  const encoded = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Forward an event to the server-side CAPI endpoint via tRPC.
 * Uses a plain fetch so this helper stays free of React hook constraints.
 * Errors are silently swallowed — CAPI forwarding is best-effort.
 */
function forwardToCapi(
  eventName: string,
  eventId: string,
  params?: Record<string, unknown>,
  identity?: CapiIdentity
): void {
  if (typeof window === "undefined") return;

  const input = {
    eventName,
    eventId,
    sourceUrl: window.location.href,
    ...(identity?.hashedEmail    ? { hashedEmail: identity.hashedEmail }       : {}),
    ...(identity?.hashedFirstName ? { hashedFirstName: identity.hashedFirstName } : {}),
    ...(identity?.hashedLastName  ? { hashedLastName: identity.hashedLastName }   : {}),
    ...(params ? { customData: params } : {}),
  };

  // tRPC batch mutation endpoint — superjson-encoded
  fetch("/api/trpc/capi.track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ json: input }),
  }).catch(() => {
    // Silently swallow — never break the UX for a tracking failure
  });
}

/**
 * Fire a standard Meta Pixel event AND forward it server-side via CAPI.
 * Supported event names: 'Lead', 'Contact', 'PageView', etc.
 *
 * @param identity  Optional hashed identity fields (email, first name, last name)
 *                  for improved match quality on Lead events.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
  identity?: CapiIdentity
) {
  const eventId = generateEventId();

  // 1. Browser-side Pixel with shared event_id for deduplication
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("track", eventName, params, { eventID: eventId });
    } else {
      window.fbq("track", eventName, {}, { eventID: eventId });
    }
  }

  // 2. Server-side CAPI (fire-and-forget)
  forwardToCapi(eventName, eventId, params, identity);
}

/** Fire a custom Meta Pixel event (browser-only; custom events are not forwarded via CAPI) */
export function trackCustomEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("trackCustom", eventName, params);
    } else {
      window.fbq("trackCustom", eventName);
    }
  }
}
