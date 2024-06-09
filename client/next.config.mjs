/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "theme.hstatic.net",
      },
    ],
  },
};

export default nextConfig;
