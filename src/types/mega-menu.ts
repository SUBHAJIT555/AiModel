export type FigureKey =
  | "text-reasoning"
  | "vision"
  | "model-catalog"
  | "routing"
  | "fallback"
  | "observability";

export type MegaIconKey = "network" | "waypoints";

export type MegaMenuKey = "models" | "services";

export type MegaMenuPreview = {
  name: string;
  provider: string;
  providerSlug: string;
  meta: string;
};

export type MegaMenuFeature = {
  title: string;
  description: string;
  href: string;
  figure: FigureKey;
  preview?: MegaMenuPreview[];
};

export type MegaMenuConfig = {
  key: MegaMenuKey;
  trigger: string;
  layout: "hero-right" | "hero-left";
  copy: "end" | "start";
  leftTop: MegaMenuFeature;
  leftBottom: MegaMenuFeature;
  main: MegaMenuFeature;
  footer: {
    title: string;
    description: string;
    href: string;
    cta: string;
    icon: MegaIconKey;
  };
};
