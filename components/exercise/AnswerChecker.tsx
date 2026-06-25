"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/content/CodeBlock";
import { isCorrect } from "@/lib/check-answer";
import { cn } from "@/lib/utils";
import type { Exercise } from "@/data/types";

interface AnswerCheckerProps {
  exercise: Exercise;
  /** 已被標記為完成（曾答對） */
  alreadyDone: boolean;
  /** 答對時呼叫，用於寫入 localStorage */
  onCorrect: () => void;
}

/**
 * 負責「輸入答案 → 提交 → 判斷對錯 → 顯示回饋」。
 * 依題型切換輸入介面：選擇題用選項按鈕，其餘用文字框。
 */
export function AnswerChecker({ exercise, alreadyDone, onCorrect }: AnswerCheckerProps) {
  const isMC = exercise.type === "multiple-choice";
  const [value, setValue] = useState(
    exercise.type === "code-fill" ? exercise.starterCode ?? "" : "",
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<boolean | null>(null);

  function submit() {
    const user = isMC ? selected ?? "" : value;
    const ok = isCorrect(exercise.type, user, exercise.expectedAnswer);
    setResult(ok);
    if (ok) onCorrect();
  }

  const letters = "ABCDEFGH";
  const showSuccess = result === true;

  return (
    <div>
      {/* 情境程式（code-output 用；code-fill 直接在輸入框預填） */}
      {exercise.starterCode && exercise.type !== "code-fill" && (
        <div className="mb-3">
          <CodeBlock code={exercise.starterCode} />
        </div>
      )}

      {/* 作答區 */}
      {isMC ? (
        <div className="space-y-2">
          {exercise.options?.map((opt, i) => {
            const active = selected === opt;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSelected(opt);
                  setResult(null);
                }}
                className={cn(
                  "flex w-full items-start gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors",
                  active ? "border-primary bg-primary/5" : "border-border hover:bg-muted",
                )}
              >
                <span className="font-mono text-xs text-muted-foreground">{letters[i]}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setResult(null);
          }}
          rows={exercise.type === "short-answer" ? 2 : 5}
          spellCheck={false}
          placeholder={
            exercise.type === "code-fill"
              ? "在空格處填入答案後，這裡是完整程式…"
              : exercise.type === "code-output"
                ? "輸入你預期的程式輸出…"
                : "在此輸入你的答案…"
          }
          className={cn(
            "w-full rounded-md border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            exercise.type !== "short-answer" && "font-mono",
          )}
        />
      )}

      {/* 提交與回饋 */}
      <div className="mt-3 flex items-center gap-3">
        <Button
          size="sm"
          variant={showSuccess ? "success" : "default"}
          onClick={submit}
          disabled={isMC ? !selected : !value.trim()}
        >
          提交答案
        </Button>

        {result === true && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
            <Check className="h-4 w-4" /> 答對了！做得好 🎉
          </span>
        )}
        {result === false && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <X className="h-4 w-4 text-destructive" /> 還不太對，再想想，或看看提示。
          </span>
        )}
        {result === null && alreadyDone && (
          <span className="inline-flex items-center gap-1 text-sm text-success">
            <Check className="h-4 w-4" /> 你先前已答對
          </span>
        )}
      </div>
    </div>
  );
}
