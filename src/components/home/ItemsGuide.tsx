import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { itemsAccepted, itemsNotAccepted, itemsNotAcceptedNote } from "@/config/content";

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 flex-shrink-0 fill-emerald-400">
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

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white">Items we accept</h3>
            <ul className="mt-4 space-y-3">
              {itemsAccepted.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/65">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-2xl border-brand-orange/25 bg-brand-orange/[0.06] p-6">
            <h3 className="text-lg font-bold text-white">Confirm before scheduling</h3>
            <p className="mt-2 text-sm text-white/65">{itemsNotAcceptedNote}</p>
            <ul className="mt-4 space-y-3">
              {itemsNotAccepted.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/65">
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
