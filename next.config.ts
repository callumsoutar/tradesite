import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "35mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/get-a-draft",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/preview/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
