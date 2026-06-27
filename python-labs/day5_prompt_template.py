# 用一個固定模板組裝 prompt：system 指令 + context + question。

TEMPLATE = """你是嚴謹的助理。請只根據「資料」回答「問題」。
若資料中沒有答案，請回答「資料中沒有提到」，不要自行編造。

資料：
{context}

問題：{question}
答案："""

def build_prompt(context, question):
    return TEMPLATE.format(context=context, question=question)

prompt = build_prompt("[1] 水溫太高會讓咖啡變苦（來源：coffee.md）", "咖啡為什麼苦？")
print(prompt)
