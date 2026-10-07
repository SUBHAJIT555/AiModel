import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { models } from "@/data/models";
import { ModelDirectory } from "@/components/models/ModelDirectory";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Models",
  description: "Explore a demonstration catalog of AI models across reasoning, coding, vision, image, video, and audio.",
};

export default function ModelsPage() {
  return (
    <section className="bg-surface -mt-[5.5rem] pt-[5.5rem] pb-16 md:-mt-[7.5rem] md:pt-[7.5rem]">
      <div className="home-frame">
        <div className="mx-auto flex max-w-[760px] flex-col items-center px-6 pt-14 pb-12 text-center md:pt-20 md:pb-16">
          <p className="inline-flex items-center gap-2 text-[14px] font-medium text-primary">
            <span aria-hidden className="size-3.5 rounded-[4px] bg-primary" />
            Catalog
          </p>
          <h1 className="mt-6 text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
            Every model.
            <span className="block">
              <span className="text-primary">One</span> interface.
            </span>
          </h1>
          <p className="mt-5 max-w-[440px] text-[15px] leading-7 text-muted md:text-[16px]">
            Explore AI models across reasoning, coding, vision, image, video and audio through one unified interface.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/pricing">
              Start building
              <ArrowRight aria-hidden strokeWidth={1.75} />
            </Button>
            <Button href="/pricing" variant="secondary">
              View pricing
            </Button>
          </div>
        </div>
        <Suspense>
          <ModelDirectory models={models} />
        </Suspense>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-8 md:px-10">
          <p className="max-w-md text-[14px] leading-6 text-muted">
            Compare plans for the demo workspace. Pricing on this page is illustrative.
          </p>
          <Button href="/pricing">View pricing</Button>
        </div>
      </div>
    </section>
  );
}
