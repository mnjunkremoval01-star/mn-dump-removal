import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { business, hasPhone, hasEmail, hasHours, hoursSummary } from "@/config/business";
import { serviceAreaCityNames } from "@/config/service-areas";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 px-3 pb-3 text-brand-cream sm:px-4 sm:pb-4">
      <div className="glass-panel rounded-3xl">
        <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-white">{business.name}</p>
            <p className="mt-1 text-sm italic text-brand-orange">{business.slogan}</p>
            <p className="mt-3 text-sm text-brand-cream/80">{business.tagline}</p>
            <p className="mt-4 text-sm text-brand-cream/80">{business.serviceAreaSummary}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/service-areas" className="hover:text-white">Service Areas</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/quote" className="hover:text-white">Request a Quote</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-brand-cream/80">
              {hasPhone && (
                <li>
                  <a href={`tel:${business.phoneHref}`} className="hover:text-white">
                    {business.phoneDisplay}
                  </a>
                </li>
              )}
              {hasEmail && business.email && (
                <li>
                  <a href={`mailto:${business.email}`} className="hover:text-white">
                    {business.email}
                  </a>
                </li>
              )}
              {!hasPhone && !hasEmail && (
                <li>Request a quote online and we&apos;ll follow up with you.</li>
              )}
              <li>{business.baseLocation}</li>
              {hasHours && (
                <li>{hoursSummary ?? business.hours!.map((h) => `${h.day} ${h.hours}`).join(", ")}</li>
              )}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">Service Areas</p>
            <p className="mt-3 text-sm text-brand-cream/80">{serviceAreaCityNames.join(", ")}</p>
          </div>
        </Container>

        <div className="border-t border-white/10">
          <Container className="flex flex-col gap-2 py-6 text-xs text-brand-cream/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {business.name}. All rights reserved.</p>
            <p>{business.baseLocation}</p>
          </Container>
        </div>
      </div>
    </footer>
  );
}
