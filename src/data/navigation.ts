import type { FooterColumn, NavItem } from "@/types/navigation";
import { models } from "@/data/models";
import { services } from "@/data/services";

const featuredModels = models
  .filter((model) => model.featured)
  .map((model) => ({
    label: model.name,
    href: `/models/${model.slug}`,
    description: model.provider,
  }));

export const primaryNav: NavItem[] = [
  { label: "Models", href: "/models", mega: "models" },
  { label: "Services", href: "/services", mega: "services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Models",
    links: [
      { label: "All models", href: "/models" },
      ...featuredModels.map((model) => ({ label: model.label, href: model.href })),
    ],
  },
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services" },
      ...services.map((service) => ({ label: service.name, href: `/services/${service.slug}` })),
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Acceptable use", href: "/legal/acceptable-use" },
    ],
  },
];
