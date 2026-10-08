"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { heroContent } from "@/data/hero";
import { easeOut } from "@/components/motion/transitions";
import { Button } from "@/components/ui/Button";

const fade = (y: number, delay: number) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: easeOut },
});

export function HeroIntro() {
  const reduce = useReducedMotion();
  const motionProps = (y: number, delay: number) => (reduce ? {} : fade(y, delay));

  return (
    <div className="mx-auto flex max-w-[760px] flex-col items-center px-6 pt-10 text-center md:pt-14">
      <motion.p
        className="inline-flex items-center gap-2 text-[14px] font-medium text-primary"
        {...motionProps(8, 0)}
      >
        <span aria-hidden className="size-3.5 rounded-[4px] bg-primary" />
        {heroContent.eyebrow}
      </motion.p>
      <motion.h1
        className="mt-6 text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance"
        {...motionProps(12, 0.08)}
      >
        {heroContent.titleLead}
        <span className="block">
          {heroContent.titleTail} <span className="text-primary">{heroContent.titleAccent}</span>
        </span>
      </motion.h1>
      <motion.p
        className="mt-5 max-w-[440px] text-[15px] leading-7 text-muted md:text-[16px]"
        {...motionProps(10, 0.16)}
      >
        {heroContent.description}
      </motion.p>
      <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3" {...motionProps(0, 0.24)}>
        <Button href={heroContent.primaryCta.href} size="sm">
          {heroContent.primaryCta.label}
          <ArrowRight aria-hidden strokeWidth={1.75} />
        </Button>
        <Button href={heroContent.secondaryCta.href} size="sm" variant="secondary">
          {heroContent.secondaryCta.label}
        </Button>
      </motion.div>
    </div>
  );
}
