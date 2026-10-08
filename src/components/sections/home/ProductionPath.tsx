"use client";

import { useEffect, useRef, useState } from "react";
import { HairlineFigure } from "@/components/figures/HairlineFigure";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    title: "Pick from the catalog",
    body: "Or skip the choice and let a policy pick by price or speed.",
  },
  {
    title: "Point the client at one URL",
    body: "Chat, image, and audio use that same body.",
  },
  {
    title: "Send a sample",
    body: "You can see the request, the reply, and the token count on the model page.",
  },
  {
    title: "Leave the client alone",
    body: "Later you change the model field. You do not rewrite the integration.",
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
        <div className="border-b border-border px-6 py-10 md:px-10 lg:border-r lg:border-b-0 lg:px-12 lg:py-12">
          <Reveal>
            <h2 className="max-w-[11em] text-[clamp(2rem,3vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.03em]">
              Open the catalog. Ship on <span className="text-primary">one API</span>.
            </h2>
          </Reveal>
          <HairlineFigure
            name="cabinet"
            intensity={0.4}
            label="A rack of blades, standing in for the path from one API to production."
            className="figure-mask mt-10 w-full max-w-[460px]"
          />
        </div>
        <ol className="flex flex-col justify-center gap-8 px-6 py-10 md:px-10 lg:px-12 lg:py-12">
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
