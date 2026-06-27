import type { Metadata } from "next";
import { ProgressView } from "@/components/dashboard/ProgressView";

export const metadata: Metadata = {
  title: "學習進度",
};

export default function ProgressPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">學習進度</h1>
      <p className="mt-2 text-muted-foreground">
        追蹤你的單元與練習完成度，隨時回到未完成的地方。
      </p>
      <div className="mt-8">
        <ProgressView />
      </div>
    </div>
  );
}
