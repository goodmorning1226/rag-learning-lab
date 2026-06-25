"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/useProgress";
import { dayCompletedCount } from "@/data/courseData";
import type { Day } from "@/data/types";

export function DayCard({ day }: { day: Day }) {
  const { completedUnits, hydrated } = useProgress();
  const done = hydrated ? dayCompletedCount(day, completedUnits) : 0;
  const total = day.units.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const firstUnit = day.units[0];

  return (
    <Link href={`/day/${day.id}/${firstUnit.slug}`} className="group block">
      <Card className="h-full transition-colors hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant={done === total && total > 0 ? "success" : "default"}>
              Day {day.num}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {hydrated ? `${done}/${total}` : `${total} 單元`}
            </span>
          </div>
          <CardTitle className="mt-2 text-lg">{day.title}</CardTitle>
          <CardDescription>{day.summary}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-3">
          <Progress value={percent} className="flex-1" />
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </CardContent>
      </Card>
    </Link>
  );
}
