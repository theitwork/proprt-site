# Update Runbook — how to keep proprt-site in sync with the app

Step-by-step for every kind of update. For *where* things live see
[`CONTENT-INVENTORY.md`](./CONTENT-INVENTORY.md); for *what* to change see
[`GAP-ANALYSIS.md`](./GAP-ANALYSIS.md).

---

## 0. Local setup & verify

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit — run before every commit
npm run build      # production build — must pass before push
```

Always run `typecheck` + `build` before pushing. Deploy is automatic on push
(GitHub → Vercel / Pages).

---

## 1. Replace screenshots

Filenames are the contract. Replacing an image with the **same filename** needs no code
change. Adding/removing a screen means editing `lib/screens.ts` (§4 below).

### Path A — Asset Manager (no code, works today)
1. Open `https://www.proprt.app/admin` (or `/admin` on a local/preview build).
2. Paste a **fine-grained GitHub token** scoped to `theitwork/proprt-site` with
   **Contents: Read and write** (stored only in the browser tab).
3. "Replace" each image → "Commit". It pushes to `main` and redeploys (~1–2 min).
4. Match the original image type/size where possible (PNG→PNG, ~1901×990).

> Note: the Asset Manager commits to **`main`** (`app/admin/page.tsx:15`). If you must
> stage screenshots on a feature branch first, use Path B or commit files directly.

### Path B — Playwright automated capture (needs access — see GAP-ANALYSIS §A)
Prerequisites: egress allowlist for `app.proprt.app` + Supabase host, and credentials.

```bash
export PROPRT_BASE_URL="https://app.proprt.app"
export PROPRT_EMAIL="..."         # do NOT commit
export PROPRT_PASSWORD="..."
# 1) Fill scripts/screens.routes.json (filename -> route + optional prep steps)
node scripts/capture-screens.mjs              # captures all mapped screens
node scripts/capture-screens.mjs dashboard.png deals.png   # subset
```

Outputs to `public/screens/` at **1901×990**. Review the diff, then commit on the
feature branch. See `scripts/README.md`.

---

## 2. Edit copy & stats (text only)

All copy is hardcoded. Edit the relevant array/object:

| To change… | Edit |
|---|---|
| Hero / homepage section text | `app/page.tsx` (+ the section's component in `components/`) |
| A product module (title/body/bullets/screenshot) | `MODULES` in `app/product/page.tsx:25` |
| The product stat strip (25/65/45/100%) | `STATS` in `app/product/page.tsx:112` **and** any duplicate mentions (CONTENT-INVENTORY §5) |
| An audience section | `SOLUTIONS` in `app/solutions/page.tsx:15` |
| FAQ | `HOME_FAQ` in `components/faq.tsx:52` |
| Integrations list | `INTS` in `components/integrations.tsx:17` |
| Testimonials | `QUOTES` in `components/marquee.tsx:6` (currently placeholder) |
| Nav / footer links | `components/nav.tsx:11` / `components/footer.tsx:5` |

> A number like "65 screens" or "24-criterion" appears in **several** files. Grep before
> you assume one edit is enough:
> ```bash
> grep -rn "65" app components | grep -i screen
> grep -rn "24-criterion\|24 checks" app components lib
> ```

---

## 3. Add / remove a Product module (`/product`)

In `app/product/page.tsx`, add or remove an object in `MODULES` (`:25`). Each needs:
`id` (also the anchor used by the footer), `icon` (lucide-react), `iconBg`, `eyebrow`,
`title`, `body`, `points[]` (4 bullets), `shot` (a file in `public/screens/`), `alt`,
`focus {pos, zoom}`. Update `STATS` (`:113`) if the module count changes, and add a
footer link in `components/footer.tsx` if it should be discoverable.

---

## 4. Add / remove a screen, tour group, showcase or home-reveal item

Single source of truth is `lib/screens.ts`:

- **New screenshot in the gallery:** add `S("file.png", "Title", "Caption")` to the right
  group in `SCREEN_GROUPS` (`:13`), and drop the file in `public/screens/`. Update the
  group count + the global "65" if needed.
- **New gallery group (new module):** add a `{ id, title, tag, screens: [...] }` object.
- **Tour highlight:** add/edit an item in `SHOWCASE` (`:204`) — `screen`, `headline`,
  `body`, `focus {pos, zoom}` (crop into the most compelling region).
- **Homepage scroll-reveal:** add/edit `HOME_REVEAL` (`:247`). Keep these **distinct**
  from `SHOWCASE` and the product modules (different parts of the app on each page).
- The Asset Manager auto-lists any screen present in `SCREEN_GROUPS` (`app/admin/page.tsx:42`).

---

## 5. Brand assets

Replace files in `public/brand/` (same filenames) via the Asset Manager "Brand" group or
directly. Roles: `proprt-logo.svg` (nav), `proprt-logo-reversed.svg` (footer), icons +
favicons/app-icons. Brand tokens (colors/type) live in `DESIGN.md:26` and `app/globals.css`.

---

## 6. Deploy & verify checklist

- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] New/renamed screenshots exist in `public/screens/` and are referenced in `lib/screens.ts`
- [ ] Counts updated everywhere (grep — §2)
- [ ] Commit on the working branch; push; confirm the Vercel/Pages deploy is green
- [ ] Spot-check `/`, `/product`, `/tour`, `/solutions` after deploy
