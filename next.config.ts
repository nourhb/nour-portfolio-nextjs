import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    proxyClientMaxBodySize: "20mb",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nour-el-houda-bouajila.rf.gd",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
