# debug_ask：和正常 ask 一樣，但把每一層中間結果印出來。

def debug_ask(store, query, retrieve, build_prompt, llm, k=2):
    context = retrieve(store, query, k)
    print("① 檢索到的 context：")
    for c in context:
        print("   -", c["text"])

    prompt = build_prompt(query, context)
    print("② 組好的 prompt 長度：", len(prompt))

    answer = llm(query, context)
    print("③ 模型的回答：", answer)
    return answer

# 用法：把你 pipeline 裡的 retrieve / build_prompt / llm 傳進來即可逐層觀察。
