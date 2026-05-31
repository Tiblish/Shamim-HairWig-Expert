/**
 * Analytics Tracking Utility
 * Emits events to Google Analytics (gtag) or PostHog if initialized on the client side.
 * Logs events to console in development.
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  const isDev = process.env.NODE_ENV === "development";
  const deviceType = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";

  const enrichedProperties = {
    ...properties,
    deviceType,
    timestamp: new Date().toISOString(),
  };

  if (isDev) {
    console.log(`%c[Analytics Event: ${eventName}]`, "color: #d4af37; font-weight: bold;", enrichedProperties);
  }

  try {
    if (typeof window !== "undefined") {
      // 1. Google Analytics integration (if gtag exists)
      if ((window as any).gtag) {
        (window as any).gtag("event", eventName, enrichedProperties);
      }
      
      // 2. PostHog integration (if posthog exists)
      if ((window as any).posthog) {
        (window as any).posthog.capture(eventName, enrichedProperties);
      }
    }
  } catch (error) {
    console.error("Failed to dispatch analytics event:", error);
  }
}
