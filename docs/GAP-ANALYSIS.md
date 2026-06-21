# Gap Analysis — bringing proprt-site up to the latest app build

Goal: update the marketing site to match the **current Proprt build** shipped to
`app.proprt.app` (GitHub `theitwork/proprt`, deployed on Vercel) — new/changed/removed
features, **MFA & security**, options, layout, look & feel, and fresh screenshots.

This document is the **plan to approve before editing pages** (your chosen sequence:
_docs + gap analysis first_). It separates: (A) what I can verify from this repo,
(B) what is **blocked on access** I don't currently have, and (C) **draft proposals**
for the Product Catalogue & Tour changes.

_Status date: 2026-06-21._

---

## A. Access status — what I can and can't reach right now

| Need | Status | Detail |
|---|---|---|
| Read/edit `proprt-site` | ✅ Available | Full repo access on branch `claude/gifted-ramanujan-1mkgn2`. |
| Playwright | ✅ Installed | v1.56.1; `PLAYWRIGHT_BROWSERS_PATH` set. Capture logic is ready (`scripts/`). |
| Reach `app.proprt.app` for screenshots | ❌ **Blocked** | Egress is allowlisted: every external host (even `example.com`) returns `403 Host not in allowlist`. App + Supabase (`zpvhcurpnhyifeepzxnr.supabase.co`) unreachable. |
| Read app source `theitwork/proprt` | ❌ **Blocked** | GitHub MCP scope is `theitwork/proprt-site` only; reads return `Access denied`. |
| App login credentials | ❌ **Missing** | No credentials or saved Playwright session in this environment. |

### What to enable so I can do the live-capture + repo-diff work
1. **Network egress allowlist** — add these hosts to the environment's egress settings:
   `app.proprt.app`, `www.proprt.app`, `zpvhcurpnhyifeepzxnr.supabase.co`
   (plus `*.supabase.co` / any CDN the app pulls images from). Configured when the
   environment is created — see https://code.claude.com/docs/en/claude-code-on-the-web.
2. **App repo scope** — add `theitwork/proprt` (and `theitwork/proprt-web`) to this
   session's repositories so I can read the real feature/module/settings list.
3. **App credentials** — a login (email + password) for a tenant that has full sample
   data **and** admin access (so all 65 screens, incl. Administration, are reachable),
   _or_ a saved Playwright `storageState.json`. Provide via env vars
   (`PROPRT_EMAIL`, `PROPRT_PASSWORD`, `PROPRT_BASE_URL`) — never commit them.

Until #1–#3 are in place, screenshot refresh and source-of-truth verification cannot
run from this environment. Everything below that is repo-only **can** proceed.

---

## B. Known gaps & stale-risk items (found from the repo today)

### B1. MFA / security — highest-priority known gap
You explicitly added **MFA**. The site mentions it **nowhere**. The security story
today (RLS, 4 roles, audit log, invite-only) lives in two places:
- `app/product/page.tsx:86–97` — the `security` module ("Trust").
- `components/faq.tsx:70–72` — "Is our data secure?".

**Proposed change (pending your confirmation of specifics):** expand the security
module and FAQ to include MFA. I need from you:
- MFA method(s): TOTP authenticator app? SMS? Email OTP? WebAuthn/passkeys?
- Enforcement: optional per user, or admin-enforced per tenant/role?
- Related: SSO / Google login already listed as an integration (`integrations.tsx:29`) —
  is full SSO now shipped? Session policies, password rules, login alerts?

### B2. Counts & claims likely to have changed
Each is asserted as fact and must be re-verified against the new build
(locations in `CONTENT-INVENTORY.md` §5):
- `25` modules · `65` screens · `45` admin settings areas · `100%` isolation
- `10` property types · `58`-item amenity catalog · `8` contact types
- `6`-stage requests pipeline · matching `0–100` over `7` weighted criteria
- `24`-criterion team monitoring
- White-label: `9` color tokens · `7` themes · `11` color presets · `15` fonts

If the build changed any of these, update **every** listed location (some appear 3–4×).

