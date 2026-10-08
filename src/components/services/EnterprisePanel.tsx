"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ProviderMark } from "@/components/models/ProviderMark";
import { easeOut } from "@/components/motion/transitions";

const modelOptions = [
  { name: "Claude Sonnet 4", slug: "anthropic" },
  { name: "GPT-4.1", slug: "openai" },
  { name: "Gemini 2.5 Flash", slug: "google" },
  { name: "Llama 4 Maverick", slug: "meta" },
];

const regions = ["EU", "US", "Global"] as const;
const limits = ["₹25,000", "₹80,000", "₹2,00,000"] as const;
const workspaces = ["Production", "Staging"] as const;

function ChoiceTrack<T extends string>({
  label,
  value,
  options,
  layoutId,
  onChange,
  mono = false,
}: {
  label: string;
  value: T;
  options: readonly T[];
  layoutId: string;
  onChange: (next: T) => void;
  mono?: boolean;
}) {
  const reduce = useReducedMotion();
  const slide = reduce ? { duration: 0 } : { duration: 0.32, ease: easeOut };

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{label}</p>
      <div
        className="mt-2 grid rounded-full bg-[#f1f3f6] p-1"
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
        role="group"
        aria-label={label}
      >
        {options.map((item) => {
          const active = item === value;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              className={`relative h-8 rounded-full px-2 text-[13px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${mono ? "font-mono text-[12px]" : ""}`}
              onClick={() => onChange(item)}
            >
              {active ? (
                <motion.span
                  layoutId={layoutId}
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-foreground shadow-[0_2px_6px_rgb(17_19_24/0.18)]"
                  transition={slide}
                />
              ) : null}
              <span className={`relative ${active ? "text-surface" : "text-muted"}`}>{item}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Switch({ on }: { on: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span className={`relative inline-flex h-[22px] w-10 shrink-0 rounded-full p-0.5 transition-colors duration-200 ${on ? "bg-foreground" : "bg-[#d7dbe3]"}`}>
      <motion.span
        aria-hidden
        className="size-[18px] rounded-full bg-white shadow-[0_1px_2px_rgb(17_19_24/0.28)]"
        animate={{ x: on ? 18 : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.22, ease: easeOut }}
      />
    </span>
  );
}

export function EnterprisePanel() {
  const [workspace, setWorkspace] = useState<(typeof workspaces)[number]>("Production");
  const [allowed, setAllowed] = useState<string[]>(["Claude Sonnet 4", "GPT-4.1"]);
  const [region, setRegion] = useState<(typeof regions)[number]>("EU");
  const [limit, setLimit] = useState<(typeof limits)[number]>("₹80,000");
  const [fallback, setFallback] = useState(true);
  const [audit, setAudit] = useState(true);

  function toggleModel(name: string) {
    setAllowed((current) => {
      if (current.includes(name)) {
        if (current.length === 1) return current;
        return current.filter((item) => item !== name);
      }
      return [...current, name];
    });
  }

  return (
    <div className="w-full max-w-[440px] rounded-[22px] border border-border bg-surface p-5 shadow-[0_1px_1px_rgb(17_19_24/0.04),0_18px_40px_-24px_rgb(17_19_24/0.35)]">
      <p className="text-[15px] font-medium tracking-[-0.02em]">Workspace policy</p>
      <p className="mt-1 text-[12px] text-muted">Frontend preview. Nothing here is saved.</p>

      <div className="mt-5">
        <ChoiceTrack label="Workspace" value={workspace} options={workspaces} layoutId="policy-workspace" onChange={setWorkspace} />
      </div>

      <fieldset className="mt-5">
        <legend className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">Allowed models</legend>
        <ul className="mt-2">
          {modelOptions.map((model) => {
            const on = allowed.includes(model.name);
            return (
              <li key={model.name}>
                <button
                  type="button"
                  aria-pressed={on}
                  className="flex w-full items-center justify-between gap-3 border-b border-border py-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  onClick={() => toggleModel(model.name)}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className="grid size-7 shrink-0 place-items-center rounded-[8px] border border-border bg-surface">
                      <ProviderMark slug={model.slug} name={model.name} />
                    </span>
                    <span className={`truncate text-[13px] ${on ? "" : "text-muted"}`}>{model.name}</span>
                  </span>
                  <span className={`grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors duration-150 ${on ? "border-foreground bg-foreground text-surface" : "border-[#c8cdd6] bg-surface"}`}>
                    {on ? <Check className="size-3" strokeWidth={2.75} /> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="mt-5">
        <ChoiceTrack label="Region" value={region} options={regions} layoutId="policy-region" onChange={setRegion} />
      </div>

      <div className="mt-5">
        <ChoiceTrack label="Monthly usage limit" value={limit} options={limits} layoutId="policy-limit" onChange={setLimit} mono />
      </div>

      <div className="mt-5 border-t border-border">
        {(
          [
            ["Fallback", fallback, setFallback],
            ["Audit", audit, setAudit],
          ] as const
        ).map(([label, on, setOn]) => (
          <button
            key={label}
            type="button"
            role="switch"
            aria-checked={on}
            className="flex w-full items-center justify-between border-b border-border py-3 text-[13px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => setOn(!on)}
          >
            {label}
            <Switch on={on} />
          </button>
        ))}
      </div>
    </div>
  );
}
