import { FlowArrow, StepNode } from "./primitives";

/** 評估：Question、Retrieved Context、Answer、Citation、Groundedness check 的關係。 */
export function EvaluationDiagram() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        <StepNode title="Question" subtitle="使用者問題" className="md:flex-1" />
        <FlowArrow />
        <StepNode title="Retrieved Context" subtitle="檢索到的段落" tone="primary" className="md:flex-1" />
        <FlowArrow />
        <div className="rounded-lg border border-success/30 bg-success/5 px-3 py-2 text-center md:flex-1">
          <div className="text-sm font-medium leading-tight">Answer</div>
          <div className="mt-0.5 text-xs text-muted-foreground">附 Citation [1]</div>
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-3">
        <p className="text-xs font-medium text-muted-foreground">Groundedness check</p>
        <p className="mt-1 text-sm leading-relaxed">
          把 <span className="font-medium text-success">Answer</span> 的每一句，拿去和{" "}
          <span className="font-medium text-primary">Retrieved Context</span> 比對：每一句都有依據嗎？
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-success/10 px-2 py-0.5 text-success">
            ✓ 有依據 → grounded
          </span>
          <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-destructive">
            ✗ 無依據 → 可能是幻覺
          </span>
        </div>
      </div>
    </div>
  );
}
