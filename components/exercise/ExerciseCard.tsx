"use client";

import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnswerChecker } from "./AnswerChecker";
import { HintButton } from "./HintButton";
import { AnswerReveal } from "./AnswerReveal";
import { useProgress } from "@/hooks/useProgress";
import type { Exercise } from "@/data/types";

const TYPE_LABEL: Record<Exercise["type"], string> = {
  "multiple-choice": "選擇題",
  "short-answer": "簡答題",
  "code-output": "預測輸出",
  "code-fill": "程式填空",
};

/** 單一練習題卡：題目、類型、作答、提示、答案、完成狀態（存 localStorage）。 */
export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const { isExerciseComplete, markExerciseComplete, hydrated } = useProgress();
  const done = hydrated && isExerciseComplete(exercise.id);

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge variant="muted">{TYPE_LABEL[exercise.type]}</Badge>
        <span className="text-sm font-semibold">{exercise.title}</span>
        {done && (
          <Badge variant="success" className="ml-auto inline-flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> 已完成
          </Badge>
        )}
      </div>

      <p className="mb-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
        {exercise.question}
      </p>

      <AnswerChecker
        exercise={exercise}
        alreadyDone={done}
        onCorrect={() => markExerciseComplete(exercise.id)}
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {exercise.hint && <HintButton hint={exercise.hint} />}
        <AnswerReveal answer={exercise.expectedAnswer} explanation={exercise.explanation} />
      </div>
    </div>
  );
}
