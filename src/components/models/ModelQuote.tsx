"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import WakeSlider from "@/components/pricing/WakeSlider";
import { Button } from "@/components/ui/Button";
import { formatInr, formatMillions } from "@/lib/inr";

export function ModelQuote({
  slug,
  each,
  output,
  unit,
}: {
  slug: string;
  each: number;
  output?: number;
  unit: string;
}) {
  const tokens = unit === "million";
  const [volume, setVolume] = useState(tokens ? 10 : 100);
  const total = each * volume;
  const query = new URLSearchParams({
    plan: "enterprise",
    billing: "monthly",
    model: slug,
    tokens: String(volume),
    unit,
  });

  return (
    <div className="rounded-[20px] border border-border bg-[#f7f8fa] px-5 py-5 shadow-[0_16px_40px_rgb(17_19_24/0.06)]">
      <p className="text-[13px] font-medium">Choose how much you send</p>
      <p className="mt-1.5 text-[13px] leading-5 text-muted">
        {tokens
          ? "Input is the text you send. Output is what the model writes back, billed on its own rate."
          : `Each ${unit} is billed at this model’s rate. Drag to set how many you need.`}
      </p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="grid gap-3">
          <div>
            <p className="text-[12px] text-muted">{tokens ? "Input rate" : "Rate"}</p>
            <p className="mt-1 text-[15px] font-medium tracking-[-0.02em]">
              {formatInr(each)}
              <span className="font-normal text-muted"> {tokens ? "/ 1M tokens" : `/ ${unit}`}</span>
            </p>
          </div>
          {output != null ? (
            <div>
              <p className="text-[12px] text-muted">Output rate</p>
              <p className="mt-1 text-[15px] font-medium tracking-[-0.02em]">
                {formatInr(output)}
                <span className="font-normal text-muted"> / 1M tokens</span>
              </p>
            </div>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-[12px] text-muted">For this volume</p>
          <p className="mt-1 text-[28px] leading-none font-medium tracking-[-0.045em]">{formatInr(total)}</p>
        </div>
      </div>
      <div className="mt-5">
        <WakeSlider
          value={volume}
          min={tokens ? 1 : 10}
          max={tokens ? 100 : 1000}
          step={tokens ? 1 : 10}
          bars={28}
          height={22}
          restHeight={22}
          gap={4}
          fillColor="#2563eb"
          trackColor="#e5e7eb"
          sensitivity={1}
          reach={6}
          skew={0.6}
          glide={0.3}
          smoothing={100}
          ariaLabel={tokens ? "Token volume in millions" : `Number of ${unit}s`}
          onChange={setVolume}
        />
      </div>
      <p className="mt-3 text-[13px] text-muted">
        {tokens
          ? `${formatMillions(volume)} input tokens × ${formatInr(each)}.`
          : `${volume} ${unit}s × ${formatInr(each)}.`}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button href={`/checkout?${query.toString()}`}>
          Use this model
          <ArrowRight aria-hidden strokeWidth={1.75} />
        </Button>
        <Button href="/pricing" variant="secondary">
          Compare plans
        </Button>
      </div>
    </div>
  );
}
