"use client";

import { useEffect, useState } from "react";
import { IconApi } from "@tabler/icons-react";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/components/motion/transitions";
import { ProviderMark } from "@/components/models/ProviderMark";

const providers = [
  { name: "OpenAI", slug: "openai", model: "gpt-4.1", latency: "180ms", tokens: "816" },
  { name: "Anthropic", slug: "anthropic", model: "claude-sonnet-4", latency: "240ms", tokens: "804" },
  { name: "Google", slug: "google", model: "gemini-2.5-flash", latency: "160ms", tokens: "790" },
] as const;

const tabs = ["JavaScript", "Python", "cURL"] as const;

type Tab = (typeof tabs)[number];
type Provider = (typeof providers)[number];

function snippetText(tab: Tab, model: string) {
  if (tab === "Python") {
    return `response = client.chat(\n    model="${model}",\n    messages=[{"role": "user"}]\n)`;
  }
  if (tab === "cURL") {
    return `curl https://api.example.com/v1/chat \\\n  -d '{"model":"${model}"}'`;
  }
  return `const response = await client.chat({\n  model: "${model}",\n  messages: [{ role: "user" }]\n});`;
}

function Snippet({ tab, model }: { tab: Tab; model: string }) {
  const line = "font-mono text-[12.5px] leading-6 whitespace-pre";
  const key = "text-[#c4b8ff]";
  const str = "text-[#9ecbff]";
  const modelChip = "rounded-[6px] bg-white/10 px-1.5 text-[#e8f1ff]";

  if (tab === "Python") {
    return (
      <div className="text-[#e7e9ee]">
        <p className={line}>
          <span className={key}>response</span> = client.chat(
        </p>
        <p className={line}>
          {"    "}model=<span className={modelChip}>&quot;{model}&quot;</span>,
        </p>
        <p className={line}>
          {"    "}messages=[{"{"}
          <span className={str}>&quot;role&quot;</span>: <span className={str}>&quot;user&quot;</span>
          {"}"}]
        </p>
        <p className={line}>)</p>
      </div>
    );
  }

  if (tab === "cURL") {
    return (
      <div className="text-[#e7e9ee]">
        <p className={line}>
          <span className={key}>curl</span> https://api.example.com/v1/chat \
        </p>
        <p className={line}>
          {"  "}-d <span className={modelChip}>&apos;{`{"model":"${model}"}`}&apos;</span>
        </p>
      </div>
    );
  }

  return (
    <div className="text-[#e7e9ee]">
      <p className={line}>
        <span className={key}>const</span> response = <span className={key}>await</span> client.chat({"{"}
      </p>
      <p className={line}>
        {"  "}model: <span className={modelChip}>&quot;{model}&quot;</span>,
      </p>
      <p className={line}>
        {"  "}messages: [{"{"} role: <span className={str}>&quot;user&quot;</span> {"}"}]
      </p>
      <p className={line}>{"}"});</p>
    </div>
  );
}

