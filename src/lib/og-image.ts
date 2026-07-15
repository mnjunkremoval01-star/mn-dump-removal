import { business } from "@/config/business";

/**
 * Next.js does not deep-merge `openGraph` between a layout and a page —
 * any page that defines its own `openGraph` object silently drops the
 * layout's `images`. Every page-level `openGraph` block must spread this
 * in explicitly.
 */
export const defaultOgImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: `${business.name} — ${business.baseLocation}`,
};
