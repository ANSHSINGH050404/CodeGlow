"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Whether analytics may initialize in this browser context.
 * Skips localhost dev so test traffic never pollutes production data
 * (per PostHog docs). Override locally with
 * NEXT_PUBLIC_POSTHOG_FORCE_DEV=true when verifying events end to end.
 */
function isAnalyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return false;
  if (process.env.NEXT_PUBLIC_POSTHOG_FORCE_DEV === "true") return true;
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1" && host !== "[::1]";
}

function PageViewTracker() {
  const pathname = usePathname();
  const client = usePostHog();
  // The initial $pageview is captured in init's `loaded` callback below.
  // This tracker only handles subsequent in-app route changes.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (posthog.__loaded) {
      client?.capture("$pageview");
    }
  }, [pathname, client]);

  return null;
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    if (posthog.__loaded) return;
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      // Pinned config snapshot (see PostHog JS docs for the current date).
      defaults: "2026-05-30",
      // $pageview is tracked manually (see below + PageViewTracker)
      capture_pageview: false,
      // Keep the snippet light; session replay stays off unless enabled later
      disable_session_recording: true,
      // Capture the initial pageview here: child effects run before this
      // parent effect, so capturing anywhere earlier would fire before
      // init completes and the event would be dropped.
      loaded: (ph) => {
        ph.capture("$pageview");
      },
    });
  }, []);

  // Not enabled here (no key, or local dev): render untouched.
  if (!isAnalyticsEnabled()) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
