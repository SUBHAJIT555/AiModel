import { cn } from "@/lib/cn";

type TechnicalGridProps = {
  className?: string;
  cell?: number;
  tone?: "default" | "dark";
};

export function TechnicalGrid({ className, cell = 72, tone = "default" }: TechnicalGridProps) {
  return (
    <div
      aria-hidden
      className={cn("technical-grid", tone === "dark" && "technical-grid--dark", className)}
      style={{ backgroundSize: `${cell}px ${cell}px` }}
    />
  );
}
