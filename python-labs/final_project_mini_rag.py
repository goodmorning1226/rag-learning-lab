# 最終專案：簡化版「公司知識庫問答系統」（純 Python，可單獨執行）
# 完成 9 個步驟：準備文件 → 切 chunk → embedding → vector store
#   → 查 top-k → 組 prompt → 產生回答 → 顯示來源 → 檢查 grounded

# 1) 準備文件（換成你自己的內容即可）
documents = {
    "hr.md": "員工每年有 14 天特休。特休需提前三天申請。",
    "it.md": "公司筆電預設安裝防毒軟體。忘記密碼請聯絡 IT 部門重設。",
}

# 2) 切 chunk（依句號），保留來源與段落
def split_chunks(docs):
    chunks = []
    for source, text in docs.items():
        for i, s in enumerate(p for p in text.split("。") if p):
            chunks.append({"text": s + "。", "source": source, "para": i})
    return chunks

# 3) 建立 embedding（簡化：詞頻向量；真實換成 embedding 模型）
VOCAB = ["特休", "申請", "筆電", "密碼", "防毒", "IT"]
def embed(t):
    return [t.count(w) for w in VOCAB]

# 4) 建立簡化 vector store
def build_store(chunks):
    for c in chunks:
        c["vector"] = embed(c["text"])
    return chunks

# 5) 查詢 top-k
def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

def retrieve(store, query, k=2):
    qv = embed(query)
    ranked = sorted(store, key=lambda c: cosine(qv, c["vector"]), reverse=True)
    return [c for c in ranked if cosine(qv, c["vector"]) > 0][:k]

# 6) 組 prompt（含 grounding 指令與來源編號）
def build_prompt(query, context):
    refs = "\n".join(f"[{i + 1}] {c['text']}" for i, c in enumerate(context))
    return ("只根據以下資料回答，找不到請說「資料中沒有提到」，並標來源編號。\n\n"
            f"資料：\n{refs}\n\n問題：{query}")

# 7) 產生回答（簡化版 LLM；真實改呼叫 LLM API，例如 claude-haiku-4-5）
def generate(query, context):
    if not context:
        return "資料中沒有提到。"
    return context[0]["text"]

# 8) 顯示引用來源
def format_sources(context):
    return [f"{c['source']} 第 {c['para']} 句" for c in context]

# 9) 檢查回答是否 grounded（答案字詞是否來自 context）
def grounded_ratio(answer, context):
    ctx = "".join(c["text"] for c in context)
    words = [w for w in answer if w.strip() and w not in "，。、（）[]"]
    if not words:
        return 0.0
    return sum(1 for w in words if w in ctx) / len(words)

# ---- 串起來 ----
store = build_store(split_chunks(documents))

def ask(query, k=2):
    context = retrieve(store, query, k)
    answer = generate(query, context)
    print("問題：", query)
    print("回答：", answer)
    print("來源：", format_sources(context))
    print("Grounded 比例：", round(grounded_ratio(answer, context), 2))
    print("-" * 30)

ask("特休有幾天？")
ask("公司股價是多少？")   # 資料外 → 應誠實說「資料中沒有提到」
