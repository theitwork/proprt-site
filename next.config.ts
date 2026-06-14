import type { NextConfig } from "next";

// Deployed on Vercel at the root domain (proprt.app), so no basePath/assetPrefix.
// Images are served unoptimized to preserve the full-resolution product screenshots
// and their focal crops. NEXT_PUBLIC_BASE_PATH stays empty in this setup.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
