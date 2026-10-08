"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/components/motion/transitions";
import { Reveal } from "@/components/motion/Reveal";

const panelShadow = "shadow-[0_22px_50px_-18px_rgb(17_19_24/0.28),0_8px_20px_-12px_rgb(17_19_24/0.12)]";

const steps = [
  {
    title: "Post to one endpoint",
    body: "Chat, embeddings, images, and audio share that URL. The model is a field in the body.",
  },
  {
    title: "Name a model, or leave it",
    body: "Send gpt-4-1 when you already know. Or set routing to balanced and let the policy choose.",
  },
  {
    title: "Read the same reply",
    body: "Status, token count, and the output sit in the same fields, whether OpenAI or Anthropic answered.",
  },
] as const;

function FieldLabel({ children }: { children: string }) {
  return <p className="text-[12px] text-muted">{children}</p>;
}

function RequestCard() {
  return (
    <div className={`w-[min(100%,420px)] rounded-[20px] border border-border bg-surface p-5 ${panelShadow}`}>
      <p className="text-[15px] font-medium tracking-[-0.02em]">New request</p>
      <div className="mt-4">
        <FieldLabel>Request type</FieldLabel>
        <div className="mt-1.5 grid grid-cols-2 rounded-[10px] bg-[#eef0f3] p-1 text-[13px]">
          <span className="rounded-[8px] bg-white py-1.5 text-center shadow-[0_1px_2px_rgb(17_19_24/0.08)]">Chat</span>
          <span className="py-1.5 text-center text-muted">Embeddings</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Model</FieldLabel>
          <div className="mt-1.5 flex h-9 items-center rounded-[8px] border border-border px-3 text-[13px]">auto</div>
        </div>
        <div>
          <FieldLabel>Routing</FieldLabel>
          <div className="mt-1.5 flex h-9 items-center rounded-[8px] border border-primary px-3 text-[13px] shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_16%,transparent)]">
            balanced
          </div>
        </div>
      </div>
      <div className="mt-4">
        <FieldLabel>Message</FieldLabel>
        <div className="mt-1.5 rounded-[8px] border border-border px-3 py-2 text-[13px] text-muted">
          Summarize the deploy notes.
        </div>
      </div>
      <div className="mt-5 flex items-center justify-end gap-2">
        <span className="inline-flex h-8 items-center rounded-[8px] border border-border px-3 text-[13px]">Cancel</span>
        <span className="inline-flex h-8 items-center rounded-[8px] bg-[#1c1e24] px-3 text-[13px] text-white">Send</span>
      </div>
    </div>
  );
}

function CodeCard() {
  const line = "font-mono text-[12px] leading-6 whitespace-pre";
  return (
    <div className={`w-[min(100%,440px)] overflow-hidden rounded-[20px] bg-[#17191e] p-5 ${panelShadow}`}>
      <div className="overflow-x-auto text-[#e7e9ee]">
        <p className={line}>
          <span className="text-[#8b7cff]">curl</span> https://api.aimodel.com/v1/chat \
        </p>
        <p className={line}>
          {"  "}
          <span className="text-[#8b7cff]">--request</span> POST \
        </p>
        <p className={line}>
          {"  "}
          <span className="text-[#8b7cff]">--header</span>{" "}
          <span className="text-[#79b8ff]">&apos;content-type: application/json&apos;</span> \
        </p>
        <p className={line}>
          {"  "}
          <span className="text-[#8b7cff]">--data</span> <span className="text-[#79b8ff]">&apos;{"{"}</span>
        </p>
        <p className={line}>
          {"    "}
          <span className="text-[#79b8ff]">&quot;model&quot;</span>: <span className="text-[#9ecbff]">&quot;auto&quot;</span>,
        </p>
        <p className={line}>
          {"    "}
          <span className="text-[#79b8ff]">&quot;routing&quot;</span>: <span className="text-[#9ecbff]">&quot;balanced&quot;</span>,
        </p>
        <p className={line}>
          {"    "}
          <span className="text-[#79b8ff]">&quot;messages&quot;</span>: [{"{"}
          <span className="text-[#79b8ff]">&quot;role&quot;</span>: <span className="text-[#9ecbff]">&quot;user&quot;</span>
          {"}"}]
        </p>
        <p className={line}>
          {"  "}
          <span className="text-[#79b8ff]">{"}"}&apos;</span>
        </p>
      </div>
    </div>
  );
}

