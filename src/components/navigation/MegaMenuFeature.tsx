import Link from "next/link";
import type { MegaMenuFeature } from "@/types/mega-menu";
import { MegaFigure } from "@/components/figures/MegaFigure";
import { cn } from "@/lib/cn";

type MegaMenuFeatureProps = {
  feature: MegaMenuFeature;
  large?: boolean;
  copy?: "start" | "end";
  className?: string;
  onNavigate: () => void;
};

export function MegaMenuFeature({
  feature,
  large = false,
  copy = "end",
  className,
  onNavigate,
}: MegaMenuFeatureProps) {
  const external = feature.href.startsWith("http");
  const body = (
    <>
      <span className={cn("mega-figure-slot", large && "mega-figure-slot--large")}>
        <MegaFigure figure={feature.figure} large={large} />
      </span>
      <span className="mega-copy">
        <span className="mega-title">{feature.title}</span>
        <span className="mega-body">{feature.description}</span>
      </span>
    </>
  );
  const classes = cn("mega-feature", copy === "start" && "mega-feature--copy-first", className);

  if (external) {
    return (
      <a className={classes} href={feature.href} onClick={onNavigate}>
        {body}
      </a>
    );
  }

  return (
    <Link className={classes} href={feature.href} onClick={onNavigate}>
      {body}
    </Link>
  );
}
