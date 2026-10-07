"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type AnimatedNumberProps = {
  value: number;
  className?: string;
};

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const reduce = useReducedMotion();
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || reduce) return;

    const frame = requestAnimationFrame(() => {
      node.textContent = String(value);
    });

    return () => cancelAnimationFrame(frame);
  }, [reduce, value]);

  return (
    <span ref={nodeRef} className={className}>
      {value}
    </span>
  );
}
