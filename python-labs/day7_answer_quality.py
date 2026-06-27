# 簡化評分：答案是否涵蓋必要重點（真實會用人工 rubric 或 LLM-as-judge）。

def coverage_score(answer, must_include):
    covered = sum(1 for kw in must_include if kw in answer)
    return covered / len(must_include)

answer = "水溫太高會讓咖啡變苦"
print(coverage_score(answer, ["水溫", "苦"]))    # 兩個重點都有 → 1.0
print(coverage_score(answer, ["烘焙", "苦"]))    # 只命中「苦」 → 0.5
