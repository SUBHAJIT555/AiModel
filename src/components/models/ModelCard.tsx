import Link from "next/link";
import type { Model } from "@/types/model";
import { formatContext } from "@/components/models/format";
import { ProviderMark } from "@/components/models/ProviderMark";

export function ModelCard({ model }: { model: Model }) {
  return (
    <Link href={`/models/${model.slug}`} className="block border-b border-border px-6 py-4 hover:bg-[#f7f8fa] md:px-10">
      <span className="flex items-center gap-3">
        <ProviderMark slug={model.providerSlug} name={model.provider} />
        <span>
          <span className="block text-[14px] font-medium">{model.displayName}</span>
          <span className="block text-[12px] text-muted">{model.provider}</span>
        </span>
      </span>
      <span className="mt-3 grid grid-cols-2 gap-2 font-mono text-[11px] text-muted">
        <span>Context {formatContext(model.contextWindow)}</span>
        <span className="capitalize">{model.categories[0]}</span>
        <span className="col-span-2 truncate">{model.capabilities.slice(0, 3).join(" · ")}</span>
      </span>
    </Link>
  );
}
