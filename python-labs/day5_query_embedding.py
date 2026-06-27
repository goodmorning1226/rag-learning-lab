# 把問題轉成查詢向量（用和建庫時相同的 embed 函式）。

VOCAB = ["水溫", "咖啡", "苦", "烘焙"]
def embed(text):
    return [text.count(w) for w in VOCAB]

query = "咖啡為什麼很苦"
print("查詢向量：", embed(query))   # 依 VOCAB 順序數每個詞
