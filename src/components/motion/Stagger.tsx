"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { transitions } from "@/components/motion/transitions";

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

export function Stagger({ children, className }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, ...transitions.fast } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: transitions.reveal,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
