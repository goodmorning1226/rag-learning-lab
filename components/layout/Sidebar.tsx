"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Circle, Home, Rocket } from "lucide-react";
import { courseData } from "@/data/courseData";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { isComplete, hydrated } = useProgress();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-border md:block">
      <nav className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto px-3 py-4">
        <Link
          href="/"
          className={cn(
            "mb-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
            pathname === "/" && "bg-primary/10 text-primary",
          )}
        >
          <Home className="h-4 w-4" /> 首頁
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
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted",
                        active
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-foreground/80",
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
          className={cn(
            "mt-6 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10",
            pathname === "/project" && "bg-primary/10",
          )}
        >
          <Rocket className="h-4 w-4" /> 最終專案
        </Link>
      </nav>
    </aside>
  );
}
