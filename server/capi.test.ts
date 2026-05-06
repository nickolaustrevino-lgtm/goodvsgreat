/**
 * CAPI helper tests
 *
 * Tests validate:
 *  1. sendCapiEvent returns success:false when the env var is missing
 *  2. sendCapiEvent returns success:false when the token is invalid (real API call)
 *  3. The access token in META_CAPI_ACCESS_TOKEN is accepted by the Meta Graph API
 *     (validates the secret is correctly configured)
 */

import { describe, it, expect, vi, afterEach } from "vitest";
import { sendCapiEvent } from "./capi";

describe("sendCapiEvent", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns success:false when META_CAPI_ACCESS_TOKEN is not set", async () => {
    const original = process.env.META_CAPI_ACCESS_TOKEN;
    delete process.env.META_CAPI_ACCESS_TOKEN;

    const result = await sendCapiEvent({ eventName: "PageView" });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/not configured/i);

    process.env.META_CAPI_ACCESS_TOKEN = original;
  });

  it("returns success:false for an obviously invalid token", async () => {
    const original = process.env.META_CAPI_ACCESS_TOKEN;
    process.env.META_CAPI_ACCESS_TOKEN = "INVALID_TOKEN_FOR_TEST";

    const result = await sendCapiEvent({
      eventName: "PageView",
      sourceUrl: "https://goodvsgreat.ai/",
    });

    // Meta returns an error for invalid tokens
    expect(result.success).toBe(false);

    process.env.META_CAPI_ACCESS_TOKEN = original;
  });

  it("accepts the configured META_CAPI_ACCESS_TOKEN (validates secret is correct)", async () => {
    // This test makes a real call to the Meta Graph API using the configured token.
    // If the token is invalid, the test will fail and prompt re-entry of the secret.
    if (!process.env.META_CAPI_ACCESS_TOKEN) {
      console.warn("META_CAPI_ACCESS_TOKEN not set — skipping live token validation");
      return;
    }

    const result = await sendCapiEvent({
      eventName: "PageView",
      sourceUrl: "https://goodvsgreat.ai/",
      eventId: `test-${Date.now()}`,
    });

    // Meta accepts the event (events_received >= 1) or returns a non-auth error
    // A 400 with "Invalid OAuth access token" means the token is wrong
    if (!result.success && result.error) {
      expect(result.error).not.toMatch(/invalid oauth access token/i);
      expect(result.error).not.toMatch(/access token/i);
    } else {
      expect(result.success).toBe(true);
      expect(result.eventsReceived).toBeGreaterThanOrEqual(1);
    }
  });
});
