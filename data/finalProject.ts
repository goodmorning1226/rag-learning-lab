export interface ProjectStep {
  n: number;
  title: string;
  goal: string;
  code: string;
  checkpoint: string;
  commonMistake: string;
}

export interface FinalProject {
  title: string;
  scenario: string;
  intro: string;
  goals: string[];
  llmNote: string;
  steps: ProjectStep[];
  fullCode: string;
  challenges: string[];
}

export const finalProject: FinalProject = {
  title: "Mini RAG Knowledge Base",
  scenario:
    "假設公司有一批內部文件（部門介紹、流程說明、FAQ、產品資料）。我們要做一個簡化版 RAG 系統：使用者輸入問題，系統從文件中找出相關內容，並產生「有根據、可溯源」的回答。",
  intro:
    "這個結業專案會把整週學到的零件，串成一個能跑的小型公司知識庫問答系統。它完整實作 RAG 的 11 個步驟，從建立文件、清理、切塊、embedding、向量儲存，到查詢、檢索、組 prompt、生成回答、顯示來源，最後檢查回答是否有根據。\n\n為了避免 API Key 的麻煩，初版用一個簡化的 mock_llm 函式模擬模型回答；但每一步的設計都和真實系統一致——你之後只要把簡化的 embedding 換成真正的 embedding 模型、把 mock_llm 換成真正的 LLM API，就是一個可上線的 RAG。\n\n建議照著 11 個步驟逐一完成、用每一步的「檢查點」驗證，最後再對照「完整參考解答」。",
  goals: [
    "親手串起 RAG 的完整 11 個步驟，理解每一步的輸入與輸出。",
    "做出一個能對公司文件問答、會標來源、會檢查 grounded 的系統。",
    "讓系統在資料外問題時誠實回答「資料中沒有提到」，而不是亂掰。",
    "具備把簡化版升級為真實系統（真 embedding + 真 LLM）的能力。",
  ],
  llmNote:
    "為了避免 API Key 問題，本專案用 mock_llm 模擬模型回答。實務上，你會把 build_prompt 產生的「最終 prompt」丟給真正的 LLM——例如 OpenAI GPT、Anthropic Claude 或 Google Gemini——再把模型回傳的文字當作答案。其餘步驟（檢索、組 prompt、顯示來源、grounded 檢查）完全不需要改變。",
  steps: [
    {
      n: 1,
      title: "建立 documents",
      goal: "準備公司內部文件，整理成「檔名 → 內容」的對應。檔名之後會當作引用來源。",
      code: `# 1) 建立 documents（部門介紹 / 流程 / FAQ / 產品；保留一些雜訊以便示範清理）
documents = {
    "dept.md":    "工程部 負責產品開發與維運。  設計部負責介面與品牌。\\n\\n12\\n",
    "process.md": "請假 需在系統提出申請，並經主管核准。報帳請於每月 25 日前送出。",
    "faq.md":     "Q：公司提供哪些福利？A：年假、健康檢查與在職進修補助。",
    "product.md": "本產品支援雲端同步與離線使用。免費版每月有 100 次查詢額度。",
}`,
      checkpoint: "print(len(documents)) 應該印出 4，代表四份文件都建立好了。",
      commonMistake:
        "文件內容太短或彼此重複，會讓檢索分不出差異——盡量讓每份文件主題明確、用詞有區別。",
    },
    {
      n: 2,
      title: "清理文字",
      goal: "把多餘空白壓縮、移除單獨成行的頁碼，得到乾淨純文字。垃圾進、垃圾出。",
      code: `# 2) 清理文字：壓縮空白、跳過「整行只有頁碼」的行
def clean_text(raw):
    lines = []
    for line in raw.splitlines():
        line = " ".join(line.split())     # 壓縮多餘空白
        if line.strip().isdigit():        # 跳過頁碼行（例如 "12"）
            continue
        lines.append(line)
    return " ".join(l for l in lines if l)`,
      checkpoint:
        "把 documents['dept.md'] 丟進 clean_text，輸出應該不再有多餘空白，也不含單獨的「12」頁碼。",
      commonMistake:
        "忘了清理就直接切塊，頁碼與多餘空白會混進 chunk，污染後續的 embedding 與檢索。",
    },
    {
      n: 3,
      title: "Chunking",
      goal: "把每份文件切成小段，並同時記下來源檔名與段落號（之後顯示引用要用）。",
      code: `# 3) Chunking：依句號切，保留 source 與 para 兩個 metadata
def split_chunks(docs):
    chunks = []
    for source, raw in docs.items():
        text = clean_text(raw)
        for i, s in enumerate(p for p in text.split("。") if p.strip()):
            chunks.append({"text": s.strip() + "。", "source": source, "para": i})
    return chunks`,
      checkpoint:
        "split_chunks(documents) 後，每個 chunk 應該是一個 dict，包含 text / source / para 三個欄位。",
      commonMistake:
        "切塊時忘了把 source / para 一起存，之後就無法顯示「答案出自哪份文件第幾句」。",
    },
    {
      n: 4,
      title: "建立簡化 embedding",
      goal: "把文字轉成向量。這裡用詞頻向量示範概念，實務會換成真正的 embedding 模型。",
      code: `# 4) 簡化 embedding：用固定詞表的詞頻向量（實務改用 embedding 模型）
VOCAB = ["請假", "申請", "主管", "報帳", "福利", "年假",
         "查詢", "額度", "雲端", "離線", "工程", "設計"]

def embed(text):
    return [text.count(w) for w in VOCAB]`,
      checkpoint:
        "embed('請假') 的長度應等於 VOCAB 的長度，且「請假」對應位置的值為 1。",
      commonMistake:
        "VOCAB 沒涵蓋查詢會用到的關鍵詞，導致查詢向量全為 0，什麼都檢索不到。",
    },
    {
      n: 5,
      title: "儲存到 vector store",
      goal: "把每個 chunk 的向量算好、存進向量庫。這裡用 list 模擬，實務用 Chroma / FAISS / pgvector。",
      code: `# 5) 儲存到 vector store：把向量寫回每個 chunk（list 模擬向量庫）
def build_store(chunks):
    for c in chunks:
        c["vector"] = embed(c["text"])
    return chunks`,
      checkpoint: "build_store 之後，每個 chunk 應該多出一個 vector 欄位。",
      commonMistake:
        "把 embedding 寫成「查詢時才算整個知識庫」，導致每次查詢都重算——應在建庫時就存好向量。",
    },
    {
      n: 6,
      title: "Query embedding",
      goal: "把使用者問題也轉成向量，必須用和建庫時「相同」的 embed 函式。",
      code: `# 6) Query embedding：用和建庫相同的 embed（同一個向量空間）
def embed_query(question):
    return embed(question)`,
      checkpoint:
        "embed_query 與 embed 必須是同一套詞表／模型，否則查詢向量與文件向量無法比較。",
      commonMistake:
        "查詢端用了不同的 embedding（不同詞表或不同模型），相似度會完全失去意義。",
    },
    {
      n: 7,
      title: "Top-k retrieval",
      goal: "用 cosine 相似度排序，取最相關的前 k 段，並過濾掉相似度為 0 的結果。",
      code: `# 7) Top-k retrieval：cosine 相似度排序，取前 k（過濾 0 分）
def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

def retrieve(store, question, k=2):
    qv = embed_query(question)
    scored = [(cosine(qv, c["vector"]), c) for c in store]
    scored.sort(key=lambda x: x[0], reverse=True)
    return [c for score, c in scored if score > 0][:k]`,
      checkpoint:
        "retrieve(store, '請假要怎麼申請？') 的第一筆，應該是 process.md 裡關於請假申請的句子。",
      commonMistake:
        "忘了過濾相似度為 0 的結果，連資料外問題也硬塞了不相關的 chunk，造成幻覺。",
    },
    {
      n: 8,
      title: "組 prompt",
      goal: "把檢索到的段落（含來源編號）和 grounding 指令、問題組成最終 prompt。",
      code: `# 8) 組 prompt：含 grounding 指令與來源編號
def build_prompt(question, context):
    refs = "\\n".join(f"[{i+1}] {c['text']}" for i, c in enumerate(context))
    return (
        "你是公司知識庫助理。只能根據以下資料回答，"
        "找不到請回答「資料中沒有提到」，並標註來源編號。\\n\\n"
        f"資料：\\n{refs}\\n\\n問題：{question}\\n答案："
    )`,
      checkpoint:
        "build_prompt 產生的字串，應同時包含 grounding 指令、來源編號（[1]…）與使用者問題。",
      commonMistake:
        "把 context 和問題黏成一坨、沒有分隔與來源編號，模型難以引用、也難以溯源。",
    },
    {
      n: 9,
      title: "模擬 LLM 回答",
      goal: "用簡化函式模擬模型回答；沒有 context 時要誠實說不知道。實務改呼叫真 LLM。",
      code: `# 9) 模擬 LLM 回答（不呼叫真模型；實務把 prompt 丟給 OpenAI / Claude / Gemini）
def mock_llm(prompt, context):
    if not context:
        return "資料中沒有提到。"
    return f"{context[0]['text']}（依據 [1]）"`,
      checkpoint:
        "對資料外的問題（context 為空），mock_llm 應回傳「資料中沒有提到。」",
      commonMistake:
        "讓 mock_llm 在沒有 context 時也硬給答案——這正是幻覺的來源。",
    },
    {
      n: 10,
      title: "顯示引用來源",
      goal: "用 chunk 的 metadata，把這次回答用到的來源檔名與段落號列出來。",
      code: `# 10) 顯示引用來源：用 chunk 的 source / para
def format_sources(context):
    return [f"[{i+1}] {c['source']} 第 {c['para']} 句"
            for i, c in enumerate(context)]`,
      checkpoint: "format_sources 應列出每段用到的來源檔名與段落號。",
      commonMistake:
        "只印出答案卻不附來源，使用者無從查證，失去 RAG「可溯源」的核心價值。",
    },
    {
      n: 11,
      title: "檢查回答是否有根據",
      goal: "計算答案有多少比例的字詞能在 context 找到，作為 grounded（有依據）的簡化指標。",
      code: `# 11) grounded 檢查：答案的字詞，是否都能在 context 找到
def grounded_ratio(answer, context):
    ctx = "".join(c["text"] for c in context)
    words = [w for w in answer
             if w.strip() and w not in "，。、（）[]依據0123456789"]
    if not words:
        return 0.0
    return round(sum(1 for w in words if w in ctx) / len(words), 2)`,
      checkpoint:
        "對「完全來自 context 的答案」grounded_ratio 應接近 1.0；對資料外回答應為 0.0。",
      commonMistake:
        "跳過 grounded 檢查，就無法察覺「答案脫離資料、看似合理其實是編的」情況。",
    },
  ],
  fullCode: `# final_project.py — Mini RAG Knowledge Base（簡化版，可單獨執行，不需 API Key）
# 完整 11 步：documents → clean → chunk → embed → store
#           → query embed → top-k → prompt → (mock) LLM → citations → grounded check

# ── 1) 建立 documents（部門介紹 / 流程 / FAQ / 產品；保留雜訊以便示範清理）──
documents = {
    "dept.md":    "工程部 負責產品開發與維運。  設計部負責介面與品牌。\\n\\n12\\n",
    "process.md": "請假 需在系統提出申請，並經主管核准。報帳請於每月 25 日前送出。",
    "faq.md":     "Q：公司提供哪些福利？A：年假、健康檢查與在職進修補助。",
    "product.md": "本產品支援雲端同步與離線使用。免費版每月有 100 次查詢額度。",
}

# ── 2) 清理文字 ──
def clean_text(raw):
    lines = []
    for line in raw.splitlines():
        line = " ".join(line.split())
        if line.strip().isdigit():
            continue
        lines.append(line)
    return " ".join(l for l in lines if l)

# ── 3) Chunking（依句號切，保留來源與段落號）──
def split_chunks(docs):
    chunks = []
    for source, raw in docs.items():
        text = clean_text(raw)
        for i, s in enumerate(p for p in text.split("。") if p.strip()):
            chunks.append({"text": s.strip() + "。", "source": source, "para": i})
    return chunks

# ── 4) 簡化 embedding（詞頻向量；實務改用 embedding 模型）──
VOCAB = ["請假", "申請", "主管", "報帳", "福利", "年假",
         "查詢", "額度", "雲端", "離線", "工程", "設計"]

def embed(text):
    return [text.count(w) for w in VOCAB]

# ── 5) 儲存到 vector store（list 模擬；實務用 Chroma / FAISS / pgvector）──
def build_store(chunks):
    for c in chunks:
        c["vector"] = embed(c["text"])
    return chunks

# ── 6) Query embedding（用和建庫相同的 embed）──
def embed_query(question):
    return embed(question)

# ── 7) Top-k retrieval（cosine 排序，過濾 0 分）──
def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

def retrieve(store, question, k=2):
    qv = embed_query(question)
    scored = [(cosine(qv, c["vector"]), c) for c in store]
    scored.sort(key=lambda x: x[0], reverse=True)
    return [c for score, c in scored if score > 0][:k]

# ── 8) 組 prompt（含 grounding 指令與來源編號）──
def build_prompt(question, context):
    refs = "\\n".join(f"[{i+1}] {c['text']}" for i, c in enumerate(context))
    return (
        "你是公司知識庫助理。只能根據以下資料回答，"
        "找不到請回答「資料中沒有提到」，並標註來源編號。\\n\\n"
        f"資料：\\n{refs}\\n\\n問題：{question}\\n答案："
    )

# ── 9) 模擬 LLM 回答（實務改呼叫 OpenAI / Claude / Gemini）──
def mock_llm(prompt, context):
    if not context:
        return "資料中沒有提到。"
    return f"{context[0]['text']}（依據 [1]）"

# ── 10) 顯示引用來源 ──
def format_sources(context):
    return [f"[{i+1}] {c['source']} 第 {c['para']} 句"
            for i, c in enumerate(context)]

# ── 11) 檢查回答是否有根據（grounded）──
def grounded_ratio(answer, context):
    ctx = "".join(c["text"] for c in context)
    words = [w for w in answer
             if w.strip() and w not in "，。、（）[]依據0123456789"]
    if not words:
        return 0.0
    return round(sum(1 for w in words if w in ctx) / len(words), 2)

# ── 串起整個 pipeline ──
def ask(store, question, k=2):
    context = retrieve(store, question, k)
    prompt = build_prompt(question, context)         # 實務：把 prompt 丟給真 LLM
    answer = mock_llm(prompt, context)
    print("問題：", question)
    print("回答：", answer)
    print("來源：", format_sources(context))
    print("Grounded：", grounded_ratio(answer, context))
    print("-" * 36)

store = build_store(split_chunks(documents))
ask(store, "請假要怎麼申請？")
ask(store, "免費版有多少查詢額度？")
ask(store, "公司的股價是多少？")   # 資料外 → 應誠實說「資料中沒有提到」`,
  challenges: [
    "把 documents 換成你自己公司（或社團、專題）的真實文件，重新跑一次。",
    "把簡化 embed 換成真正的 embedding 模型（sentence-transformers 的 all-MiniLM-L6-v2）。",
    "把 mock_llm 換成真正的 LLM API：把 build_prompt 的結果丟給 OpenAI / Claude / Gemini，拿回回答。",
    "加入 chunk overlap 或 recursive splitting，觀察檢索品質有沒有變好。",
    "準備 5 個測試問題，記錄每題的 Top-k 命中與 grounded 比例，做成一張小評估表。",
    "讓回答中插入 [1][2] 引用標記，對應 format_sources 的來源清單。",
  ],
};
