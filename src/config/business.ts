/**
 * Central business configuration.
 *
 * Unconfirmed fields are typed as `null` on purpose. Components must treat
 * `null` as "do not render this" rather than substituting a placeholder —
 * see CallButton, BusinessHours, and the LocalBusiness JSON-LD builder.
 */

export interface BusinessHours {
  day: string;
  hours: string;
}

export interface BusinessConfig {
  name: string;
  shortName: string;
  /** Registered legal entity name, if different from the public brand. Internal use only — never render on marketing pages. Null until confirmed by the client. */
  legalName: string | null;
  tagline: string;
  slogan: string;
  baseLocation: string;
  serviceAreaSummary: string;
  /** Display-formatted phone, e.g. "(952) 555-0100". Null until confirmed. */
  phoneDisplay: string | null;
  /** E.164 phone for tel: links, e.g. "+19525550100". Null until confirmed. */
  phoneHref: string | null;
  email: string | null;
  hours: BusinessHours[] | null;
  licensed: boolean | null;
  insured: boolean | null;
  domain: string | null;
  socialLinks: { label: string; href: string }[];
}

function normalizePhoneHref(raw: string | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/[^\d+]/g, "");
  return digits.length > 0 ? digits : null;
}

/** Formats a 10-digit US number as "(612) 267-9701"; falls back to the raw input otherwise. */
function formatPhoneDisplay(raw: string | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return raw;
}

const rawPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim();

const dailyHours: BusinessHours[] = [
  { day: "Monday", hours: "9:00 AM – 9:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 9:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 9:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 9:00 PM" },
  { day: "Friday", hours: "9:00 AM – 9:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 9:00 PM" },
  { day: "Sunday", hours: "9:00 AM – 9:00 PM" },
];

export const business: BusinessConfig = {
  name: "MN Junk Removal",
  shortName: "MN Junk Removal",
  legalName: null,
  tagline:
    "MN Junk Removal clears unwanted furniture, appliances, debris, and household or commercial junk throughout Burnsville and nearby communities. We handle the loading, hauling, and cleanup so you can reclaim your space without the hassle.",
  slogan: "Clearing Minnesota, One Load at a Time.",
  baseLocation: "Burnsville, Minnesota",
  serviceAreaSummary: "Serving Burnsville and surrounding communities",
  phoneDisplay: formatPhoneDisplay(rawPhone),
  phoneHref: normalizePhoneHref(rawPhone),
  email: "wermovingjunk@gmail.com",
  hours: dailyHours,
  licensed: null,
  insured: null,
  domain: null,
  socialLinks: [],
};

export const hasPhone = business.phoneHref !== null;
export const hasHours = business.hours !== null && business.hours.length > 0;
export const hasEmail = business.email !== null;

/** Condensed "Every day: X" when all configured days share the same hours, else null. */
export const hoursSummary: string | null =
  hasHours && business.hours!.every((h) => h.hours === business.hours![0].hours)
    ? `Every day: ${business.hours![0].hours}`
    : null;
