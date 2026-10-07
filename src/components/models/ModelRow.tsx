import Link from "next/link";
import type { Model } from "@/types/model";
import { formatContext } from "@/components/models/format";
import { ProviderMark } from "@/components/models/ProviderMark";

export function ModelRow({ model }: { model: Model }) {
  return (
    <Link
      href={`/models/${model.slug}`}
      className="grid grid-cols-[minmax(0,1.4fr)_132px_64px_120px_100px_100px_minmax(0,1fr)] items-center gap-3 border-b border-border px-6 py-3 text-[13px] transition-colors duration-[160ms] hover:bg-[#f7f8fa] md:px-10"
    >
      <span className="flex min-w-0 items-center gap-3">
        <ProviderMark slug={model.providerSlug} name={model.provider} />
        <span className="truncate font-medium">{model.displayName}</span>
      </span>
      <span className="truncate text-muted">{model.provider}</span>
      <span className="font-mono text-[12px] text-muted">{formatContext(model.contextWindow)}</span>
      <span className="truncate font-mono text-[12px] text-muted">{model.inputModalities.join(", ")}</span>
      <span className="truncate font-mono text-[12px] text-muted">{model.outputModalities.join(", ")}</span>
      <span className="truncate capitalize text-muted">{model.categories[0]}</span>
      <span className="truncate text-muted">{model.capabilities.slice(0, 3).join(" · ")}</span>
    </Link>
  );
}
