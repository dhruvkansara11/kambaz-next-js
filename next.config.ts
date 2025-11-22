import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // This completely skips ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;