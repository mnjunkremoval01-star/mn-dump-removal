import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/config/content";

export function WhyChooseUs() {
  return (
    <section className="bg-brand-black py-16 text-white sm:py-24">
      <Container>
        <SectionHeading eyebrow="Why AA Dump Removal" title="Built for a straightforward hauling experience" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="rounded-lg border border-white/10 p-6">
              <p className="font-semibold text-brand-orange">{item.title}</p>
              <p className="mt-2 text-sm text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
