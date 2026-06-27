# 用 context 產生回答（mock LLM；真實改呼叫 LLM API）。

def generate_answer(query, context):
    if not context:
        return "資料中沒有提到。"
    # 真實情況：把 build_prompt(query, context) 送進 LLM API
    # （例如 Anthropic 的 claude-haiku-4-5），取回模型回答。
    return f"根據資料：{context[0]['text']}"

context = [{"text": "水溫太高會讓咖啡變苦。", "source": "coffee.md"}]
print(generate_answer("咖啡為什麼苦？", context))
