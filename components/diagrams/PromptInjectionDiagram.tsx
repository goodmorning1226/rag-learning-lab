import { FlowArrow, toneStyles, type Tone } from "./primitives";
import { cn } from "@/lib/utils";

const PARTS: { label: string; text: string; tone: Tone }[] = [
  { label: "System 指令", text: "只根據資料回答，找不到就說「資料中沒有提到」。", tone: "primary" },
  { label: "Retrieved Context", text: "[1] 水溫太高會讓咖啡變苦（coffee.md）", tone: "success" },
  { label: "User Question", text: "咖啡為什麼苦？", tone: "default" },
];

/** Prompt 組裝：System 指令 + Retrieved context + User question → Final prompt。 */
export function PromptInjectionDiagram() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="flex-1 space-y-2">
        {PARTS.map((p) => (
          <div key={p.label} className={cn("rounded-lg border px-3 py-2", toneStyles[p.tone])}>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {p.label}
            </p>
            <p className="mt-0.5 text-sm">{p.text}</p>
          </div>
        ))}
      </div>

      <FlowArrow />

      <div className="flex-1">
        <p className="mb-1 text-xs font-medium text-muted-foreground">Final Prompt</p>
        <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-3 text-sm leading-relaxed">
          <p className="text-muted-foreground">只根據資料回答，找不到就說「資料中沒有提到」。</p>
          <p>
            <span className="text-muted-foreground">資料：</span>
            <br />
            [1] 水溫太高會讓咖啡變苦（coffee.md）
          </p>
          <p>
            <span className="text-muted-foreground">問題：</span>咖啡為什麼苦？
          </p>
        </div>
      </div>
    </div>
  );
}
