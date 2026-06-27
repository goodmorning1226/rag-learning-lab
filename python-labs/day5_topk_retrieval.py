# 取回 Top-k 最相關的段落。

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

VOCAB = ["水溫", "咖啡", "苦", "烘焙"]
def embed(t):
    return [t.count(w) for w in VOCAB]

store = [
    {"text": "水溫太高會讓咖啡變苦", "v": embed("水溫太高會讓咖啡變苦")},
    {"text": "咖啡豆的烘焙程度",     "v": embed("咖啡豆的烘焙程度")},
    {"text": "手沖的水溫建議",       "v": embed("手沖的水溫建議")},
]

def retrieve(query, k=2):
    qv = embed(query)
    return sorted(store, key=lambda c: cosine(qv, c["v"]), reverse=True)[:k]

for c in retrieve("咖啡為什麼苦", k=2):
    print(c["text"])
