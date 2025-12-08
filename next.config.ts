import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // @ts-expect-error – eslint is valid in Next.js but missing in TS types
  eslint: {
    ignoreDuringBuilds: true,
  },
} satisfies NextConfig;

export default nextConfig;
