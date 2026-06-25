"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/useProgress";

/** 「標記完成」按鈕，狀態存於 localStorage。 */
export function CompleteToggle({ unitId }: { unitId: string }) {
  const { isComplete, toggleComplete, hydrated } = useProgress();
  const done = hydrated && isComplete(unitId);

  return (
    <Button
      variant={done ? "success" : "outline"}
      size="sm"
      onClick={() => toggleComplete(unitId)}
    >
      {done ? (
        <>
          <CheckCircle2 className="h-4 w-4" /> 已完成
        </>
      ) : (
        <>
          <Circle className="h-4 w-4" /> 標記完成
        </>
      )}
    </Button>
  );
}
