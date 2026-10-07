import { Network, Waypoints } from "lucide-react";
import type { MegaIconKey } from "@/types/mega-menu";

const icons = {
  network: Network,
  waypoints: Waypoints,
} as const;

export function MegaMenuIcon({ icon }: { icon: MegaIconKey }) {
  const Icon = icons[icon];
  return (
    <span className="mega-icon">
      <Icon aria-hidden strokeWidth={1.5} />
    </span>
  );
}
