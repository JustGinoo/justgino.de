import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/en/imprint", destination: "/en/impressum", permanent: true },
      { source: "/en/privacy", destination: "/en/datenschutz", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
