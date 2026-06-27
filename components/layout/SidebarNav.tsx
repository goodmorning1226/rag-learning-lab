"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookText, Check, Circle, Home, Rocket, Sparkles } from "lucide-react";
import { courseData } from "@/data/courseData";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

/** 課程導航內容（桌面側欄與手機抽屜共用）。 */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { isComplete, hydrated } = useProgress();

  const topLink =
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted";

  return (
    <nav className="px-3 py-4">
      <Link
        href="/"
        onClick={onNavigate}
        className={cn(topLink, pathname === "/" && "bg-primary/10 text-primary")}
      >
        <Home className="h-4 w-4" /> 首頁
      </Link>
      <Link
        href="/progress"
        onClick={onNavigate}
        className={cn(topLink, "mt-0.5", pathname === "/progress" && "bg-primary/10 text-primary")}
      >
        <BarChart3 className="h-4 w-4" /> 學習進度
      </Link>

      {courseData.map((day) => (
        <div key={day.id} className="mt-4">
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Day {day.num} · {day.title}
          </p>
          <ul>
            {day.units.map((unit) => {
              const href = `/day/${day.id}/${unit.slug}`;
              const active = pathname === href;
              const done = hydrated && isComplete(unit.id);
              return (
                <li key={unit.id}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted",
                      active ? "bg-primary/10 font-medium text-primary" : "text-foreground/80",
                    )}
                  >
                    {done ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-success" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                    )}
                    <span className="truncate">
                      {unit.id} {unit.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <Link
        href="/project"
        onClick={onNavigate}
        className={cn(
          "mt-6 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10",
          pathname === "/project" && "bg-primary/10",
        )}
      >
        <Rocket className="h-4 w-4" /> 最終專案
      </Link>

      <div className="mt-4 border-t border-border pt-3">
        <Link
          href="/advanced"
          onClick={onNavigate}
          className={cn(topLink, pathname === "/advanced" && "bg-primary/10 text-primary")}
        >
          <Sparkles className="h-4 w-4" /> 進階概念
        </Link>
        <Link
          href="/glossary"
          onClick={onNavigate}
          className={cn(topLink, "mt-0.5", pathname === "/glossary" && "bg-primary/10 text-primary")}
        >
          <BookText className="h-4 w-4" /> 名詞速查
        </Link>
      </div>
    </nav>
  );
}
