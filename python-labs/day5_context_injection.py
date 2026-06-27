# 把檢索到的段落，格式化成帶編號與來源的 context 區塊。

chunks = [
    {"text": "水溫太高會讓咖啡變苦", "source": "coffee.md"},
    {"text": "深烘焙較苦",           "source": "roast.md"},
]

def build_context(chunks):
    return "\n".join(
        f"[{i + 1}] {c['text']}（來源：{c['source']}）"
        for i, c in enumerate(chunks)
    )

print(build_context(chunks))
# [1] 水溫太高會讓咖啡變苦（來源：coffee.md）
# [2] 深烘焙較苦（來源：roast.md）
