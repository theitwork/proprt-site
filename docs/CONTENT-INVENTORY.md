# Content Inventory — proprt-site

**Authoritative map of every page, section, claim, and screenshot on the marketing
site, with the exact code location that produces it.** Use this as the lookup table
when updating the site to match a new app build. Pair it with
[`GAP-ANALYSIS.md`](./GAP-ANALYSIS.md) (what to change) and
[`UPDATE-RUNBOOK.md`](./UPDATE-RUNBOOK.md) (how to change it).

_Last reviewed against the repo: 2026-06-21._

---

## 1. Stack & where content lives

| Concern | Location |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript, Tailwind v4, Framer Motion |
| Pages | `app/<route>/page.tsx` |
| Shared UI | `components/*` |
| **Screenshot content model** | `lib/screens.ts` (single source of truth for screen groups, captions, tour showcase, home reveal) |
| Static assets | `public/screens/*.png` (65), `public/brand/*` (logos/icons), `public/Proprt-Demo-Tour.mp4` |
| Base path / image URL helper | `lib/base-path.ts`, `screenSrc()` in `lib/screens.ts` |
| Global metadata, fonts | `app/layout.tsx` |
| Asset Manager (CMS) | `app/admin/page.tsx` (commits image replacements to GitHub `main`) |
| Design system reference | [`../DESIGN.md`](../DESIGN.md) |

Most copy is **hardcoded in the page/component `.tsx` files** as arrays of objects
(`MODULES`, `SOLUTIONS`, `HOME_FAQ`, `QUOTES`, `INTS`, etc.). There is no CMS for text.

---

## 2. Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Conversion landing (hero → marquee → scroll-reveal → stack → features → spotlight → audiences → AI → integrations → FAQ → CTA) |
| `/product` | `app/product/page.tsx` | "Product Catalogue" — 7 module deep-dives + stat strip |
| `/tour` | `app/tour/page.tsx` | Scroll showcase (6 highlights) + full 65-screen gallery |
| `/solutions` | `app/solutions/page.tsx` | 4 audience deep-dives |
| `/contact` | `app/contact/page.tsx` | Book-a-demo form (`components/demo-form.tsx`) |
| `/pricing` | `app/pricing/page.tsx` | **Redirects to `/contact`** (pricing intentionally not public) |
| `/admin` | `app/admin/page.tsx` | Asset Manager — private CMS (noindex) |

Nav links (`components/nav.tsx:11`): Product · Tour · Solutions · Contact + "Book a demo".
Footer columns (`components/footer.tsx:5`): Product / Solutions / Company / Resources.

---

## 3. Page-by-page section map

### `/` Home — `app/page.tsx`
| Section | Lines | Component / data |
|---|---|---|
| Hero (eyebrow pill, H1, sub, CTAs, avatars + MENA proof) | 30–93 | `HeroHighlight`, `AppMock`, `AVATARS` (`page.tsx:18`) |
| Proof marquee | 95–105 | `TestimonialMarquee` (`components/marquee.tsx`) |
| Scroll reveal | 107–117 | `ScrollReveal` (`components/scroll-reveal.tsx`) → `HOME_REVEAL` in `lib/screens.ts:247` |
| Replace-the-stack | 119–129 | `StackCompare` (`components/stack-compare.tsx`) |
| Feature rows | 131–141 | `FeatureRows` (`components/feature-rows.tsx`) |
| Spotlight | 143–153 | `Spotlight` (`components/spotlight.tsx`) |
| Audiences | 155–165 | `AudienceCards` (`components/audiences.tsx`) |
| AI assistant | 167–168 | `AiAssistant` (`components/ai-assistant.tsx`) |
| Integrations | 170–185 | `IntegrationsGrid` (`components/integrations.tsx`) |
| FAQ | 187–201 | `Faq` + `HOME_FAQ` (`components/faq.tsx:52`) |
| CTA band | 203–204 | `CtaBand` (`components/cta-band.tsx`) |

