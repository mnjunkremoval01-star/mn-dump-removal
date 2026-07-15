import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { whyChooseUs } from "@/config/content";
import { business, hasHours, hasPhone, hasEmail } from "@/config/business";

const title = "About Us";
const description =
  "MN Junk Removal is a mobile junk removal and dump hauling service based in Burnsville, Minnesota, built around a straightforward quote-to-pickup process.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={`Local, mobile junk removal built for ${business.baseLocation}`}
      />

      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-white">What we do</h2>
          <p className="mt-4 text-base text-white/65">
            {business.name} is a mobile junk removal and dump hauling service serving{" "}
            {business.baseLocation} and the surrounding communities. We help homeowners,
            landlords, and businesses clear out furniture, appliances, yard debris,
            construction debris, and general clutter — without the hassle of renting a
            trailer or making a dump run yourself.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-white">How we work</h2>
          <p className="mt-4 text-base text-white/65">
            Every job starts with a quote request. We follow up to confirm the scope of
            the job, the pickup location, and a date that works for your schedule. On
            pickup day, our crew handles the loading, hauling, and disposal so the space
            is simply clear when we&apos;re done.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="glass-panel rounded-2xl p-6">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-white/65">{item.description}</p>
              </div>
            ))}
          </div>

          {(hasHours || hasPhone || hasEmail) && (
            <div className="glass-panel mt-12 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white">Contact &amp; hours</h2>
              <ul className="mt-3 space-y-1 text-sm text-white/65">
                {hasPhone && (
                  <li>
                    Phone:{" "}
                    <a href={`tel:${business.phoneHref}`} className="font-semibold text-brand-orange hover:underline">
                      {business.phoneDisplay}
                    </a>
                  </li>
                )}
                {hasEmail && business.email && (
                  <li>
                    Email:{" "}
                    <a href={`mailto:${business.email}`} className="font-semibold text-brand-orange hover:underline">
                      {business.email}
                    </a>
                  </li>
                )}
                {hasHours && (
                  <li>
                    Hours: {business.hours!.every((h) => h.hours === business.hours![0].hours)
                      ? `Every day, ${business.hours![0].hours}`
                      : business.hours!.map((h) => `${h.day} ${h.hours}`).join(", ")}
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="mt-12">
            <Button href="/quote" analyticsEvent="quote_cta_click" analyticsSource="about_page">Request a Quote</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
