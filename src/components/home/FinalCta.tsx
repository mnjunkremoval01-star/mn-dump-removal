import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/ui/CallButton";

export function FinalCta() {
  return (
    <section className="bg-brand-orange py-16 text-white sm:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Ready to clear the space?
        </h2>
        <p className="max-w-xl text-white/90">
          Tell us what needs to go and where. We&apos;ll follow up to confirm the
          details and get it hauled away.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/quote" variant="secondary" className="bg-brand-black text-lg hover:bg-brand-charcoal">
            Get a Free Quote
          </Button>
          <CallButton className="border-2 border-white bg-transparent text-lg hover:bg-white hover:text-brand-orange" />
        </div>
      </Container>
    </section>
  );
}
