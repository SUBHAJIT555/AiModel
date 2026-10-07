import type { MegaMenuConfig, MegaMenuKey } from "@/types/mega-menu";

export const megaMenus: Record<MegaMenuKey, MegaMenuConfig> = {
  models: {
    key: "models",
    trigger: "Models",
    layout: "hero-right",
    copy: "end",
    leftTop: {
      title: "Text & Reasoning",
      description: "Chat and long-form reasoning models behind one request shape.",
      href: "/models/helio-reason",
      figure: "text-reasoning",
    },
    leftBottom: {
      title: "Vision & Multimodal",
      description: "Image, audio, and video models on the same gateway.",
      href: "/models/northwind-vision",
      figure: "vision",
    },
    main: {
      title: "Model Catalog",
      description: "Capabilities, context windows, and providers in one index.",
      href: "/models",
      figure: "model-catalog",
    },
    footer: {
      title: "Explore all models",
      description: "Compare capabilities, context windows and pricing.",
      href: "/models",
      cta: "Browse models",
      icon: "network",
    },
  },
  services: {
    key: "services",
    trigger: "Services",
    layout: "hero-left",
    copy: "start",
    leftTop: {
      title: "Smart Routing",
      description: "Choose a model for cost, latency, quality, or availability.",
      href: "/services/smart-routing",
      figure: "routing",
    },
    leftBottom: {
      title: "Automatic Fallbacks",
      description: "Move a request to the next healthy model when one fails.",
      href: "/services/fallbacks",
      figure: "fallback",
    },
    main: {
      title: "Observability",
      description: "See latency, cost, and errors for every routed request.",
      href: "/services/observability",
      figure: "observability",
    },
    footer: {
      title: "Platform services",
      description: "Routing, reliability and monitoring in one layer.",
      href: "/services",
      cta: "View services",
      icon: "waypoints",
    },
  },
};

export function mobileLinks(key: MegaMenuKey) {
  const menu = megaMenus[key];
  return [
    menu.leftTop,
    menu.leftBottom,
    menu.main,
    {
      title: menu.footer.title,
      description: menu.footer.description,
      href: menu.footer.href,
      figure: menu.main.figure,
    },
  ];
}
