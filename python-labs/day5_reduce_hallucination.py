# 用一個 mock LLM 示範：沒撈到資料時，無防護會編造、有防護會誠實。

def fake_llm(question, context, strict):
    if not context:                       # 檢索沒撈到任何資料
        if strict:
            return "資料中沒有提到。"        # 有防護：誠實說不知道
        return "退款政策是 30 天。"          # 無防護：憑空編造
    return "根據資料：" + context[0]

print("無防護：", fake_llm("退款幾天？", [], strict=False))
print("有防護：", fake_llm("退款幾天？", [], strict=True))
