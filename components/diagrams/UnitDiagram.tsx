import type { ComponentType } from "react";
import { RagFlowDiagram } from "./RagFlowDiagram";
import { ChunkingDiagram } from "./ChunkingDiagram";
import { EmbeddingSpaceDiagram } from "./EmbeddingSpaceDiagram";
import { VectorSearchDiagram } from "./VectorSearchDiagram";
import { PromptInjectionDiagram } from "./PromptInjectionDiagram";
import { EvaluationDiagram } from "./EvaluationDiagram";

/**
 * 把每個單元（dayId/slug）對應到最合適的圖解元件。
 * 沒有對應的單元，會退回顯示文字版 diagramDescription。
 */
const UNIT_DIAGRAM: Record<string, ComponentType> = {
  // RAG 全流程
  "day1/rag-flow": RagFlowDiagram,
  "day1/minimal-rag": RagFlowDiagram,
  "day6/pipeline-overview": RagFlowDiagram,
  "day1/what-problems": RagFlowDiagram,

  // Chunking
  "day2/chunk-size": ChunkingDiagram,
  "day2/chunk-overlap": ChunkingDiagram,
  "day2/recursive-splitting": ChunkingDiagram,
  "day2/chunking-quality": ChunkingDiagram,
  "day6/split-chunks": ChunkingDiagram,

  // Embedding 與向量空間
  "day3/what-embedding": EmbeddingSpaceDiagram,
  "day3/vector-space": EmbeddingSpaceDiagram,
  "day3/cosine-similarity": EmbeddingSpaceDiagram,
  "day3/query-document-embedding": EmbeddingSpaceDiagram,
  "day6/embed-chunks": EmbeddingSpaceDiagram,

  // 向量搜尋 / 檢索
  "day3/semantic-search": VectorSearchDiagram,
  "day4/what-vectordb": VectorSearchDiagram,
  "day4/store-vectors": VectorSearchDiagram,
  "day4/query-topk": VectorSearchDiagram,
  "day4/metadata": VectorSearchDiagram,
  "day5/query-embedding": VectorSearchDiagram,
  "day5/topk-retrieval": VectorSearchDiagram,
  "day6/retrieve-context": VectorSearchDiagram,

  // Prompt 組裝
  "day5/context-injection": PromptInjectionDiagram,
  "day5/prompt-template": PromptInjectionDiagram,
  "day5/reduce-hallucination": PromptInjectionDiagram,
  "day5/grounded-only": PromptInjectionDiagram,
  "day6/generate-answer": PromptInjectionDiagram,

  // 評估 / Groundedness
  "day6/show-citations": EvaluationDiagram,
  "day7/retrieval-quality": EvaluationDiagram,
  "day7/answer-quality": EvaluationDiagram,
  "day7/groundedness-faithfulness": EvaluationDiagram,
  "day7/common-issues": EvaluationDiagram,
  "day7/debug-methods": EvaluationDiagram,
  "day7/final-project": EvaluationDiagram,
};

export function UnitDiagram({
  dayId,
  slug,
  description,
}: {
  dayId: string;
  slug: string;
  description: string;
}) {
  const Diagram = UNIT_DIAGRAM[`${dayId}/${slug}`];

  if (!Diagram) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
        {description}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-border bg-background p-4">
        <Diagram />
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
