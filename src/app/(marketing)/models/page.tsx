import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { models } from "@/data/models";
import { ModelDirectory } from "@/components/models/ModelDirectory";
import { BrandCycle } from "@/components/sections/home/BrandCycle";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Models",
  description: "The Aimodel catalog: reasoning, coding, vision, image, video, and audio.",
};

export default function ModelsPage() {
  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] pb-8 md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="relative">
          <HeroBackdrop src="/heroes/models.jpg" />
          <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pt-10 pb-8 text-center md:pt-14 md:pb-10">
          <p className="inline-flex items-center gap-2 text-[14px] font-medium text-primary">
            <span aria-hidden className="size-3.5 rounded-[4px] bg-primary" />
            Catalog
          </p>
          <h1 className="mt-6 text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
            Aim at the hard part.
            <span className="block">
              Then pick the <span className="text-primary">model</span>.
            </span>
          </h1>
          <BrandCycle />
          <p className="mt-5 max-w-[440px] text-[15px] leading-7 text-muted md:text-[16px]">
            Some of these reason. Some write code. Some make an image, a clip, or a voice. Open a row and see which.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact">
              Ask about a model
              <ArrowRight aria-hidden strokeWidth={1.75} />
            </Button>
          </div>
          </div>
        </div>
        <Suspense>
          <ModelDirectory models={models} />
        </Suspense>
        {/* <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-8 md:px-10">
          <p className="max-w-md text-[14px] leading-6 text-muted">
            Open a row for the provider, the context length, and a sample request.
          </p>
        </div> */}
      </div>
    </section>
  );
}
