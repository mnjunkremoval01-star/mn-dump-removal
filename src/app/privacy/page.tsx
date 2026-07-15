import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { business, hasEmail } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${business.name} collects and uses information submitted through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const effectiveDate = "July 15, 2026";

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-white/55">Effective {effectiveDate}</p>

        <div className="glass-panel mt-8 space-y-8 rounded-3xl p-6 text-sm leading-relaxed text-white/65 sm:p-8">
          <div>
            <h2 className="text-lg font-bold text-white">Information we collect</h2>
            <p className="mt-2">
              When you submit the quote request form on this website, we collect the
              information you provide, which may include your name, phone number, email
              address, pickup city and ZIP code, service type, and details about the
              items or material you&apos;d like removed.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">How we use it</h2>
            <p className="mt-2">
              We use the information you submit only to respond to your quote request,
              schedule service, and communicate with you about your job. We do not sell
              your information.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Anti-spam and rate limiting</h2>
            <p className="mt-2">
              To reduce automated spam submissions, our quote form uses a hidden
              honeypot field and a temporary, in-memory submission rate limit tied to
              your IP address. IP addresses used for rate limiting are not stored
              permanently and are not linked to your quote request.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Data retention</h2>
            <p className="mt-2">
              Submitted quote requests are stored in a secured database and delivered to
              our team for the purpose of responding to your inquiry. We retain this
              information only as long as needed to handle your request and for basic
              business record-keeping.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Third-party services</h2>
            <p className="mt-2">
              Quote request submissions are stored using a third-party database
              provider and may be delivered using a third-party email delivery
              provider. Those providers process the information solely to store or
              deliver your request on our behalf and do not use it for their own
              marketing purposes.
            </p>
          </div>

          {hasEmail && business.email && (
            <div>
              <h2 className="text-lg font-bold text-white">Contact us</h2>
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