### `/product` — `app/product/page.tsx`
- **Stat strip** `STATS` (`product/page.tsx:112`): `25` modules · `65` screens · `45` admin areas · `100%` isolation.
- **7 modules** `MODULES` (`product/page.tsx:25`), each = icon, eyebrow, title, body, 4 bullet points, 1 screenshot:
  1. `listings` — Inventory (shot `properties-light.png`)
  2. `leads` — Demand/matching (shot `property-details-matching-leads.png`)
  3. `showcase` — Selling (shot `customer-view-present.png`)
  4. `automation` — Automation (shot `workflow-new-workflow.png`)
  5. `finance` — Money & insight (shot `reports.png`)
  6. `security` — Trust (shot `administration.png`) — **no MFA mentioned**
  7. `whitelabel` — White-label (shot `login-page.png`)
- Anchors are linked from the footer (`#leads`, `#listings`, `#finance`, `#automation`, `#security`).

### `/tour` — `app/tour/page.tsx`
- `ScrollShowcase` (`components/scroll-showcase.tsx`) → `SHOWCASE` (`lib/screens.ts:204`), 6 items.
- `Gallery` (`components/gallery.tsx`) → `SCREEN_GROUPS` (`lib/screens.ts:13`), all 65 screens, lightbox zoom.

### `/solutions` — `app/solutions/page.tsx`
- **4 audiences** `SOLUTIONS` (`solutions/page.tsx:15`): `brokerages`, `developers`, `managers`, `independents`. Each = icon, title, lead, body, 4 points, 1 screenshot.

### `/contact` — `app/contact/page.tsx`
- `EXPECT` 4 cards (`contact/page.tsx:13`) + `DemoForm` (**non-functional — no backend**).

---

## 4. Screenshot content model — `lib/screens.ts`

- `SCREEN_GROUPS` (line 13): **16 groups / 65 screens**. Each screen = `{ file, title, caption }`.
- `SCREEN_ASPECT = "1901 / 990"` (line 197) — native pixel aspect; **capture all screens at 1901×990**.
- `SHOWCASE` (line 204): 6 hand-picked tour highlights, each with `focus: {pos, zoom}` crop.
- `HOME_REVEAL` (line 247): 6 homepage scroll-reveal modules (deliberately distinct from SHOWCASE & product modules).

**Groups (count):** Sign-in & Dashboards (3) · Inventory & Properties (13) · Smart Matching (1) ·
Customer View (4) · Requests & Deals (3) · Contacts CRM (3) · Meetings & Tasks (4) ·
Activities & Worklog (4) · Communication & Automation (4) · Maps & Geo (2) · Finance (3) ·
Reports (3) · Team & Performance (5) · Team Monitoring (3) · Documents & Knowledge (3) ·
Administration & Account (7) = **65**.

### Full screenshot catalog (filename → group)
> Complete target list for recapture. Filenames are the contract — keep them identical
> when replacing, or update every reference in `lib/screens.ts`/pages.

- **Sign-in & Dashboards:** `dashboard.png`, `login-page.png`, `new-dashboard.png`
- **Inventory & Properties:** `properties-light.png`, `properties-dark.png`, `properties-selections.png`, `new-property.png`, `new-property-apartment.png`, `new-property-land.png`, `property-details-overview-1.png`, `property-details-overview-2.png`, `property-details-overview-3.png`, `property-details-images.png`, `property-details-lebanon-specs.png`, `property-details-publishing.png`, `property-details-published.png`
- **Smart Matching:** `property-details-matching-leads.png`
- **Customer View:** `customer-view.png`, `customer-view-selection.png`, `customer-view-present.png`, `customer-view-comapre.png` _(note the misspelling "comapre" — preserved for now)_
- **Requests & Deals:** `requests.png`, `requests-pipeline-move.png`, `deals.png`
- **Contacts CRM:** `contacts.png`, `contacts-columns-and-actions.png`, `contact-duplicates.png`
- **Meetings & Tasks:** `meetings.png`, `meetings-new-meeting.png`, `tasks.png`, `taks-new-task.png` _(misspelling "taks")_
- **Activities & Worklog:** `activities.png`, `activities-log-activity.png`, `activities-log-activity-type.png`, `worklog.png`
- **Communication & Automation:** `whatsapp.png`, `whatsapp-new-template.png`, `workflow.png`, `workflow-new-workflow.png`
- **Maps & Geo:** `maps.png`, `maps-selection.png`
- **Finance:** `commissions.png`, `calculator.png`, `rent-management-contract.png`
- **Reports:** `reports.png`, `reports-custom-report.png`, `reports-schedule.png`
- **Team & Performance:** `team-performance.png`, `team-tracking.png`, `team-tracking-user-1.png`, `team-tracking-user-2.png`, `targets.png`
- **Team Monitoring:** `team-monitoring.png`, `team-monitoring-recent.png`, `tema-monitoring-new-rule.png` _(misspelling "tema")_
- **Documents & Knowledge:** `documents.png`, `knowledge-base.png`, `knowledge-base-article.png`
- **Administration & Account:** `administration.png`, `administration-menu-1.png`, `administration-menu-2.png`, `my-settings.png`, `notifications.png`, `new.png`, `error-page.png`

