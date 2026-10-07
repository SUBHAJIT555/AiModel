"use client";

import { motion, useReducedMotion } from "motion/react";
import { heroContent } from "@/data/hero";
import { easeOut } from "@/components/motion/transitions";

const providers = [
  { name: "OpenAI", src: "/brands/openai.svg" },
  { name: "Anthropic", src: "/brands/anthropic.svg" },
  { name: "Google", src: "/brands/google.svg" },
  { name: "Mistral", src: "/brands/mistral.svg" },
  { name: "DeepSeek", src: "/brands/deepseek.svg" },
  { name: "Qwen", src: "/brands/qwen.svg" },
];

export function ProviderStrip() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="mt-20 flex flex-col gap-6 border-t border-border px-6 py-8 md:mt-28 md:flex-row md:items-center md:justify-between md:px-10 md:py-9"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.32, ease: easeOut }}
    >
      <p className="max-w-[18ch] text-[13px] leading-5 text-muted">{heroContent.stripLabel}</p>
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 md:justify-end">
        {providers.map((provider) => (
          <li key={provider.name} className="inline-flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em]">
            <img src={provider.src} alt="" width={16} height={16} className="size-4 shrink-0" />
            {provider.name}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
