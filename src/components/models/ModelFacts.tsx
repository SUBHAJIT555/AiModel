import type { Model } from "@/types/model";

export function ModelFacts({ model }: { model: Model }) {
  const facts = [
    model.contextWindow ? `${model.contextWindow.toLocaleString("en-US")} context` : null,
    model.latencyClass ?? null,
    model.status,
  ].filter((fact): fact is string => Boolean(fact));

  return (
    <dl className="mt-8 grid max-w-xl grid-cols-2 gap-4 border border-border p-4 text-sm">
      {facts.map((fact) => (
        <div key={fact}>
          <dt className="font-mono text-[0.75rem] text-muted uppercase">Spec</dt>
          <dd className="mt-1">{fact}</dd>
        </div>
      ))}
    </dl>
  );
}
