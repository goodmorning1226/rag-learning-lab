# 超簡化的 grounded 檢查：答案的字詞，是否都能在 context 找到。

def grounded_ratio(answer, context_text):
    words = [w for w in answer if w.strip() and w not in "，。、（）[]"]
    if not words:
        return 0.0
    supported = sum(1 for w in words if w in context_text)
    return supported / len(words)

context = "水溫太高會讓咖啡變苦"
print(round(grounded_ratio("咖啡變苦", context), 2))   # 字都在 context → 1.0
print(round(grounded_ratio("股價上漲", context), 2))   # 都不在 → 0.0
