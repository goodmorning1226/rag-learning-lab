import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ImageIcon,
  ListChecks,
  Target,
} from "lucide-react";
import {
  courseData,
  getAdjacentUnits,
  getDay,
  getUnit,
} from "@/data/courseData";
import { CodeBlock } from "@/components/content/CodeBlock";
import { Callout } from "@/components/content/Callout";
import { ExerciseCard } from "@/components/exercise/ExerciseCard";
import { ExerciseProgress } from "@/components/exercise/ExerciseProgress";
import { UnitDiagram } from "@/components/diagrams/UnitDiagram";
import { CompleteToggle } from "@/components/layout/CompleteToggle";
import { VisitTracker } from "@/components/layout/VisitTracker";

/** 預先產生所有單元路徑（之後若改靜態匯出可直接沿用）。 */
export function generateStaticParams() {
  return courseData.flatMap((day) =>
    day.units.map((unit) => ({ dayId: day.id, unitId: unit.slug })),
  );
}

export default function UnitPage({
  params,
}: {
  params: { dayId: string; unitId: string };
}) {
  const { dayId, unitId } = params;
  const day = getDay(dayId);
  const unit = getUnit(dayId, unitId);
  if (!day || !unit) notFound();

  const { prev, next } = getAdjacentUnits(dayId, unitId);
  const paragraphs = unit.plainExplanation.split("\n\n");

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">
      <VisitTracker path={`day/${dayId}/${unitId}`} />

      {/* 麵包屑 + 預估時間 */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>
          Day {day.num} · {day.title}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {day.estimatedTime}
        </span>
      </div>

      {/* 標題 + 概念一句話 + 標記完成 */}
      <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {unit.id} {unit.title}
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">{unit.concept}</p>
        </div>
        <CompleteToggle unitId={unit.id} />
      </div>

      {/* 本日學習目標 */}
      <div className="mt-6">
        <Callout variant="info" title="本日學習目標">
          <ul className="ml-1 list-inside list-disc space-y-1">
            {day.learningGoals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </Callout>
      </div>

      {/* 白話說明 */}
      <section className="mt-8">
        <h2 className="mb-3 text-base font-semibold">白話說明</h2>
        <div className="space-y-4 text-[15px] leading-7 text-foreground/90">
          {paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-wrap">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* 圖解區 */}
      <section className="mt-8">
        <h2 className="mb-2 flex items-center gap-2 text-base font-semibold">
          <ImageIcon className="h-4 w-4 text-primary" /> 圖解
        </h2>
        <UnitDiagram dayId={dayId} slug={unit.slug} description={unit.diagramDescription} />
      </section>

      {/* 重點整理 */}
      {unit.keyPoints.length > 0 && (
        <section className="mt-8">
          <Callout variant="key" title="本單元重點">
            <ul className="ml-1 list-inside list-disc space-y-1">
              {unit.keyPoints.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </Callout>
        </section>
      )}

      {/* Python 範例 */}
      {unit.pythonExample && (
        <section className="mt-8">
          <h2 className="mb-2 text-base font-semibold">Python 範例</h2>
          <CodeBlock
            code={unit.pythonExample.code}
            language={unit.pythonExample.language}
            filename={unit.pythonExample.filename}
            explanation={unit.pythonExample.codeExplanation}
          />
        </section>
      )}

      {/* 練習題 */}
      {unit.exercises.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold">
            <Target className="h-4 w-4 text-primary" /> 動手練習
            <ExerciseProgress exerciseIds={unit.exercises.map((e) => e.id)} />
          </h2>
          <div className="space-y-4">
            {unit.exercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        </section>
      )}

      {/* 單元總結 */}
      <section className="mt-8">
        <div className="flex gap-3 rounded-lg border border-border bg-muted/40 p-4">
          <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-success" />
          <div>
            <p className="text-sm font-semibold">單元總結</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">{unit.summary}</p>
          </div>
        </div>
      </section>

      {/* 上一 / 下一單元 */}
      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
        {prev ? (
          <Link
            href={`/day/${prev.day.id}/${prev.unit.slug}`}
            className="group flex min-w-0 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {prev.unit.id} {prev.unit.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/day/${next.day.id}/${next.unit.slug}`}
            className="group flex min-w-0 items-center justify-end gap-2 text-right text-sm font-medium text-primary hover:underline"
          >
            <span className="truncate">
              {next.unit.id} {next.unit.title}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
