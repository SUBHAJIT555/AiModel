import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { LogoMark } from "@/components/layout/LogoMark";
import { cn } from "@/lib/cn";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 tracking-[-0.01em]",
        compact ? "pr-1 text-[13px] leading-6 font-medium" : "text-sm font-medium",
      )}
    >
      <LogoMark className={compact ? "size-7" : "size-5"} />
      <span>{siteConfig.name}</span>
    </Link>
  );
}
