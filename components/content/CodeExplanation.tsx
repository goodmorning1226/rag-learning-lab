import { cn } from "@/lib/utils";
import type { CodeExplanationItem } from "@/data/types";

/** 「這段程式在做什麼」說明區：淺色卡片，搭配深色 code block。 */
export function CodeExplanation({
  items,
  className,
}: {
  items: CodeExplanationItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className={cn("rounded-lg border border-border bg-muted/40 p-4", className)}>
      <p className="mb-2.5 text-xs font-semibold text-muted-foreground">這段程式在做什麼</p>
      <ul className="space-y-2.5">
        {items.map((it, i) => (
          <li key={i} className="flex flex-col gap-1 text-sm leading-relaxed sm:flex-row sm:gap-3">
            {it.code && (
              <code className="break-words rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground/80 sm:max-w-[42%] sm:shrink-0 sm:truncate">
                {it.code}
              </code>
            )}
            <span className="text-foreground/90">{it.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
