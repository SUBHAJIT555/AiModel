import { HairlineFigure } from "@/components/figures/HairlineFigure";
import { Reveal } from "@/components/motion/Reveal";

const features = [
  {
    title: "One API format",
    body: "Use one consistent request and response structure across providers and model families.",
    visual: (
      <HairlineFigure
        name="terminal"
        intensity={0.4}
        label="Line drawing of a terminal, standing in for one API format."
        className="w-full max-w-[500px]"
      />
    ),
  },
  {
    title: "Global model access",
    body: "Explore models across text, reasoning, vision, image, audio and video from one catalog.",
    visual: (
      <HairlineFigure
        name="phosphor"
        intensity={0.4}
        label="Dot matrix figure, standing in for models available from one catalog."
        className="w-full max-w-[460px]"
      />
    ),
  },
  {
    title: "Intelligent routing",
    body: "Route requests by model capability, availability, latency or cost.",
    visual: (
      <HairlineFigure
        name="laptop"
        intensity={0.4}
        label="Line drawing of a laptop, standing in for choosing a routing policy."
        className="w-full max-w-[440px]"
      />
    ),
  },
  {
    title: "Automatic fallbacks",
    body: "Switch to an alternate model or provider when the preferred route is unavailable.",
    visual: (
      <HairlineFigure
        name="terrain"
        intensity={0.4}
        label="Field of pillars, standing in for a request moving to another route."
        className="w-full max-w-[440px]"
      />
    ),
  },
];

export function PlatformToolsSection() {
  return (
    <section className="bg-surface">
      <div className="home-frame border-t border-border">
        <Reveal>
          <h2 className="max-w-xl px-6 py-14 text-[clamp(1.875rem,2.6vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.03em] md:px-10 md:py-16">
            Powerful infrastructure for every AI workload
          </h2>
        </Reveal>
        <div className="grid border-t border-border md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col border-b border-border last:border-b-0 md:border-r md:odd:border-r md:even:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <div className="figure-mask flex h-[280px] items-center justify-center overflow-hidden md:h-[300px]">
                {feature.visual}
              </div>
              <div className="px-6 pt-1 pb-12 md:px-10 md:pb-14">
                <h3 className="text-[18px] font-medium tracking-[-0.02em]">{feature.title}</h3>
                <p className="mt-2 max-w-sm text-[14px] leading-6 text-muted">{feature.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
