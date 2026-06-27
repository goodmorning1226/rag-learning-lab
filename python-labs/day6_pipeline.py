# 簡化版 RAG pipeline（純 Python，可單獨執行）。

# 1) Documents
documents = {
    "coffee.md": "手沖咖啡的水溫建議 88 到 96 度。水溫太高會讓咖啡變苦。",
    "roast.md": "咖啡豆的烘焙程度分為淺中深三種。深烘焙較苦。",
}

# 2) Split chunks（依句號切，保留來源與段落）
def split_chunks(docs):
    chunks = []
    for source, text in docs.items():
        for i, s in enumerate(p for p in text.split("。") if p):
            chunks.append({"text": s + "。", "source": source, "para": i})
    return chunks

# 3) Embedding（簡化：詞頻向量）
VOCAB = ["水溫", "咖啡", "苦", "烘焙", "豆"]
def embed(text):
    return [text.count(w) for w in VOCAB]

# 4) Store（list 模擬向量庫）
def build_store(chunks):
    for c in chunks:
        c["vector"] = embed(c["text"])
    return chunks

# 5) Retrieve top-k
def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

def retrieve(store, query, k=2):
    qv = embed(query)
    ranked = sorted(store, key=lambda c: cosine(qv, c["vector"]), reverse=True)
    return ranked[:k]

# 6) Build prompt   7) Generate（mock LLM）
def generate(query, context):
    if not context:
        return "資料中沒有提到。"
    return f"根據資料：{context[0]['text']}"

# 8) ask：串起來並顯示來源
def ask(store, query, k=2):
    context = retrieve(store, query, k)
    answer = generate(query, context)
    sources = [f"{c['source']} 第 {c['para']} 句" for c in context]
    return answer, sources

store = build_store(split_chunks(documents))
answer, sources = ask(store, "為什麼咖啡會苦？")
print("回答：", answer)
print("來源：", sources)
