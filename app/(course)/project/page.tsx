import type { Metadata } from "next";
import { Rocket } from "lucide-react";
import { finalProject } from "@/data/finalProject";
import { CodeBlock } from "@/components/content/CodeBlock";
import { Callout } from "@/components/content/Callout";
import { RagFlowDiagram } from "@/components/diagrams/RagFlowDiagram";

export const metadata: Metadata = {
  title: "最終專案：Mini RAG Knowledge Base",
};

export default function ProjectPage() {
  const p = finalProject;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
      {/* 標題與情境 */}
      <p className="flex items-center gap-2 text-sm font-medium text-primary">
        <Rocket className="h-4 w-4" /> 最終專案
      </p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{p.title}</h1>
      <p className="mt-3 text-[15px] leading-7 text-foreground/90">{p.scenario}</p>

      {/* 專案介紹 */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-semibold">專案介紹</h2>
        <div className="space-y-4 text-[15px] leading-7 text-foreground/90">
          {p.intro.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* 專案目標 */}
      <section className="mt-8">
        <Callout variant="info" title="專案目標">
          <ul className="ml-1 list-inside list-disc space-y-1">
            {p.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </Callout>
      </section>

      {/* 系統架構圖 */}
      <section className="mt-8">
        <h2 className="mb-2 text-base font-semibold">系統架構</h2>
        <div className="rounded-lg border border-border bg-background p-4">
          <RagFlowDiagram />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          本專案會完整實作上面這條流程的每一個方塊（建庫 4 步 + 查詢 4 步，再加上來源與 grounded 檢查）。
        </p>
      </section>

      {/* LLM 說明 */}
      <section className="mt-6">
        <Callout variant="warning" title="關於 LLM（初版不呼叫真模型）">
          {p.llmNote}
        </Callout>
      </section>

      {/* Step-by-step 任務 */}
      <section className="mt-10">
        <h2 className="mb-1 text-lg font-semibold">Step-by-step 任務</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          照著 11 個步驟逐一完成，每一步都用「檢查點」驗證，再對照下方的完整參考解答。
        </p>
        <div className="space-y-6">
          {p.steps.map((s) => (
            <div key={s.n} className="rounded-lg border border-border p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {s.n}
                </span>
                <h3 className="text-base font-semibold">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{s.goal}</p>

              <div className="mt-3">
                <CodeBlock code={s.code} filename={`step_${s.n}.py`} />
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Callout variant="tip" title="檢查點">
                  {s.checkpoint}
                </Callout>
                <Callout variant="warning" title="常見錯誤">
                  {s.commonMistake}
                </Callout>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 完整參考解答 */}
      <section className="mt-10">
        <h2 className="mb-2 text-lg font-semibold">完整參考解答</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          下面是完整的 final_project.py，可直接複製到本機（VS Code / Jupyter）執行，不需要任何 API Key。
        </p>
        <CodeBlock code={p.fullCode} filename="final_project.py" />
      </section>

      {/* 延伸挑戰 */}
      <section className="mt-10">
        <Callout variant="key" title="延伸挑戰">
          <ul className="ml-1 list-inside list-disc space-y-1">
            {p.challenges.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Callout>
      </section>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        完成這個專案，你就具備了「會做、會評估、會改進、會講」的 RAG 能力 🎉
      </p>
    </article>
  );
}
