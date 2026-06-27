# 用 chunk 的 metadata 顯示引用來源。

def format_with_citations(answer, context):
    lines = [answer, "", "引用來源："]
    for i, c in enumerate(context):
        lines.append(f"  [{i + 1}] {c['source']} 第 {c['para']} 句")
    return "\n".join(lines)

context = [{"text": "水溫太高會讓咖啡變苦。", "source": "coffee.md", "para": 1}]
print(format_with_citations("水溫太高會讓咖啡變苦。", context))
