import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { advancedTopics, upgradeEmbeddingCode, upgradeLlmCode } from "@/data/advanced";
import { CodeBlock } from "@/components/content/CodeBlock";
import { Callout } from "@/components/content/Callout";

export const metadata: Metadata = {
  title: "進階概念（選讀）",
};

export default function AdvancedPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
      <p className="flex items-center gap-2 text-sm font-medium text-primary">
        <Sparkles className="h-4 w-4" /> 進階概念（選讀）
      </p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
        把 RAG 做得更好
      </h1>
      <p className="mt-3 text-[15px] leading-7 text-foreground/90">
        完成一週課程後，這裡是讓 RAG 從「能用」走向「好用」的進階方向。先用白話了解每個技巧解決什麼問題、何時用得上，未來需要時再深入。
      </p>

      <section className="mt-8 space-y-4">
        {advancedTopics.map((t) => (
          <div key={t.en} className="rounded-lg border border-border p-5">
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-base font-semibold">{t.title}</h2>
              <span className="text-sm text-muted-foreground">{t.en}</span>
            </div>
            <dl className="mt-3 space-y-2 text-sm leading-relaxed">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="shrink-0 font-medium text-muted-foreground sm:w-20">是什麼</dt>
                <dd className="text-foreground/90">{t.what}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="shrink-0 font-medium text-muted-foreground sm:w-20">為什麼</dt>
                <dd className="text-foreground/90">{t.why}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="shrink-0 font-medium text-muted-foreground sm:w-20">怎麼做</dt>
                <dd className="text-foreground/90">{t.how}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="shrink-0 font-medium text-muted-foreground sm:w-20">何時用</dt>
                <dd className="text-foreground/90">{t.when}</dd>
              </div>
            </dl>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">從簡化版升級到真實系統</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          課程的範例用詞頻向量與 mock LLM 來說明原理。要做成真實系統，只需把這兩塊換掉，其餘步驟不變。
        </p>

        <div className="mt-4 space-y-5">
          <div>
            <h3 className="mb-2 text-sm font-semibold">① 換成真正的 embedding 模型</h3>
            <CodeBlock code={upgradeEmbeddingCode} filename="real_embedding.py" />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">② 換成真正的 LLM API</h3>
            <CodeBlock code={upgradeLlmCode} filename="real_llm.py" />
          </div>
        </div>

        <div className="mt-5">
          <Callout variant="warning" title="提醒">
            真實 embedding 模型與 LLM API 會有下載／呼叫成本與額度限制；換 embedding 模型後，整個知識庫要用新模型重新建立索引（query 端也要用同一個模型）。
          </Callout>
        </div>
      </section>
    </div>
  );
}
