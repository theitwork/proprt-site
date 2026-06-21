# proprt-site

Marketing & product-tour website for **Proprt** — the real-estate brokerage SaaS.
Next.js 15 (App Router) · React 19 · Tailwind v4 · Framer Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # before every commit
npm run build      # must pass before push
```

## Documentation

| Doc | What it covers |
|---|---|
| [`DESIGN.md`](./DESIGN.md) | Design system: site map, brand tokens, typography, motion, components |
| [`docs/CONTENT-INVENTORY.md`](./docs/CONTENT-INVENTORY.md) | Every page, section, claim & screenshot mapped to its code location |
| [`docs/GAP-ANALYSIS.md`](./docs/GAP-ANALYSIS.md) | What to change to match the latest app build (MFA, counts, sections) + access prereqs |
| [`docs/UPDATE-RUNBOOK.md`](./docs/UPDATE-RUNBOOK.md) | Step-by-step: screenshots, copy, modules, tour, brand, deploy |
| [`scripts/README.md`](./scripts/README.md) | Playwright screenshot recapture tool |

## Updating content

- **Screenshots:** Asset Manager at `/admin` (commits to `main`), or
  `scripts/capture-screens.mjs` (Playwright). See the runbook.
- **Copy & stats:** hardcoded in the page/component `.tsx` files; screenshot model in
  `lib/screens.ts`. See the content inventory.
