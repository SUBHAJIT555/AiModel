import Link from "next/link";
import type { Model } from "@/types/model";
import { formatContext } from "@/components/models/format";
import { ProviderMark } from "@/components/models/ProviderMark";

const cell =
  "border-l border-border bg-surface px-3 py-3.5 align-middle text-[13px] text-muted group-hover:bg-[#f4f6f8] md:px-4";

export function ModelRow({ model }: { model: Model }) {
  return (
    <tr className="group relative border-b border-border last:border-b-0">
      <td className="sticky left-0 z-10 min-w-[196px] bg-surface px-4 py-3 align-middle shadow-[1px_0_0_0_var(--color-border)] group-hover:bg-[#f4f6f8] md:px-6">
        <span className="flex min-w-0 items-center gap-3">
          <ProviderMark slug={model.providerSlug} name={model.provider} />
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-medium tracking-[-0.01em] text-foreground">{model.displayName}</span>
            <span className="block truncate text-[12px] text-muted">{model.provider}</span>
          </span>
        </span>
      </td>
      <td className={`${cell} font-mono text-[12px] whitespace-nowrap`}>{formatContext(model.contextWindow)}</td>
      <td className={`${cell} whitespace-nowrap`}>
        {model.inputModalities.join(", ")}
        <span className="px-1 text-border-strong">→</span>
        {model.outputModalities.join(", ")}
      </td>
      <td className={`${cell} capitalize whitespace-nowrap`}>{model.categories[0]}</td>
      <td className={`${cell} max-w-[240px] truncate`}>{model.capabilities.slice(0, 3).join(" · ")}</td>
      <td className="w-0 p-0">
        <Link href={`/models/${model.slug}`} className="absolute inset-0 z-20" aria-label={model.displayName} />
      </td>
    </tr>
  );
}
