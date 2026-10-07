import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function HomeHeading({
  eyebrow,
  title,
  children,
  tone = "default",
  align = "left",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  tone?: "default" | "dark";
  align?: "left" | "center";
}) {
  const muted = tone === "dark" ? "text-dark-muted" : "text-muted";
  return (
    <Reveal className={cn("max-w-xl", align === "center" && "mx-auto text-center")}>
      <p className={cn("font-mono text-[12px] tracking-[0.08em] uppercase", muted)}>{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.035em]">
        {title}
      </h2>
      {children ? <p className={cn("mt-4 text-[15px] leading-7", muted)}>{children}</p> : null}
    </Reveal>
  );
}
