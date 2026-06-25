import type { Progress } from "@/data/types";

const STORAGE_KEY = "rag-lab:progress:v1";

export const defaultProgress: Progress = {
  completedUnits: [],
  completedExercises: [],
  lastVisitedUnit: "",
};

/** 從 localStorage 讀取進度；SSR 或解析失敗時回傳預設值。 */
export function loadProgress(): Progress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { ...defaultProgress, ...parsed };
  } catch {
    return defaultProgress;
  }
}

/** 寫入進度到 localStorage。 */
export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    /* 配額已滿或被停用時靜默略過 */
  }
}
