"use client";

import { motion, useReducedMotion } from "motion/react";

export function RoutePulse() {
  const reduce = useReducedMotion();
  if (reduce) {
    return <span className="inline-block h-1.5 w-8 bg-primary" aria-hidden />;
  }

  return (
    <span className="relative inline-block h-1.5 w-16 overflow-hidden bg-border" aria-hidden>
      <motion.span
        className="absolute inset-y-0 w-4 bg-primary"
        animate={{ x: [0, 48, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />
    </span>
  );
}
