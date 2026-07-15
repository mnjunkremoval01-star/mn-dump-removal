import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VisualPanel } from "@/components/ui/VisualPanel";
import { SofaIcon, ApplianceIcon, CleanoutIcon, DebrisIcon } from "@/components/ui/icons";

const gallery = [
  { icon: <SofaIcon />, label: "Furniture removal", alt: "Furniture and couch removal" },
  { icon: <ApplianceIcon />, label: "Appliance hauling", alt: "Old appliance hauling" },
  { icon: <CleanoutIcon />, label: "Garage & basement cleanouts", alt: "Garage and basement cleanout" },
  { icon: <DebrisIcon />, label: "Yard & construction debris", alt: "Yard and construction debris hauling" },
];

export function Gallery() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="The work"
          title="A look at what we haul"
          description="From single pieces of furniture to full cleanouts — here's the range of jobs we handle."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item) => (
            <VisualPanel
              key={item.label}
              alt={item.alt}
              icon={item.icon}
              label={item.label}
              className="aspect-[4/3]"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
