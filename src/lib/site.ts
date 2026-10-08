export const siteConfig = {
  name: "Aimodel",
  description:
    "One URL for the models in the catalog. Prices in rupees, and another model if the first provider does not answer.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  docsUrl: "https://docs.example.com",
  ctaHref: "/pricing",
  statusLabel: "All systems operational",
} as const;
