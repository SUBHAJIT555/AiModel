import type { Metadata } from "next";
import { models } from "@/data/models";
import { ModelDirectory } from "@/components/models/ModelDirectory";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Models",
  description: "Explore a demonstration catalog of AI models across reasoning, coding, vision, image, video, and audio.",
};

export default function ModelsPage() {
  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="border-b border-border px-6 py-14 md:px-10 md:py-16">
          <p className="text-[13px] text-muted">Catalog</p>
          <h1 className="mt-3 max-w-[12ch] text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] font-medium tracking-[-0.045em]">
            Every model.
            <span className="block">One interface.</span>
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-7 text-muted">
            Explore AI models across reasoning, coding, vision, image, video and audio through one unified interface.
          </p>
        </div>
        <ModelDirectory models={models} />
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-5 md:px-10">
          <p className="max-w-md text-[13px] leading-6 text-muted">
            Compare plans for the demo workspace. Pricing on this page is illustrative.
          </p>
          <Button href="/pricing">View pricing</Button>
        </div>
      </div>
    </section>
  );
}
