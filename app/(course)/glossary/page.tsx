import type { Metadata } from "next";
import { GlossaryView } from "@/components/dashboard/GlossaryView";

export const metadata: Metadata = {
  title: "RAG 名詞速查表",
};

export default function GlossaryPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">RAG 名詞速查表</h1>
      <p className="mt-2 text-muted-foreground">
        課程中出現的核心名詞，中英對照與一句白話解釋，方便快速複習。
      </p>
      <div className="mt-8">
        <GlossaryView />
      </div>
    </div>
  );
}
