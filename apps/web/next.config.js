import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// How-to posts that moved from /blog to /guides (same slug). PL has no locale prefix.
const movedToGuides = {
  "": ["aplikacja-podatnika-ksef-pierwsza-faktura", "uprawnienia-ksef-ksiegowa", "logowanie-ksef"],
  "/en": ["ksef-taxpayer-app-first-invoice", "ksef-accountant-access", "ksef-login"],
  "/uk": [
    "pershyy-rakhunok-v-aplikatsiyi-podatnyka",
    "dostup-do-ksef-dlya-bukhgaltera",
    "vkhid-do-ksef",
  ],
};

const movedToGuidesRedirects = Object.entries(movedToGuides).flatMap(([prefix, slugs]) =>
  slugs.map((slug) => ({
    source: `${prefix}/blog/${slug}`,
    destination: `${prefix}/guides/${slug}`,
    permanent: true,
  })),
);

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
      { source: "/walidator", destination: "/validator", permanent: true },
      { source: "/przewodniki", destination: "/guides", permanent: true },
      { source: "/przewodniki/:path*", destination: "/guides/:path*", permanent: true },
      { source: "/poradniki", destination: "/guides", permanent: true },
      { source: "/poradniki/:path*", destination: "/guides/:path*", permanent: true },
      { source: "/kurs-nbp", destination: "/waluty", permanent: true },
      ...movedToGuidesRedirects,
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
