"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import WakeSlider from "@/components/pricing/WakeSlider";
import { Button } from "@/components/ui/Button";
import { MAX_PURCHASE_RUPEES, MIN_PURCHASE_RUPEES } from "@/data/pricing";
import { formatInr } from "@/lib/inr";

export function ModelQuote({ slug }: { slug: string }) {
  const [rupees, setRupees] = useState(500);
  const query = new URLSearchParams({
    plan: "volume",
    model: slug,
    amount: String(rupees),
  });

  return (
    <div className="rounded-[20px] border border-border bg-[#f7f8fa] px-5 py-5 shadow-[0_16px_40px_rgb(17_19_24/0.06)]">
      <p className="text-[13px] font-medium">Choose how much you pay</p>
      <p className="mt-1.5 text-[13px] leading-5 text-muted">
        Any amount from {formatInr(MIN_PURCHASE_RUPEES)} to {formatInr(MAX_PURCHASE_RUPEES)}.
      </p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="font-mono text-[12px] tracking-[0.04em] text-muted uppercase">
          {formatInr(MIN_PURCHASE_RUPEES)} – {formatInr(MAX_PURCHASE_RUPEES)}
        </p>
        <p className="text-[28px] leading-none font-medium tracking-[-0.045em]">{formatInr(rupees)}</p>
      </div>
      <div className="mt-5">
        <WakeSlider
          value={rupees}
          min={MIN_PURCHASE_RUPEES}
          max={MAX_PURCHASE_RUPEES}
          step={1}
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
          ariaLabel="Amount in rupees"
          formatValue={formatInr}
          onChange={setRupees}
        />
      </div>
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
