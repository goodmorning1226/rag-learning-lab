# grounded 回答：有資料就根據資料答並標來源；沒資料就誠實說不知道。

def answer_grounded(question, context):
    # 真實情況：把這個規則寫進 system prompt，再呼叫 LLM API
    if not context:
        return "資料中沒有提到。"
    return f"{context[0]}（來源 [1]）"

print(answer_grounded("咖啡為什麼苦？", ["水溫太高會讓咖啡變苦"]))
print(answer_grounded("公司股價多少？", []))   # 資料外 → 誠實說不知道
