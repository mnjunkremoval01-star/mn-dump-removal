export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * No-ops until NEXT_PUBLIC_GA_MEASUREMENT_ID is configured, so no tracking
 * script loads and no events fire in the meantime — same honest-gating
 * pattern as the phone number and lead delivery.
 */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
