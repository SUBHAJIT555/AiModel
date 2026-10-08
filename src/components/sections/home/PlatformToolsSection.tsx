import { HairlineFigure } from "@/components/figures/HairlineFigure";
import { Reveal } from "@/components/motion/Reveal";

const features = [
  {
    title: "One request body",
    body: "Chat, image, audio, and embeddings share the same fields. Swap the model id when you want a different one.",
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
    title: "A catalog you can read",
    body: "Text, reasoning, vision, image, audio, and video, with context length and a price in rupees.",
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
    title: "Routing, if you want it",
    body: "Cheaper, faster, or a model you named. The HTTP call does not change.",
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
    title: "The next model, if this one fails",
    body: "A timeout or a provider error moves the request to the next model you allowed.",
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
          <h2 className="max-w-xl px-6 py-8 text-[clamp(1.875rem,2.6vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.03em] md:px-10 md:py-10">
            Four jobs, one gateway
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
              <div className="px-6 pt-1 pb-8 md:px-10 md:pb-10">
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
