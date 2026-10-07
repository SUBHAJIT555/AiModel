export const siteConfig = {
  name: "Aimodel",
  description:
    "One API for hundreds of AI models. Route requests, compare capabilities, and fall back across providers through a single gateway.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  docsUrl: "https://docs.example.com",
  ctaHref: "/pricing",
  statusLabel: "All systems operational",
} as const;
