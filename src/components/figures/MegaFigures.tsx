import type { ReactNode } from "react";

type FigureProps = {
  large?: boolean;
};

function Frame({
  children,
  viewBox,
  large,
  tint = false,
}: {
  children: ReactNode;
  viewBox: string;
  large?: boolean;
  tint?: boolean;
}) {
  return (
    <svg
      aria-hidden
      className={
        large
          ? `mega-figure mega-figure--large${tint ? " mega-figure--tint" : ""}`
          : `mega-figure${tint ? " mega-figure--tint" : ""}`
      }
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
}

export function TextReasoningFigure({ large }: FigureProps) {
  return (
    <Frame large={large} viewBox="0 0 320 168">
      <text className="mega-meta" textAnchor="middle" x="160" y="12">
        128k
      </text>
      <path d="M58 20h204" />
      <path d="M58 14v12M262 14v12" />
      <rect height="112" rx="16" width="248" x="36" y="34" />
      <g clipPath="url(#fig-text-clip)" opacity="0.7">
        <path d="M20 50l80-28M20 66l96-34M20 82l112-40M20 98l128-46M20 114l144-52M20 130l160-58M20 146l176-64" />
        <path d="M70 42l80-28M86 50l96-34M102 58l112-40M118 66l128-46" />
      </g>
      <clipPath id="fig-text-clip">
        <rect height="112" rx="16" width="248" x="36" y="34" />
      </clipPath>
      <path d="M56 108h78" />
      <path d="M56 124h52" />
      <path d="M292 50v80" />
      <path d="M286 50h12M286 130h12" />
    </Frame>
  );
}

export function VisionFigure({ large }: FigureProps) {
  return (
    <Frame large={large} viewBox="0 0 320 168">
      <rect height="108" rx="14" width="156" x="28" y="30" />
      <path d="M28 54h156" />
      <path d="M48 108c22-20 40-20 62 0s40 20 58 0" />
      <circle cx="70" cy="78" r="8" />
      <rect className="mega-accent" height="14" rx="3" width="22" x="48" y="64" />
      <circle cx="230" cy="86" r="40" />
      <circle cx="230" cy="86" r="18" />
      <circle className="mega-accent" cx="230" cy="86" r="5" />
      <path d="M258 114l22 20" />
    </Frame>
  );
}

export function ModelCatalogFigure({ large }: FigureProps) {
  return (
    <Frame large={large} viewBox="0 0 220 360">
      <rect height="328" rx="22" width="156" x="32" y="16" />
      <path d="M32 82h156M32 148h156M32 214h156M32 280h156" />
      <circle cx="54" cy="48" r="3" />
      <path d="M66 44h62" />
      <path d="M66 56h40" />
      <rect className="mega-accent" height="16" rx="3" width="22" x="146" y="40" />
      <circle cx="54" cy="114" r="3" />
      <path d="M66 110h62" />
      <path d="M66 122h40" />
      <rect height="16" rx="3" width="22" x="146" y="106" />
      <circle className="mega-accent" cx="54" cy="180" r="3" />
      <path d="M66 176h62" />
      <path d="M66 188h40" />
      <rect className="mega-accent" height="16" rx="3" width="22" x="146" y="172" />
      <circle cx="54" cy="246" r="3" />
      <path d="M66 242h62" />
      <path d="M66 254h40" />
      <rect height="16" rx="3" width="22" x="146" y="238" />
      <circle cx="54" cy="312" r="3" />
      <path d="M66 308h62" />
      <path d="M66 320h40" />
      <rect className="mega-accent" height="16" rx="3" width="22" x="146" y="304" />
    </Frame>
  );
}

export function RoutingFigure({ large }: FigureProps) {
  return (
    <Frame large={large} viewBox="0 0 320 120">
      <text x="28" y="36">
        101100010
      </text>
      <text x="28" y="68">
        010011010
      </text>
      <text x="28" y="100">
        110100101
      </text>
      <path d="M214 22v84" />
      <text className="mega-strong" x="230" y="36">
        010
      </text>
      <text className="mega-strong" x="230" y="68">
        101
      </text>
      <text className="mega-strong" x="230" y="100">
        001
      </text>
    </Frame>
  );
}

export function FallbackFigure({ large }: FigureProps) {
  return (
    <Frame large={large} viewBox="0 0 320 140">
      <path d="M28 18v104" />
      <path d="M28 122h268" />
      <path d="M96 18v104" strokeDasharray="2 4" />
      <path d="M164 18v104" strokeDasharray="2 4" />
      <path d="M232 18v104" strokeDasharray="2 4" />
      <path d="M28 108c28-6 42 4 68-16 22-18 36-42 62-30 20 8 32 4 54-20 16-18 34-14 58 8" />
      <path
        d="M28 100c32 6 48-8 74-4 26 4 40 16 66 6 22-8 38 0 54 10 14 8 26 6 46-2"
        opacity="0.55"
      />
      <circle className="mega-accent" cx="232" cy="46" r="3.5" />
    </Frame>
  );
}

export function ObservabilityFigure({ large }: FigureProps) {
  return (
    <Frame large={large} tint viewBox="0 0 360 300">
      <path d="M40 150h280" strokeDasharray="3 6" />
      <path d="M180 24v252" strokeDasharray="3 6" />
      <circle cx="180" cy="150" r="112" />
      <circle cx="180" cy="150" r="72" />
      <path d="M112 168c18-28 34-18 52-40 16-20 28-8 44 6 14 12 26 4 40-16 12-16 22-8 36 10" />
      <path d="M108 156c22 10 36-6 54 2 16 8 28 22 46 14 16-8 28-2 42 12" />
      <circle className="mega-accent" cx="250" cy="112" r="7" />
      <circle cx="118" cy="186" r="10" />
      <circle className="mega-accent" cx="214" cy="188" r="5" />
    </Frame>
  );
}
