"use client";

import { useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";

/** 紀錄目前造訪的單元路徑，供首頁「繼續上次」使用。 */
export function VisitTracker({ path }: { path: string }) {
  const { setLastVisited, hydrated } = useProgress();

  useEffect(() => {
    if (hydrated) setLastVisited(path);
  }, [hydrated, path, setLastVisited]);

  return null;
}
