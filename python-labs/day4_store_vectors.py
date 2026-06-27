# 把多個 chunk 連同 metadata 存進「向量庫」（用 list 模擬，可單獨執行）。

VOCAB = ["咖啡", "水溫", "苦", "烘焙"]
def embed(t):
    return [t.count(w) for w in VOCAB]

# 每個 chunk 帶上來源檔名與段落號（日後溯源用）
chunks = [
    ("手沖咖啡的水溫建議 88 到 96 度", "coffee.md", 1),
    ("咖啡太苦可能是萃取過度",         "coffee.md", 2),
    ("咖啡豆的烘焙程度分三種",         "coffee.md", 3),
]

store = []   # 每筆：(id, vector, metadata)
for i, (text, source, para) in enumerate(chunks):
    store.append((
        f"chunk-{i}",
        embed(text),
        {"source": source, "para": para, "text": text},
    ))

print("已存入向量數：", len(store))     # 3
print("第一筆 metadata：", store[0][2])
