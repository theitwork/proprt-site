"use client";

import { useEffect, useMemo, useState } from "react";
import { SCREEN_GROUPS } from "@/lib/screens";
import { BASE_PATH } from "@/lib/base-path";

/**
 * Static-site CMS: a private asset manager. Lists every image in the site and
 * commits uploaded replacements straight to the GitHub repo via the API, which
 * triggers the Pages deploy. Inert without a token. Marked noindex (layout).
 */

const OWNER = "theitwork";
const REPO = "proprt-site";
const BRANCH = "main";
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
const TOKEN_KEY = "proprt-gh-token";

type Asset = { label: string; file: string; repoPath: string; url: string };
type Group = { group: string; items: Asset[] };

const BRAND_FILES = [
  "proprt-logo.svg",
  "proprt-logo-reversed.svg",
  "proprt-icon.svg",
  "proprt-icon-white.svg",
  "favicon-32.png",
  "proprt-app-icon-180.png",
  "proprt-app-icon-512.png",
];

const GROUPS: Group[] = [
  {
    group: "Brand",
    items: BRAND_FILES.map((f) => ({
      label: f,
      file: f,
      repoPath: `public/brand/${f}`,
      url: `${BASE_PATH}/brand/${f}`,
    })),
  },
  ...SCREEN_GROUPS.map((g) => ({
    group: g.title,
    items: g.screens.map((s) => ({
      label: s.title,
      file: s.file,
      repoPath: `public/screens/${s.file}`,
      url: `${BASE_PATH}/screens/${s.file}`,
    })),
  })),
];

type Staged = { file: File; previewUrl: string };

