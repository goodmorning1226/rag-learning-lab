"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** 複製按鈕：複製成功後短暫顯示 Copied。 */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 略過剪貼簿錯誤（例如非安全環境） */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "已複製" : "複製程式碼"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors",
        copied
          ? "text-emerald-400"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> Copy
        </>
      )}
    </button>
  );
}
