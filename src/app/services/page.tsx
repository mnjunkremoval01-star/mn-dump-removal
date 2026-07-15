import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { services } from "@/config/services";
import { business } from "@/config/business";

const title = "Junk Removal Services";
const description =
  "Residential and commercial junk removal services from MN Junk Removal, including furniture, appliance, and construction debris hauling in Burnsville, MN.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={`Junk removal services for ${business.baseLocation}`}
        description="We handle residential and commercial hauling jobs of every size. Browse the services below, then request a quote with the details of your job."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.slug}
                id={service.slug}
                className="glass-panel scroll-mt-24 rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold text-white">{service.name}</h2>
                <p className="mt-2 text-sm text-white/60">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="glass-panel mt-16 flex flex-col items-center gap-4 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white">Don&apos;t see your exact job listed?</h2>
            <p className="max-w-xl text-sm text-white/65">
              Tell us what you need hauled and we&apos;ll let you know if we can help.
            </p>
            <Button href="/quote">Request a Quote</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
