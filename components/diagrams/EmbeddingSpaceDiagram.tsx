import { FlowArrow } from "./primitives";
import { cn } from "@/lib/utils";

const ITEMS = [
  { text: "手沖咖啡的水溫", vec: "[0.9, 0.1, 0.0]" },
  { text: "咖啡太苦怎麼辦", vec: "[0.8, 0.2, 0.0]" },
  { text: "今天要報稅", vec: "[0.0, 0.1, 0.9]" },
];

const DOTS = [
  { label: "咖啡水溫", x: 26, y: 30, near: true },
  { label: "咖啡太苦", x: 36, y: 46, near: true },
  { label: "報稅", x: 76, y: 68, near: false },
];

/** Embedding：文字 → 向量，語意相近的句子在向量空間靠在一起。 */
export function EmbeddingSpaceDiagram() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">文字 → 向量（embedding）</p>
        {ITEMS.map((it) => (
          <div key={it.text} className="flex items-center gap-2">
            <div className="flex-1 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm">
              {it.text}
            </div>
            <FlowArrow className="rotate-0" />
            <code className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
              {it.vec}
            </code>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          語意空間：相近的句子靠在一起
        </p>
        <div className="relative h-48 overflow-hidden rounded-lg border border-border bg-muted/30">
          {/* 咖啡群聚的虛線範圍 */}
          <div className="absolute left-[14%] top-[18%] h-24 w-32 rounded-[50%] border border-dashed border-primary/40" />
          {DOTS.map((d) => (
            <div
              key={d.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
            >
              <div
                className={cn(
                  "mx-auto h-3 w-3 rounded-full",
                  d.near ? "bg-primary" : "bg-muted-foreground",
                )}
              />
              <span className="mt-1 block whitespace-nowrap text-[11px] text-muted-foreground">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
