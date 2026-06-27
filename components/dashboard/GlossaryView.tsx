"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { glossary } from "@/data/glossary";
import { Badge } from "@/components/ui/badge";

/** 名詞速查表：可即時搜尋的卡片清單。 */
export function GlossaryView() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return glossary;
    return glossary.filter(
      (t) =>
        t.term.toLowerCase().includes(kw) ||
        t.en.toLowerCase().includes(kw) ||
        t.def.toLowerCase().includes(kw),
    );
  }, [q]);

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋名詞（中文 / 英文 / 解釋）…"
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">找不到符合「{q}」的名詞。</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((t) => (
            <div key={t.en} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-semibold">{t.term}</span>
                <Badge variant="muted">{t.en}</Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{t.def}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
