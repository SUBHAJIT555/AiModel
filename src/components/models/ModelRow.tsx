import { Table } from "@heroui/react";
import type { Model } from "@/types/model";
import { formatContext } from "@/components/models/format";
import { ProviderMark } from "@/components/models/ProviderMark";

export function ModelRow({ model }: { model: Model }) {
  return (
    <Table.Row id={model.slug} className="cursor-pointer">
      <Table.Cell className="min-w-[196px]">
        <span className="flex min-w-0 items-center gap-3">
          <ProviderMark slug={model.providerSlug} name={model.provider} />
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-medium tracking-[-0.01em]">{model.displayName}</span>
            <span className="block truncate text-[12px] text-muted">{model.provider}</span>
          </span>
        </span>
      </Table.Cell>
      <Table.Cell className="font-mono text-[12px] whitespace-nowrap">{formatContext(model.contextWindow)}</Table.Cell>
      <Table.Cell className="whitespace-nowrap">
        {model.inputModalities.join(", ")}
        <span className="px-1 text-border-strong">→</span>
        {model.outputModalities.join(", ")}
      </Table.Cell>
      <Table.Cell className="capitalize whitespace-nowrap">{model.categories[0]}</Table.Cell>
      <Table.Cell className="max-w-[240px] truncate">{model.capabilities.slice(0, 3).join(" · ")}</Table.Cell>
    </Table.Row>
  );
}
