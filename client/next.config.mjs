/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "theme.hstatic.net",
      },
      {
        protocol: "https",
        hostname: "bossluxurywatch.vn",
      },
      {
        protocol: "https",
        hostname: "citizenwatch.widen.net",
      },
      {
        protocol: "https",
        hostname: "cdn.tgdd.vn",
      },
      {
        protocol: "https",
        hostname: "empireluxury.vn",
      },
      {
        protocol: "https",
        hostname: "bizweb.dktcdn.net",
      },
      {
        protocol: "https",
        hostname: "media.rolex.com",
      },
      {
        protocol: "https",
        hostname: "donghoduyanh.com",
      },
    ],
  },
};

export default nextConfig;
