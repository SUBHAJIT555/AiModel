import type { HeroRoute } from "@/data/hero";

const rows = [
  ["model", (route: HeroRoute) => route.model],
  ["latency", (route: HeroRoute) => route.latency],
  ["status", (route: HeroRoute) => route.status],
  ["tokens", (route: HeroRoute) => route.tokens],
] as const;

export function ResponsePanel({ route }: { route: HeroRoute }) {
  return (
    <div className="mx-auto mt-4 w-full max-w-[420px] rounded-[12px] border border-border bg-surface px-4 py-3">
      <p className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">Demo response</p>
      <dl className="mt-2 space-y-1 font-mono text-[12px] leading-5">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[88px_1fr]">
            <dt className="text-muted">{label}</dt>
            <dd className="text-foreground">{value(route)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
