import { Container } from "@/components/ui/Container";

const trustPoints = [
  { label: "Locally Based in Burnsville, MN" },
  { label: "Residential & Commercial" },
  { label: "Mobile Service — We Come to You" },
  { label: "Straightforward, No-Surprise Quotes" },
];

function CheckBadge() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 flex-shrink-0 fill-brand-orange">
      <path d="M8.5 13.5 5 10l-1.4 1.4L8.5 16.3 17 7.8 15.6 6.4z" />
    </svg>
  );
}

export function TrustBar() {
  return (
    <div className="py-6 sm:py-8">
      <Container>
        <div className="glass-panel flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl px-6 py-4 sm:justify-between">
          {trustPoints.map((point) => (
            <div key={point.label} className="flex items-center gap-2 text-sm font-medium text-white/85">
              <CheckBadge />
              {point.label}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
