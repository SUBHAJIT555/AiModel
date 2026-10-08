import type { ReactNode } from "react";
import { HairlineFigure } from "@/components/figures/HairlineFigure";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import type { Service } from "@/types/service";

const figures = {
  router: {
    name: "router" as const,
    label: "Line drawing of a router, standing beside the routing demo.",
  },
  branches: {
    name: "branches" as const,
    label: "Line drawing of branches, standing beside the fallback path.",
  },
  cabinet: {
    name: "cabinet" as const,
    label: "Line drawing of a cabinet, standing beside workspace controls.",
  },
};

export function ServiceSplit({
  service,
  flip = false,
  figure,
  children,
}: {
  service: Service;
  flip?: boolean;
  figure?: keyof typeof figures;
  children: ReactNode;
}) {
  const drawing = figure ? figures[figure] : null;

  return (
    <section id={service.anchor} className="scroll-mt-28 bg-surface">
      <div className="home-frame border-t border-border lg:grid lg:grid-cols-2">
        <Reveal
          className={cn(
            "flex h-full flex-col px-6 pt-10 md:px-10 lg:px-12 lg:pt-12",
            flip && "lg:order-2 lg:border-l lg:border-border",
          )}
        >
          <div>
            <p className="font-mono text-[12px] tracking-[0.08em] text-muted uppercase">
              {service.index} / {service.name}
            </p>
            <h2 className="mt-3 max-w-[12em] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.035em]">
              {service.sectionTitle}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">{service.description}</p>
            {drawing ? (
              <HairlineFigure
                name={drawing.name}
                label={drawing.label}
                intensity={0.35}
                className="figure-mask mt-8 hidden w-full max-w-[300px] lg:block"
              />
            ) : null}
          </div>
          <ul className="mt-8 max-w-md border-t border-border pb-10 lg:mt-auto lg:pb-12">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 border-b border-border py-2.5 text-[14px]">
                <span aria-hidden className="mt-[9px] size-1 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal
          delay={0.08}
          className={cn(
            "border-t border-border bg-[#f6f7f9] lg:border-t-0",
            flip ? "" : "lg:border-l lg:border-border",
          )}
        >
          <div className="dashed-grid flex h-full min-h-[480px] items-center justify-center px-4 py-10 md:px-8">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
