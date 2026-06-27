import { cn } from "@/lib/utils";

const COLS = [
  { name: "FAISS", tag: "函式庫", note: "超快，但原文與儲存要自己管", highlight: false },
  { name: "Chroma", tag: "開箱即用", note: "本地友善，適合學習與小專案", highlight: true },
  { name: "pgvector", tag: "長在 Postgres", note: "適合已用 SQL 的團隊一起管理", highlight: false },
];

/** Vector DB 方案比較：FAISS / Chroma / pgvector。 */
export function VectorDBCompareDiagram() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {COLS.map((c) => (
        <div
          key={c.name}
          className={cn(
            "rounded-lg border p-3",
            c.highlight ? "border-primary/30 bg-primary/5" : "border-border bg-muted/40",
          )}
        >
          <p className="font-semibold">{c.name}</p>
          <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
            {c.tag}
          </span>
          <p className="mt-2 text-sm text-foreground/80">{c.note}</p>
        </div>
      ))}
    </div>
  );
}
