import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Static hosting has no runtime for Cache Components / partial prefetching.
  cacheComponents: false,
  partialPrefetching: false,
  experimental: { agentFeedback: true },
};
export default nextConfig;
