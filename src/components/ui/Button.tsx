"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-orange text-white shadow-[0_6px_20px_rgba(255,106,19,0.35)] hover:bg-brand-orange-dark focus-visible:bg-brand-orange-dark",
  secondary: "bg-white text-brand-black hover:bg-brand-cream focus-visible:bg-brand-cream",
  outline: "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold tracking-wide transition-colors duration-150 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:opacity-50 disabled:cursor-not-allowed";

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  type,
  onClick,
  disabled,
  analyticsEvent,
  analyticsSource,
}: {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  /** Fired via trackEvent(analyticsEvent, { source: analyticsSource }) on click. No-ops until GA4 is configured. */
  analyticsEvent?: string;
  analyticsSource?: string;
}) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  function handleClick() {
    if (analyticsEvent) trackEvent(analyticsEvent, { source: analyticsSource ?? "unknown" });
    onClick?.();
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
}
