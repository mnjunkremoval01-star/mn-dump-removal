import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CallButton } from "@/components/ui/CallButton";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { business } from "@/config/business";
import { defaultOgImage } from "@/lib/og-image";

const title = "Request a Quote";
const description =
  "Request a junk removal quote from MN Junk Removal. Tell us what needs to go and we'll follow up to confirm scheduling.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/quote" },
  openGraph: { title, description, url: "/quote", images: [defaultOgImage] },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Tell us what needs to go"
        description={`Fill out the form below with as much detail as you can. We'll follow up to confirm scheduling for ${business.baseLocation} and the surrounding area.`}
      >
        <div className="mt-6">
          <CallButton source="quote_page" />
        </div>
      </PageHero>

      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <QuoteForm />
        </Container>
      </section>
    </>
  );
}
