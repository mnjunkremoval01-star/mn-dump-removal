"use client";

import { business, hasPhone } from "@/config/business";
import { trackEvent } from "@/lib/analytics";

/** Renders nothing until a real phone number is configured via NEXT_PUBLIC_BUSINESS_PHONE. */
export function CallButton({
  className = "",
  label = "Call for an Estimate",
  source = "unknown",
}: {
  className?: string;
  label?: string;
  source?: string;
}) {
  if (!hasPhone) return null;

  return (
    <a
      href={`tel:${business.phoneHref}`}
      aria-label={`${label}: ${business.phoneDisplay}`}
      onClick={() => trackEvent("phone_click", { source })}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-base font-semibold tracking-wide text-white shadow-[0_6px_20px_rgba(255,106,19,0.35)] transition-colors duration-150 hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z" />
      </svg>
      {label}
    </a>
  );
}
