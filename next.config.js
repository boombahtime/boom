/** @type {import('next').NextConfig} */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "boombahtime-media.s3.us-east-2.amazonaws.com",
        port: "",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
