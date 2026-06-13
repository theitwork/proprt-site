import type { NextConfig } from "next";

// Static export for GitHub Pages. Served from a project subpath
// (https://<org>.github.io/proprt-site), so basePath/assetPrefix are set
// via NEXT_PUBLIC_BASE_PATH at build time (empty for local dev).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
