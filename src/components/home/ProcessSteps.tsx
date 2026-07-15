import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/config/content";

export function ProcessSteps() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Four steps to a clear space"
          align="center"
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title} className="glass-panel relative rounded-2xl p-6">
              <span className="text-4xl font-extrabold text-brand-orange/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-semibold text-white">{step.title}</p>
              <p className="mt-2 text-sm text-white/60">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
