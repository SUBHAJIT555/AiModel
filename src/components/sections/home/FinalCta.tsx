import { LogoMark } from "@/components/layout/LogoMark";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="bg-surface">
      <div className="home-frame border-t border-border">
        <Reveal>
          <div className="px-6 py-24 text-center md:py-32">
            <div className="relative mx-auto mb-8 grid size-[72px] place-items-center">
              <span
                aria-hidden
                className="absolute -inset-5 rounded-full bg-[radial-gradient(circle,rgba(3,102,255,0.16),transparent_68%)]"
              />
              <span className="relative grid size-14 place-items-center rounded-[16px] bg-white shadow-[0_0_0_1px_rgba(38,38,43,0.08),0_12px_28px_-16px_rgba(17,31,91,0.45)]">
                <LogoMark className="size-7" />
              </span>
            </div>
            <h2 className="mx-auto max-w-[12em] text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.045em]">
              One API.
              <span className="block">Hundreds of possibilities.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-7 text-muted">
              Explore models, compare capabilities and experience the complete frontend workflow.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/models">Explore models</Button>
              <Button href="/pricing" variant="secondary">
                View pricing
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
