/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
