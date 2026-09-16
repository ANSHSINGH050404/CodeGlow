import posthog from "posthog-js";

/**
 * Safe analytics helper. No-ops when PostHog isn't configured
 * (no NEXT_PUBLIC_POSTHOG_KEY) or hasn't finished loading, so every
 * call site can fire events unconditionally.
 */
export function trackEvent(
  event: string,
  properties?: Record<string, unknown>
): void {
  try {
    if (
      typeof window === "undefined" ||
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !posthog.__loaded
    ) {
      return;
    }
    posthog.capture(event, properties);
  } catch {
    // Analytics must never break the app.
  }
}
