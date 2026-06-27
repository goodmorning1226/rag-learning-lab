# 用一個小標準答案集，計算 Recall@k。

# 每個問題「正確的 chunk id」
gold = {"q1": {"c2"}, "q2": {"c5"}}
# 系統實際檢索回來的 chunk id（Top-k）
retrieved = {"q1": ["c2", "c9"], "q2": ["c1", "c3"]}

def recall_at_k(gold, retrieved):
    hit = sum(1 for q in gold if gold[q] & set(retrieved[q]))
    return hit / len(gold)

print("Recall@k：", recall_at_k(gold, retrieved))
# q1 有撈到 c2（命中），q2 沒撈到 c5（沒中）→ 1/2
