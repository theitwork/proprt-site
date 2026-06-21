# scripts/

## `capture-screens.mjs` — Playwright screenshot recapture

Recaptures product screenshots from the live app into `public/screens/` at **1901×990**
(the native `SCREEN_ASPECT`). The screenshot list is parsed from `lib/screens.ts`, so it
always matches the site; only the **routes** are supplied here.

### 1. Configure routes
Edit `screens.routes.json` — map each filename to its app route:
```json
{ "dashboard.png": { "path": "/dashboard", "prep": [] },
  "deals.png":     { "path": "/deals", "prep": [{ "wait": 800 }] } }
```
`prep` steps (optional, run after navigation): `{ "click": "selector" }`,
`{ "waitFor": "selector" }`, `{ "wait": milliseconds }`. Leave `path` empty to skip.

### 2. Provide access (see ../docs/GAP-ANALYSIS.md §A)
```bash
export PROPRT_BASE_URL="https://app.proprt.app"
export PROPRT_EMAIL="..."      # do not commit
export PROPRT_PASSWORD="..."
```
First run saves the session to `scripts/.auth.json` (gitignored) and reuses it after.

### 3. Run
```bash
node scripts/capture-screens.mjs                  # all mapped screens
node scripts/capture-screens.mjs dashboard.png    # a subset
```

> ⚠️ Requires network egress to the app + Supabase host. In restricted-egress
> environments this is blocked (`403 Host not in allowlist`) — use the Asset Manager
> (`/admin`) instead, per the runbook.

Review `git diff`/new files in `public/screens/`, then commit on the working branch.
