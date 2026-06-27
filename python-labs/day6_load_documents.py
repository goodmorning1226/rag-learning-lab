from pathlib import Path

def load_documents(folder):
    """讀取資料夾下所有 .md，回傳 {檔名: 內容}。"""
    docs = {}
    for path in Path(folder).glob("*.md"):
        docs[path.name] = path.read_text(encoding="utf-8")
    return docs

# 範例（不需真實檔案）：直接用 dict 模擬載入結果
documents = {
    "coffee.md": "手沖咖啡的水溫建議 88 到 96 度。水溫太高會讓咖啡變苦。",
    "roast.md": "咖啡豆的烘焙程度分為淺中深三種。深烘焙較苦。",
}
print("載入文件數：", len(documents))
