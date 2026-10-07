"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { transitions } from "@/components/motion/transitions";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={transitions.reveal}
    >
      {children}
    </motion.div>
  );
}