function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1] || "");
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);
  const [staged, setStaged] = useState<Record<string, Staged>>({});
  const [bust, setBust] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  useEffect(() => {
    try {
      const t = sessionStorage.getItem(TOKEN_KEY);
      if (t) {
        setToken(t);
        setTokenSaved(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const stagedCount = Object.keys(staged).length;
  const say = (m: string) => setLog((l) => [m, ...l].slice(0, 40));

  function saveToken() {
    try {
      sessionStorage.setItem(TOKEN_KEY, token.trim());
      setTokenSaved(true);
      say("Token saved for this browser session.");
    } catch {}
  }
  function clearToken() {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {}
    setToken("");
    setTokenSaved(false);
  }

  function stage(asset: Asset, file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      say(`✗ ${asset.file}: not an image file.`);
      return;
    }
    setStaged((s) => {
      // revoke any previous object URL for this path
      if (s[asset.repoPath]) URL.revokeObjectURL(s[asset.repoPath].previewUrl);
      return { ...s, [asset.repoPath]: { file, previewUrl: URL.createObjectURL(file) } };
    });
  }

  function unstage(repoPath: string) {
    setStaged((s) => {
      if (s[repoPath]) URL.revokeObjectURL(s[repoPath].previewUrl);
      const next = { ...s };
      delete next[repoPath];
      return next;
    });
  }

  async function gh(method: string, path: string, body?: unknown) {
    const res = await fetch(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token.trim()}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`${method} ${path} → ${res.status} ${txt.slice(0, 160)}`);
    }
    return res.json();
  }

  async function commitAll() {
    const entries = Object.entries(staged);
    if (!entries.length || !token.trim()) return;
    setBusy(true);
    try {
      say(`Uploading ${entries.length} file(s)…`);
      // 1) create a blob for each staged file
      const treeItems = [];
      for (const [repoPath, { file }] of entries) {
        const content = await toBase64(file);
        const blob = await gh("POST", "/git/blobs", { content, encoding: "base64" });
        treeItems.push({ path: repoPath, mode: "100644", type: "blob", sha: blob.sha });
        say(`• blob ready: ${repoPath}`);
      }
      // 2) current commit + base tree
      const ref = await gh("GET", `/git/ref/heads/${BRANCH}`);
      const headSha = ref.object.sha;
      const headCommit = await gh("GET", `/git/commits/${headSha}`);
      // 3) new tree on top of the current one
      const tree = await gh("POST", "/git/trees", {
        base_tree: headCommit.tree.sha,
        tree: treeItems,
      });
      // 4) commit + 5) move the branch
      const commit = await gh("POST", "/git/commits", {
        message: `CMS: replace ${entries.length} asset(s)`,
        tree: tree.sha,
        parents: [headSha],
      });
      await gh("PATCH", `/git/refs/heads/${BRANCH}`, { sha: commit.sha });

      // bust the cached previews so the new images show after redeploy
      const now = Date.now();
      setBust((b) => {
        const next = { ...b };
        for (const [repoPath] of entries) next[repoPath] = now;
        return next;
      });
      // clear staged
      for (const [, { previewUrl }] of entries) URL.revokeObjectURL(previewUrl);
      setStaged({});
      say(`✓ Committed ${entries.length} file(s). Deploy triggered — live in ~1–2 min.`);
    } catch (e) {
      say(`✗ ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GROUPS;
    return GROUPS.map((g) => ({
      ...g,
      items: g.items.filter(
        (a) => a.file.toLowerCase().includes(q) || a.label.toLowerCase().includes(q),
      ),
    })).filter((g) => g.items.length);
  }, [query]);

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-32 pt-[120px]">
      <h1 className="text-[30px] font-extrabold tracking-[-0.02em]">Asset Manager</h1>
      <p className="mt-2 max-w-[680px] text-[15px] leading-[1.6] text-ink-2">
        View every image on the site and replace any of them. Pick replacement files below, then
        commit — changes are pushed to GitHub and the site redeploys automatically (~1–2 min).
        Keep the same image type where possible (e.g. replace a PNG with a PNG).
      </p>

      {/* token bar */}
      <div className="mt-6 rounded-card border border-line bg-mist p-5">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex-1 min-w-[280px]">
            <span className="mb-1 block text-[12.5px] font-extrabold uppercase tracking-[0.08em] text-ink-3">
              GitHub access token
            </span>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="github_pat_…"
              className="w-full rounded-[10px] border border-line bg-white px-3 py-[10px] text-[14px] outline-none focus:border-gold-deep"
            />
          </label>
          <button
            onClick={saveToken}
            className="cursor-pointer rounded-[10px] bg-ink px-4 py-[11px] text-[13.5px] font-bold text-white"
          >
            Save token
          </button>
          {tokenSaved && (
            <button
              onClick={clearToken}
              className="cursor-pointer rounded-[10px] border border-line bg-white px-4 py-[11px] text-[13.5px] font-bold text-ink-2"
            >
              Clear
            </button>
          )}
        </div>
        <p className="mt-3 text-[12.5px] leading-[1.55] text-ink-3">
          {tokenSaved ? "✓ Token set for this session. " : "No token set — viewing only. "}
          Create a{" "}
          <a
            href={`https://github.com/settings/personal-access-tokens/new`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gold-deep underline"
          >
            fine-grained token
          </a>{" "}
          scoped to <b>{OWNER}/{REPO}</b> with <b>Contents: Read and write</b>. It is stored only in
          this browser tab (sessionStorage) and never committed.
        </p>
      </div>

      {/* staged action bar */}
      <div className="sticky top-[80px] z-20 mt-6 flex flex-wrap items-center gap-3 rounded-card border border-line bg-white/90 p-4 shadow-soft backdrop-blur">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by name…"
          className="min-w-[200px] flex-1 rounded-[10px] border border-line bg-white px-3 py-[9px] text-[14px] outline-none focus:border-gold-deep"
        />
        <span className="text-[13.5px] font-semibold text-ink-2">
          {stagedCount} staged
        </span>
        <button
          disabled={!stagedCount || !tokenSaved || busy}
          onClick={commitAll}
          className="cursor-pointer rounded-[10px] bg-gold px-5 py-[10px] text-[14px] font-extrabold text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "Committing…" : `Commit ${stagedCount || ""} replacement(s)`}
        </button>
      </div>

      {/* log */}
      {log.length > 0 && (
        <div className="mt-4 max-h-[160px] overflow-auto rounded-[10px] border border-line bg-ink/95 p-3 font-mono text-[12px] leading-[1.6] text-white/85">
          {log.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      )}

      {/* asset groups */}
      {filtered.map((g) => (
        <section key={g.group} className="mt-10">
          <h2 className="mb-4 text-[18px] font-extrabold tracking-[-0.01em]">{g.group}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((a) => {
              const s = staged[a.repoPath];
              const t = bust[a.repoPath];
              const previewSrc = s ? s.previewUrl : `${a.url}${t ? `?t=${t}` : ""}`;
              return (
                <div
                  key={a.repoPath}
                  className={`overflow-hidden rounded-[12px] border bg-white shadow-soft ${
                    s ? "border-gold-deep ring-1 ring-gold" : "border-line"
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewSrc}
                      alt={a.label}
                      onClick={() => setLightbox({ src: previewSrc, label: a.label })}
                      className="h-full w-full cursor-zoom-in object-cover object-top transition-transform duration-200 hover:scale-[1.02]"
                    />
                    {s && (
                      <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-[2px] text-[10.5px] font-extrabold text-ink">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <b className="block truncate text-[13px]" title={a.label}>
                      {a.label}
                    </b>
                    <span className="block truncate text-[11.5px] text-ink-3">{a.file}</span>
                    <div className="mt-2 flex items-center gap-2">
                      <label className="cursor-pointer rounded-[8px] border border-line bg-mist px-3 py-[7px] text-[12.5px] font-bold text-ink hover:border-gold-deep">
                        {s ? "Change" : "Replace"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => stage(a, e.target.files?.[0])}
                        />
                      </label>
                      {s && (
                        <button
                          onClick={() => unstage(a.repoPath)}
                          className="cursor-pointer text-[12.5px] font-semibold text-ink-3 underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink/90 p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.label} preview`}
        >
          <div className="mb-3 flex w-full max-w-[92vw] items-center gap-4 text-white">
            <b className="truncate text-[15px]">{lightbox.label}</b>
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="ml-auto cursor-pointer rounded-full bg-white/15 px-4 py-[7px] text-[13px] font-bold transition-colors hover:bg-white/25"
            >
              Close ✕
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.label}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] max-w-[92vw] cursor-default rounded-[10px] object-contain shadow-big"
          />
          <span className="mt-3 text-[12.5px] text-white/55">Click anywhere or press Esc to close</span>
        </div>
      )}
    </main>
  );
}
