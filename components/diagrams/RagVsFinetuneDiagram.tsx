import { cn } from "@/lib/utils";

const ROWS = [
  { dim: "更新成本", rag: "低（換文件即可）", ft: "高（要重新訓練）" },
  { dim: "即時性", rag: "可即時更新", ft: "需重訓才生效" },
  { dim: "可溯源", rag: "可標來源", ft: "無法" },
  { dim: "幻覺", rag: "較少（有依據）", ft: "仍會" },
  { dim: "擅長", rag: "補『知識』", ft: "調『風格/格式』" },
];

/** RAG vs Fine-tuning：五個面向的並排比較。 */
export function RagVsFinetuneDiagram() {
  return (
    <div className="overflow-hidden rounded-lg border border-border text-sm">
      <div className="grid grid-cols-3 bg-muted/60 text-xs font-semibold">
        <div className="px-3 py-2">面向</div>
        <div className="px-3 py-2 text-primary">RAG</div>
        <div className="px-3 py-2 text-muted-foreground">Fine-tuning</div>
      </div>
      {ROWS.map((r, i) => (
        <div
          key={r.dim}
          className={cn("grid grid-cols-3 border-t border-border", i % 2 === 1 && "bg-muted/20")}
        >
          <div className="px-3 py-2 font-medium text-muted-foreground">{r.dim}</div>
          <div className="px-3 py-2">{r.rag}</div>
          <div className="px-3 py-2 text-foreground/70">{r.ft}</div>
        </div>
      ))}
    </div>
  );
}
