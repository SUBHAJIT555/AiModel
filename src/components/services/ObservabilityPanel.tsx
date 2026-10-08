"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ProviderMark } from "@/components/models/ProviderMark";
import { easeOut } from "@/components/motion/transitions";

const ranges = ["Last hour", "24 hours", "7 days"] as const;

type Range = (typeof ranges)[number];

type Sample = {
  requests: string;
  requestNote: string;
  success: string;
  successNote: string;
  latency: string;
  latencyNote: string;
  spend: string;
  spendNote: string;
  series: number[];
  labels: string[];
};

const windows: Record<Range, Sample> = {
  "Last hour": {
    requests: "1,284",
    requestNote: "+6.1% vs prior",
    success: "99.4%",
    successNote: "+0.2 pt",
    latency: "186ms",
    latencyNote: "−8ms vs prior",
    spend: "₹1,240",
    spendNote: "This window",
    series: [210, 168, 242, 154, 140, 198, 172],
    labels: ["10:00", "10:10", "10:20", "10:30", "10:40", "10:50", "11:00"],
  },
  "24 hours": {
    requests: "12,480",
    requestNote: "+3.4% vs prior",
    success: "99.2%",
    successNote: "−0.1 pt",
    latency: "214ms",
    latencyNote: "+11ms vs prior",
    spend: "₹15,624",
    spendNote: "This window",
    series: [2100, 1680, 2460, 1540, 1320, 1980, 1400],
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
  },
  "7 days": {
    requests: "86,210",
    requestNote: "+12% vs prior",
    success: "99.0%",
    successNote: "−0.3 pt",
    latency: "228ms",
    latencyNote: "+18ms vs prior",
    spend: "₹1,08,400",
    spendNote: "This window",
    series: [14200, 12840, 13620, 11480, 10860, 12110, 11100],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
};

const providers = [
  ["OpenAI", "openai", "38%"],
  ["Anthropic", "anthropic", "27%"],
  ["Google", "google", "21%"],
  ["Other", "", "14%"],
] as const;

const models = [
  ["GPT-4.1 mini", "openai", "34%"],
  ["Claude Sonnet 4", "anthropic", "29%"],
  ["Gemini 2.5 Flash", "google", "22%"],
  ["Other", "", "15%"],
] as const;

const CHART_W = 640;
const CHART_TOP = 16;
const CHART_BASE = 118;

function plot(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((value, index) => ({
    x: (index / (values.length - 1)) * CHART_W,
    y: CHART_BASE - ((value - min) / span) * (CHART_BASE - CHART_TOP),
  }));
}

function smoothLine(points: { x: number; y: number }[]) {
  const first = points[0];
  if (!first) return "";
  let path = `M ${first.x} ${first.y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] ?? points[index];
    const current = points[index];
    const next = points[index + 1];
    const after = points[index + 2] ?? next;
    if (!previous || !current || !next || !after) continue;
    const c1x = current.x + (next.x - previous.x) / 6;
    const c1y = current.y + (next.y - previous.y) / 6;
    const c2x = next.x - (after.x - current.x) / 6;
    const c2y = next.y - (after.y - current.y) / 6;
    path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${next.x} ${next.y}`;
  }
  return path;
}

