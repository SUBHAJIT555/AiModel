"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const models = {
  OpenAI: "gpt-4.1",
  Anthropic: "claude-sonnet-4",
  Google: "gemini-2.5-flash",
} as const;

const tabs = ["JavaScript", "Python", "cURL"] as const;

function snippet(tab: (typeof tabs)[number], model: string) {
  if (tab === "Python") {
    return `response = client.chat(\n    model="${model}",\n    messages=[{"role": "user", "content": "Draft a summary."}],\n)`;
  }
  if (tab === "cURL") {
    return `curl https://api.example.com/v1/chat \\\n  -H "content-type: application/json" \\\n  -d '{"model":"${model}"}'`;
  }
  return `const response = await client.chat({\n  model: "${model}",\n  messages: [{ role: "user", content: "Draft a summary." }],\n});`;
}

export function CodeDemo() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("JavaScript");
  const [provider, setProvider] = useState<keyof typeof models>("OpenAI");
  const [copied, setCopied] = useState(false);
  const code = snippet(tab, models[provider]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,240px)]">
      <div className="min-w-0 overflow-hidden border border-dark-border bg-dark-surface">
        <div className="flex items-center justify-between border-b border-dark-border px-3">
          <div className="flex">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                className={`h-10 px-3 text-[13px] ${item === tab ? "text-dark-foreground" : "text-dark-muted"}`}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button type="button" className="inline-flex items-center gap-1 text-[12px] text-dark-muted" onClick={copy}>
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="max-w-full overflow-x-auto p-4 font-mono text-[12px] leading-6 text-dark-foreground">{code}</pre>
      </div>
      <div className="min-w-0 border border-dark-border bg-dark-surface p-4">
        <p className="font-mono text-[11px] tracking-[0.08em] text-dark-muted uppercase">Provider</p>
        <div className="mt-3 space-y-2">
          {(Object.keys(models) as Array<keyof typeof models>).map((item) => (
            <button
              key={item}
              type="button"
              className={`block w-full border px-3 py-2 text-left text-[13px] ${
                item === provider ? "border-dark-foreground" : "border-dark-border text-dark-muted"
              }`}
              onClick={() => setProvider(item)}
            >
              {item}
              <span className="mt-1 block font-mono text-[11px]">{models[item]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
