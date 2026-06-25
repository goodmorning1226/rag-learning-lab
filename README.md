# rag-learning-lab

> 一個 Minimal Clean UI 的「RAG 一週速成」互動式學習網站 — 透過白話觀念、圖解、Python 範例與練習題，幫助初學者快速理解並實作 Retrieval-Augmented Generation（RAG）。

---

## 專案簡介

**rag-learning-lab** 是一個分單元的互動式線上課程網站，把 RAG（檢索增強生成）這個「流程型知識」拆成 7 天、39 個單元，從零帶你到能理解並親手完成一個簡化版 RAG 系統。

它的設計理念是 **「白話觀念 + 圖解 + 可跑的 Python + 動手練習」四管齊下**：每個概念都有生活化比喻、div/Tailwind 畫的流程圖、可單獨複製執行的程式範例，以及可即時對答案的互動練習。終點是一個整合所有概念的「最終專案」。

整個網站 **以前端為主、無需後端**：課程內容存在 TypeScript 檔案，學習進度存在瀏覽器 `localStorage`，Python 範例不在瀏覽器執行（而是讓你複製到本機跑），LLM 回答用簡化函式模擬以避免 API Key 負擔。

## 使用情境

適合以下對象：

- 即將進入 **GenAI / LLM / RAG / 向量檢索** 相關職位、需要快速補足 RAG 實作能力的人。
- 有 **Python 基礎**、對 LLM 有基本認識，但不熟 RAG、Embedding、Vector Database、Chunking、Retrieval、Prompt 組裝、Evaluation 的人。
- 想用一週時間，系統性地把 RAG 從觀念到實作走過一遍的自學者。
- 想要一份「能邊讀、邊看圖、邊跑程式、邊對答案」的結構化教材，而非零散文章的學習者。

學習方式：以**桌面閱讀為主**，搭配本機 VS Code / Jupyter 執行範例程式。

## 主要功能

- 📚 **7 天 39 單元課程**：每單元含學習目標、白話說明、實務直覺、圖解、Python 範例、練習與總結。
- 🧭 **側邊欄單元導航**：Day 1–7 樹狀結構，目前位置高亮、完成單元顯示綠勾。
- 📊 **學習進度追蹤**：Dashboard 顯示單元完成率與練習完成率雙進度條；單元可手動標記完成。
- 🎨 **簡潔流程圖解**：純 div + Tailwind 的 6 種圖解（RAG 流程、Chunking、Embedding 空間、向量搜尋、Prompt 組裝、評估），響應式、無複雜 SVG。
- 💻 **深色程式碼區**：語法高亮、語言標籤、Copy 按鈕（Copied 回饋）、水平捲動、可選的逐行說明。
- 📝 **互動練習**：四種題型（選擇 / 簡答 / 預測輸出 / 程式填空），可作答、查看提示、提交對答案、看標準答案與解析。
- 💾 **進度持久化**：完成狀態與答對紀錄存於 `localStorage`，回訪自動接續。
- 🚀 **最終專案頁**：Mini RAG Knowledge Base，11 步逐步引導，含完整可複製的 `final_project.py`。

## 技術棧

