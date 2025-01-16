import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.balaan.io",
      },
    ],
  },
};

export default nextConfig;
