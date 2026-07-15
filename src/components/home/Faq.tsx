"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/config/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" align="center" />

        <div className="glass-panel mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-white"
                  >
                    {item.question}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className={`h-5 w-5 flex-shrink-0 fill-brand-orange transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </h3>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-5 text-sm text-white/65">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
