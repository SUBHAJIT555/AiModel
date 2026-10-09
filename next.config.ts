import type { NextConfig } from "next";

const phpApi = "http://127.0.0.1:8089";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return { beforeFiles: [], afterFiles: [], fallback: [] };
    }
    return {
      beforeFiles: [
        { source: "/api/mpurse.php", destination: `${phpApi}/mpurse.php` },
        { source: "/api/mpurse-webhook.php", destination: `${phpApi}/mpurse-webhook.php` },
        { source: "/api/submit.php", destination: `${phpApi}/submit.php` },
        { source: "/mail.php", destination: `${phpApi}/submit.php` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
