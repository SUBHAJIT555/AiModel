import { cn } from "@/lib/cn";

type GridIntersectionProps = {
  className?: string;
};

export function GridIntersection({ className }: GridIntersectionProps) {
  return <span aria-hidden className={cn("grid-intersection", className)} />;
}
