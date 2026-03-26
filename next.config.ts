/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all domains (or restrict to your API/host)
      },
    ],
  },
};

module.exports = nextConfig;