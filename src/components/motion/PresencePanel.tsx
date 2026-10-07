"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { transitions } from "@/components/motion/transitions";

type PresencePanelProps = {
  open: boolean;
  children: ReactNode;
  panelKey?: string;
};

export function PresencePanel({ open, children, panelKey = "panel" }: PresencePanelProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key={panelKey}
          initial={reduce ? false : { opacity: 0, y: 4, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 4, scale: 0.985 }}
          transition={reduce ? { duration: 0 } : transitions.dropdown}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
