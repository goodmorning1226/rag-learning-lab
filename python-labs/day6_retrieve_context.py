# 從向量庫取回最相關的 Top-k chunk。

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

VOCAB = ["水溫", "咖啡", "苦", "烘焙", "豆"]
def embed(t):
    return [t.count(w) for w in VOCAB]

store = [
    {"text": "水溫太高會讓咖啡變苦。",     "vector": embed("水溫太高會讓咖啡變苦。")},
    {"text": "咖啡豆的烘焙程度分三種。", "vector": embed("咖啡豆的烘焙程度分三種。")},
]

def retrieve(store, query, k=1):
    qv = embed(query)
    return sorted(store, key=lambda c: cosine(qv, c["vector"]), reverse=True)[:k]

print(retrieve(store, "咖啡為什麼苦", k=1)[0]["text"])
