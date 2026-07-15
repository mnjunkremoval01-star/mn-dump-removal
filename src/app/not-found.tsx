import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-16 sm:py-24">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">404</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 text-lg text-white/65">
          The page you&apos;re looking for may have moved or no longer exists. Head back
          home, or request a quote from {business.name}.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/quote" variant="outline">
            Request a Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
