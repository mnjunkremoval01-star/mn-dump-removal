import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";

export function FinalCta() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-charcoal px-6 py-16 text-center text-white sm:px-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(80%_100%_at_50%_100%,rgba(255,106,19,0.4),transparent_65%)]"
          />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to clear the space?
            </h2>
            <p className="max-w-xl text-white/75">
              Tell us what needs to go and where. We&apos;ll follow up to confirm the
              details and get it hauled away.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/quote" variant="secondary" className="text-lg">
                Get a Free Quote
              </Button>
              <CallButton className="text-lg" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