const thread = [
  { title: "Gateway", body: "200 from Claude Sonnet 4.", accent: true },
  { title: "You", body: "Summarize the deploy notes." },
  { title: "Claude Sonnet 4", body: "Route changed. Fallback is set. The body stayed." },
  { title: "GPT-4.1 mini", body: "Next in line if Sonnet times out." },
  { title: "Usage", body: "816 tokens · 412 ms · 200" },
  { title: "DeepSeek", body: "On the list. Not used for this call." },
];

function PhoneCard() {
  return (
    <div className="w-[268px] max-w-full rounded-[42px] border border-[#e4e7ec] bg-[#fbfbfc] p-[7px] shadow-[0_28px_54px_-22px_rgb(17_19_24/0.22),0_10px_24px_-16px_rgb(17_19_24/0.1)]">
      <div className="overflow-hidden rounded-[34px] bg-white">
        <div className="flex items-center justify-center gap-1.5 pt-3.5">
          <span className="h-[7px] w-11 rounded-full bg-[#1a1c21]" />
          <span className="size-[7px] rounded-full bg-[#1a1c21]" />
        </div>
        <p className="pt-4 text-center text-[13px] font-medium tracking-[-0.01em]">Response</p>
        <ul className="px-3.5 pt-3 pb-6">
          {thread.map((item) => (
            <li key={item.title} className="flex gap-2.5 py-[9px]">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full ${
                  item.accent ? "bg-primary text-white" : "bg-[#eef0f3] text-[#a0a6b0]"
                }`}
              >
                {item.accent ? (
                  <span className="size-2.5 rounded-[2px] bg-white" />
                ) : (
                  <User className="size-3.5" strokeWidth={1.75} />
                )}
              </span>
              <span className="min-w-0 pt-0.5">
                <span className="block truncate text-[13px] leading-4 font-medium">{item.title}</span>
                <span className="mt-0.5 line-clamp-2 text-[12px] leading-4 text-[#8b919a]">{item.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const visuals = [RequestCard, CodeCard, PhoneCard];

const fade = { duration: 0.45, ease: easeOut };

export function HowItWorks() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className="bg-surface">
      <div className="home-frame border-t border-border lg:grid lg:grid-cols-2">
        <div className="flex h-full flex-col">
          <Reveal className="px-6 pt-8 md:px-10 lg:px-12 lg:pt-10">
            <h2 className="text-[2rem] leading-[1.15] font-medium tracking-[-0.03em]">How a call moves.</h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-muted">
              You post once. Name the model, or leave it on auto. The reply uses the same fields either way.
            </p>
          </Reveal>
          <div className="mt-10 lg:mt-auto lg:pt-10">
            {steps.map((step, index) => {
              const selected = index === active;
              return (
                <button
                  key={step.title}
                  type="button"
                  aria-current={selected ? "step" : undefined}
                  className="flex w-full items-start gap-4 border-t border-border px-6 py-4 text-left md:px-10 lg:px-12"
                  onClick={() => setActive(index)}
                >
                  <span
                    className={`mt-0.5 grid size-[24px] shrink-0 place-items-center rounded-full text-[12px] transition-colors duration-300 ${
                      selected
                        ? "border border-primary bg-primary text-primary-foreground"
                        : "border border-border-strong text-muted"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px]">{step.title}</span>
                    <motion.span
                      initial={false}
                      animate={{ height: selected ? "auto" : 0, opacity: selected ? 1 : 0 }}
                      transition={reduce ? { duration: 0 } : { duration: 0.35, ease: easeOut }}
                      className="block overflow-hidden"
                    >
                      <span className="mt-2 block pb-1 text-[14px] leading-6 text-muted">{step.body}</span>
                    </motion.span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="dashed-grid relative min-h-[520px] border-t border-border bg-[#f6f7f9] lg:min-h-[560px] lg:border-t-0 lg:border-l">
          {visuals.map((Visual, index) => (
            <motion.div
              key={steps[index]?.title}
              className="absolute inset-0 flex items-center justify-center px-6"
              initial={false}
              animate={{ opacity: index === active ? 1 : 0 }}
              transition={reduce ? { duration: 0 } : fade}
              style={{ pointerEvents: index === active ? "auto" : "none" }}
              aria-hidden={index === active ? undefined : true}
            >
              <Visual />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
