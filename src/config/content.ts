export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Request a quote",
    description: "Tell us what you need hauled and where. Include photos later if it helps us understand the job.",
  },
  {
    title: "We confirm the details",
    description: "We follow up to confirm scope, access, and a pickup window that works for your schedule.",
  },
  {
    title: "We load and haul it away",
    description: "Our crew shows up, does the lifting, and clears the space — you don't touch a thing.",
  },
  {
    title: "You're done",
    description: "The space is clear and the debris is responsibly disposed of. No trailer rental, no dump run.",
  },
];

export const itemsAccepted: string[] = [
  "Furniture (couches, chairs, tables, dressers, mattresses)",
  "Appliances (refrigerators, washers, dryers, stoves)",
  "Boxes, totes, and general household clutter",
  "Electronics (TVs, computers, printers)",
  "Yard debris (branches, brush, general outdoor waste)",
  "Construction and remodel debris (drywall, wood, flooring)",
  "Garage, basement, and shed contents",
  "Office furniture and fixtures",
];

export const itemsNotAcceptedNote =
  "Availability for the items below must be confirmed before scheduling. Please tell us about any questionable or regulated materials when you request a quote so we can advise you.";

export const itemsNotAccepted: string[] = [
  "Hazardous chemicals",
  "Asbestos",
  "Biohazardous or medical waste",
  "Explosives or ammunition",
  "Fuel or flammable liquids",
  "Pressurized containers (propane tanks, aerosol cans)",
  "Wet paint",
  "Other unknown or regulated materials",
];

export interface WhyChooseItem {
  title: string;
  description: string;
}

export const whyChooseUs: WhyChooseItem[] = [
  {
    title: "Mobile, local service",
    description: "We come to you across Burnsville and the surrounding communities — no drop-off required.",
  },
  {
    title: "We do the heavy lifting",
    description: "Loading, hauling, and disposal are handled by our crew from start to finish.",
  },
  {
    title: "Straightforward process",
    description: "Request a quote, confirm the details, and schedule a pickup window that works for you.",
  },
  {
    title: "Residential and commercial",
    description: "From single-item pickups to full property cleanouts and job-site debris runs.",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How does pricing work?",
    answer:
      "Pricing depends on the volume and type of material, along with access and location. Request a quote with as much detail as possible and we'll follow up with next steps.",
  },
  {
    question: "Do I need to be present for the pickup?",
    answer:
      "In most cases, yes, or you'll need to arrange access for our crew. We'll confirm the details with you after you request a quote.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We currently serve Burnsville and nearby Minnesota communities. See the Service Areas page for the current list, and ask us if your location isn't listed.",
  },
  {
    question: "Can you take items with hazardous materials?",
    answer:
      "Some materials require special handling or can't be accepted. Tell us about any questionable items when requesting a quote so we can advise you before scheduling.",
  },
  {
    question: "How do I schedule a pickup?",
    answer:
      "Start by submitting the quote request form with your details and preferred date. We'll reach out to confirm scheduling.",
  },
  {
    question: "What's the difference between residential and commercial service?",
    answer:
      "Residential pickups typically cover homes and households, while commercial service is scheduled around business hours for offices, retail spaces, and job sites. Let us know which applies when you request a quote.",
  },
];
