"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

function PageViewTracker() {
  const pathname = usePathname();
  const client = usePostHog();

  useEffect(() => {
    // Single-page app: $pageview autocapture only fires on full loads,
    // so track route changes explicitly.
    client?.capture("$pageview");
  }, [pathname, client]);

  return null;
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  useEffect(() => {
    if (!key || typeof window === "undefined") return;
    if (posthog.__loaded) return;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      // $pageview is tracked manually in PageViewTracker
      capture_pageview: false,
      // Keep the snippet light; session replay stays off unless enabled later
      disable_session_recording: true,
    });
  }, [key]);

  // No key configured (local dev, self-hosted builds): render untouched.
  if (!key) {
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
