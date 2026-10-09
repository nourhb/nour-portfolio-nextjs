import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    proxyClientMaxBodySize: "20mb",
  },
};

export default nextConfig;
