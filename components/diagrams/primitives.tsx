import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** 流程箭頭：手機（直向排列）朝下，桌面（橫向排列）朝右。 */
export function FlowArrow({ className }: { className?: string }) {
  return (
    <ChevronRight
      aria-hidden
      className={cn(
        "h-5 w-5 shrink-0 self-center rotate-90 text-muted-foreground md:rotate-0",
        className,
      )}
    />
  );
}

export const toneStyles = {
  default: "border-border bg-muted/50",
  primary: "border-primary/30 bg-primary/5",
  success: "border-success/30 bg-success/5",
} as const;

export type Tone = keyof typeof toneStyles;

/** 流程卡片：標題 + 可選副標，三種色調。 */
export function StepNode({
  title,
  subtitle,
  tone = "default",
  className,
}: {
  title: string;
  subtitle?: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border px-3 py-2 text-center", toneStyles[tone], className)}>
      <div className="text-sm font-medium leading-tight">{title}</div>
      {subtitle && <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div>}
    </div>
  );
}
