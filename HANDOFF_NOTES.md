# Internal handoff notes

Not rendered on the site. Tracks business-policy and infrastructure
decisions still pending client confirmation before full commercial launch.

## Temporary launch status

```
TEMPORARY_LIVE_WEBSITE=YES
CURRENT_PUBLIC_URL=https://aa-dump-removal.vercel.app
CUSTOM_DOMAIN=PENDING
PHONE_LEAD_GENERATION=ACTIVE
ONLINE_EMAIL_NOTIFICATION=PENDING
```

Live and usable as the client's real, temporary website today — phone
CTAs work, the quote form correctly persists every lead to Supabase, and
nothing pretends a deferred system is active. **Do not describe this as
a fully completed lead-generation system** until online email
notification (Resend) is activated; until then, phone is the only
channel guaranteed to reach the business immediately, though every web
submission is safely stored and recoverable in the meantime.

## Post-launch upgrades (in priority order)

1. **Custom domain** (`mnjunkremoval.com`, pending owner purchase) —
   procedure in `DOMAIN_CUTOVER.md`. Unlocks a branded email sender and
   permanent Search Console / Bing verification.
2. **Live email notification** (Resend, deferred) — checklist in
   `RESEND_SETUP.md`. Until active, leads only surface by checking the
   Supabase `leads` table directly.
3. **Analytics** (GA4, deferred) — scaffold ready, zero footprint until a
   measurement ID is provided. Attribution is incomplete until then.

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

## Custom domain — preferred, awaiting owner purchase

`PREFERRED_DOMAIN=mnjunkremoval.com`, `DOMAIN_PURCHASE_STATUS=AWAITING_OWNER_PURCHASE`.
Site remains on `https://aa-dump-removal.vercel.app` until purchase +
cutover. Full procedure, exact DNS records (already confirmed via
Vercel's API for this specific domain), and rollback plan are in
`DOMAIN_CUTOVER.md`. Note: a read-only check shows `mnjunkremoval.com`
already has parked-registrar nameservers — confirm the owner actually
holds this registration before purchasing/cutting over. This blocks:
- A branded email sender (`quotes@mnjunkremoval.com`) — see `RESEND_SETUP.md`.
- Google Search Console / Bing Webmaster verification tied to a permanent
  host (verifying now against the Vercel URL would need to be redone).

Site origin is centralized in `src/config/site.ts` — cutover only requires
setting one env var (`NEXT_PUBLIC_SITE_URL`) and redeploying; no component
hardcodes a domain.

## Live email delivery — not configured

No `RESEND_API_KEY` has been provided (none fabricated). `/api/quote`
correctly returns `503 LEAD_DELIVERY_NOT_CONFIGURED` and every submission
is still persisted to Supabase regardless, so no leads are lost. Full
setup checklist in `RESEND_SETUP.md`. `quotes@mnjunkremoval.com` is the
intended sending identity only — it is not confirmed as a monitored
receiving inbox.

## Logo — initial production brand mark, not a custom identity package

`LOGO_STATUS=INITIAL_PRODUCTION_BRAND_MARK`, `CUSTOM_IDENTITY_PACKAGE=NOT_COMPLETED`.
The current mark/wordmark/full-logo assets are code-generated typography
(SVG, exact approved text — no AI image generation was used, since that
integration is still broken). They are clean and production-usable, but
should not be described to the client as a professionally designed brand
identity. Swap-ready: every logo slot (`Header`, `Hero`, `Footer`, favicon,
OG image) accepts a real designed logo with no layout rework once one
exists.

## Lead recovery in the meantime

While email notification is pending, leads must be checked manually in
Supabase (`leads` table, project `hiobelokxdsvlwpfuzat`) rather than an
inbox. Whoever owns lead follow-up should know to check this until
Resend is activated — otherwise submitted quotes could sit unseen.
