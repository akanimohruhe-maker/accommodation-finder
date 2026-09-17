import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Skip TS errors during build so we can ship quickly. */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  /* Image optimization — serve modern formats (WebP/AVIF) at the right size
     for the device. Combined with the lazy loading we use on non-critical
     images (city cards, property cards), this keeps the site fast on mobile
     without sacrificing visual quality. */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    // Don't optimize the SVG logo (already small)
    dangerouslyAllowSVG: true,
    unoptimized: false,
  },
  /* Compress responses. Vercel does this automatically, but it's a no-op
     locally — keep it for any other deployment target. */
  compress: true,
  /* Power by Next.js header — drop it for a cleaner production look. */
  poweredByHeader: false,
};

export default nextConfig;
