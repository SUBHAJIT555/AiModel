export const siteConfig = {
  name: "Modexa",
  description:
    "One URL for the models in the catalog. Prices in rupees, and another model if the first provider does not answer.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://easy-bay.com",
  docsUrl: "https://easy-bay.com",
  ctaHref: "/pricing",
  statusLabel: "All systems operational",
} as const;
