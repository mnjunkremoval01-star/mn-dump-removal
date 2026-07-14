import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceAreas } from "@/config/service-areas";

export function ServiceAreasPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Where we work"
          title="Serving Burnsville and surrounding communities"
          description="Our initial service area covers the communities below. Don't see your city? Reach out and ask — coverage is expanding."
        />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {serviceAreas.map((area) => (
            <li
              key={area.city}
              className="rounded-md border border-black/10 px-4 py-3 text-center text-sm font-semibold text-brand-charcoal"
            >
              {area.city}, {area.state}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link href="/service-areas" className="text-sm font-semibold text-brand-orange hover:underline">
            View full service area details →
          </Link>
        </div>
      </Container>
    </section>
  );
}
