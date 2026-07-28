import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "://ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "://youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