export function UnifiedApiPanel() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<Tab>("JavaScript");
  const [provider, setProvider] = useState<Provider>(providers[0]);
  const [copied, setCopied] = useState(false);
  const [paused, setPaused] = useState(false);
  const selected = providers.findIndex((item) => item.name === provider.name);
  const slide = reduce ? { duration: 0 } : { duration: 0.38, ease: easeOut };

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => {
      setProvider((current) => {
        const index = providers.findIndex((item) => item.name === current.name);
        return providers[(index + 1) % providers.length];
      });
    }, 2600);
    return () => window.clearTimeout(id);
  }, [reduce, paused, provider]);

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(snippetText(tab, provider.model));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-[22px] border border-border bg-surface shadow-[0_1px_1px_rgb(17_19_24/0.04),0_18px_40px_-24px_rgb(17_19_24/0.35)]">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="inline-flex rounded-full bg-[#f1f3f6] p-1" role="tablist" aria-label="Request language">
          {tabs.map((item) => {
            const on = item === tab;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={on}
                className="relative h-8 rounded-full px-3 text-[13px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => setTab(item)}
              >
                {on ? (
                  <motion.span
                    layoutId="api-lang"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-foreground shadow-[0_2px_6px_rgb(17_19_24/0.22)]"
                    transition={slide}
                  />
                ) : null}
                <span className={`relative ${on ? "text-surface" : "text-muted"}`}>{item}</span>
              </button>
            );
          })}
        </div>
        <span className="inline-flex items-center gap-1.5 text-[12px] text-muted">
          <IconApi size={15} stroke={1.75} />
          Same request
        </span>
      </div>

      <div className="px-4">
        <div className="relative overflow-hidden rounded-[16px] bg-[#14161b] shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_10px_24px_-18px_rgb(17_19_24/0.7)]">
          <button
            type="button"
            aria-label={copied ? "Copied" : "Copy code"}
            onClick={() => void copySnippet()}
            className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-[9px] bg-white/10 text-white/80 transition-colors duration-150 hover:bg-white/16 hover:text-white"
          >
            {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.75} />}
          </button>
          <div className="px-5 py-5 pr-14">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${tab}-${provider.model}`}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={slide}
              >
                <Snippet tab={tab} model={provider.model} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div
        className="relative px-3 py-3"
        role="group"
        aria-label="Provider"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute top-7 bottom-7 left-[23px] w-[8px] bg-[length:8px_7px] bg-center bg-repeat-y [background-image:radial-gradient(circle,#9aa1ab_1.15px,transparent_1.35px)]"
        />
        {providers.map((item) => {
          const active = item.name === provider.name;
          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={active}
              className="relative flex w-full items-center gap-3 py-1.5 pl-8 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setProvider(item)}
            >
              {active ? (
                <motion.span
                  layoutId="api-route"
                  aria-hidden
                  className="absolute top-1/2 left-[22px] z-10 size-2.5 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-surface"
                  transition={slide}
                />
              ) : (
                <span aria-hidden className="absolute top-1/2 left-[22px] z-10 size-2.5 -translate-y-1/2 rounded-full border border-foreground/55 bg-surface" />
              )}
              <span className="relative flex min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2">
                {active ? (
                  <motion.span
                    layoutId="api-provider"
                    aria-hidden
                    className="absolute inset-0 rounded-[14px] bg-surface shadow-[0_1px_1px_rgb(17_19_24/0.04),0_10px_22px_-14px_rgb(17_19_24/0.45)]"
                    transition={slide}
                  />
                ) : (
                  <span aria-hidden className="absolute inset-0 rounded-[14px] bg-[#f6f7f9]" />
                )}
                <span className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-[10px] bg-white ${active ? "" : "opacity-80"}`}>
                  <ProviderMark slug={item.slug} name={item.name} size="md" />
                </span>
                <span className={`relative z-10 min-w-0 ${active ? "" : "opacity-70"}`}>
                  <span className="block text-[13px] font-medium tracking-[-0.02em]">{item.name}</span>
                  <span className="block truncate font-mono text-[11px] text-muted">{item.model}</span>
                </span>
                <span className={`relative z-10 ml-auto font-mono text-[11px] ${active ? "text-foreground" : "text-muted"}`}>
                  {active ? "Serving" : "Ready"}
                </span>
              </span>
            </button>
          );
        })}
        <p className="sr-only">
          Serving {provider.name}. Route {selected + 1} of {providers.length}.
        </p>
      </div>

      <div className="grid grid-cols-3 border-t border-border bg-[#f7f8fa]">
        {[
          ["Model", provider.model],
          ["Latency", provider.latency],
          ["Tokens", provider.tokens],
        ].map(([label, value]) => (
          <div key={label} className="border-r border-border px-3 py-3 last:border-r-0">
            <p className="font-mono text-[10px] tracking-[0.08em] text-muted uppercase">{label}</p>
            <p className="mt-1 truncate font-mono text-[12px]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
