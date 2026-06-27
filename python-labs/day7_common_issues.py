# 一張「症狀 → 可能根因」對照表，幫你快速定位。

issues = {
    "答案在資料裡卻沒答出來": "檢索沒撈到（chunk 切法 / embedding / k 太小）",
    "答案是資料裡沒有的、憑空編造": "缺少 grounding 指令，或檢索撈到雜訊",
    "答案只對了一半": "chunk 太大混入雜訊，或 k 太小漏掉資訊",
    "檢索很慢": "資料量大仍用線性搜尋，該上向量資料庫索引",
}

for symptom, cause in issues.items():
    print(f"症狀：{symptom}\n  → 可能根因：{cause}\n")
