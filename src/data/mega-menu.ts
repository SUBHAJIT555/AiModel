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
      href: "/models?category=reasoning",
      figure: "text-reasoning",
      preview: [
        { name: "Claude Opus 4", provider: "Anthropic", providerSlug: "anthropic", meta: "200k" },
        { name: "o3", provider: "OpenAI", providerSlug: "openai", meta: "200k" },
        { name: "DeepSeek R1", provider: "DeepSeek", providerSlug: "deepseek", meta: "128k" },
      ],
    },
    leftBottom: {
      title: "Vision & Multimodal",
      description: "Image, audio, and video models on the same gateway.",
      href: "/models?category=vision",
      figure: "vision",
      preview: [
        { name: "Claude 3.5 Sonnet", provider: "Anthropic", providerSlug: "anthropic", meta: "200k" },
        { name: "GPT-4o", provider: "OpenAI", providerSlug: "openai", meta: "128k" },
        { name: "Pixtral Large", provider: "Mistral", providerSlug: "mistral", meta: "128k" },
      ],
    },
    main: {
      title: "Model Catalog",
      description: "Capabilities, context windows, and providers in one index.",
      href: "/models",
      figure: "model-catalog",
      preview: [
        { name: "GPT-4.1", provider: "OpenAI", providerSlug: "openai", meta: "1M" },
        { name: "Claude Opus 4", provider: "Anthropic", providerSlug: "anthropic", meta: "200k" },
        { name: "Gemini 2.5 Pro", provider: "Google", providerSlug: "google", meta: "1M" },
        { name: "Llama 4 Maverick", provider: "Meta", providerSlug: "meta", meta: "1M" },
        { name: "DeepSeek V3", provider: "DeepSeek", providerSlug: "deepseek", meta: "128k" },
        { name: "Flux 1.1 Pro", provider: "Black Forest", providerSlug: "black-forest", meta: "image" },
      ],
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
      href: "/services#smart-routing",
      figure: "routing",
    },
    leftBottom: {
      title: "Observability",
      description: "See latency, cost, and errors for every routed request.",
      href: "/services#observability",
      figure: "observability",
    },
    main: {
      title: "Automatic Fallbacks",
      description: "Move a request to the next healthy model when one fails.",
      href: "/services#fallbacks",
      figure: "fallback",
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
