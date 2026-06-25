import { FlowArrow } from "./primitives";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CANDIDATES = [
  { text: "水溫太高會讓咖啡變苦", score: 0.82, top: true },
  { text: "手沖咖啡的水溫建議", score: 0.5, top: true },
  { text: "咖啡豆的烘焙程度", score: 0.41, top: false },
  { text: "今天要報稅", score: 0.02, top: false },
];

/** Vector search：query 向量在向量庫中找出 Top-k 最相關的 chunks。 */
export function VectorSearchDiagram() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="md:w-40">
        <p className="mb-1 text-xs font-medium text-muted-foreground">Query 向量</p>
        <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm">
          「咖啡為什麼苦？」
        </div>
      </div>

      <FlowArrow />

      <div className="flex-1 space-y-2">
        <p className="text-xs font-medium text-muted-foreground">依相似度排序，取 Top-k</p>
        {CANDIDATES.map((c) => (
          <div
            key={c.text}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2",
              c.top ? "border-success/40 bg-success/5" : "border-border bg-muted/30",
            )}
          >
            <span className="min-w-0 flex-1 truncate text-sm">{c.text}</span>
            <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-muted sm:block">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.round(c.score * 100)}%` }}
              />
            </div>
            <span className="w-9 text-right font-mono text-xs text-muted-foreground">
              {c.score.toFixed(2)}
            </span>
            {c.top && <Badge variant="success">Top-k</Badge>}
          </div>
        ))}
      </div>
    </div>
  );
}
