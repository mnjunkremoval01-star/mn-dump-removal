import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CallButton } from "@/components/ui/CallButton";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { business } from "@/config/business";

const title = "Request a Free Quote";
const description =
  "Request a free junk removal quote from AA Dump Removal. Tell us what needs to go and we'll follow up to confirm scheduling.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/quote" },
  openGraph: { title, description, url: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <section className="bg-brand-black py-16 text-white sm:py-20">
        <Container>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">Request a Quote</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tell us what needs to go
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Fill out the form below with as much detail as you can. We&apos;ll follow up
            to confirm scheduling for {business.baseLocation} and the surrounding area.
          </p>
          <div className="mt-6">
            <CallButton />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}
