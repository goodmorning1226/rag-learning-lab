"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/useProgress";
import { allUnits } from "@/data/courseData";
import { cn } from "@/lib/utils";

export function ProgressCard() {
  const {
    percent,
    completedCount,
    totalUnits,
    exercisePercent,
    completedExerciseCount,
    totalExercises,
    lastVisitedUnit,
    hydrated,
  } = useProgress();

  // 「繼續上次」：優先用最後造訪，否則第一個未完成單元
  const continueHref = lastVisitedUnit
    ? `/${lastVisitedUnit}`
    : `/day/${allUnits[0].day.id}/${allUnits[0].unit.slug}`;

  return (
    <Card>
      <CardContent className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">整體學習進度</p>
            <p className="mt-1 text-2xl font-bold">
              {hydrated ? `${percent}%` : "—"}
              <span className="ml-2 text-base font-normal text-muted-foreground">
                完成
              </span>
            </p>
          </div>
          <Link href={continueHref} className={cn(buttonVariants(), "shrink-0")}>
            繼續學習 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 單元完成率 */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">單元完成</span>
            <span className="font-medium">
              {hydrated ? `${completedCount} / ${totalUnits}` : "—"}
            </span>
          </div>
          <Progress value={hydrated ? percent : 0} />
        </div>

        {/* 練習完成率 */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">練習完成</span>
            <span className="font-medium">
              {hydrated ? `${completedExerciseCount} / ${totalExercises}` : "—"}
            </span>
          </div>
          <Progress
            value={hydrated ? exercisePercent : 0}
            indicatorClassName="bg-success"
          />
        </div>
      </CardContent>
    </Card>
  );
}
