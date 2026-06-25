// 全站共用型別 —— 課程結構與學習進度的單一定義來源。

export type RagStage =
  | "overview"
  | "documents"
  | "chunking"
  | "embedding"
  | "vectordb"
  | "retrieval"
  | "prompt"
  | "answer";

/** 練習題型 */
export type ExerciseType =
  | "multiple-choice"
  | "short-answer"
  | "code-output"
  | "code-fill";

export interface Exercise {
  id: string;
  title: string;
  type: ExerciseType;
  question: string;
  /** 選擇題的選項（其他題型可省略） */
  options?: string[];
  /** code-fill / code-output 的程式起始碼或情境程式 */
  starterCode?: string;
  /** 正確答案；選擇題填正確選項的「文字」 */
  expectedAnswer: string;
  /** 解析：為什麼這個答案是對的 */
  explanation: string;
  /** 提示（先想再看答案） */
  hint?: string;
}

/** 程式碼逐行／分段說明的一個項目 */
export interface CodeExplanationItem {
  /** 對應的程式片段（可選，顯示為等寬小標） */
  code?: string;
  /** 這段在做什麼 */
  note: string;
}

export interface CodeExample {
  /** 程式碼區左上角的檔名標籤 */
  filename?: string;
  /** react-syntax-highlighter 語言，預設 python */
  language?: string;
  code: string;
  /** 「這段程式在做什麼」的逐行／分段說明（可選） */
  codeExplanation?: CodeExplanationItem[];
}

export interface Unit {
  /** 單元編號，例如 "1.1"（穩定鍵，用於進度記錄） */
  id: string;
  /** 網址用 slug，例如 "why-rag" */
  slug: string;
  title: string;
  /** 一句話定義這個單元的核心概念 */
  concept: string;
  /** 白話說明，段落以 \n\n 分隔 */
  plainExplanation: string;
  /** 圖解文字描述，供前端畫成流程圖或資訊卡 */
  diagramDescription: string;
  /** 本單元重點條列 */
  keyPoints: string[];
  /** Python 範例 */
  pythonExample?: CodeExample;
  /** 練習題（至少一題） */
  exercises: Exercise[];
  /** 單元總結 */
  summary: string;
}

export interface Day {
  /** 路由用 id，例如 "day1" */
  id: string;
  /** 第幾天（1–7），供 UI 顯示與排序 */
  num: number;
  title: string;
  subtitle: string;
  /** 預估學習時間，例如 "約 90 分鐘" */
  estimatedTime: string;
  /** 本日學習目標 */
  learningGoals: string[];
  /** 一句話介紹，用於首頁卡片 */
  summary: string;
  /** 本日點亮 RAG 流程圖的哪些方塊 */
  ragStages: RagStage[];
  units: Unit[];
}

/** 學習進度（存於 localStorage） */
export interface Progress {
  /** 已完成（手動標記）的單元 id 清單 */
  completedUnits: string[];
  /** 已答對的練習 id 清單 */
  completedExercises: string[];
  /** 最後造訪的單元路徑 "day1/why-rag"，用於「繼續上次」 */
  lastVisitedUnit: string;
}
