import type { FooterColumn, NavItem, SocialLink } from "@/types/navigation";
import { models } from "@/data/models";

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
    title: "Product",
    links: [
      { label: "Unified API", href: "/services#unified-api" },
      { label: "Smart Routing", href: "/services#smart-routing" },
      { label: "Pricing", href: "/pricing" },
      { label: "Checkout", href: "/checkout" },
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
    title: "Platform",
    links: [
      { label: "Observability", href: "/services#observability" },
      { label: "Fallbacks", href: "/services#fallbacks" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
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

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
];
