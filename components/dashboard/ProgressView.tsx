"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { courseData, dayCompletedCount } from "@/data/courseData";
import { useProgress } from "@/hooks/useProgress";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProgressView() {
  const {
    completedUnits,
    completedExercises,
    percent,
    exercisePercent,
    completedCount,
    totalUnits,
    completedExerciseCount,
    totalExercises,
    hydrated,
    reset,
  } = useProgress();

  function handleReset() {
    if (
      window.confirm(
        "確定要重置所有學習進度嗎？已完成的單元與練習都會清空，此動作無法復原。",
      )
    ) {
      reset();
    }
  }

  return (
    <div className="space-y-8">
      {/* 總覽 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">單元完成</p>
            <p className="mt-1 text-2xl font-bold">
              {hydrated ? `${completedCount} / ${totalUnits}` : "—"}
              <span className="ml-2 text-base font-normal text-muted-foreground">
                （{hydrated ? percent : 0}%）
              </span>
            </p>
            <Progress className="mt-3" value={hydrated ? percent : 0} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">練習完成</p>
            <p className="mt-1 text-2xl font-bold">
              {hydrated ? `${completedExerciseCount} / ${totalExercises}` : "—"}
              <span className="ml-2 text-base font-normal text-muted-foreground">
                （{hydrated ? exercisePercent : 0}%）
              </span>
            </p>
            <Progress
              className="mt-3"
              value={hydrated ? exercisePercent : 0}
              indicatorClassName="bg-success"
            />
          </CardContent>
        </Card>
      </div>

      {/* 各天進度 */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">各天進度</h2>
        <div className="space-y-2">
          {courseData.map((day) => {
            const unitsDone = hydrated ? dayCompletedCount(day, completedUnits) : 0;
            const exTotal = day.units.reduce((n, u) => n + u.exercises.length, 0);
            const exDone = hydrated
              ? day.units.reduce(
                  (n, u) =>
                    n + u.exercises.filter((e) => completedExercises.includes(e.id)).length,
                  0,
                )
              : 0;
            const unitPct = Math.round((unitsDone / day.units.length) * 100);
            return (
              <Link
                key={day.id}
                href={`/day/${day.id}/${day.units[0].slug}`}
                className="block rounded-lg border border-border p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate font-medium">
                    Day {day.num} · {day.title}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    單元 {unitsDone}/{day.units.length}　練習 {exDone}/{exTotal}
                  </span>
                </div>
                <Progress className="mt-2" value={unitPct} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* 重置 */}
      <div className="flex flex-col gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">重置學習進度</p>
          <p className="text-sm text-muted-foreground">清空所有已完成的單元與練習紀錄。</p>
        </div>
        <Button
          variant="outline"
          onClick={handleReset}
          className="shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10"
        >
          <RotateCcw className="h-4 w-4" /> 重置進度
        </Button>
      </div>
    </div>
  );
}
