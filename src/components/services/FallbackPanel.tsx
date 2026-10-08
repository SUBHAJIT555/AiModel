"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/layout/LogoMark";
import { ProviderMark } from "@/components/models/ProviderMark";
import { easeOut } from "@/components/motion/transitions";

const steps = [
  { title: "Primary model", detail: "Healthy", slug: "" },
  { title: "Request sent", detail: "Claude Sonnet 4", slug: "anthropic" },
  { title: "Primary", detail: "Timeout", slug: "" },
  { title: "Fallback rule", detail: "Triggered", slug: "" },
  { title: "Secondary model", detail: "GPT-4.1 mini accepted", slug: "openai" },
  { title: "Response", detail: "Delivered", slug: "" },
];

function readClock(date = new Date()) {
  return {
    time: date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
    date: date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }),
  };
}

export function FallbackPanel() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? steps.length : 0);
  const [paused, setPaused] = useState(false);
  const [clock, setClock] = useState<{ time: string; date: string } | null>(null);
  const visible = steps.slice(0, reduce ? steps.length : count).reverse();

  useEffect(() => {
    const tick = () => setClock(readClock());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const wait = count === 0 ? 500 : count >= steps.length ? 1800 : 900;
    const id = window.setTimeout(() => {
      setCount((current) => (current >= steps.length ? 0 : current + 1));
    }, wait);
    return () => window.clearTimeout(id);
  }, [count, paused, reduce]);

  return (
    <div
      className="w-[280px] rounded-[42px] border border-border bg-surface p-[9px] shadow-[0_1px_1px_rgb(17_19_24/0.04),0_24px_50px_-20px_rgb(17_19_24/0.28)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[540px] overflow-hidden rounded-[34px] bg-[radial-gradient(ellipse_at_top,#ece8ff_0%,#f3f4f7_42%,#e8eaee_100%)]">
        <div className="flex items-center justify-between px-6 pt-3 text-[12px] font-semibold tracking-[-0.02em]">
          <span>{clock?.time ?? "\u00a0"}</span>
          <span className="inline-flex items-center gap-1">
            <svg viewBox="0 0 18 12" className="h-2.5 w-4" aria-hidden>
              <rect x="0" y="7" width="3" height="5" rx="0.6" fill="currentColor" />
              <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.6" fill="currentColor" />
              <rect x="9" y="2" width="3" height="10" rx="0.6" fill="currentColor" />
              <rect x="13.5" y="0" width="3" height="12" rx="0.6" fill="currentColor" opacity="0.35" />
            </svg>
            <svg viewBox="0 0 25 12" className="h-2.5 w-6" aria-hidden>
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" fill="none" stroke="currentColor" strokeOpacity="0.45" />
              <rect x="2" y="2" width="14" height="8" rx="1.2" fill="currentColor" />
              <rect x="22.5" y="3.5" width="1.5" height="5" rx="0.6" fill="currentColor" opacity="0.45" />
            </svg>
          </span>
        </div>
        <span aria-hidden className="absolute top-2.5 left-1/2 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-[#111318]" />

        <p className="mt-8 text-center text-[42px] leading-none font-medium tracking-[-0.04em]">{clock?.time ?? "\u00a0"}</p>
        <p className="mt-1 text-center text-[13px] text-muted">{clock?.date ?? "\u00a0"}</p>

        <ol aria-label="Fallback notifications" className="mt-6 flex flex-col gap-2 px-3">
          <AnimatePresence initial={false}>
            {visible.map((item) => (
              <motion.li
                key={item.title}
                layout
                initial={reduce ? false : { opacity: 0, y: -28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.45, ease: easeOut }}
                className="flex items-start gap-2.5 rounded-[18px] bg-white/80 px-3 py-2.5 shadow-[0_10px_24px_-16px_rgb(17_19_24/0.45)] backdrop-blur-md"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-white shadow-[0_1px_1px_rgb(17_19_24/0.06)]">
                  {item.slug ? (
                    <ProviderMark slug={item.slug} name={item.detail} size="md" />
                  ) : (
                    <LogoMark className="h-4 w-4" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] font-semibold tracking-[-0.01em]">Aimodel</span>
                    <span className="font-mono text-[10px] text-muted">{clock?.time ?? ""}</span>
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-4 font-medium tracking-[-0.02em]">{item.title}</span>
                  <span className="mt-0.5 block truncate text-[12px] text-muted">{item.detail}</span>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
        <p className="sr-only">
          A request stays healthy, is sent to Claude Sonnet 4, times out, triggers a fallback, is accepted by GPT-4.1
          mini, and is delivered as one response.
        </p>
      </div>
    </div>
  );
}
