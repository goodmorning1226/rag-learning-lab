"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnswerRevealProps {
  answer: string;
  explanation?: string;
}

/** 「查看標準答案」按鈕，展開後顯示參考答案與解析（預設隱藏，鼓勵先想）。 */
export function AnswerReveal({ answer, explanation }: AnswerRevealProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => setOpen((v) => !v)}>
        <Eye className="h-4 w-4" /> {open ? "隱藏答案" : "查看答案"}
      </Button>
      {open && (
        <div className="mt-2 basis-full space-y-2 rounded-md border border-border bg-muted/40 p-3 text-sm leading-relaxed">
          <div>
            <span className="font-semibold text-success">標準答案：</span>
            <span className="whitespace-pre-wrap">{answer}</span>
          </div>
          {explanation && (
            <div>
              <span className="font-semibold">解析：</span>
              <span className="whitespace-pre-wrap">{explanation}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
