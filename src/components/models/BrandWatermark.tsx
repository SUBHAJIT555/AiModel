"use client";

import { useEffect, useState } from "react";
import { brandIcon } from "@/components/models/ProviderMark";

const CELLS = 44;

export function BrandWatermark({ slug }: { slug: string }) {
  const src = brandIcon(slug);
  const [pixels, setPixels] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;
    let cancel = false;
    let objectUrl = "";
    const image = new Image();
    image.onload = () => {
      const sample = document.createElement("canvas");
      sample.width = CELLS;
      sample.height = CELLS;
      const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return;
      sampleCtx.drawImage(image, 0, 0, CELLS, CELLS);
      const data = sampleCtx.getImageData(0, 0, CELLS, CELLS).data;

      const block = 6;
      const gap = 2;
      const step = block + gap;
      const sheet = document.createElement("canvas");
      sheet.width = CELLS * step;
      sheet.height = CELLS * step;
      const ctx = sheet.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "rgb(17 19 24)";
      for (let y = 0; y < CELLS; y += 1) {
        for (let x = 0; x < CELLS; x += 1) {
          if (data[(y * CELLS + x) * 4 + 3] > 80) {
            ctx.fillRect(x * step, y * step, block, block);
          }
        }
      }
      if (!cancel) setPixels(sheet.toDataURL());
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
    fetch(src)
      .then((response) => response.text())
      .then((markup) => {
        if (cancel) return;
        const sized = markup
          .replace(/width="1em"/g, 'width="280"')
          .replace(/height="1em"/g, 'height="280"');
        objectUrl = URL.createObjectURL(new Blob([sized], { type: "image/svg+xml" }));
        image.src = objectUrl;
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  if (!pixels) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src={pixels}
        alt=""
        className="absolute top-1/2 left-1/2 w-[min(108%,680px)] max-w-none -translate-x-[46%] -translate-y-[48%] opacity-[0.07] select-none"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
