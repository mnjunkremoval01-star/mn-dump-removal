"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { CallButton } from "@/components/ui/CallButton";
import { business } from "@/config/business";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <Container className="px-0">
        <div className="glass-panel flex h-16 items-center justify-between rounded-2xl px-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:h-[4.5rem] sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white sm:text-xl">
            <Image
              src="/brand/mn-junk-removal-mark.svg"
              alt="MN Junk Removal"
              width={40}
              height={40}
              className="h-9 w-9 rounded-lg sm:h-10 sm:w-10"
              priority
            />
            <span>MN Junk Removal</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/75 transition-colors hover:text-brand-orange"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <CallButton className="rounded-full px-4 py-2.5 text-sm" source="header" />
            <Link
              href="/quote"
              onClick={() => trackEvent("quote_cta_click", { source: "header" })}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-cream"
            >
              Request a Quote
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-2">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="glass-panel mt-2 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] lg:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-white/85 hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              {business.phoneHref && (
                <a
                  href={`tel:${business.phoneHref}`}
                  onClick={() => {
                    trackEvent("phone_click", { source: "header_mobile_menu" });
                    setMenuOpen(false);
                  }}
                  className="mt-2 rounded-xl bg-brand-orange px-3 py-3 text-center text-base font-semibold text-white"
                >
                  Call for an Estimate
                </a>
              )}
              <Link
                href="/quote"
                onClick={() => {
                  trackEvent("quote_cta_click", { source: "header_mobile_menu" });
                  setMenuOpen(false);
                }}
                className="rounded-xl border border-white/20 px-3 py-3 text-center text-base font-semibold text-white"
              >
                Request a Quote
              </Link>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
