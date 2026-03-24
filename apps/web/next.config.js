import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/przewodniki", destination: "/guides", permanent: true },
      { source: "/przewodniki/:path*", destination: "/guides/:path*", permanent: true },
    ];
  },
  transpilePackages: ["@ksefuj/validator"],
  webpack: (config, { isServer }) => {
    // Handle libxml2-wasm for browser usage
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        module: false,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
