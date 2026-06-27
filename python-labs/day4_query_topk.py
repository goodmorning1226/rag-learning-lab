# 對「向量庫」查詢 Top-k 相似內容（可單獨執行）。

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

VOCAB = ["咖啡", "水溫", "苦", "烘焙"]
def embed(t):
    return [t.count(w) for w in VOCAB]

store = [
    ("chunk-0", embed("手沖咖啡的水溫建議 88 到 96 度"), {"text": "水溫 88-96 度"}),
    ("chunk-1", embed("咖啡太苦可能是萃取過度"),         {"text": "太苦：萃取過度"}),
    ("chunk-2", embed("咖啡豆的烘焙程度分三種"),         {"text": "烘焙程度"}),
]

def query(question, k=2):
    qv = embed(question)
    scored = [(cosine(qv, vec), meta["text"]) for _id, vec, meta in store]
    scored.sort(key=lambda x: x[0], reverse=True)
    return scored[:k]

for score, text in query("咖啡為什麼太苦"):
    print(round(score, 3), text)
