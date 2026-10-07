import { cn } from "@/lib/cn";

type SectionDividerProps = {
  placement?: "top" | "bottom";
  ruler?: boolean;
  ticks?: boolean;
  center?: boolean;
  className?: string;
};

export function SectionDivider({
  placement = "bottom",
  ruler = false,
  ticks = true,
  center = false,
  className,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden
      className={cn("section-divider", className)}
      data-center={center ? "true" : "false"}
      data-placement={placement}
      data-ruler={ruler ? "true" : "false"}
      data-ticks={ticks ? "true" : "false"}
    >
      <span className="section-divider__rule" />
      {ruler ? <span className="section-ruler" /> : null}
      {center ? <span className="section-divider__center" /> : null}
    </div>
  );
}
