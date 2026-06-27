# final_project.py — Mini RAG Knowledge Base（簡化版，可單獨執行，不需 API Key）
# 完整 11 步：documents → clean → chunk → embed → store
#           → query embed → top-k → prompt → (mock) LLM → citations → grounded check

# ── 1) 建立 documents（部門介紹 / 流程 / FAQ / 產品；保留雜訊以便示範清理）──
documents = {
    "dept.md":    "工程部 負責產品開發與維運。  設計部負責介面與品牌。\n\n12\n",
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
    refs = "\n".join(f"[{i+1}] {c['text']}" for i, c in enumerate(context))
    return (
        "你是公司知識庫助理。只能根據以下資料回答，"
        "找不到請回答「資料中沒有提到」，並標註來源編號。\n\n"
        f"資料：\n{refs}\n\n問題：{question}\n答案："
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
ask(store, "公司的股價是多少？")   # 資料外 → 應誠實說「資料中沒有提到」
