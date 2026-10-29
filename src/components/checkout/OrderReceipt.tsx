import { LogoMark } from "@/components/layout/LogoMark";
import { ProviderMark } from "@/components/models/ProviderMark";
import { formatInr } from "@/lib/inr";
import { siteConfig } from "@/lib/site";

const catalog = [
  { slug: "openai", name: "OpenAI" },
  { slug: "anthropic", name: "Anthropic" },
  { slug: "google", name: "Google" },
  { slug: "meta", name: "Meta" },
];

const bars = [2, 1, 1, 3, 1, 2, 1, 1, 4, 1, 2, 1, 3, 1, 1, 2, 1, 4, 1, 2, 1, 1, 3, 2, 1, 1, 2, 1, 3, 1];

export function OrderReceipt({
  planName,
  variable,
  subtotal,
  country,
  volume,
  model,
  method,
  paid = false,
  orderId,
  creditsApplied = 0,
}: {
  planName: string;
  variable: boolean;
  subtotal: number;
  country: string;
  volume: string | null;
  model?: { displayName: string; provider: string; providerSlug: string } | null;
  method?: string;
  paid?: boolean;
  orderId?: string;
  creditsApplied?: number;
}) {
  const showBrands = !model || variable;
  const credit = Math.min(Math.max(0, Math.round(creditsApplied)), subtotal);
  const due = Math.max(0, subtotal - credit);

  return (
    <aside
      className="mx-auto w-full max-w-[320px] bg-white px-5 py-6 text-[#1a1c20] shadow-[0_10px_28px_-18px_rgb(17_19_24/0.45),0_0_0_1px_rgb(17_19_24/0.06)]"
      aria-label="Order receipt"
    >
      <h2 className="text-center text-[15px] font-semibold tracking-[0.18em]">RECEIPT</h2>
      <Rule />
      <div className="flex items-center justify-between gap-3 font-mono text-[11px]">
        <span className="inline-flex items-center gap-1.5">
          <LogoMark className="size-4" />
          {siteConfig.name}
        </span>
        <span className="text-black/55">{country}</span>
      </div>
      <p className="mt-2 font-mono text-[11px] text-black/55">{planName}</p>
      {orderId ? <p className="mt-1 font-mono text-[11px] text-black/55">Order {orderId}</p> : null}
      {model ? (
        <p className="mt-3 flex items-center gap-2 font-mono text-[12px]">
          <span className="grid size-7 place-items-center rounded-full bg-[#f6f6f7] shadow-[0_0_0_1px_rgb(17_19_24/0.08)]">
            <ProviderMark slug={model.providerSlug} name={model.provider} size="md" />
          </span>
          {model.displayName}
        </p>
      ) : null}
      {showBrands ? (
        <div className="mt-3 flex items-center gap-1.5">
          {catalog.map((brand) => (
            <span
              key={brand.slug}
              className="grid size-7 place-items-center rounded-full bg-[#f6f6f7] shadow-[0_0_0_1px_rgb(17_19_24/0.08)]"
            >
              <ProviderMark slug={brand.slug} name={brand.name} />
            </span>
          ))}
          <span className="pl-0.5 font-mono text-[14px] tracking-[0.16em] text-black/40" aria-hidden>
            ...
          </span>
          <span className="sr-only">and other providers</span>
        </div>
      ) : null}
      <Rule />
      <dl className="space-y-1.5 font-mono text-[12px]">
        {volume ? <Row label={volume} value={formatInr(subtotal)} /> : <Row label={planName} value={formatInr(subtotal)} />}
        {method ? <Row label={method} value="" /> : null}
      </dl>
      {credit > 0 ? (
        <>
          <Rule />
          <dl className="space-y-1.5 font-mono text-[12px]">
            <Row label="Credits applied" value={`−${formatInr(credit)}`} />
            <Row label="Payable now" value={formatInr(due)} />
          </dl>
        </>
      ) : null}
      <div className="flex items-baseline justify-between font-mono font-semibold">
        <span className="text-[12px] tracking-[0.08em]">TOTAL</span>
        <span className="text-[16px]">{formatInr(due)}</span>
      </div>
      <Rule />
      <p className="text-center text-[13px] font-semibold tracking-[0.16em]">THANK YOU</p>
      <Barcode />
      <p className="mt-2 text-center font-mono text-[10px] tracking-[0.06em] text-black/40 uppercase">
        {paid ? (due === 0 && credit > 0 ? "Paid with credits" : "Paid by UPI") : due === 0 && credit > 0 ? "Covered by credits" : "Payable by UPI"}
      </p>
    </aside>
  );
}

function Rule() {
  return <div className="my-3 border-t border-dashed border-black/25" />;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt>{label}</dt>
      <dd className="shrink-0">{value}</dd>
    </div>
  );
}

function Barcode() {
  let x = 0;
  const width = bars.reduce((sum, bar) => sum + bar + 1, 0);
  return (
    <svg viewBox={`0 0 ${width} 42`} className="mx-auto mt-3 h-11 w-[168px]" aria-hidden>
      {bars.map((bar, index) => {
        const rect = <rect key={index} x={x} y="0" width={bar} height="42" fill="#1a1c20" />;
        x += bar + 1;
        return rect;
      })}
    </svg>
  );
}
