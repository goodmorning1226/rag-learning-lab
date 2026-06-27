import { BookOpen, BookX } from "lucide-react";

/** 為什麼需要 RAG：閉書考試的 LLM vs 開書考試的 LLM（RAG）。 */
export function ContrastDiagram() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
      <div className="flex-1 rounded-lg border border-border bg-muted/40 p-4">
        <div className="flex items-center gap-2 font-medium">
          <BookX className="h-4 w-4 text-muted-foreground" /> 閉書考試的 LLM
        </div>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>只靠訓練記憶回答</li>
          <li>知識會過期</li>
          <li>可能自信地編造（幻覺）</li>
          <li>不知道你的私有資料</li>
        </ul>
      </div>

      <div className="flex items-center justify-center">
        <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          ＋ 檢索這一步
        </span>
      </div>

      <div className="flex-1 rounded-lg border border-success/30 bg-success/5 p-4">
        <div className="flex items-center gap-2 font-medium">
          <BookOpen className="h-4 w-4 text-success" /> 開書考試的 LLM（RAG）
        </div>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-foreground/80">
          <li>先檢索知識庫</li>
          <li>根據撈到的資料回答</li>
          <li>可附上來源（可溯源）</li>
          <li>能讀你的私有／最新文件</li>
        </ul>
      </div>
    </div>
  );
}
