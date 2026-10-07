import type { FigureKey } from "@/types/mega-menu";
import {
  FallbackFigure,
  ModelCatalogFigure,
  ObservabilityFigure,
  RoutingFigure,
  TextReasoningFigure,
  VisionFigure,
} from "@/components/figures/MegaFigures";

const figures = {
  "text-reasoning": TextReasoningFigure,
  vision: VisionFigure,
  "model-catalog": ModelCatalogFigure,
  routing: RoutingFigure,
  fallback: FallbackFigure,
  observability: ObservabilityFigure,
} as const;

export function MegaFigure({ figure, large = false }: { figure: FigureKey; large?: boolean }) {
  const Figure = figures[figure];
  return <Figure large={large} />;
}
