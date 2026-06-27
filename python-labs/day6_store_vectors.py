# 簡化版「向量庫」＝帶有 vector 欄位的 chunk list。

def build_store(chunks):
    # 真實情況：改用 Chroma collection.add(...) 並持久化到磁碟
    return [c for c in chunks if "vector" in c]

chunks = [
    {"text": "a", "vector": [1, 0]},
    {"text": "b", "vector": [0, 1]},
]
store = build_store(chunks)
print("已建立向量庫，筆數：", len(store))
