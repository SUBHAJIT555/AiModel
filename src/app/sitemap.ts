import type { MetadataRoute } from "next";
import { models } from "@/data/models";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/models",
    "/services",
    "/pricing",
    "/contact",
    "/checkout",
    "/checkout/payment",
    "/payment/success",
    "/payment/cancel",
    "/payment/failed",
    "/legal/terms",
    "/legal/privacy",
    "/legal/cookies",
    "/legal/acceptable-use",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path || "/"}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6,
  }));

  for (const model of models) {
    entries.push({
      url: `${siteConfig.url}/models/${model.slug}`,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  for (const service of services) {
    entries.push({
      url: `${siteConfig.url}/services/${service.slug}`,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  return entries;
}
