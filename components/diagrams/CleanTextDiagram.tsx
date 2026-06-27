import { FlowArrow } from "./primitives";

/** 文件讀取與清理：原始檔（含雜訊）→ 清理 → 乾淨純文字。 */
export function CleanTextDiagram() {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <div className="flex-1 rounded-lg border border-border bg-muted/40 p-3">
        <p className="mb-1 text-xs font-medium text-muted-foreground">原始檔（含雜訊）</p>
        <p className="font-mono text-xs leading-relaxed text-muted-foreground">
          手沖咖啡的水溫⎵⎵⎵
          <br />
          — 12 —（頁碼）
          <br />
          建議88到96度
        </p>
      </div>

      <FlowArrow />

      <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-center text-xs font-medium text-primary">
        清理
        <br />
        去空白 · 去頁碼
      </div>

      <FlowArrow />

      <div className="flex-1 rounded-lg border border-success/30 bg-success/5 p-3">
        <p className="mb-1 text-xs font-medium text-muted-foreground">乾淨純文字</p>
        <p className="text-sm text-foreground/80">手沖咖啡的水溫 建議 88 到 96 度</p>
      </div>
    </div>
  );
}
