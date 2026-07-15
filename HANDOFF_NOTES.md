# Internal handoff notes

Not rendered on the site. Tracks business-policy and infrastructure
decisions still pending client confirmation before full commercial launch.

## Analytics — deferred

`NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset. `src/lib/analytics.ts` and
`src/components/seo/GoogleAnalytics.tsx` no-op entirely until it's provided
— no script loads, no events fire. All conversion event calls (phone
clicks, quote CTA clicks, quote start/completion/failure) are already
wired and ready to activate the moment a real measurement ID is set.
**Attribution is incomplete until this or another analytics system is
enabled.**

## Legal entity name — unconfirmed

`business.legalName` is `null` (src/config/business.ts). "MN Junk Removal"
is authorized as the public brand/DBA, but the registered legal entity has
not been confirmed by the client. Do not generate contracts or invoices
under an unverified legal entity. Once confirmed, set `legalName` and add
the appropriate DBA disclosure to the Privacy Policy / Terms footer only —
do not surface it elsewhere on marketing pages.

## Custom domain — deferred ("keep as is")

Site remains on `https://aa-dump-removal.vercel.app`. No purchase has been
made. This blocks:
- A branded email sender (e.g. `quotes@mnjunkremoval.com`) — Resend
  requires a verified domain you control; there is none to verify yet.
- Google Search Console / Bing Webmaster verification tied to a permanent
  host (verifying now against the Vercel URL would need to be redone).

## Live email delivery — not configured

No `RESEND_API_KEY` has been provided. `/api/quote` correctly returns
`503 LEAD_DELIVERY_NOT_CONFIGURED` and every submission is still persisted
to Supabase regardless, so no leads are lost. Once a domain exists and a
Resend sender is verified, set `RESEND_API_KEY` / `LEAD_FROM_EMAIL` /
`LEAD_DESTINATION_EMAIL` to activate live email notifications.
