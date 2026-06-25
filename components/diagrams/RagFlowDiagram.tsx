import { Fragment } from "react";
import { FlowArrow, StepNode, type Tone } from "./primitives";

const STEPS: { en: string; zh: string; tone: Tone }[] = [
  { en: "Documents", zh: "文件", tone: "primary" },
  { en: "Chunking", zh: "切塊", tone: "primary" },
  { en: "Embedding", zh: "嵌入", tone: "primary" },
  { en: "Vector Store", zh: "向量庫", tone: "primary" },
  { en: "Retrieval", zh: "檢索", tone: "success" },
  { en: "Prompt", zh: "組裝", tone: "success" },
  { en: "LLM", zh: "模型", tone: "success" },
  { en: "Answer", zh: "回答", tone: "success" },
];

/** RAG 全流程：Documents → … → Answer。 */
export function RagFlowDiagram() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:flex-wrap md:items-center">
        {STEPS.map((s, i) => (
          <Fragment key={s.en}>
            <StepNode title={s.en} subtitle={s.zh} tone={s.tone} className="md:min-w-[88px]" />
            {i < STEPS.length - 1 && <FlowArrow />}
          </Fragment>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary/40" /> 建立知識庫（事前一次）
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success/40" /> 即時查詢（每次提問）
        </span>
      </div>
    </div>
  );
}
