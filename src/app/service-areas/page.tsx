import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { serviceAreas } from "@/config/service-areas";
import { business } from "@/config/business";

const title = "Service Areas";
const description =
  "AA Dump Removal serves Burnsville, Apple Valley, Eagan, Lakeville, Savage, Prior Lake, Bloomington, Rosemount, and surrounding Minnesota communities.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/service-areas" },
  openGraph: { title, description, url: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="bg-brand-black py-16 text-white sm:py-20">
        <Container>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">Service Areas</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Proudly serving {business.baseLocation} and nearby communities
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {business.serviceAreaSummary}. Our initial service area is listed below and is
            expanding — if your city isn&apos;t listed, reach out and ask.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((area) => (
              <li
                key={area.city}
                className="rounded-lg border border-black/10 px-5 py-6 text-center font-semibold text-brand-black"
              >
                {area.city}, {area.state}
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col items-center gap-4 rounded-lg bg-brand-cream p-10 text-center">
            <h2 className="text-2xl font-bold text-brand-black">Not sure if we cover your area?</h2>
            <p className="max-w-xl text-sm text-brand-charcoal-light">
              Request a quote with your city or ZIP code and we&apos;ll let you know if we can
              schedule a pickup.
            </p>
            <Button href="/quote">Get a Free Quote</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
