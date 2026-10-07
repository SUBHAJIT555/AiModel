"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IconBrain, IconCode, IconEye, IconLayoutGrid, IconMusic, IconPhoto, IconVideo } from "@tabler/icons-react";
import type { Model, ModelCategory } from "@/types/model";
import { ModelRow } from "@/components/models/ModelRow";
import { ProviderMark } from "@/components/models/ProviderMark";
import Link from "next/link";

const quickFilters: Array<{ id: "all" | ModelCategory; label: string; icon: typeof IconBrain }> = [
  { id: "all", label: "All", icon: IconLayoutGrid },
  { id: "reasoning", label: "Reasoning", icon: IconBrain },
  { id: "coding", label: "Coding", icon: IconCode },
  { id: "vision", label: "Vision", icon: IconEye },
  { id: "image", label: "Image", icon: IconPhoto },
  { id: "video", label: "Video", icon: IconVideo },
  { id: "audio", label: "Audio", icon: IconMusic },
];

const headCell =
  "border-l border-border px-3 py-3 text-left text-[12px] font-medium whitespace-nowrap text-muted md:px-4";

export function ModelDirectory({ models }: { models: Model[] }) {
  const params = useSearchParams();
  const requested = params.get("category");
  const [category, setCategory] = useState(requested && quickFilters.some((filter) => filter.id === requested) ? requested : "all");
  const tableRef = useRef<HTMLDivElement>(null);
  const [dockOn, setDockOn] = useState(false);

  const counts = useMemo(() => {
    return Object.fromEntries(
      quickFilters.map((filter) => {
        const id = filter.id;
        return [id, id === "all" ? models.length : models.filter((model) => model.categories.includes(id)).length];
      }),
    );
  }, [models]);

  const featured = models.filter((model) => model.featured);
  const visible = useMemo(() => {
    const next =
      category === "all" ? [...models] : models.filter((model) => model.categories.includes(category as ModelCategory));
    next.sort((a, b) => a.name.localeCompare(b.name));
    return next;
  }, [category, models]);

  useEffect(() => {
    const next = params.get("category");
    if (next && quickFilters.some((filter) => filter.id === next)) setCategory(next);
  }, [params]);

  useEffect(() => {
    const node = tableRef.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const entered = rect.top < window.innerHeight - 88;
      const stillOpen = rect.bottom > window.innerHeight - 8;
      setDockOn(entered && stillOpen);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [visible.length]);

  return (
    <div>
      {category === "all" ? (
        <div className="grid gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((model) => (
            <Link
              key={model.slug}
              href={`/models/${model.slug}`}
              className="flex items-center gap-3 bg-surface px-4 py-5 transition-colors hover:bg-[#f7f8fa] sm:px-6 md:px-8"
            >
              <ProviderMark slug={model.providerSlug} name={model.provider} size="md" />
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-medium tracking-[-0.02em]">{model.displayName}</span>
                <span className="block truncate text-[13px] text-muted">{model.provider}</span>
              </span>
            </Link>
          ))}
        </div>
      ) : null}

      <div ref={tableRef} className="overflow-x-auto border-b border-border bg-surface">
        <table className="w-full min-w-[680px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-[#f3f4f7]">
              <th className="sticky left-0 z-10 bg-[#f3f4f7] px-4 py-3 text-left text-[12px] font-medium text-muted shadow-[1px_0_0_0_var(--color-border)] md:px-6">
                Model
              </th>
              <th className={headCell}>Context</th>
              <th className={headCell}>Input → output</th>
              <th className={headCell}>Type</th>
              <th className={headCell}>Capabilities</th>
              <th className="w-0 p-0" />
            </tr>
          </thead>
          <tbody>
            {visible.map((model) => (
              <ModelRow key={model.slug} model={model} />
            ))}
          </tbody>
        </table>
        {visible.length === 0 ? <p className="px-4 py-10 text-sm text-muted md:px-6">No models match this category.</p> : null}
      </div>

      <FilterDock category={category} onCategory={setCategory} counts={counts} visible={dockOn} />
    </div>
  );
}

function FilterDock({
  category,
  onCategory,
  counts,
  visible,
}: {
  category: string;
  onCategory: (id: string) => void;
  counts: Record<string, number>;
  visible: boolean;
}) {
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:pb-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      inert={!visible}
    >
      <div
        className={`max-w-full overflow-hidden rounded-[16px] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] shadow-[var(--shadow-nav)] backdrop-blur-[4px] ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex gap-1 overflow-x-auto px-1.5 py-1.5">
          {quickFilters.map((filter) => {
            const active = category === filter.id;
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                type="button"
                className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[10px] border px-2.5 text-[13px] font-medium ${
                  active ? "border-foreground bg-foreground text-white" : "border-transparent text-muted hover:text-foreground"
                }`}
                onClick={() => onCategory(filter.id)}
              >
                <Icon aria-hidden size={14} stroke={1.75} />
                {filter.label}
                <span className={active ? "text-white/70" : "text-muted"}>{counts[filter.id]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
