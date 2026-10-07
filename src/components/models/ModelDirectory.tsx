"use client";

import { useMemo, useState } from "react";
import type { Model, ModelCategory, Modality } from "@/types/model";
import { contextFloor } from "@/components/models/format";
import { ModelCard } from "@/components/models/ModelCard";
import { ModelRow } from "@/components/models/ModelRow";
import { ProviderMark } from "@/components/models/ProviderMark";
import Link from "next/link";

const quickFilters: Array<{ id: "all" | ModelCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "reasoning", label: "Reasoning" },
  { id: "coding", label: "Coding" },
  { id: "vision", label: "Vision" },
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
  { id: "audio", label: "Audio" },
];

const fieldClass =
  "h-9 rounded-[10px] border border-border bg-surface px-3 text-[13px] text-foreground outline-none focus:border-border-strong";

export function ModelDirectory({ models }: { models: Model[] }) {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("all");
  const [category, setCategory] = useState("all");
  const [capability, setCapability] = useState("all");
  const [input, setInput] = useState("all");
  const [output, setOutput] = useState("all");
  const [context, setContext] = useState("all");
  const [sort, setSort] = useState("name");

  const providers = useMemo(
    () => [...new Set(models.map((model) => model.provider))].sort((a, b) => a.localeCompare(b)),
    [models],
  );
  const categories = useMemo(
    () => [...new Set(models.flatMap((model) => model.categories))].sort(),
    [models],
  );
  const capabilities = useMemo(
    () => [...new Set(models.flatMap((model) => model.capabilities))].sort(),
    [models],
  );
  const modalities = useMemo(() => {
    const values = new Set<Modality>();
    for (const model of models) {
      model.inputModalities.forEach((item) => values.add(item));
      model.outputModalities.forEach((item) => values.add(item));
    }
    return [...values];
  }, [models]);

  const counts = useMemo(() => {
    return Object.fromEntries(
      quickFilters.map((filter) => {
        const id = filter.id;
        return [
          id,
          id === "all" ? models.length : models.filter((model) => model.categories.includes(id)).length,
        ];
      }),
    );
  }, [models]);

  const featured = models.filter((model) => model.featured).slice(0, 4);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = models.filter((model) => {
      const haystack = [model.name, model.displayName, model.provider, ...model.capabilities, ...model.categories]
        .join(" ")
        .toLowerCase();
      if (needle && !haystack.includes(needle)) return false;
      if (provider !== "all" && model.provider !== provider) return false;
      if (category !== "all" && !model.categories.includes(category as ModelCategory)) return false;
      if (capability !== "all" && !model.capabilities.includes(capability)) return false;
      if (input !== "all" && !model.inputModalities.includes(input as Modality)) return false;
      if (output !== "all" && !model.outputModalities.includes(output as Modality)) return false;
      if (!contextFloor(context, model.contextWindow)) return false;
      return true;
    });
    next.sort((a, b) => {
      if (sort === "context") return (b.contextWindow ?? 0) - (a.contextWindow ?? 0);
      if (sort === "provider") return a.provider.localeCompare(b.provider) || a.name.localeCompare(b.name);
      return a.name.localeCompare(b.name);
    });
    return next;
  }, [capability, category, context, input, models, output, provider, query, sort]);

  function applyQuick(id: string) {
    setCategory(id);
  }

  return (
    <div>
      <div className="grid gap-3 border border-border bg-surface p-3 md:grid-cols-4">
        <input
          className={`${fieldClass} md:col-span-2`}
          placeholder="Search models, providers, capabilities"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select className={fieldClass} value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="name">Sort by name</option>
          <option value="provider">Sort by provider</option>
          <option value="context">Sort by context</option>
        </select>
        <p className="flex h-9 items-center font-mono text-[12px] text-muted">{visible.length} shown</p>
        <select className={fieldClass} value={provider} onChange={(event) => setProvider(event.target.value)}>
          <option value="all">All providers</option>
          {providers.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className={fieldClass} value={capability} onChange={(event) => setCapability(event.target.value)}>
          <option value="all">All capabilities</option>
          {capabilities.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className={fieldClass} value={input} onChange={(event) => setInput(event.target.value)}>
          <option value="all">Any input</option>
          {modalities.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className={fieldClass} value={output} onChange={(event) => setOutput(event.target.value)}>
          <option value="all">Any output</option>
          {modalities.map((item) => (
            <option key={`out-${item}`}>{item}</option>
          ))}
        </select>
        <select className={fieldClass} value={context} onChange={(event) => setContext(event.target.value)}>
          <option value="all">Any context</option>
          <option value="32000">32k+</option>
          <option value="128000">128k+</option>
          <option value="200000">200k+</option>
          <option value="1000000">1M+</option>
        </select>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {quickFilters.map((filter) => {
          const active = category === filter.id || (filter.id === "all" && category === "all");
          return (
            <button
              key={filter.id}
              type="button"
              className={`h-8 shrink-0 rounded-[10px] border px-3 font-mono text-[12px] ${
                active ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-muted"
              }`}
              onClick={() => applyQuick(filter.id)}
            >
              {filter.label} {counts[filter.id]}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-4">
        {featured.map((model) => (
          <Link key={model.slug} href={`/models/${model.slug}`} className="border border-border bg-surface p-4 hover:bg-background">
            <ProviderMark name={model.provider} />
            <p className="mt-3 text-[14px] font-medium">{model.displayName}</p>
            <p className="mt-1 text-[12px] text-muted">{model.provider}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-[12px] border border-border bg-surface">
        <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_72px_88px_88px_110px_minmax(0,1fr)] gap-3 border-b border-border px-4 py-2 font-mono text-[11px] tracking-[0.08em] text-muted uppercase md:grid">
          <span>Model</span>
          <span>Provider</span>
          <span>Context</span>
          <span>Input</span>
          <span>Output</span>
          <span>Type</span>
          <span>Capabilities</span>
        </div>
        <div className="hidden md:block">
          {visible.map((model) => (
            <ModelRow key={model.slug} model={model} />
          ))}
        </div>
        <div className="md:hidden">
          {visible.map((model) => (
            <ModelCard key={model.slug} model={model} />
          ))}
        </div>
        {visible.length === 0 ? <p className="px-4 py-8 text-sm text-muted">No models match these filters.</p> : null}
      </div>
    </div>
  );
}