---

## 5. Hardcoded product claims (verify each against the new build)

| Claim | Value | Where it appears (file:line) |
|---|---|---|
| Feature modules | **25** | `product/page.tsx:113,135`; `DESIGN.md:91` |
| Real product screens | **65** | `product/page.tsx:114`, `tour/page.tsx:30,42`, `page.tsx:41`, `lib/screens.ts:12` |
| Admin settings areas | **45** | `product/page.tsx:115`, `lib/screens.ts:184` |
| Tenant isolation | **100%** | `product/page.tsx:116` |
| Roles | **4 roles + Super-Admin** | `product/page.tsx:92–93`, `faq.tsx:71` |
| Property types | **10** ("ten") | `product/page.tsx:32`, `solutions/page.tsx:39` |
| Amenity catalog | **58 items** | `product/page.tsx:32` |
| Contact types | **8** ("eight") | `product/page.tsx:44`, `screens.ts:252` |
| Requests pipeline | **6 stages** | `product/page.tsx:45`, `solutions/page.tsx:44`, `screens.ts:257` |
| Smart matching | **0–100, 7 weighted criteria** | `feature-rows.tsx:160`, `product/page.tsx:44` |
| Team monitoring | **24 criteria/checks** | `product/page.tsx:68–69`, `solutions/page.tsx:22`, `screens.ts:160` |
| White-label | **9 color tokens · 7 themes · 11 color presets · 15 fonts** | `product/page.tsx:104–105`, `faq.tsx:75` |
| Security model | RLS on every table, per-user overrides, isolated storage, audit log, invite-only | `product/page.tsx:91–93`, `faq.tsx:71` |
| Integrations (12) | Listing portals, WhatsApp Business, Gmail & Outlook, Google Calendar, Meta Lead Ads, Mailchimp, Stripe, Zoho Books, Google Sheets, Zapier & webhooks, Google Maps, SSO / Google login | `components/integrations.tsx:17` |

> ⚠️ **MFA / 2FA is not mentioned anywhere** — see `GAP-ANALYSIS.md` §Known gaps.

---

## 6. Brand assets — `public/brand/`

`proprt-logo.svg` (nav) · `proprt-logo-reversed.svg` (footer) · `proprt-icon.svg` ·
`proprt-icon-white.svg` · `favicon-32.png` · `proprt-app-icon-180.png` ·
`proprt-app-icon-512.png` · `app/favicon.ico`. Managed in the Asset Manager's "Brand"
group (`app/admin/page.tsx:22`). Brand tokens documented in `DESIGN.md:26`.

---

## 7. Placeholders & non-functional items (not real product facts)

| Item | Status | Where |
|---|---|---|
| Testimonials (Rana K., Marwan S., Lara H., Jad A., Nour T.) | **Fictional placeholder** | `components/marquee.tsx:5` |
| Hero avatars + "Built with agencies across MENA" + 5★ | **Placeholder social proof** | `app/page.tsx:18,69–89` |
| Feature-row demo data (lead names, match %, deal $) | **Illustrative, not live** | `components/feature-rows.tsx:143–237` |
| Contact / demo form | **No backend — does not submit** | `components/demo-form.tsx` |
| Portal lead capture | **Roadmap, not shipped** | `faq.tsx:59` |
| Pricing | **Hidden — redirects to /contact** | `app/pricing/page.tsx` |
| Footer note | "Local preview — not a public site", "© 2026" | `components/footer.tsx:79` |

See `DESIGN.md:81` ("Placeholder content — replace before any public launch").
