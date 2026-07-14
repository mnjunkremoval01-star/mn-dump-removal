import { business, hasPhone, hasHours, hasEmail } from "@/config/business";
import { serviceAreaCityNames } from "@/config/service-areas";

/** Converts "9:00 AM" / "9:00 PM" to 24-hour "HH:MM". Returns null if unparseable. */
function to24Hour(time: string): string | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = match[2];
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

/**
 * Emits only confirmed facts. Fields we haven't verified (street address,
 * ratings, license/insurance) are intentionally omitted rather than filled
 * with placeholders, since publishing unverified LocalBusiness data can
 * misrepresent the business.
 */
export function LocalBusinessJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: business.name,
    description: business.tagline,
    url: siteUrl,
    areaServed: serviceAreaCityNames.map((city) => ({
      "@type": "City",
      name: `${city}, MN`,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Burnsville",
      addressRegion: "MN",
      addressCountry: "US",
    },
  };

  if (hasPhone && business.phoneHref) {
    data.telephone = business.phoneHref;
  }

  if (hasEmail && business.email) {
    data.email = business.email;
  }

  if (hasHours && business.hours) {
    const spec = business.hours
      .map((h) => {
        const [opensRaw, closesRaw] = h.hours.split("–").map((s) => s.trim());
        const opens = to24Hour(opensRaw);
        const closes = to24Hour(closesRaw);
        if (!opens || !closes) return null;
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${h.day}`,
          opens,
          closes,
        };
      })
      .filter(Boolean);
    if (spec.length > 0) {
      data.openingHoursSpecification = spec;
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
