import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "dark";
  spacing?: "compact" | "normal" | "large" | "hero" | "none";
  dividerTop?: boolean;
  dividerBottom?: boolean;
  ruler?: boolean;
  center?: boolean;
  grid?: boolean;
  contained?: boolean;
};

const spacingClass = {
  compact: "py-10 md:py-12 lg:py-14",
  normal: "py-12 md:py-14 lg:py-16",
  large: "py-14 md:py-16 lg:py-20",
  hero: "pt-4 pb-10 md:pt-6 md:pb-12 lg:pb-14",
  none: "",
} as const;

export function Section({
  children,
  className,
  id,
  tone = "default",
  spacing = "normal",
  dividerTop = false,
  dividerBottom = false,
  ruler = false,
  center = false,
  grid = false,
  contained = false,
}: SectionProps) {
  return (
    <section
      id={id}
      data-theme={tone === "dark" ? "dark" : undefined}
      className={cn(
        "relative",
        spacingClass[spacing],
        tone === "dark" && "bg-dark-background text-dark-foreground",
        className,
      )}
    >
      {grid ? <TechnicalGrid tone={tone} /> : null}
      {dividerTop ? (
        <SectionDivider className="absolute inset-x-0 top-0" center={center} placement="top" ruler={ruler} />
      ) : null}
      {contained ? <Container>{children}</Container> : children}
      {dividerBottom ? (
        <SectionDivider className="absolute inset-x-0 bottom-0" center={center} placement="bottom" ruler={ruler} />
      ) : null}
    </section>
  );
}
