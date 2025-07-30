import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gomanga-api.vercel.app",
      },
    ],
  },
};

export default nextConfig;
