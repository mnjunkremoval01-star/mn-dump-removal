import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { business, hasEmail } from "@/config/business";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${business.name} website and quote requests.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

const effectiveDate = "July 15, 2026";

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-white/55">Effective {effectiveDate}</p>

        <div className="glass-panel mt-8 space-y-8 rounded-3xl p-6 text-sm leading-relaxed text-white/65 sm:p-8">
          <div>
            <h2 className="text-lg font-bold text-white">Informational use</h2>
            <p className="mt-2">
              This website is provided to share information about {business.name} and to
              let you request a junk removal quote. Content on this site is for general
              informational purposes and does not guarantee availability, pricing, or
              scheduling.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Quote requests are not binding</h2>
            <p className="mt-2">
              Submitting the quote request form is a request for an estimate, not a
              binding contract or a confirmed booking. A job is only scheduled once we
              have followed up with you and both parties have agreed on the details.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">How final pricing works</h2>
            <p className="mt-2">
              Any estimate provided is preliminary. Final pricing may depend on factors
              such as the volume and type of material, labor required, site access,
              weight, applicable disposal fees, and whether any items require special
              handling or turn out to be prohibited materials. We&apos;ll confirm final
              pricing with you before completing the work.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Scheduling</h2>
            <p className="mt-2">
              A preferred date submitted with a quote request is a scheduling
              preference, not a confirmed appointment. Scheduling is only confirmed once
              we&apos;ve accepted the job and communicated a confirmed date and window
              with you directly.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Disclosing hazardous or regulated materials</h2>
            <p className="mt-2">
              You&apos;re responsible for disclosing any hazardous, regulated, or
              questionable materials — such as chemicals, asbestos, biohazardous or
              medical waste, explosives, fuel, pressurized containers, or wet paint —
              when requesting a quote. We may decline or need to reschedule a job if
              undisclosed materials of this kind are found on site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Photos</h2>
            <p className="mt-2">
              If you choose to share photos of items or the job site with us — whether
              through the quote form, email, phone, or text — you authorize us to use
              those photos solely to prepare your estimate and coordinate the job.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Communication consent</h2>
            <p className="mt-2">
              By submitting the quote form with a phone number and/or email address, you
              consent to being contacted by {business.name} at that phone number or
              email regarding your request. You can ask us to stop contacting you at any
              time.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Limitation of liability</h2>
            <p className="mt-2">
              To the fullest extent permitted by law, {business.name} is not liable for
              indirect, incidental, or consequential damages arising from your use of
              this website or from information provided through it. This website does
              not replace a written service agreement for the actual removal work
              performed.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Governing law</h2>
            <p className="mt-2">
              These terms are governed by the laws of the State of Minnesota, without
              regard to its conflict-of-law principles.
            </p>
          </div>

          {hasEmail && business.email && (
            <div>
              <h2 className="text-lg font-bold text-white">Contact us</h2>
              <p className="mt-2">
                Questions about these terms can be sent to{" "}
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
