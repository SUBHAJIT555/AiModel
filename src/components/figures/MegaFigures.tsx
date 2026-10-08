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
    <Frame large={large} viewBox="0 0 320 128">
      <rect height="28" rx="8" width="116" x="176" y="14" />
      <rect className="mega-accent" height="28" rx="8" width="116" x="176" y="50" />
      <rect height="28" rx="8" width="116" x="176" y="86" />
      <path d="M192 28h24" />
      <path d="M192 100h24" />
      <circle className="mega-live" cx="192" cy="64" r="3.5" />
      <rect height="32" rx="8" width="48" x="18" y="48" />
      <path d="M30 64h24" />
      <path d="M66 64h18" />
      <path d="M84 64C118 64 126 28 172 28" />
      <path d="M84 64h88" />
      <path d="M84 64C118 64 126 100 172 100" />
    </Frame>
  );
}

export function FallbackFigure({ large }: FigureProps) {
  return (
    <Frame large={large} viewBox="0 0 320 128">
      <path d="M32 18v86" />
      <path d="M32 104h256" />
      <path d="M104 18v86" strokeDasharray="2 4" />
      <path d="M176 18v86" strokeDasharray="2 4" />
      <path d="M248 18v86" strokeDasharray="2 4" />
      <path
        d="M32 80C80 78 120 88 160 62C200 36 228 40 248 46C272 54 292 50 300 56"
        opacity="0.45"
      />
      <path d="M32 90C80 92 130 78 180 86C220 92 260 84 300 78" />
      <circle className="mega-accent" cx="248" cy="46" r="4" />
    </Frame>
  );
}

export function ObservabilityFigure({ large }: FigureProps) {
  return (
    <Frame large={large} tint viewBox="0 0 220 336">
      <path d="M16 168h188" strokeDasharray="3 6" />
      <path d="M110 22v292" strokeDasharray="3 6" />
      <circle cx="110" cy="168" r="98" />
      <circle cx="110" cy="168" r="62" />
      <path d="M42 188c20-32 34-18 54-42 16-18 28-6 44 8 14 12 24 4 40-18" />
      <path d="M40 174c22 12 36-8 56 2 18 10 28 22 46 14 16-8 26 0 38 14" />
      <circle className="mega-accent" cx="172" cy="108" r="6.5" />
      <circle cx="56" cy="206" r="9" />
      <circle className="mega-accent" cx="140" cy="198" r="5" />
    </Frame>
  );
}
