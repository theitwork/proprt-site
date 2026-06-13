# Proprt Marketing Site — Design System & Structure

Local-only Next.js site (never pushed to GitHub). Goal: a Heffl-class "wow" marketing
website for **Proprt**, the real-estate brokerage SaaS — original code and content,
matching the approved look from `proprt-landing.html` (the static draft).

## Site map

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Full conversion landing: hero + live app mock, social proof marquee, replace-the-stack, feature rows, audiences, AI assistant, integrations, FAQ, CTA band |
| `/product` | Product | Module-by-module deep dive with real platform screenshots |
| `/tour` | Product tour | Scroll-driven screenshot showcase (sticky viewport) + full 65-screen gallery |
| `/solutions` | Solutions | Audience pages in one: brokerages, developer sales teams, property managers, independent agents |
| `/pricing` | (hidden) | Pricing is not public — the route redirects to `/contact`; CTAs say "Get a tailored quote" |
| `/contact` | Book a demo | Demo request form + contact details + tailored-quote ask |

Conventions: no "Log in" CTAs anywhere (the website is marketing-only); screenshot browser
frames display the tenant URL `company.proprt.app`; screenshots in Tour/Product/Solutions
use per-screen focal crops (`focus: {pos, zoom}`) served unoptimized for full resolution;
the gallery lightbox supports click-to-zoom at the clicked point with mouse-follow panning.

Nav: Product · Tour · Solutions · Pricing — Log in (ghost) · Book a demo (gold CTA).
Footer: brand + 4 link columns + giant watermark wordmark (Heffl-style).

## Brand tokens (from the approved static draft)

| Token | Value | Use |
|---|---|---|
| `gold` | `#FDD33B` | Primary brand / CTAs / highlights |
| `gold-deep` | `#E8B916` | Hover accents, stars, small accents on white |
| `gold-soft` | `#FFF6D9` | Tinted chips/eyebrows backgrounds |
| `ink` | `#333232` | Headings, dark sections, primary text |
| `ink-2` | `#5C5B58` | Body text |
| `ink-3` | `#8A8985` | Muted text |
| `mist` | `#FAF9F5` | Alternate section background |
| `line` / `line-2` | `#ECEAE2` / `#E2E0D7` | Borders |
| `green` | `#1E9E6A` | Positive deltas, live indicators |

Radius: cards 18px, controls 12px. Shadows: 3 tiers (soft/mid/big), warm-tinted.

## Official brand assets (`public/brand/`, from the owner's Proprt-Exports package)

- `proprt-logo.svg` — full lockup, dark text → **nav** (light surfaces)
- `proprt-logo-reversed.svg` — white text → **footer** (dark surfaces)
- `proprt-icon.svg` — transparent pin mark, self-contained white house → the `Pin` component (works on light & dark)
- `proprt-icon-white.svg` — white-tile app icon variant
- `proprt-app-icon-180/512.png` — apple-touch / PWA sizes; `favicon-32.png` + `app/favicon.ico`
- Brand package colors: Yellow `#FDD33B` · Charcoal `#2F2F2E` · Grey `#868685` · Light `#F4F4F4` (wordmark: Poppins SemiBold)
- Source of truth: `Desktop\ITWIP\Proprt\Proprt-Exports\` (includes tokens JSON, CSS and webmanifest)

## Typography

- **Family:** Plus Jakarta Sans (next/font, 400–800), system-ui fallback.
- **H1:** clamp(38px → 68px) / 800 / -0.028em / 1.06 — one `<mark>`-style gold sweep highlight max.
- **H2 (section):** clamp(30px → 46px) / 800 / -0.02em.
- **H3 (feature):** clamp(23px → 29px) / 800.
- **Body:** 15.5–17px / 1.65 / ink-2. **Eyebrow:** 13px / 700 / caps / 0.08em tracking.

## Motion language (Framer Motion, `MotionConfig reducedMotion="user"`)

- Scroll reveals: fade + 28px rise, 0.7s, `[0.22,1,0.36,1]`, stagger 80–120ms.
- Hero app mock: perspective rotateX(4° → 0) + rise on load.
- Count-ups: `animate()` on whileInView, once.
- Testimonial marquee: continuous x-loop, pause on hover, edge fade masks.
- Tour showcase: sticky viewport, `useScroll` + `useTransform` — screenshots crossfade/scale/parallax per scroll segment.
- Nav: glass blur after 10px scroll; active-link underline via `layoutId`.
- FAQ: AnimatePresence height/opacity.
- Hovers: translateY(-2..5px) + shadow tier up + border to gold-deep; 150–300ms; arrow nudge on CTAs.

## Component inventory

`Nav`, `Footer`, `Eyebrow`, `SectionHead`, `Btn` (gold/ink/ghost), `Pin` (logo),
`Reveal`/`Stagger`, `CountUp`, `TestimonialMarquee`, `AppMock` (animated dashboard),
`StackCompare`, `FeatureRow` (+3 animated visual cards: live leads / match scores / commission split),
`AudienceCards`, `AiAssistant` (typing + action reveals), `IntegrationsGrid`, `Faq`,
`CtaBand`, `ScrollShowcase` (tour), `Gallery` (+lightbox).

Icons: **lucide-react only** — no emoji icons (UI/UX Pro Max rule).

## ⚠️ Placeholder content (replace before any public launch)

- Testimonials & avatar initials (fictional personas from the draft).
- "Trusted by agencies across MENA", star ratings.
- Pricing ($19/agent/mo etc.) — placeholder positioning, not a real price list.
- Login / portal-sync claims (portal lead sync is roadmap, not shipped).
- Contact form is non-functional (no backend); wire to a real endpoint later.

## Verified product facts (safe to keep)

25 modules · 65 real screens (`/public/screens`) · 4 roles + Super-Admin · white-label
(9 color tokens, 7 themes, 11 color presets, 15 fonts) · smart matching (0–100, 7 weighted
criteria) · 24-criterion team monitoring · 45 admin settings areas · WhatsApp templates ·
no-code workflows · commissions/rent/calculator · PWA · RLS tenant isolation.
