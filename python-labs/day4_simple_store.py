# 用 list + cosine 模擬一個最小的向量資料庫（後面幾個單元會沿用這個想法）。

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

# 一個「向量資料庫」其實可以只是一個 list，每筆存 (id, 向量, metadata)
store = []
store.append(("c1", [1, 0, 1], {"source": "coffee.md"}))
store.append(("c2", [0, 1, 0], {"source": "tea.md"}))

print("目前向量數：", len(store))
print("第一筆：", store[0])