function ShareList({
  title,
  rows,
}: {
  title: string;
  rows: readonly (readonly [string, string, string])[];
}) {
  return (
    <div className="border-b border-border p-4 md:border-r md:border-b-0">
      <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{title}</p>
      <ul className="mt-3">
        {rows.map(([name, slug, share]) => (
          <li key={name} className="py-2">
            <div className="flex items-center justify-between gap-3 text-[13px]">
              <span className="flex min-w-0 items-center gap-2">
                <span className="grid size-5 shrink-0 place-items-center">
                  {slug ? <ProviderMark slug={slug} name={name} /> : <span className="size-4 rounded-[4px] border border-border" />}
                </span>
                <span className="truncate">{name}</span>
              </span>
              <span className="font-mono text-[12px] text-muted">{share}</span>
            </div>
            <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-[#eef0f3]">
              <div className="h-full rounded-full bg-foreground/75" style={{ width: share }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ObservabilityPanel({
  scope = "",
  bare = false,
}: {
  scope?: string;
  bare?: boolean;
} = {}) {
  const reduce = useReducedMotion();
  const [range, setRange] = useState<Range>("24 hours");
  const [hover, setHover] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const sample = windows[range];
  const points = plot(sample.series);
  const line = smoothLine(points);
  const last = points[points.length - 1];
  const first = points[0];
  const area = first && last ? `${line} L ${last.x} ${CHART_BASE} L ${first.x} ${CHART_BASE} Z` : "";
  const slide = reduce ? { duration: 0 } : { duration: 0.32, ease: easeOut };
  const rangeId = scope ? `${scope}-obs-range` : "obs-range";
  const areaId = scope ? `obs-area-${scope}` : "obs-area";
  const active = hover != null ? points[hover] : null;

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => {
      setRange((current) => ranges[(ranges.indexOf(current) + 1) % ranges.length]);
      setHover(null);
    }, 2600);
    return () => window.clearTimeout(id);
  }, [reduce, paused, range]);

  const metrics = [
    ["Requests", sample.requests, sample.requestNote],
    ["Success rate", sample.success, sample.successNote],
    ["Latency", sample.latency, sample.latencyNote],
    ["Estimated spend", sample.spend, sample.spendNote],
  ] as const;

  const screen = (
    <div className={bare ? "w-[760px]" : "dashed-grid px-4 py-12 md:px-8 md:py-16"}>
      <div
        className="relative mx-auto w-full max-w-[980px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <div className="rounded-[18px] border border-border bg-[#f7f8fa] p-2.5 shadow-[0_1px_1px_rgb(17_19_24/0.04),0_28px_50px_-28px_rgb(17_19_24/0.4)]">
          <div className="relative overflow-hidden rounded-[12px] border border-border bg-surface">
            <span aria-hidden className="absolute top-1.5 left-1/2 z-10 size-1.5 -translate-x-1/2 rounded-full bg-[#c5cad3]" />
            <div className="flex items-center gap-3 border-b border-border px-3.5 py-2.5">
              <span aria-hidden className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <p className="flex-1 text-center text-[12px] text-muted">Observability</p>
              <span aria-hidden className="w-[42px]" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
              <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">Demonstration data</p>
              <div className="inline-flex rounded-full bg-[#f1f3f6] p-1" role="group" aria-label="Time range">
                {ranges.map((item) => {
                  const selected = item === range;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={selected}
                      className="relative h-7 rounded-full px-3 text-[12px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      onClick={() => {
                        setRange(item);
                        setHover(null);
                      }}
                    >
                      {selected ? (
                        <motion.span
                          layoutId={rangeId}
                          aria-hidden
                          className="absolute inset-0 rounded-full bg-foreground shadow-[0_2px_6px_rgb(17_19_24/0.18)]"
                          transition={slide}
                        />
                      ) : null}
                      <span className={`relative ${selected ? "text-surface" : "text-muted"}`}>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4">
              {metrics.map(([label, value, note]) => (
                <div key={label} className="border-r border-b border-border px-4 py-3.5 last:border-r-0 md:border-b-0">
                  <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{label}</p>
                  <p className="mt-1.5 text-[22px] font-medium tracking-[-0.03em]">{value}</p>
                  <p className="mt-1 text-[12px] text-muted">{note}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-4 pt-4 pb-3">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">Request volume</p>
                <p className="text-[12px] text-muted">{range}</p>
              </div>
              <div className="relative mt-2">
                <svg
                  key={range}
                  viewBox={`0 0 ${CHART_W} 132`}
                  className="h-28 w-full text-foreground md:h-32"
                  role="img"
                  aria-label={`Requests over ${range}. Latest point ${sample.labels.at(-1) ?? ""}, ${sample.series.at(-1) ?? 0} requests.`}
                  onMouseLeave={() => setHover(null)}
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width) * CHART_W;
                    const index = Math.max(0, Math.min(sample.series.length - 1, Math.round((x / CHART_W) * (sample.series.length - 1))));
                    setHover(index);
                  }}
                >
                  <defs>
                    <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[CHART_TOP, (CHART_TOP + CHART_BASE) / 2, CHART_BASE].map((y) => (
                    <line key={y} x1="0" x2={CHART_W} y1={y} y2={y} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
                  ))}
                  <path d={area} fill={`url(#${areaId})`} />
                  <path d={line} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
                  {active ? (
                    <line x1={active.x} x2={active.x} y1={CHART_TOP} y2={CHART_BASE} stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
                  ) : null}
                  {active ? <circle cx={active.x} cy={active.y} r="3.5" fill="currentColor" /> : null}
                </svg>
                {hover != null && active ? (
                  <p
                    className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-[8px] border border-border bg-surface px-2.5 py-1.5 text-[12px] shadow-[0_8px_20px_-12px_rgb(17_19_24/0.3)]"
                    style={{ left: `${(active.x / CHART_W) * 100}%` }}
                  >
                    {sample.labels[hover]} · {sample.series[hover]?.toLocaleString("en-IN")} requests
                  </p>
                ) : null}
              </div>
              <div className="mt-1 grid grid-cols-7 text-[10px] text-muted">
                {sample.labels.map((label) => (
                  <span key={label} className="text-center">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid border-t border-border md:grid-cols-3">
              <ShareList title="Providers" rows={providers} />
              <ShareList title="Models" rows={models} />
              <div className="flex flex-col p-4">
                <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">Recent fallback</p>
                <div className="mt-3 flex flex-1 flex-col justify-center rounded-[14px] border border-border bg-[#f7f8fa] px-3.5 py-3.5">
                  <p className="font-mono text-[11px] tracking-[0.06em] text-muted">12:01</p>
                  <p className="mt-2 text-[14px] leading-6">Claude Sonnet 4 timed out.</p>
                  <p className="mt-2 flex items-center gap-1.5 text-[13px] text-muted">
                    <ProviderMark slug="openai" name="OpenAI" />
                    Served by GPT-4.1 mini
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return screen;
}
