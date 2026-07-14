"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { CallButton } from "@/components/ui/CallButton";
import { business } from "@/config/business";

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
    <header className="sticky top-0 z-50 border-b border-brand-charcoal/10 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-brand-black sm:text-xl">
          <span className="rounded bg-brand-black px-2 py-1 text-brand-orange">AA</span>
          <span>Dump Removal</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-brand-charcoal hover:text-brand-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CallButton className="px-4 py-2 text-sm" />
          <Link
            href="/quote"
            className="inline-flex items-center justify-center rounded-md bg-brand-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-charcoal"
          >
            Get a Free Quote
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-black lg:hidden"
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
      </Container>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-brand-charcoal/10 bg-white lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-3 text-base font-semibold text-brand-charcoal hover:bg-brand-cream"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-md bg-brand-orange px-3 py-3 text-center text-base font-semibold text-white"
            >
              Get a Free Quote
            </Link>
            {business.phoneHref && (
              <a
                href={`tel:${business.phoneHref}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-md border-2 border-brand-black px-3 py-3 text-center text-base font-semibold text-brand-black"
              >
                Call {business.phoneDisplay}
              </a>
            )}
          </Container>
        </nav>
      )}
    </header>
  );
}
