const brandIcons: Record<string, string> = {
  ai21: "/brands/ai21.svg",
  alibaba: "/brands/alibaba.svg",
  amazon: "/brands/amazon.svg",
  anthropic: "/brands/anthropic.svg",
  assemblyai: "/brands/assemblyai.svg",
  "black-forest": "/brands/flux.svg",
  cohere: "/brands/cohere.svg",
  deepseek: "/brands/deepseek.svg",
  elevenlabs: "/brands/elevenlabs.svg",
  google: "/brands/google.svg",
  ideogram: "/brands/ideogram.svg",
  kling: "/brands/kling.svg",
  luma: "/brands/luma.svg",
  meta: "/brands/meta.svg",
  microsoft: "/brands/microsoft.svg",
  minimax: "/brands/minimax.svg",
  mistral: "/brands/mistral.svg",
  moonshot: "/brands/moonshot.svg",
  openai: "/brands/openai.svg",
  perplexity: "/brands/perplexity.svg",
  pika: "/brands/pika.svg",
  qwen: "/brands/qwen.svg",
  recraft: "/brands/recraft.svg",
  runway: "/brands/runway.svg",
  stability: "/brands/stability.svg",
  stepfun: "/brands/stepfun.svg",
  suno: "/brands/suno.svg",
  tencent: "/brands/tencent.svg",
  xai: "/brands/xai.svg",
  yi: "/brands/yi.svg",
  zhipu: "/brands/zhipu.svg",
};

export function ProviderMark({
  slug,
  name,
  size = "sm",
}: {
  slug: string;
  name: string;
  size?: "sm" | "md";
}) {
  const src = brandIcons[slug];
  const dimension = size === "md" ? 20 : 16;
  if (src) {
    return <img src={src} alt="" width={dimension} height={dimension} className={size === "md" ? "size-5 shrink-0" : "size-4 shrink-0"} />;
  }
  const mark = name.replace(/[^A-Za-z0-9]/g, "").slice(0, 1).toUpperCase();
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-[4px] border border-border text-[9px] font-medium text-muted ${
        size === "md" ? "size-5" : "size-4"
      }`}
    >
      {mark}
    </span>
  );
}
