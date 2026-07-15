import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { serviceAreas } from "@/config/service-areas";
import { business } from "@/config/business";

const title = "Service Areas";
const description =
  "MN Junk Removal serves Burnsville, Apple Valley, Eagan, Lakeville, Savage, Prior Lake, Bloomington, Rosemount, and surrounding Minnesota communities.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/service-areas" },
  openGraph: { title, description, url: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title={`Proudly serving ${business.baseLocation} and nearby communities`}
        description={`${business.serviceAreaSummary}. Our initial service area is listed below and is expanding — if your city isn't listed, reach out and ask.`}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((area) => (
              <li
                key={area.city}
                className="glass-panel rounded-2xl px-5 py-6 text-center font-semibold text-white/85"
              >
                {area.city}, {area.state}
              </li>
            ))}
          </ul>

          <div className="glass-panel mt-16 flex flex-col items-center gap-4 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white">Not sure if we cover your area?</h2>
            <p className="max-w-xl text-sm text-white/65">
              Request a quote with your city or ZIP code and we&apos;ll let you know if we can
              schedule a pickup.
            </p>
            <Button href="/quote">Request a Quote</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
