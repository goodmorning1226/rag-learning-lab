# query 與 document 必須用「同一個 embed 函式（同一個向量空間）」才能比較。

VOCAB = ["咖啡", "水溫", "苦"]
def embed(t):
    return [t.count(w) for w in VOCAB]

# 正確：query 與 document 用同一個 embed，落在同一空間
q_vec   = embed("咖啡 水溫")
doc_vec = embed("手沖咖啡要注意水溫")
print("同一空間，可比較：", q_vec, doc_vec)   # [1, 1, 0] 與 [1, 1, 0]

# 錯誤示範：query 用了不同的詞表 → 維度/意義對不上，距離無意義
WRONG_VOCAB = ["報稅", "發票"]
def embed_wrong(t):
    return [t.count(w) for w in WRONG_VOCAB]
print("不同空間，無法比較：", embed_wrong("咖啡 水溫"))   # [0, 0]
