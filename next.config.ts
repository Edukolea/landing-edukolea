import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  // Pages can be prerendered; /api/contacto runs on Vercel's Node.js runtime.
  cacheComponents: false,
  partialPrefetching: false,
  experimental: { agentFeedback: true },
};
export default nextConfig;
