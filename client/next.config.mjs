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
    ],
  },
};

export default nextConfig;
