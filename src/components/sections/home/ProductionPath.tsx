"use client";

import { useEffect, useRef, useState } from "react";
import { HairlineFigure } from "@/components/figures/HairlineFigure";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    title: "Choose your model",
    body: "Browse the model catalog or select an automatic routing strategy.",
  },
  {
    title: "Integrate one API",
    body: "Use the same request structure across supported model categories.",
  },
  {
    title: "Test your workflow",
    body: "Preview requests, responses, usage and routing behavior through the demo interface.",
  },
  {
    title: "Go live",
    body: "Move from the template flow into your own production integration.",
  },
];

export function ProductionPath() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const nodes = refs.current.filter((node): node is HTMLLIElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const indexes = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Number((entry.target as HTMLLIElement).dataset.index ?? 0));
        if (indexes.length === 0) return;
        setActive((current) => Math.max(current, ...indexes));
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: 0.6 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-surface">
      <div className="home-frame grid border-t border-border lg:grid-cols-2">
        <div className="border-b border-border px-6 py-14 md:px-10 lg:border-r lg:border-b-0 lg:px-12 lg:py-16">
          <Reveal>
            <h2 className="max-w-[11em] text-[clamp(2rem,3vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.03em]">
              Your path from <span className="text-primary">one API</span> to production.
            </h2>
          </Reveal>
          <HairlineFigure
            name="cabinet"
            intensity={0.4}
            label="A rack of blades, standing in for the path from one API to production."
            className="figure-mask mt-10 w-full max-w-[460px]"
          />
        </div>
        <ol className="flex flex-col justify-center gap-10 px-6 py-14 md:px-10 lg:px-12 lg:py-20">
          {steps.map((step, index) => (
            <li
              key={step.title}
              data-index={index}
              ref={(node) => {
                refs.current[index] = node;
              }}
              className="flex gap-4"
            >
              <span
                className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-[12px] ${
                  index <= active ? "bg-primary text-primary-foreground" : "border border-border-strong text-muted"
                }`}
              >
                {index + 1}
              </span>
              <span>
                <h3 className="text-[16px] font-medium tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 max-w-sm text-[14px] leading-6 text-muted">{step.body}</p>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
