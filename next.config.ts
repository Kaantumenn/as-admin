import type { NextConfig } from "next";

const apiDestination =
  process.env.API_URL?.trim() ||
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  "http://173.249.60.249:3000";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/external-api/:path*",
        destination: `${apiDestination.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
