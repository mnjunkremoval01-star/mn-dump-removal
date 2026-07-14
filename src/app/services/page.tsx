import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { services } from "@/config/services";
import { business } from "@/config/business";

const title = "Junk Removal Services";
const description =
  "Residential and commercial junk removal services from AA Dump Removal, including furniture, appliance, and construction debris hauling in Burnsville, MN.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-brand-black py-16 text-white sm:py-20">
        <Container>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">Services</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Junk removal services for {business.baseLocation}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            We handle residential and commercial hauling jobs of every size. Browse the
            services below, then request a quote with the details of your job.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 rounded-lg border border-black/10 p-6"
              >
                <h2 className="text-xl font-bold text-brand-black">{service.name}</h2>
                <p className="mt-2 text-sm text-brand-charcoal-light">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-brand-charcoal-light">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 rounded-lg bg-brand-cream p-10 text-center">
            <h2 className="text-2xl font-bold text-brand-black">Don&apos;t see your exact job listed?</h2>
            <p className="max-w-xl text-sm text-brand-charcoal-light">
              Tell us what you need hauled and we&apos;ll let you know if we can help.
            </p>
            <Button href="/quote">Get a Free Quote</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
