/**
 * Single source of truth for the site's public origin. Every file that
 * needs an absolute URL (metadata, sitemap, robots, JSON-LD) imports
 * `siteUrl` from here instead of reading `NEXT_PUBLIC_SITE_URL` directly,
 * so a domain cutover only ever touches this one env var.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
