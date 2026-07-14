import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { business, hasEmail } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${business.name} collects and uses information submitted through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const effectiveDate = "July 12, 2026";

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-brand-charcoal-light">Effective {effectiveDate}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-brand-charcoal-light">
          <div>
            <h2 className="text-lg font-bold text-brand-black">Information we collect</h2>
            <p className="mt-2">
              When you submit the quote request form on this website, we collect the
              information you provide, which may include your name, phone number, email
              address, pickup city and ZIP code, service type, and details about the
              items or material you&apos;d like removed.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-black">How we use it</h2>
            <p className="mt-2">
              We use the information you submit only to respond to your quote request,
              schedule service, and communicate with you about your job. We do not sell
              your information.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-black">Anti-spam and rate limiting</h2>
            <p className="mt-2">
              To reduce automated spam submissions, our quote form uses a hidden
              honeypot field and a temporary, in-memory submission rate limit tied to
              your IP address. IP addresses used for rate limiting are not stored
              permanently and are not linked to your quote request.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-black">Data retention</h2>
            <p className="mt-2">
              Submitted quote requests are delivered to our team for the purpose of
              responding to your inquiry. We retain this information only as long as
              needed to handle your request and for basic business record-keeping.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-black">Third-party services</h2>
            <p className="mt-2">
              Quote request submissions may be delivered using a third-party email
              delivery provider. That provider processes the information solely to
              deliver your request to us and does not use it for its own marketing
              purposes.
            </p>
          </div>

          {hasEmail && business.email && (
            <div>
              <h2 className="text-lg font-bold text-brand-black">Contact us</h2>
              <p className="mt-2">
                Questions about this policy or your information can be sent to{" "}
                <a href={`mailto:${business.email}`} className="font-semibold text-brand-orange hover:underline">
                  {business.email}
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
