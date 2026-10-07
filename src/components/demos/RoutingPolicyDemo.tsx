"use client";

import { useState } from "react";

const policies = ["Balanced", "Cost", "Latency", "Quality"] as const;

const candidates = [
  { name: "Claude Sonnet 4", cost: "$$", latency: "420ms", quality: "High" },
  { name: "GPT-4.1 mini", cost: "$", latency: "180ms", quality: "Medium" },
  { name: "Gemini 2.5 Flash", cost: "$", latency: "160ms", quality: "Medium" },
];

const pick = {
  Balanced: 0,
  Cost: 2,
  Latency: 2,
  Quality: 0,
} as const;

export function RoutingPolicyDemo() {
  const [policy, setPolicy] = useState<(typeof policies)[number]>("Balanced");
  const selected = pick[policy];

  return (
    <div className="min-w-0 border border-border bg-surface">
      <div className="flex flex-wrap gap-2 border-b border-border p-3">
        {policies.map((item) => (
          <button
            key={item}
            type="button"
            className={`h-8 rounded-[10px] border px-3 text-[13px] ${
              item === policy ? "border-foreground bg-foreground text-background" : "border-border text-muted"
            }`}
            onClick={() => setPolicy(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {candidates.map((candidate, index) => (
        <div key={candidate.name} className={`grid min-w-0 grid-cols-[minmax(0,1fr)_52px_64px] items-center gap-3 border-b border-border px-4 py-3 text-[13px] last:border-b-0 ${index === selected ? "bg-background" : ""}`}>
          <span className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full ${index === selected ? "bg-primary" : "bg-border-strong"}`} />
            {candidate.name}
          </span>
          <span className="font-mono text-muted">{policy === "Quality" ? candidate.quality : candidate.cost}</span>
          <span className="font-mono text-muted">{candidate.latency}</span>
        </div>
      ))}
    </div>
  );
}
