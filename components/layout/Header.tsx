"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/useProgress";

export function Header() {
  const { percent, completedCount, totalUnits, hydrated } = useProgress();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <BookOpen className="h-5 w-5 text-primary" />
        <span>RAG 一週速成</span>
      </Link>

      <div className="flex items-center gap-3">
        <span className="hidden text-xs text-muted-foreground sm:inline">
          {hydrated ? `完成 ${completedCount}/${totalUnits}` : " "}
        </span>
        <div className="hidden w-32 sm:block">
          <Progress value={hydrated ? percent : 0} />
        </div>
        <span className="w-10 text-right text-xs font-medium text-primary">
          {hydrated ? `${percent}%` : " "}
        </span>
      </div>
    </header>
  );
}
