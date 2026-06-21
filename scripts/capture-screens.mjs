#!/usr/bin/env node
/**
 * Recapture product screenshots from the live app with Playwright.
 *
 * - The authoritative screenshot list is parsed from `lib/screens.ts` (so it can
 *   never drift). Routes for each file come from `scripts/screens.routes.json`.
 * - Captures at 1901x990 (SCREEN_ASPECT in lib/screens.ts) into public/screens/.
 *
 * Prereqs (see docs/GAP-ANALYSIS.md §A — blocked in restricted-egress envs):
 *   - Network egress to the app + Supabase host must be allowed.
 *   - Credentials via env: PROPRT_BASE_URL, PROPRT_EMAIL, PROPRT_PASSWORD
 *     (or a saved storageState at scripts/.auth.json).
 *
 * Usage:
 *   node scripts/capture-screens.mjs                 # all files that have a route
 *   node scripts/capture-screens.mjs dashboard.png deals.png   # a subset
 */
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "screens");
const ROUTES_FILE = join(__dirname, "screens.routes.json");

const BASE_URL = process.env.PROPRT_BASE_URL || "https://app.proprt.app";
const EMAIL = process.env.PROPRT_EMAIL || "";
const PASSWORD = process.env.PROPRT_PASSWORD || "";
const VIEWPORT = { width: 1901, height: 990 };
const STORAGE = join(__dirname, ".auth.json"); // gitignored

/** Pull every S("file.png", ...) filename from lib/screens.ts — source of truth. */
function screenFilesFromSource() {
  const src = readFileSync(join(ROOT, "lib", "screens.ts"), "utf8");
  const files = new Set();
  for (const m of src.matchAll(/S\(\s*"([^"]+\.png)"/g)) files.add(m[1]);
  return [...files];
}

function loadRoutes() {
  if (!existsSync(ROUTES_FILE)) return {};
  try {
    return JSON.parse(readFileSync(ROUTES_FILE, "utf8"));
  } catch (e) {
    console.error(`Could not parse ${ROUTES_FILE}: ${e.message}`);
    return {};
  }
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error("Playwright not found. Run: npm i -D playwright && npx playwright install chromium");
    process.exit(1);
  }

  const all = screenFilesFromSource();
  const routes = loadRoutes();
  const requested = process.argv.slice(2);
  const targets = (requested.length ? requested : all).filter((f) => {
    const r = routes[f];
    if (!r || !r.path) {
      console.warn(`• skip ${f} — no route in screens.routes.json`);
      return false;
    }
    return true;
  });

  if (!targets.length) {
    console.error("\nNothing to capture. Fill scripts/screens.routes.json with { \"file.png\": { \"path\": \"/...\" } }.");
    console.error(`Source lists ${all.length} screens; ${Object.values(routes).filter((r) => r && r.path).length} have routes.`);
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    storageState: existsSync(STORAGE) ? STORAGE : undefined,
  });
  const page = await ctx.newPage();

  // Log in if we have no saved session and credentials are provided.
  if (!existsSync(STORAGE) && EMAIL && PASSWORD) {
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    const email = page.locator('input[type="email"], input[name="email"]').first();
    if (await email.count()) {
      await email.fill(EMAIL);
      await page.locator('input[type="password"], input[name="password"]').first().fill(PASSWORD);
      await page.getByRole("button", { name: /sign in|log in|login|continue/i }).first().click();
      await page.waitForLoadState("networkidle");
      await ctx.storageState({ path: STORAGE }); // reuse next run
    }
  }

  let ok = 0;
  for (const file of targets) {
    const { path: route, prep = [] } = routes[file];
    try {
      await page.goto(BASE_URL + route, { waitUntil: "networkidle" });
      // Optional prep: [{ "click": "selector" } | { "wait": ms } | { "waitFor": "selector" }]
      for (const step of prep) {
        if (step.click) await page.locator(step.click).first().click();
        if (step.waitFor) await page.locator(step.waitFor).first().waitFor();
        if (step.wait) await page.waitForTimeout(step.wait);
      }
      await page.waitForTimeout(600);
      await page.screenshot({ path: join(OUT_DIR, file) });
      console.log(`✓ ${file}  ←  ${route}`);
      ok++;
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`);
    }
  }

  await browser.close();
  console.log(`\nDone. ${ok}/${targets.length} captured into public/screens/.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
