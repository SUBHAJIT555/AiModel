"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { heroRoutes } from "@/data/hero";
import { cn } from "@/lib/cn";
import { ModelNode } from "@/components/demos/ModelNode";
import { ResponsePanel } from "@/components/demos/ResponsePanel";

const routePaths = [
  "M400 0 C400 42 100 42 100 88",
  "M400 0 C400 42 300 42 300 88",
  "M400 0 C400 42 500 42 500 88",
  "M400 0 C400 42 700 42 700 88",
];

export function HeroGatewayVisual() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 420], [0, reduce ? 0 : 16]);
  const route = heroRoutes[index] ?? heroRoutes[0];

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroRoutes.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  return (
    <motion.div className="mx-auto w-full max-w-[880px]" style={{ y }}>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mx-auto w-fit rounded-[10px] border border-border bg-surface px-3.5 py-2 font-mono text-[12px] text-muted">
          Application
        </div>
        <div aria-hidden className="mx-auto h-7 w-px bg-border-strong/70" />
        <div className="mx-auto w-full max-w-[300px] rounded-[12px] border border-border bg-surface px-4 py-3 text-center">
          <p className="text-[14px] font-medium tracking-[-0.01em]">Unified API Gateway</p>
          <p className="mt-1 font-mono text-[11px] text-muted">route policy · {route.label}</p>
        </div>

        <svg
          aria-hidden
          className="mx-auto hidden h-[88px] w-full max-w-[760px] text-border-strong md:block"
          fill="none"
          viewBox="0 0 800 88"
        >
          {heroRoutes.map((item, itemIndex) => (
            <path
              key={item.id}
              id={`hero-route-${item.id}`}
              d={routePaths[itemIndex]}
              stroke="currentColor"
              strokeWidth="1"
              className={cn(itemIndex === index && "text-primary")}
            />
          ))}
          {reduce ? (
            <circle
              cx={[100, 300, 500, 700][index]}
              cy="78"
              r="3.5"
              className="fill-primary"
              fill="currentColor"
            />
          ) : (
            <circle key={route.id} r="3.5" className="fill-primary" fill="currentColor">
              <animateMotion dur="2.6s" repeatCount="indefinite">
                <mpath href={`#hero-route-${route.id}`} />
              </animateMotion>
            </circle>
          )}
        </svg>
        <div aria-hidden className="mx-auto h-7 w-px bg-border-strong/70 md:hidden" />

        <div className="mx-auto grid max-w-[760px] grid-cols-2 gap-2 md:grid-cols-4">
          {heroRoutes.map((item, itemIndex) => (
            <ModelNode
              key={item.id}
              active={itemIndex === index}
              route={item}
              onSelect={() => setIndex(itemIndex)}
            />
          ))}
        </div>
        <ResponsePanel route={route} />
      </div>
    </motion.div>
  );
}
