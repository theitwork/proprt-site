"use client";

import { useEffect } from "react";

/**
 * Root error boundary. Replaces Next's default "Application error" screen.
 *
 * The most common production failure for a statically-hosted SPA is a stale
 * deploy: the browser cached an old index.html that points at JS chunk hashes
 * the new deploy has since removed, so loading them 404s and React throws a
 * ChunkLoadError. We detect that and reload once (guarded against loops) to
 * pull the fresh HTML + chunks. Any other error shows a friendly retry screen.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const msg = `${error?.name || ""} ${error?.message || ""}`;
    const isChunkError =
      error?.name === "ChunkLoadError" ||
      /ChunkLoadError|Loading chunk|dynamically imported module|module script failed|Loading CSS chunk/i.test(
        msg,
      );
    if (isChunkError && typeof window !== "undefined") {
      const KEY = "proprt-stale-reload";
      if (!sessionStorage.getItem(KEY)) {
        sessionStorage.setItem(KEY, "1");
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          background: "#FFFDF6",
          color: "#1A1A17",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <div
            style={{
              width: 56,
              height: 56,
              margin: "0 auto 20px",
              borderRadius: 16,
              background: "#FDE89A",
              display: "grid",
              placeItems: "center",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            !
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 10px" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#55534D", margin: "0 0 22px" }}>
            We hit a snag loading the page. Reloading usually fixes it.
          </p>
          <button
            onClick={() => {
              try {
                sessionStorage.removeItem("proprt-stale-reload");
              } catch {}
              reset();
              if (typeof window !== "undefined") window.location.reload();
            }}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: 999,
              background: "#1A1A17",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14.5,
              padding: "12px 22px",
            }}
          >
            Reload page
          </button>
        </div>
      </body>
    </html>
  );
}
