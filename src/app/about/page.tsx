import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { whyChooseUs } from "@/config/content";
import { business, hasHours, hasPhone, hasEmail } from "@/config/business";

const title = "About Us";
const description =
  "AA Dump Removal is a mobile junk removal and dump hauling service based in Burnsville, Minnesota, built around a straightforward quote-to-pickup process.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-black py-16 text-white sm:py-20">
        <Container>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">About Us</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Local, mobile junk removal built for {business.baseLocation}
          </h1>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-brand-black">What we do</h2>
          <p className="mt-4 text-base text-brand-charcoal-light">
            {business.name} is a mobile junk removal and dump hauling service serving{" "}
            {business.baseLocation} and the surrounding communities. We help homeowners,
            landlords, and businesses clear out furniture, appliances, yard debris,
            construction debris, and general clutter — without the hassle of renting a
            trailer or making a dump run yourself.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-brand-black">How we work</h2>
          <p className="mt-4 text-base text-brand-charcoal-light">
            Every job starts with a quote request. We follow up to confirm the scope of
            the job, the pickup location, and a date that works for your schedule. On
            pickup day, our crew handles the loading, hauling, and disposal so the space
            is simply clear when we&apos;re done.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="rounded-lg border border-black/10 p-6">
                <p className="font-semibold text-brand-black">{item.title}</p>
                <p className="mt-2 text-sm text-brand-charcoal-light">{item.description}</p>
              </div>
            ))}
          </div>

          {(hasHours || hasPhone || hasEmail) && (
            <div className="mt-12 rounded-lg bg-brand-cream p-6">
              <h2 className="text-lg font-bold text-brand-black">Contact &amp; hours</h2>
              <ul className="mt-3 space-y-1 text-sm text-brand-charcoal-light">
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
            <Button href="/quote">Get a Free Quote</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
