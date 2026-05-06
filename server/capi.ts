/**
 * Meta Conversions API (CAPI) — server-side event forwarding
 *
 * Sends events to the Meta Graph API v20.0 endpoint so conversions are
 * captured even when the browser-side Pixel is blocked by ad blockers,
 * iOS ITP, or privacy browsers.
 *
 * Pixel ID : 1170717808472225
 * Docs     : https://developers.facebook.com/docs/marketing-api/conversions-api
 */

const PIXEL_ID = "1170717808472225";
const CAPI_URL = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events`;

export interface CapiEventData {
  /** Standard event name: "PageView" | "Lead" | "Contact" | "Purchase" | … */
  eventName: string;
  /** Unix timestamp (seconds). Defaults to now. */
  eventTime?: number;
  /** Browser-generated event ID for deduplication against the Pixel */
  eventId?: string;
  /** Source URL where the event occurred */
  sourceUrl?: string;
  /** Client IP address (for match quality) */
  clientIp?: string;
  /** User-Agent string (for match quality) */
  userAgent?: string;
  /** Hashed email (SHA-256 lowercase, no salt) — optional */
  hashedEmail?: string;
  /** Arbitrary custom data payload */
  customData?: Record<string, unknown>;
}

export interface CapiResult {
  success: boolean;
  eventsReceived?: number;
  error?: string;
}

/**
 * Send one event to the Meta CAPI.
 * Always fire-and-forget from tRPC procedures — never await in the critical path.
 */
export async function sendCapiEvent(data: CapiEventData): Promise<CapiResult> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn("[CAPI] META_CAPI_ACCESS_TOKEN not set — skipping event");
    return { success: false, error: "Access token not configured" };
  }

  const eventTime = data.eventTime ?? Math.floor(Date.now() / 1000);

  // Build user data object — only include fields that are present
  const userData: Record<string, string> = {};
  if (data.clientIp)    userData["client_ip_address"] = data.clientIp;
  if (data.userAgent)   userData["client_user_agent"] = data.userAgent;
  if (data.hashedEmail) userData["em"] = data.hashedEmail;

  const payload = {
    data: [
      {
        event_name: data.eventName,
        event_time: eventTime,
        ...(data.eventId   ? { event_id: data.eventId }     : {}),
        ...(data.sourceUrl ? { event_source_url: data.sourceUrl } : {}),
        action_source: "website",
        user_data: userData,
        ...(data.customData ? { custom_data: data.customData } : {}),
      },
    ],
    test_event_code: "TEST96121",  // ⚠️ REMOVE after verification
  };

  try {
    const res = await fetch(`${CAPI_URL}?access_token=${encodeURIComponent(accessToken)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = (await res.json()) as { events_received?: number; error?: { message: string } };

    if (!res.ok || json.error) {
      const msg = json.error?.message ?? `HTTP ${res.status}`;
      console.error("[CAPI] Error sending event:", msg);
      return { success: false, error: msg };
    }

    return { success: true, eventsReceived: json.events_received };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[CAPI] Network error:", msg);
    return { success: false, error: msg };
  }
}