| 類別 | 技術 |
|---|---|
| 框架 | [Next.js 14](https://nextjs.org/)（App Router） |
| 語言 | TypeScript（strict） |
| 樣式 | Tailwind CSS + CSS 變數主題 |
| UI 元件 | shadcn/ui 風格自製元件（Button / Card / Progress / Badge） |
| 圖示 | [lucide-react](https://lucide.dev/) |
| 程式碼高亮 | [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)（Prism） |
| 圖解 | 純 div + Tailwind（無 SVG 依賴） |
| 狀態 / 儲存 | React Context + `localStorage`（無後端） |
| 範例語言 | Python 3（標準庫，無外部套件） |

## 安裝方式

需求：**Node.js 18+**（建議 20+）與 npm。

```bash
# 取得專案後，在專案根目錄安裝相依套件
npm install
```

## 啟動方式

```bash
npm run dev      # 啟動開發伺服器
```

開啟瀏覽器前往 **http://localhost:3000**。

其他指令：

```bash
npm run build    # 建置正式版（靜態產生所有頁面）
npm run start    # 啟動正式版伺服器
npm run lint     # 程式碼檢查
```

> 課程中的 Python 範例是設計成複製到本機執行的。Day 1–4 全部使用 Python 標準庫即可執行；Day 5 之後若要接真實 LLM，才需要自行準備 API（初版用 mock 函式模擬，無需 API Key）。

## 專案資料夾結構

```
rag-learning-lab/
├─ app/
│  ├─ layout.tsx                       # 根 layout（字體、ProgressProvider）
│  ├─ globals.css                      # Tailwind + 配色 CSS 變數
│  ├─ page.tsx                         # 首頁 Dashboard
│  └─ (course)/                        # 課程路由群組（共用 Header + Sidebar）
│     ├─ layout.tsx                    # 三段式版面殼
│     ├─ day/[dayId]/[unitId]/page.tsx # 課程單元頁模板
│     └─ project/page.tsx              # 最終專案頁
├─ components/
│  ├─ ui/          # 基礎元件：button / card / progress / badge
│  ├─ layout/      # Header / Sidebar / CompleteToggle / VisitTracker
│  ├─ content/     # CodeBlock / CopyButton / CodeExplanation / Callout
│  ├─ exercise/    # ExerciseCard / AnswerChecker / HintButton / AnswerReveal / ExerciseProgress
│  ├─ dashboard/   # ProgressCard / DayCard
│  └─ diagrams/    # 6 種圖解 + primitives + UnitDiagram（單元→圖解解析器）
├─ data/
│  ├─ types.ts        # 共用型別（Day / Unit / Exercise / Progress …）
│  ├─ courseData.ts   # 課程內容單一真實來源（7 天 39 單元）
│  └─ finalProject.ts # 最終專案資料（11 步 + 完整參考解答）
├─ hooks/
│  └─ useProgress.tsx # 進度 Context（讀寫 localStorage）
├─ lib/
│  ├─ utils.ts        # cn() 類名合併工具
│  ├─ storage.ts      # localStorage 讀寫
│  └─ check-answer.ts # 練習答案判斷邏輯
├─ tailwind.config.ts
├─ next.config.mjs
└─ tsconfig.json
```

## 課程內容大綱

課程依「先拆零件、再組裝、最後評估」的順序設計，難度逐日遞增：

| Day | 主題 | 重點單元 |
|---|---|---|
| **Day 1** | LLM 與 RAG 基礎 | 為什麼需要 RAG、RAG 核心流程、RAG vs Fine-tuning、最小版 RAG 概念範例 |
| **Day 2** | 文件處理與 Chunking | 文件讀取與清理、Chunk size、Chunk overlap、Recursive splitting、Chunking 對檢索品質的影響 |
| **Day 3** | Embedding 與語意搜尋 | Embedding 是什麼、向量空間直覺、Cosine similarity、簡單語意搜尋、Query 與 document embedding 的關係 |
| **Day 4** | Vector Database | Vector DB 是什麼、FAISS/Chroma/pgvector 比較、儲存向量、查詢 Top-k、Metadata 的用途 |
| **Day 5** | Retrieval 與 Prompt 組裝 | Query embedding、Top-k retrieval、Context injection、Prompt template、降低幻覺、只根據資料回答 |
| **Day 6** | RAG Pipeline 實作 | 全流程總覽、Load、Split、Embed、Store、Retrieve、Generate、顯示引用來源 |
| **Day 7** | 評估、Debug 與最終專案 | Retrieval quality、Answer quality、Groundedness/Faithfulness、常見問題、Debug 方法、最終專案 |

每個單元統一包含：學習目標 → 白話說明 → 實務直覺 → 圖解 → 重點整理 → Python 範例 → 動手練習 → 單元總結。

## 練習題功能說明

每個練習都是一張可互動的卡片，支援完整的「作答 → 對答案」閉環：

**四種題型與判斷方式**

| 題型 | 作答方式 | 判斷方式 |
|---|---|---|
| `multiple-choice` | 點選選項 | 比對所選選項（完全相符） |
| `short-answer` | 文字輸入 | 關鍵字寬鬆比對（忽略大小寫與空白） |
| `code-output` | 文字輸入 | 比對預期輸出（忽略所有空白） |
| `code-fill` | 在預填程式中填空 | 比對關鍵程式片段（忽略所有空白） |

**互動流程**

1. 顯示題目與題型標籤。
2. 輸入答案 → 可點「查看提示」。
3. 「提交答案」→ 系統即時判斷：答對顯示成功狀態（🎉），答錯給出溫和提示。
4. 可隨時「查看答案」展開標準答案與解析。
5. 答對後該練習標記完成，紀錄存入 `localStorage`；單元標題旁與 Dashboard 會更新練習完成數。

> 答案區預設摺疊，鼓勵「先想再看」。判斷邏輯刻意寬鬆，重點在學習而非刁難。

## 最終專案說明

**專案名稱：Mini RAG Knowledge Base**（路由 `/project`）

**情境**：假設公司有一批內部文件（部門介紹、流程說明、FAQ、產品資料），要做一個簡化版 RAG 系統，讓使用者輸入問題，系統從文件中找出相關內容並產生「有根據、可溯源」的回答。

專案頁以 **Step-by-step** 引導你完成 11 個步驟，每步都有目標、Python 範例、檢查點與常見錯誤提醒：

1. 建立 documents
2. 清理文字
3. Chunking
4. 建立簡化 embedding
5. 儲存到 vector store
6. Query embedding
7. Top-k retrieval
8. 組 prompt
9. 模擬 LLM 回答
10. 顯示引用來源
11. 檢查回答是否有根據（groundedness）

頁面附上**完整可複製的 `final_project.py`**（純 Python、可單獨執行、不需 API Key），以及延伸挑戰。完成後，你會得到一個會回答、會標來源、會檢查 grounded、也會在資料外問題時誠實說「資料中沒有提到」的迷你 RAG。

> **關於 LLM**：初版用 `mock_llm` 模擬模型回答以避免 API Key 問題。實務上，你會把組好的「最終 prompt」丟給真正的 LLM（OpenAI / Claude / Gemini 等），把回傳文字當作答案——其餘步驟完全不變。

## 未來可擴充功能

- 📱 **行動版 Sidebar 抽屜**：目前側邊欄在小螢幕隱藏，可加入 ☰ 開啟的 overlay 導航。
- 📈 **獨立學習進度頁** `/progress`：各 Day 完成度總覽 + 重置進度。
- 🔤 **RAG 名詞速查表**：Embedding / Chunk / Top-k / Grounded 等中英對照快速複習。
- 🧠 **真實 embedding 與 LLM**：把範例升級為 sentence-transformers + 真正的 LLM API。
- 🌗 **深色模式**：配色已用 CSS 變數預留，可低成本加入。
- 🐍 **`python-labs/` 資料夾**：把所有範例輸出成可直接 `python` 執行的 `.py` 檔。
- 🧩 **進階主題單元**：Hybrid search、Reranking、Query rewriting、Agentic RAG 的白話說明。
- 🌐 **真正在瀏覽器執行 Python**：以 Pyodide 讓練習可直接在網頁跑（目前為離線執行 + 對答案）。

## 注意事項

- **以前端為主、無後端**：所有內容與進度都在瀏覽器端；清除瀏覽器資料會清空學習進度。
- **進度存於 localStorage**：不同瀏覽器 / 裝置之間不會同步。
- **Python 範例需在本機執行**：網站不在瀏覽器跑 Python，請複製到 VS Code / Jupyter 執行。Day 1–4 只用標準庫即可。
- **LLM 為模擬**：課程與最終專案用 mock 函式模擬模型回答，**不會呼叫任何外部 API、不需要 API Key**；要接真實模型時再自行替換。
- **教學用簡化實作**：embedding 用詞頻向量、vector store 用 list + cosine，目的是讓你看懂原理；正式專案請改用真正的 embedding 模型與向量資料庫（Chroma / FAISS / pgvector）。
- **主要為桌面體驗**：版面以桌面閱讀為主，行動裝置可閱讀但導航體驗較受限。

---

以白話觀念、圖解、可跑的 Python 與動手練習，一週掌握 RAG 核心能力。祝學習愉快！🎉
