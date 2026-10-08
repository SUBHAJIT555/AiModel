"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/components/motion/transitions";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Button } from "@/components/ui/Button";

const fade = (y: number, delay: number) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: easeOut },
});

export function ServicesHero() {
  const reduce = useReducedMotion();
  const motionProps = (y: number, delay: number) => (reduce ? {} : fade(y, delay));

  return (
    <section className="bg-surface">
      <div className="home-frame">
        <div className="relative">
          <HeroBackdrop src="/heroes/services.jpg" />
          <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pt-16 pb-16 text-center md:pt-24 md:pb-20">
            <motion.p className="inline-flex items-center gap-2 text-[14px] font-medium text-primary" {...motionProps(8, 0)}>
              <span aria-hidden className="size-3.5 rounded-[4px] bg-primary" />
              Platform
            </motion.p>
            <motion.h1
              className="mt-6 text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance"
              {...motionProps(12, 0.08)}
            >
              Everything between
              <span className="block">
                your app and <span className="text-primary">the models.</span>
              </span>
            </motion.h1>
            <motion.p
              className="mt-5 max-w-[440px] text-[15px] leading-7 text-muted md:text-[16px]"
              {...motionProps(10, 0.16)}
            >
              Use one API to route, retry, observe and control requests across your model stack.
            </motion.p>
            <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3" {...motionProps(0, 0.24)}>
              <Button href="/pricing">
                Start building
                <ArrowRight aria-hidden strokeWidth={1.75} />
              </Button>
              <Button href="/models" variant="secondary">
                Explore models
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
