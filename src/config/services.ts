export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  bullets: string[];
}

export const services: Service[] = [
  {
    slug: "residential-junk-removal",
    name: "Residential Junk Removal",
    shortDescription: "Clear out unwanted items from your home, fast.",
    description:
      "From single items to whole-room cleanouts, we haul away household junk so you don't have to load a truck or make a dump run yourself.",
    bullets: ["Single-item or full-load pickups", "Flexible scheduling", "We do the lifting and loading"],
  },
  {
    slug: "commercial-junk-removal",
    name: "Commercial Junk Removal",
    shortDescription: "Junk hauling for offices, retail, and job sites.",
    description:
      "We work around your business hours to remove old furniture, fixtures, and general debris with minimal disruption to your operation.",
    bullets: ["Scheduled around your operating hours", "Office, retail, and warehouse cleanouts", "Bulk and recurring pickups"],
  },
  {
    slug: "furniture-removal",
    name: "Furniture Removal",
    shortDescription: "Couches, mattresses, tables, and more — gone.",
    description:
      "Bulky furniture is hard to move alone. We handle the heavy lifting and hauling for old or unwanted pieces of any size.",
    bullets: ["Couches, mattresses, and bed frames", "Tables, desks, and cabinets", "No stairs-related surcharge surprises"],
  },
  {
    slug: "appliance-removal",
    name: "Appliance Removal",
    shortDescription: "Old refrigerators, washers, dryers, and more.",
    description:
      "We remove old household appliances so you can make room for the new ones — just let us know what needs to go when you request a quote.",
    bullets: ["Refrigerators, washers, and dryers", "Stoves, dishwashers, and water heaters", "Ask about your specific unit when requesting a quote"],
  },
  {
    slug: "garage-cleanouts",
    name: "Garage Cleanouts",
    shortDescription: "Reclaim your garage from years of clutter.",
    description:
      "Whether it's old tools, boxes, or things you forgot you had, we'll clear your garage down to the bare floor.",
    bullets: ["Full or partial cleanouts", "Sorting assistance on request", "One trip, one crew"],
  },
  {
    slug: "basement-cleanouts",
    name: "Basement Cleanouts",
    shortDescription: "Clear basements of stored items and debris.",
    description:
      "We haul out old boxes, furniture, and general storage clutter from basements, including tight or hard-to-access spaces.",
    bullets: ["Tight-access hauling", "Storage and finished basements", "Flood or water-damage cleanup debris"],
  },
  {
    slug: "estate-property-cleanouts",
    name: "Estate & Property Cleanouts",
    shortDescription: "Respectful, efficient full-property cleanouts.",
    description:
      "We help clear an entire property — homes, storage units, or long-term rentals — with a straightforward, respectful process.",
    bullets: ["Whole-property cleanouts", "Coordination with families or agents", "Flexible timing"],
  },
  {
    slug: "rental-property-cleanouts",
    name: "Rental Property Cleanouts",
    shortDescription: "Turn over units quickly between tenants.",
    description:
      "Landlords and property managers rely on us to clear out left-behind items and debris so a unit can be turned around fast.",
    bullets: ["Fast turnaround for vacancies", "Works with property managers", "Single units or multi-unit properties"],
  },
  {
    slug: "yard-debris-removal",
    name: "Yard Debris Removal",
    shortDescription: "Branches, brush, and general yard waste hauling.",
    description:
      "We haul away yard waste from cleanups and landscaping projects, including branches, brush, and general outdoor debris.",
    bullets: ["Branches and brush", "Post-storm cleanup debris", "General yard waste"],
  },
  {
    slug: "construction-debris-removal",
    name: "Construction Debris Removal",
    shortDescription: "Job-site debris hauling for small to mid projects.",
    description:
      "We remove debris from renovation and small construction projects, including drywall, wood scraps, and general building materials.",
    bullets: ["Renovation and remodel debris", "Drywall, wood, and general building materials", "Scheduled pickups around your project timeline"],
  },
  {
    slug: "general-hauling-dump-runs",
    name: "General Hauling & Dump Runs",
    shortDescription: "Skip the trailer rental — we make the run for you.",
    description:
      "Need a load taken to the dump but don't want to rent a trailer or make the trip yourself? We handle the hauling from start to finish.",
    bullets: ["One-off dump runs", "No trailer or truck rental needed", "We handle loading and disposal logistics"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
