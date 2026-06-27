# 示範用 metadata 先過濾，再進行檢索（這裡簡化為只看過濾）。

store = [
    ("c0", "手沖咖啡水溫",      {"source": "coffee.md",    "lang": "zh"}),
    ("c1", "espresso pressure", {"source": "coffee_en.md", "lang": "en"}),
    ("c2", "咖啡烘焙程度",      {"source": "coffee.md",    "lang": "zh"}),
]

def retrieve(only_lang=None):
    pool = store
    if only_lang:                                  # 先用 metadata 過濾
        pool = [r for r in store if r[2]["lang"] == only_lang]
    return [doc_id for doc_id, _text, _meta in pool]  # 接著才會做相似度檢索

print("全部：", retrieve())                 # ['c0', 'c1', 'c2']
print("只查中文：", retrieve(only_lang="zh"))  # ['c0', 'c2']
