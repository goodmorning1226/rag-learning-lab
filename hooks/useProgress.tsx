"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Progress } from "@/data/types";
import { defaultProgress, loadProgress, saveProgress } from "@/lib/storage";
import { TOTAL_EXERCISES, TOTAL_UNITS } from "@/data/courseData";

interface ProgressContextValue {
  /** 是否已從 localStorage 載入完成（避免 SSR/CSR 不一致閃爍） */
  hydrated: boolean;
  completedUnits: string[];
  completedExercises: string[];
  lastVisitedUnit: string;
  // 單元
  completedCount: number;
  totalUnits: number;
  percent: number;
  isComplete: (unitId: string) => boolean;
  toggleComplete: (unitId: string) => void;
  // 練習
  completedExerciseCount: number;
  totalExercises: number;
  exercisePercent: number;
  isExerciseComplete: (exerciseId: string) => boolean;
  markExerciseComplete: (exerciseId: string) => void;
  // 其他
  setLastVisited: (path: string) => void;
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);

  // 掛載後才讀 localStorage（SSR 無 window）
  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  // 進度變動時寫回
  useEffect(() => {
    if (hydrated) saveProgress(progress);
  }, [progress, hydrated]);

  const toggleComplete = useCallback((unitId: string) => {
    setProgress((p) => {
      const has = p.completedUnits.includes(unitId);
      return {
        ...p,
        completedUnits: has
          ? p.completedUnits.filter((id) => id !== unitId)
          : [...p.completedUnits, unitId],
      };
    });
  }, []);

  const markExerciseComplete = useCallback((exerciseId: string) => {
    setProgress((p) =>
      p.completedExercises.includes(exerciseId)
        ? p
        : { ...p, completedExercises: [...p.completedExercises, exerciseId] },
    );
  }, []);

  const setLastVisited = useCallback((path: string) => {
    setProgress((p) => (p.lastVisitedUnit === path ? p : { ...p, lastVisitedUnit: path }));
  }, []);

  const reset = useCallback(() => setProgress(defaultProgress), []);

  const value = useMemo<ProgressContextValue>(() => {
    const completedCount = progress.completedUnits.length;
    const completedExerciseCount = progress.completedExercises.length;
    return {
      hydrated,
      completedUnits: progress.completedUnits,
      completedExercises: progress.completedExercises,
      lastVisitedUnit: progress.lastVisitedUnit,
      completedCount,
      totalUnits: TOTAL_UNITS,
      percent: TOTAL_UNITS === 0 ? 0 : Math.round((completedCount / TOTAL_UNITS) * 100),
      isComplete: (unitId: string) => progress.completedUnits.includes(unitId),
      toggleComplete,
      completedExerciseCount,
      totalExercises: TOTAL_EXERCISES,
      exercisePercent:
        TOTAL_EXERCISES === 0 ? 0 : Math.round((completedExerciseCount / TOTAL_EXERCISES) * 100),
      isExerciseComplete: (exerciseId: string) =>
        progress.completedExercises.includes(exerciseId),
      markExerciseComplete,
      setLastVisited,
      reset,
    };
  }, [hydrated, progress, toggleComplete, markExerciseComplete, setLastVisited, reset]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress 必須在 <ProgressProvider> 內使用");
  return ctx;
}
