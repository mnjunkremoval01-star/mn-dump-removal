import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/config/content";

export function ProcessSteps() {
  return (
    <section className="bg-brand-cream py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Four steps to a clear space"
          align="center"
        />

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title} className="relative rounded-lg bg-white p-6 shadow-sm">
              <span className="text-4xl font-extrabold text-brand-orange/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-semibold text-brand-black">{step.title}</p>
              <p className="mt-2 text-sm text-brand-charcoal-light">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
