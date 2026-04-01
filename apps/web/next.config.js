import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure logo-og.svg is bundled into all serverless functions.
  // @vercel/nft cannot trace dynamic readFileSync(join(process.cwd(), ...)) paths,
  // so we must declare the file explicitly.
  outputFileTracingIncludes: {
    "/**": ["./public/logo-og.svg"],
  },
  async redirects() {
    return [
      { source: "/walidator", destination: "/", permanent: true },
      { source: "/przewodniki", destination: "/guides", permanent: true },
      { source: "/przewodniki/:path*", destination: "/guides/:path*", permanent: true },
      { source: "/poradniki", destination: "/guides", permanent: true },
      { source: "/poradniki/:path*", destination: "/guides/:path*", permanent: true },
      { source: "/kurs-nbp", destination: "/waluty", permanent: true },
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
