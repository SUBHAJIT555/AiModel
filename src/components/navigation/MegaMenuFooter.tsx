import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { MegaMenuConfig } from "@/types/mega-menu";
import { MegaMenuIcon } from "@/components/navigation/MegaMenuIcon";

export function MegaMenuFooter({
  footer,
  onNavigate,
}: {
  footer: MegaMenuConfig["footer"];
  onNavigate: () => void;
}) {
  const external = footer.href.startsWith("http");
  const className = "button-secondary mega-footer-button";
  const label = (
    <>
      {footer.cta}
      <ArrowRight aria-hidden strokeWidth={1.5} />
    </>
  );

  return (
    <div className="mega-footer">
      <MegaMenuIcon icon={footer.icon} />
      <div className="min-w-0">
        <p className="mega-title">{footer.title}</p>
        <p className="mega-footer-copy">{footer.description}</p>
      </div>
      {external ? (
        <a className={className} href={footer.href} onClick={onNavigate}>
          {label}
        </a>
      ) : (
        <Link className={className} href={footer.href} onClick={onNavigate}>
          {label}
        </Link>
      )}
    </div>
  );
}
