# Domain cutover: mnjunkremoval.com

Not rendered on the site. Preparation only — no DNS or Vercel domain
settings have been touched. `DOMAIN_PURCHASE_STATUS=AWAITING_OWNER_PURCHASE`.

**Note:** a read-only check against Vercel's domain-config API shows
`mnjunkremoval.com` already has registrar nameservers (`ns1/ns2.dns-parking.com`
— a parking service), meaning it's currently registered somewhere, just not
pointed at anything. Confirm you (the owner) actually hold this
registration before proceeding — if it's not yours, a different domain
will need to be chosen.

## Preferred canonical hostname

`https://mnjunkremoval.com` (apex, no `www`) — matches the pattern already
used for the Vercel preview URL and keeps the URL shorter for print/voice.
`www.mnjunkremoval.com` redirects to the apex (see below).

## 1. Connect the domain in Vercel

1. Dashboard → `mn-junk-removal` team → `aa-dump-removal` project →
   **Settings → Domains**
2. Add `mnjunkremoval.com` → set as **Production** domain
3. Add `www.mnjunkremoval.com` → set to **Redirect to** `mnjunkremoval.com`
   (Vercel does this automatically when you add both and mark one primary)

## 2. Required DNS records

At the domain's registrar/DNS provider (wherever it's actually registered —
identify this once nameservers are confirmed as owner-controlled):

| Type | Host | Value | Purpose |
|---|---|---|---|
| A | `@` (apex) | `76.76.21.21` | Points mnjunkremoval.com at Vercel |
| CNAME | `www` | `cname.vercel-dns.com.` | Points www.mnjunkremoval.com at Vercel |

These are Vercel's own recommended values for this exact domain (confirmed
via Vercel's domain-config API, not guessed). If the registrar supports
ALIAS/ANAME records instead of a bare A record at the apex, either works —
use whichever the registrar's UI offers for the apex.

**Do not touch any other existing records** (MX, TXT, or anything unrelated
to serving the website) — this cutover only adds the two records above.

## 3. `www` redirect policy

`www.mnjunkremoval.com` → 308 permanent redirect → `https://mnjunkremoval.com`
(Vercel handles this automatically once both domains are added and one is
marked primary — no code change needed).

## 4. HTTPS validation

Vercel auto-provisions a Let's Encrypt certificate once DNS resolves
correctly. After adding the records:
- Check **Settings → Domains** in Vercel — status should move from
  "Invalid Configuration" → "Valid Configuration" → certificate issued
  (usually within minutes of correct DNS, but can take up to ~48h for
  registrar-side propagation in the worst case)
- Verify manually: `curl -sI https://mnjunkremoval.com` should return
  `HTTP/2 200` with a valid cert (no `-k` needed)

## 5. Application config change (single env var)

Once the domain is verified and serving HTTPS:

```
NEXT_PUBLIC_SITE_URL=https://mnjunkremoval.com
```

Set this on the **Production** environment in Vercel, then trigger a
redeploy. Every canonical URL, sitemap entry, robots.txt sitemap
reference, Open Graph URL, and JSON-LD `url` field derives from this one
value (`src/config/site.ts`) — nothing else needs to change in code.

## 6. Propagation checks (after DNS + redeploy)

- [ ] `curl -sI https://mnjunkremoval.com` → 200, valid HTTPS
- [ ] `curl -sI https://www.mnjunkremoval.com` → 308 → `https://mnjunkremoval.com`
- [ ] `curl -s https://mnjunkremoval.com/sitemap.xml` → all URLs use the new domain
- [ ] `curl -s https://mnjunkremoval.com/robots.txt` → sitemap line uses the new domain
- [ ] View source on homepage → canonical link, `og:url`, `og:image`, JSON-LD `url` all use the new domain
- [ ] `https://aa-dump-removal.vercel.app` still resolves (kept as infrastructure fallback per instruction, not advertised publicly)

## 7. Rollback procedure

If something goes wrong after cutover:
1. In Vercel **Settings → Domains**, no action needed to "undo" — the
   `aa-dump-removal.vercel.app` URL keeps working the entire time
   regardless of custom-domain status, since it's the project's default
   assigned domain and isn't removed by adding a custom one.
2. To fully revert: remove `NEXT_PUBLIC_SITE_URL` override (or set it back
   to `https://aa-dump-removal.vercel.app`) and redeploy — canonical URLs,
   sitemap, and OG tags all flip back automatically.
3. DNS changes at the registrar are the only step that isn't instantly
   reversible from our side (subject to that registrar's own propagation
   delay) — if the domain itself needs to stop pointing at Vercel, that
   change happens at the registrar, not here.
