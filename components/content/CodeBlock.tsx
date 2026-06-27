"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "./CopyButton";
import { CodeExplanation } from "./CodeExplanation";
import { PyRunner } from "./PyRunner";
import { cn } from "@/lib/utils";
import type { CodeExplanationItem } from "@/data/types";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  explanation?: CodeExplanationItem[];
  /** 顯示「執行」按鈕，於瀏覽器以 Pyodide 跑（僅適用純標準庫的 Python） */
  runnable?: boolean;
  className?: string;
}

const LANG_LABEL: Record<string, string> = {
  python: "Python",
  bash: "Bash",
  text: "Text",
};

export function CodeBlock({
  code,
  language = "python",
  filename,
  explanation,
  runnable = false,
  className,
}: CodeBlockProps) {
  const label = LANG_LABEL[language] ?? language;

  return (
    <div className={cn("space-y-2", className)}>
      {/* 深色 code block */}
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
        {/* 標題列：語言標籤 + 檔名 + 複製鈕 */}
        <div className="flex items-center justify-between gap-2 border-b border-zinc-800 px-3 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="rounded bg-blue-500/15 px-1.5 py-0.5 text-[11px] font-medium text-blue-300">
              {label}
            </span>
            {filename && (
              <span className="truncate font-mono text-xs text-zinc-400">{filename}</span>
            )}
          </div>
          <CopyButton text={code} />
        </div>

        {/* 程式碼：水平捲動，手機不爆版 */}
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "0.85rem",
              lineHeight: 1.6,
            }}
            codeTagProps={{
              style: { fontFamily: "var(--font-mono, ui-monospace, monospace)" },
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
        {runnable && <PyRunner code={code} />}
      </div>

      {/* 逐行／分段說明（若 courseData 有提供 codeExplanation） */}
      {explanation && explanation.length > 0 && <CodeExplanation items={explanation} />}
    </div>
  );
}
