"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Table } from "@heroui/react";
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

export function ModelDirectory({ models }: { models: Model[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const requested = params.get("category");
  const [category, setCategory] = useState(requested && quickFilters.some((filter) => filter.id === requested) ? requested : "all");
  const rootRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const stickSentinelRef = useRef<HTMLDivElement>(null);
  const endSentinelRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    const nav = document.querySelector("header");
    const root = rootRef.current;
    if (!nav || !root) return;

    const apply = () => {
      root.style.setProperty("--models-nav-bottom", `${Math.ceil(nav.getBoundingClientRect().bottom)}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(nav);
    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  useEffect(() => {
    const block = blockRef.current;
    const cover = coverRef.current;
    const start = stickSentinelRef.current;
    const end = endSentinelRef.current;
    const nav = document.querySelector("header");
    if (!block || !cover || !start || !end || !nav) return;

    let startAbove = false;
    let endBelow = true;
    let topObserver: IntersectionObserver | null = null;
    let bottomObserver: IntersectionObserver | null = null;

    const paint = () => {
      const stick = startAbove && endBelow;
      if (!stick) {
        cover.style.height = "0px";
        return;
      }
      const navBottom = Math.ceil(nav.getBoundingClientRect().bottom);
      const rect = block.getBoundingClientRect();
      cover.style.height = `${navBottom}px`;
      cover.style.left = `${rect.left}px`;
      cover.style.width = `${rect.width}px`;
    };

    const connect = () => {
      topObserver?.disconnect();
      bottomObserver?.disconnect();
      const navBottom = Math.ceil(nav.getBoundingClientRect().bottom);
      const rootMargin = `-${navBottom}px 0px 0px 0px`;
      topObserver = new IntersectionObserver(
        ([entry]) => {
          startAbove = !entry.isIntersecting && entry.boundingClientRect.top < navBottom;
          paint();
        },
        { rootMargin },
      );
      bottomObserver = new IntersectionObserver(
        ([entry]) => {
          endBelow = entry.boundingClientRect.bottom > navBottom;
          paint();
        },
        { rootMargin },
      );
      topObserver.observe(start);
      bottomObserver.observe(end);
    };

    connect();
    const observer = new ResizeObserver(connect);
    observer.observe(nav);
    window.addEventListener("resize", connect);
    return () => {
      topObserver?.disconnect();
      bottomObserver?.disconnect();
      observer.disconnect();
      window.removeEventListener("resize", connect);
      cover.style.height = "0px";
    };
  }, [visible.length]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!root || !track || !viewport) return;

    let navBottom = 64;
    let maxOffset = 0;

    const parts = () => ({
      body: track.querySelector<HTMLElement>(".table__body"),
      header: track.querySelector<HTMLElement>(".table__header"),
    });

    const narrowQuery = window.matchMedia("(max-width: 1023px)");

    const metrics = () => {
      const { body, header } = parts();
      if (!body || !header || body.scrollHeight === 0) return false;
      if (narrowQuery.matches) {
        body.style.transform = "";
        maxOffset = 0;
        if (track.style.height) track.style.height = "";
        if (viewport.classList.contains("is-pinned")) viewport.classList.remove("is-pinned");
        return false;
      }
      body.style.transform = "";
      navBottom = Number.parseFloat(getComputedStyle(root).getPropertyValue("--models-nav-bottom")) || 64;
      const panel = Math.max(280, window.innerHeight - navBottom - 88);
      root.style.setProperty("--models-panel", `${panel}px`);
      const tableHeight = header.getBoundingClientRect().height + body.scrollHeight;
      maxOffset = Math.max(0, tableHeight - panel);
      const pin = maxOffset > 0;
      const nextHeight = pin ? `${Math.ceil(tableHeight)}px` : "";
      if (track.style.height !== nextHeight) track.style.height = nextHeight;
      if (viewport.classList.contains("is-pinned") !== pin) viewport.classList.toggle("is-pinned", pin);
      return pin;
    };

    const place = () => {
      const { body } = parts();
      if (!body) return;
      if (maxOffset <= 0) {
        body.style.transform = "";
        return;
      }
      const offset = Math.min(maxOffset, Math.max(0, navBottom - track.getBoundingClientRect().top));
      body.style.transform = offset > 0 ? `translate3d(0, ${-offset}px, 0)` : "";
    };

    metrics();
    place();

    const onScroll = () => place();
    const onResize = () => {
      metrics();
      place();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    narrowQuery.addEventListener("change", onResize);
    const observer = new ResizeObserver(onResize);
    observer.observe(track);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      narrowQuery.removeEventListener("change", onResize);
      observer.disconnect();
      parts().body?.style.setProperty("transform", "");
      track.style.height = "";
      viewport.classList.remove("is-pinned");
    };
  }, [visible.length]);

  useEffect(() => {
    const node = blockRef.current;
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
    <div ref={rootRef}>
      {category === "all" ? (
        <div className="border-y border-border bg-[#f7f8fa] px-4 py-4 sm:px-6 md:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((model) => (
              <Link
                key={model.slug}
                href={`/models/${model.slug}`}
                className="group flex min-w-0 items-center gap-3.5 rounded-[14px] border border-border bg-surface px-3.5 py-3.5 transition-colors hover:border-border-strong"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#f3f4f7]">
                  <ProviderMark slug={model.providerSlug} name={model.provider} size="md" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium tracking-[-0.02em]">{model.displayName}</span>
                  <span className="mt-0.5 block truncate text-[12px] text-muted capitalize">
                    {model.provider}
                    <span className="px-1 text-border-strong">·</span>
                    {model.categories[0]}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div ref={coverRef} aria-hidden className="fixed top-0 z-30 bg-surface" />
      <div ref={blockRef} className="border-b border-border bg-surface">
        <div ref={stickSentinelRef} aria-hidden className="h-px" />
        <div ref={trackRef}>
          <div ref={viewportRef} className="models-table-viewport">
            <Table className="models-table">
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="AI models"
                  className="min-w-[600px]"
                  onRowAction={(key) => router.push(`/models/${String(key)}`)}
                >
                  <Table.Header>
                    <Table.Column isRowHeader className="min-w-[196px]">
                      Model
                    </Table.Column>
                    <Table.Column>Context</Table.Column>
                    <Table.Column>Input → output</Table.Column>
                    <Table.Column>Type</Table.Column>
                    <Table.Column>Capabilities</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {visible.length === 0 ? (
                      <Table.Row id="empty">
                        <Table.Cell>No models match this category.</Table.Cell>
                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell />
                      </Table.Row>
                    ) : (
                      visible.map((model) => <ModelRow key={model.slug} model={model} />)
                    )}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>
        </div>
        <div ref={endSentinelRef} aria-hidden className="h-px" />
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
