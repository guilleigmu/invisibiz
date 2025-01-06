/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  },
};

export default nextConfig;
