import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="pb-8 pt-10 text-white sm:pb-12 sm:pt-14">
      <Container>
        <p className="text-sm font-bold uppercase tracking-widest text-brand-orange">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-white/70">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
