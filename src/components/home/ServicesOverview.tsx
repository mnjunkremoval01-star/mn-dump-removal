import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/config/services";

export function ServicesOverview() {
  const featured = services.slice(0, 8);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we haul"
          title="Junk removal services for homes and businesses"
          description="From a single couch to a full property cleanout, we handle the loading and hauling so you don't have to."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => (
            <Link
              key={service.slug}
              href={`/services#${service.slug}`}
              className="glass-panel group rounded-2xl p-5 transition-colors hover:border-brand-orange/40"
            >
              <p className="font-semibold text-white group-hover:text-brand-orange">
                {service.name}
              </p>
              <p className="mt-2 text-sm text-white/60">{service.shortDescription}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/services" className="text-sm font-semibold text-brand-orange hover:underline">
            View all services →
          </Link>
        </div>
      </Container>
    </section>
  );
}
