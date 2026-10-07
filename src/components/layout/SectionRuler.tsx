import { cn } from "@/lib/cn";

type SectionRulerProps = {
  className?: string;
};

export function SectionRuler({ className }: SectionRulerProps) {
  return <span aria-hidden className={cn("section-ruler section-ruler--block", className)} />;
}
