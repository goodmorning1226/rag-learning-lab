# 用最陽春的關鍵字計分，示範『切法』如何影響撈回的內容品質。

def keyword_score(chunk, query):
    return sum(1 for ch in query if ch in chunk)

doc = "營業時間是平日早上九點到晚上六點。週末公休。"

chunks_big = [doc]                                   # 壞切法：整段一塊（混主題）
chunks_good = ["營業時間是平日早上九點到晚上六點。",   # 好切法：依句子切
               "週末公休。"]

query = "週末"
best_big = max(chunks_big, key=lambda c: keyword_score(c, query))
best_good = max(chunks_good, key=lambda c: keyword_score(c, query))

print("壞切法撈到：", best_big)    # 撈到一大段，答案被其他內容淹沒
print("好切法撈到：", best_good)   # 撈到聚焦的「週末公休。」
