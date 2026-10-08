import { FallbackPanel } from "@/components/services/FallbackPanel";
import { ObservabilityPanel } from "@/components/services/ObservabilityPanel";
import { RoutingPanel } from "@/components/services/RoutingPanel";

type ServiceMenuSceneProps = {
  kind: "routing" | "fallback" | "observability";
};

export function ServiceMenuScene({ kind }: ServiceMenuSceneProps) {
  return (
    <span aria-hidden="true" className={`mega-scene mega-scene--${kind}`} inert>
      <span className="mega-scene-fit">
        {kind === "routing" ? <RoutingPanel scope="menu" /> : null}
        {kind === "fallback" ? <FallbackPanel /> : null}
        {kind === "observability" ? <ObservabilityPanel bare scope="menu" /> : null}
      </span>
    </span>
  );
}
