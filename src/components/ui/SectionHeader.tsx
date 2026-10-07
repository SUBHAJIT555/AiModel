import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeaderProps) {
  const Title = as;
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{eyebrow}</p>
      ) : null}
      <Title className="mt-3 text-3xl font-medium tracking-[-0.03em] text-balance md:text-4xl">
        {title}
      </Title>
      {description ? (
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-[15px]">{description}</p>
      ) : null}
    </div>
  );
}
