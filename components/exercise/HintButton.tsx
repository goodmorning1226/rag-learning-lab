"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

/** 「查看提示」按鈕，點擊展開／收合提示內容。 */
export function HintButton({ hint }: { hint: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => setOpen((v) => !v)}>
        <Lightbulb className="h-4 w-4" /> {open ? "隱藏提示" : "查看提示"}
      </Button>
      {open && (
        <div className="mt-2 basis-full rounded-md border border-warning/30 bg-warning/5 p-3 text-sm leading-relaxed">
          💡 {hint}
        </div>
      )}
    </>
  );
}
