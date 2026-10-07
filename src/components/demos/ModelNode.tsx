import { cn } from "@/lib/cn";
import type { HeroRoute } from "@/data/hero";

type ModelNodeProps = {
  route: HeroRoute;
  active: boolean;
  onSelect: () => void;
};

export function ModelNode({ route, active, onSelect }: ModelNodeProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "rounded-[10px] border bg-surface px-3 py-3 text-left transition-[border-color,background-color] duration-[160ms] ease-[var(--ease-out)]",
        active ? "border-primary/45 bg-surface" : "border-border hover:border-border-strong",
      )}
      onClick={onSelect}
    >
      <span className="flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em]">
        <span className={cn("size-1.5 rounded-full", active ? "bg-primary" : "bg-border-strong")} />
        {route.label}
      </span>
      <span className="mt-1 block truncate font-mono text-[11px] text-muted">{route.model}</span>
      <span className="mt-2 block font-mono text-[11px] text-muted">{route.latency}</span>
    </button>
  );
}
