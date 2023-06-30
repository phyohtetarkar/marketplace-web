/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "http",
        hostname: "static.shoppingmallmyanmar.com"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/account/shops/:slug",
        destination: "/account/shops/:slug/dashboard",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
