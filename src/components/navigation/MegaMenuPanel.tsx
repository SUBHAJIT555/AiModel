import type { MegaMenuConfig } from "@/types/mega-menu";
import { MegaMenuFeature } from "@/components/navigation/MegaMenuFeature";

export function MegaMenuPanel({
  menu,
  onNavigate,
}: {
  menu: MegaMenuConfig;
  onNavigate: () => void;
}) {
  return (
    <div className="mega-grid" data-layout={menu.layout}>
      <MegaMenuFeature
        className="mega-cell mega-cell--top"
        copy={menu.copy}
        feature={menu.leftTop}
        onNavigate={onNavigate}
      />
      <MegaMenuFeature
        className="mega-cell mega-cell--bottom"
        copy={menu.copy}
        feature={menu.leftBottom}
        onNavigate={onNavigate}
      />
      <MegaMenuFeature
        className="mega-cell mega-cell--main"
        copy={menu.copy}
        feature={menu.main}
        large
        onNavigate={onNavigate}
      />
    </div>
  );
}
