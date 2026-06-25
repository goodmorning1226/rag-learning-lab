import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { DayCard } from "@/components/dashboard/DayCard";
import { courseData } from "@/data/courseData";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 md:px-6">
        {/* Hero */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            RAG 一週速成互動課程
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            用白話觀念、Python 範例與實作練習，快速掌握 RAG 核心能力。
          </p>
        </section>

        {/* 進度卡 */}
        <section className="mb-10">
          <ProgressCard />
        </section>

        {/* 課程地圖 */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">課程地圖</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courseData.map((day) => (
              <DayCard key={day.id} day={day} />
            ))}
          </div>
        </section>

        {/* 最終專案入口 */}
        <section className="mt-6">
          <Link
            href="/project"
            className="group flex items-center justify-between gap-4 rounded-lg border border-primary/30 bg-primary/5 p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center gap-3">
              <Rocket className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">最終專案：Mini RAG Knowledge Base</p>
                <p className="text-sm text-muted-foreground">
                  跟著 11 步做出一個會回答、會標來源、會檢查 grounded 的公司知識庫問答系統。
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
        </section>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          本週學完，你將能理解 RAG 流程、解釋每個零件，並親手做出一個簡化版 RAG 系統。
        </p>
      </main>
    </div>
  );
}
