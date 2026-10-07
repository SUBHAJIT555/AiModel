"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type NavItemProps = {
  label: string;
  open: boolean;
  controls: string;
  buttonRef: (node: HTMLButtonElement | null) => void;
  onMouseEnter: () => void;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

export function NavItem({
  label,
  open,
  controls,
  buttonRef,
  onMouseEnter,
  onClick,
  onKeyDown,
}: NavItemProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={cn("nav-link nav-link--menu", open && "is-open")}
      aria-controls={controls}
      aria-expanded={open}
      aria-haspopup="true"
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
    >
      {label}
      <ChevronDown aria-hidden className={cn("nav-chevron", open && "is-open")} strokeWidth={1.5} />
    </button>
  );
}
