# 串起 embed + cosine + 排序，做一個最小語意搜尋（純 Python）。

VOCAB = ["咖啡", "水溫", "苦", "烘焙", "豆"]

def embed(t):
    return [t.count(w) for w in VOCAB]

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    denom = (sum(x * x for x in a) ** 0.5) * (sum(y * y for y in b) ** 0.5)
    return dot / denom if denom else 0.0

docs = [
    "手沖咖啡的水溫很重要",
    "咖啡豆的烘焙程度",
    "咖啡太苦怎麼辦",
]
doc_vecs = [embed(d) for d in docs]

def search(query, top_k=2):
    qv = embed(query)
    scored = [(cosine(qv, dv), d) for dv, d in zip(doc_vecs, docs)]
    scored.sort(key=lambda x: x[0], reverse=True)   # 分數高的排前面
    return scored[:top_k]

for score, d in search("水溫"):
    print(round(score, 2), d)
