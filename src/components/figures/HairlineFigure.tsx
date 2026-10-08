"use client";

import { Branches, Cabinet, Dish, Laptop, Patch, Phosphor, Plot, Router, Terminal, Terrain } from "@lucasmarkes/hairline/react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

const figures = {
  branches: Branches,
  cabinet: Cabinet,
  dish: Dish,
  laptop: Laptop,
  patch: Patch,
  phosphor: Phosphor,
  plot: Plot,
  router: Router,
  terminal: Terminal,
  terrain: Terrain,
} as const;

export function HairlineFigure({
  name,
  className,
  label,
  intensity = 0.4,
}: {
  name: keyof typeof figures;
  className?: string;
  label?: string;
  intensity?: number;
}) {
  const reduce = useReducedMotion();
  const Figure = figures[name];
  return (
    <div className={cn("hairline-host", className)}>
      <Figure intensity={reduce ? 0 : intensity} label={label} />
    </div>
  );
}
