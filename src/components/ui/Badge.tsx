import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "primary" | "success" | "warning";
};

const toneClass = {
  neutral: "border-border bg-surface-subtle text-muted",
  primary: "border-transparent bg-primary text-primary-foreground",
  success: "border-transparent bg-success text-primary-foreground",
  warning: "border-transparent bg-warning text-foreground",
} as const;

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] border px-2 py-0.5 font-mono text-[0.75rem] leading-5 tracking-wide uppercase",
        toneClass[tone],
      )}
    >
      {children}
    </span>
  );
}