### B3. Screenshots — all 65 are from the old UI
You said the UI/look & feel changed, so treat **all 65** in `public/screens/` as stale.
Full filename list and grouping: `CONTENT-INVENTORY.md` §4. Recapture plan: §D below.

### B4. Integrations list may be aspirational
`components/integrations.tsx` lists 12 integrations (Stripe, Mailchimp, Meta Lead Ads,
Zapier, SSO…). Confirm which actually ship vs. roadmap, to keep the site truthful
(consistent with the existing roadmap caveat in `faq.tsx:59`).

### B5. Placeholders still present
Testimonials, MENA/“5★” social proof, and the non-functional demo form remain
(`CONTENT-INVENTORY.md` §7). Out of scope for "match the build," but flag for launch.

---

## C. Draft proposals — Product Catalogue & Tour (for approval)

> These are **proposals based on the current repo**, to be confirmed/adjusted once I can
> see the new build. Nothing here is implemented yet.

### C1. `/product` — add / change
- **Add a dedicated "Security & access" emphasis** to the `security` module: MFA, SSO,
  session/password policy, audit log — currently security reads as tenant-isolation only.
- **Add an "AI assistant" module.** The home page markets an AI assistant
  (`components/ai-assistant.tsx`) but `/product` has no AI module. If AI features shipped,
  add module #8 with a real screenshot.
- **Re-verify the stat strip** (`product/page.tsx:112`) numbers after B2.
- **Possible new modules** if added to the app (need confirmation): client/owner portal,
  e-signature, accounting/Zoho sync, lead-portal sync, mobile/PWA deep-dive.

### C2. `/product` — candidate removals
- Drop any module/bullet describing a feature that was **removed** in the new build
  (you mentioned removals — tell me which, or I'll flag mismatches after repo/app access).

### C3. `/tour` — showcase & gallery
- `SHOWCASE` (6 items, `lib/screens.ts:204`): swap in any new flagship screens
  (e.g. an MFA/security setup screen, AI assistant) and refresh `focus` crops.
- Gallery groups (`SCREEN_GROUPS`): **add a group** for any new module, **remove** groups
  for removed features, and re-caption to match new UI labels. Update the "65" count
  everywhere if the screen count changes (`CONTENT-INVENTORY.md` §5).
- `HOME_REVEAL` (6 items, `lib/screens.ts:247`): keep distinct from SHOWCASE; refresh.

### C4. Open questions for you
1. MFA specifics (B1).
2. Which features were **removed** (so I remove their sections, not guess)?
3. Any **new modules/pages** in the app to add as sections?
4. "Look & feel": does the *marketing site's* visual style need to change too, or only
   the in-app screenshots? (DESIGN.md brand tokens stay unless you say otherwise.)
5. Confirm the integrations that actually ship (B4).

---

## D. Screenshot recapture plan

Two supported paths (full steps in [`UPDATE-RUNBOOK.md`](./UPDATE-RUNBOOK.md)):

- **Path 1 — Asset Manager (manual, works today):** capture each screen yourself from
  `app.proprt.app`, then upload via `https://www.proprt.app/admin` (or `/admin` locally).
  It commits replacements to `main` and redeploys. Keep **identical filenames** (§4).
- **Path 2 — Playwright (automated, needs A1–A3):** once egress + credentials exist,
  `scripts/capture-screens.mjs` logs in and recaptures every screen at **1901×990** into
  `public/screens/`, driven by `scripts/screens.routes.json` (filename → app route).
  I'll fill the route map once I can see the app.

**Capture spec (match existing assets):** viewport **1901×990**, full app chrome,
realistic sample data, both light theme (and `properties-dark.png` in dark), no PII.

---

## E. Execution order (once approved)

1. **MFA/security copy** (B1) + re-verified counts (B2) — text-only, no new assets needed.
2. **Product/Tour structure** (C1–C3) — add/remove sections; wire `lib/screens.ts`.
3. **Screenshot refresh** (D) — Asset Manager now, or Playwright after access.
4. **Truthfulness pass** (B4–B5) — integrations + placeholders.
5. **Docs refresh** — update `CONTENT-INVENTORY.md` + this file to the new reality.
6. **Build & verify** — `npm run typecheck` + `npm run build` before push.
