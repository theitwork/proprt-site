# Proprt — Canva Brand Kit Management Guide

This document is the source-of-truth handover for the **Proprt** Canva Brand Kit
(Brand Kit ID `kAHNP9eeaMc`). It records what has been automated via the Canva API
and the exact steps to finish the kit in the Canva UI (the colour swatches, brand
fonts, and logo slots can only be set in the UI — the Canva API is read-only for
Brand Kit contents).

Brand values are sourced from `app/globals.css` (`@theme` block) and `DESIGN.md`.

---

## 1. What has already been done (automated)

- **19 brand assets uploaded** into the Canva account (from `https://proprt.app/...`).
- Organized into a **`Proprt Brand`** folder with three subfolders:
  - **Logos** — <https://www.canva.com/folder/FAHNQEDhc3s>
  - **Icons** — <https://www.canva.com/folder/FAHNQDdpsEE>
  - **Product Screens** — <https://www.canva.com/folder/FAHNQLQlZpY>
  - Parent — <https://www.canva.com/folder/FAHNQEavQFw>
- On-brand **brand templates** generated against the Proprt kit (social post, flyer,
  pitch cover) and published as reusable templates.

### Uploaded asset reference (Canva asset IDs)

| Asset | Canva asset ID | Folder |
|---|---|---|
| Logo — primary (dark text) | `MAHNPxqMhjw` | Logos |
| Logo — reversed (light text) | `MAHNP3l29t8` | Logos |
| Icon — pin mark | `MAHNPwGnkdo` | Icons |
| Icon — white pin mark | `MAHNP9_wYuk` | Icons |
| App icon 512 | `MAHNP9czn5k` | Icons |
| App icon 180 | `MAHNP6VBPNo` | Icons |
| Favicon 32 | `MAHNPzGxftw` | Icons |
| Dashboard | `MAHNP3MQN2w` | Product Screens |
| Properties | `MAHNP5s56C0` | Product Screens |
| Requests Pipeline | `MAHNP-WNsPE` | Product Screens |
| Deals | `MAHNP5euxYg` | Product Screens |
| Reports | `MAHNP8n8FV0` | Product Screens |
| WhatsApp Integration | `MAHNP7mcFzY` | Product Screens |
| Customer View | `MAHNPx-GJw0` | Product Screens |
| Maps | `MAHNP1VLfBU` | Product Screens |
| Team Performance | `MAHNPx_MFj8` | Product Screens |
| Property Details | `MAHNP29PR3E` | Product Screens |
| Contacts | `MAHNP3tRru8` | Product Screens |
| Commissions | `MAHNP0Y0W3k` | Product Screens |

---

## 2. Finish the Brand Kit in Canva (UI — ~5 minutes)

Open **Canva → Brand → Brand Kits → Proprt**, then:

### 2a. Logos  (Brand Kit → Logos → Add your logos)
The uploaded files live in your **Uploads** and in the `Proprt Brand / Logos` and
`/ Icons` folders. Add them to the Logos section:

| Slot | Use this asset |
|---|---|
| Primary logo | Logo — primary (dark text) |
| Logo for dark backgrounds | Logo — reversed (light text) |
| Brand icon / mark | Icon — pin mark (`proprt-icon`) |
| Icon for dark backgrounds | Icon — white pin mark |

### 2b. Colours  (Brand Kit → Brand Colours → + Add)
Create these groups and swatches (hex values are authoritative):

**Primary**
- Gold `#FDD33B`  ← primary brand colour / CTAs
- Gold Deep `#E8B916`  ← hover, stars, small accents
- Gold Soft `#FFF6D9`  ← tints, eyebrow chips

**Ink / Text**
- Ink `#333232`  ← headings, primary text
- Ink-2 `#5C5B58`  ← body text
- Ink-3 `#8A8985`  ← muted / tertiary text

**Surfaces & Lines**
- White `#FFFFFF`
- Mist `#FAF9F5`  ← alternate section background
- Light `#F4F4F4`
- Line `#ECEAE2`  ← borders
- Line-2 `#E2E0D7`  ← secondary borders

**Accent**
- Green `#1E9E6A`  ← positive / success / live

**Logo export palette** (from the official export package)
- Charcoal `#2F2F2E`
- Grey `#868685`

### 2c. Fonts  (Brand Kit → Brand Fonts)
Both fonts are already in Canva's library — just select them (no upload needed):

| Role | Font | Notes |
|---|---|---|
| Headings | **Plus Jakarta Sans** | ExtraBold (800) for H1–H3 |
| Body text | **Plus Jakarta Sans** | Regular 400 / Medium 500 |
| Wordmark / display | **Poppins** | SemiBold — matches the logo wordmark |

Set the heading style to Plus Jakarta Sans ExtraBold and body to Plus Jakarta Sans Regular.

### 2d. Graphics / Photos
Add the 12 product screenshots (in `Proprt Brand / Product Screens`) under the kit's
**Photos**/**Graphics** section so they're one click away when designing.

### 2e. Charts
Canva Brand Kits have no dedicated "charts" slot — charts automatically inherit the
**Brand Colours** set in step 2b. Once the palette above is in place, any chart added
to a Proprt design will render on-brand (lead with Gold `#FDD33B`, then Green `#1E9E6A`
for positives, Ink greys for neutrals).

---

## 3. Typography scale (for reference when designing)

| Element | Size (mobile → desktop) | Weight | Tracking |
|---|---|---|---|
| H1 (Hero) | 38 → 68px | 800 | -0.028em |
| H2 (Section) | 30 → 46px | 800 | -0.02em |
| H3 (Feature) | 23 → 29px | 800 | — |
| Body | 15.5 → 17px | 400 | 0 |
| Eyebrow | 13px caps | 700 | 0.08em |

Visual system: card radius **18px**, control radius **12px**, warm-tinted shadows.

---

## 4. Ongoing management

- New brand assets: drop them in `public/brand/` or `public/screens/`, deploy, then
  re-upload via the same flow (Canva pulls from `https://proprt.app/...`).
- The published brand templates can be re-generated or extended at any time using the
  Proprt brand kit ID `kAHNP9eeaMc`.
