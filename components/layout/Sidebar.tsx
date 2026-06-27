import { SidebarNav } from "./SidebarNav";

/** 桌面版固定側邊欄（手機改用 MobileNav 抽屜）。 */
export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-border md:block">
      <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>
  );
}
