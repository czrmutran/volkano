import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qyucqdfspnllcewvgbhj.supabase.co",
      },
    ],
  },
};

export default nextConfig;


