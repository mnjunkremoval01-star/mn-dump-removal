# Resend email delivery: setup checklist

Not rendered on the site. Preparation only — no API key exists, none has
been fabricated, and `quotes@mnjunkremoval.com` is **not** a receiving
inbox today. It is only the intended verified *sending* identity once the
domain and Resend account exist. Someone still needs to actually create
that mailbox (or configure it to forward/alias) if replies to it should
go anywhere.

## Target configuration

```
RESEND_API_KEY=            (create in step 5 below — do not fill with a placeholder)
LEAD_FROM_EMAIL=quotes@mnjunkremoval.com
LEAD_DESTINATION_EMAIL=wermovingjunk@gmail.com   (unchanged, already confirmed)
```

## Checklist

- [ ] **1. Domain live first.** Complete `DOMAIN_CUTOVER.md` — Resend can't
      verify a sending domain that isn't resolving yet.
- [ ] **2. Create a Resend account** at resend.com (free tier covers this
      volume comfortably).
- [ ] **3. Add `mnjunkremoval.com` as a sending domain** in the Resend
      dashboard (Domains → Add Domain).
- [ ] **4. Add the DNS records Resend generates** — Resend shows these
      after step 3; they're domain-specific and can't be predicted before
      the domain exists. Typically:
      - 1 **TXT** record for domain verification
      - 1–2 **CNAME** records for DKIM signing
      - Optionally an **MX** + **TXT** record if using Resend for
        inbound/return-path handling (not required for outbound-only
        sending, which is all this app does)
      Add only these — don't touch existing records, same as the domain
      cutover.
- [ ] **5. Wait for "Verified" status** in Resend's dashboard (usually
      minutes, can take longer depending on registrar propagation).
- [ ] **6. Create an API key** (Resend → API Keys → Create). Scope it to
      "Sending access" only if that option is offered — no reason to grant
      broader permissions to a key that only sends transactional emails.
- [ ] **7. Set Vercel env vars** (Production + Preview): `RESEND_API_KEY`,
      `LEAD_FROM_EMAIL=quotes@mnjunkremoval.com`. `LEAD_DESTINATION_EMAIL`
      is already set to `wermovingjunk@gmail.com`.
- [ ] **8. Redeploy** so the new env vars take effect (`isLeadDeliveryConfigured()`
      flips true once all three vars are present).
- [ ] **9. Send a real production test submission** through the live
      `/quote` page — not a curl request, the actual form, to catch any
      UI-level issue too.
- [ ] **10. Confirm the destination inbox** (`wermovingjunk@gmail.com`)
      actually received it — check spam folder on the first send, since a
      brand-new sending domain has no reputation yet.
- [ ] **11. Confirm the failure state still works.** Temporarily use an
      invalid `RESEND_API_KEY` value in Preview, submit a test quote, and
      confirm the app returns `502 DELIVERY_FAILED` (not a crash) and the
      lead still lands in Supabase. Then restore the real key.

## What's already built and doesn't need touching

- `src/lib/lead-delivery.ts` already sends via Resend's REST API using
  whatever `RESEND_API_KEY` / `LEAD_FROM_EMAIL` / `LEAD_DESTINATION_EMAIL`
  are set — no code change needed once these three env vars exist.
- `reply-to` is already set to the customer's submitted email when they
  provide one (`src/lib/lead-delivery.ts`), so replying to the
  notification email goes straight to the customer.
- Every submission already persists to Supabase before or regardless of
  the email attempt (`src/app/api/quote/route.ts`) — activating email
  delivery doesn't change that safety net.
