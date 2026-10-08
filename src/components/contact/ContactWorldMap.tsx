"use client";

import { useState } from "react";
import dottedMap from "@/data/dottedMap.json";
import { contactOffice } from "@/data/contact";
import { cn } from "@/lib/cn";

const { width, height, points } = dottedMap;
const pin = { x: 80.5, y: 29.44 };
const pinLeft = `${(pin.x / width) * 100}%`;
const pinTop = `${(pin.y / height) * 100}%`;

export function ContactWorldMap({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative mx-auto w-full max-w-4xl", className)}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full overflow-visible" aria-hidden>
        <g className="fill-foreground/20">
          {points.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={0.22} />
          ))}
        </g>
      </svg>
      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: pinLeft, top: pinTop }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <a
          href={contactOffice.mapsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${contactOffice.company}, ${contactOffice.address}. Open in Google Maps`}
          className="relative flex size-10 items-center justify-center sm:size-12"
        >
          <span className="absolute inset-0 animate-ping rounded-full border border-primary/50 opacity-40" />
          <span className="absolute size-7 rounded-full border border-primary/40 sm:size-8" />
          <span className="absolute size-4 rounded-full border border-primary/60 sm:size-5" />
          <span className="relative size-2.5 rounded-full bg-primary sm:size-3" />
        </a>
        <div
          role="tooltip"
          className={cn(
            "absolute bottom-full left-1/2 z-20 mb-3 w-56 -translate-x-1/2 rounded-xl border border-dashed border-border bg-surface p-3 text-left shadow-[0_12px_28px_-16px_rgba(17,19,24,0.35)] transition-all duration-200",
            open ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0",
          )}
        >
          <p className="text-[14px] font-medium">{contactOffice.company}</p>
          <p className="mt-1 text-[12px] leading-5 text-muted">{contactOffice.address}</p>
          <p className="mt-1.5 text-[11px] font-medium text-primary">Open in Google Maps</p>
        </div>
      </div>
    </div>
  );
}
