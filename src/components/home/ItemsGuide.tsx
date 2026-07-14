import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { itemsAccepted, itemsNotAccepted, itemsNotAcceptedNote } from "@/config/content";

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 flex-shrink-0 fill-emerald-600">
      <path d="M8.5 13.5 5 10l-1.4 1.4L8.5 16.3 17 7.8 15.6 6.4z" />
    </svg>
  );
}

function CautionIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 flex-shrink-0 fill-brand-orange">
      <path d="M10 2 1 18h18L10 2zm0 5.5a1 1 0 0 1 1 1v3.5a1 1 0 1 1-2 0V8.5a1 1 0 0 1 1-1zM10 15a1.15 1.15 0 1 1 0-2.3A1.15 1.15 0 0 1 10 15z" />
    </svg>
  );
}

export function ItemsGuide() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="What we take" title="Items we accept — and what needs a heads-up" />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-black/10 p-6">
            <h3 className="text-lg font-bold text-brand-black">Items we accept</h3>
            <ul className="mt-4 space-y-3">
              {itemsAccepted.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-charcoal-light">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-brand-orange/30 bg-brand-orange/5 p-6">
            <h3 className="text-lg font-bold text-brand-black">Confirm before scheduling</h3>
            <p className="mt-2 text-sm text-brand-charcoal-light">{itemsNotAcceptedNote}</p>
            <ul className="mt-4 space-y-3">
              {itemsNotAccepted.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-charcoal-light">
                  <CautionIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
