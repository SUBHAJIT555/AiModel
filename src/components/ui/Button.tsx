import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const variantClass = {
  primary: "button-accent",
  secondary: "button-secondary",
  ghost: "button-ghost",
} as const;

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) {
  const classes = cn(variantClass[variant], className);

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a className={classes} href={href} aria-disabled={disabled || undefined} onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
