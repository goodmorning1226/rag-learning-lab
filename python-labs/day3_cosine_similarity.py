# 純 Python 實作 cosine similarity，不需要 numpy。

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

def norm(a):
    return sum(x * x for x in a) ** 0.5

def cosine_similarity(a, b):
    denom = norm(a) * norm(b)
    return dot(a, b) / denom if denom else 0.0

q       = [1, 1, 1, 0, 0]
doc_hit = [1, 1, 0, 0, 0]   # 與 q 方向接近
doc_off = [0, 0, 0, 0, 1]   # 與 q 完全無關

print(round(cosine_similarity(q, doc_hit), 3))  # 0.816：相關
print(round(cosine_similarity(q, doc_off), 3))  # 0.0  ：無關

# （用 numpy 會更快：np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))）
