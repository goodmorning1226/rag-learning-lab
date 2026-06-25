"use client";

import { useProgress } from "@/hooks/useProgress";

/** 顯示本單元練習完成數，例如「（1/2 完成）」。 */
export function ExerciseProgress({ exerciseIds }: { exerciseIds: string[] }) {
  const { completedExercises, hydrated } = useProgress();
  if (exerciseIds.length === 0) return null;
  const done = hydrated
    ? exerciseIds.filter((id) => completedExercises.includes(id)).length
    : 0;
  return (
    <span className="text-sm font-normal text-muted-foreground">
      （{done}/{exerciseIds.length} 完成）
    </span>
  );
}
