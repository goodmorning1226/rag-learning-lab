# 一個最小版 RAG：不需要任何 API 或套件，用純 Python 串起完整流程。

# 1) Documents：我們的知識庫
documents = [
    "手沖咖啡的水溫建議落在攝氏 88 到 96 度之間。",
    "濃縮咖啡使用約 9 大氣壓的壓力來萃取。",
    "咖啡豆的烘焙程度分為淺烘焙、中烘焙與深烘焙。",
    "若咖啡喝起來太苦，可能是萃取過度或水溫太高。",
]

# 2) Chunking：這裡每句已夠短，直接一句一個 chunk
chunks = documents

# 3) Embedding（簡化版）：用「字元集合」當最陽春的語意表示
def embed(text):
    drop = "，。？！、 "
    return set(ch for ch in text if ch not in drop)

# 4) Vector DB（簡化版）：把每個 chunk 的向量存成 list
chunk_vectors = [embed(c) for c in chunks]

# 5) Retrieval：用「共同字元數」當相似度分數，挑最相關的 top_k 段
def retrieve(query, top_k=2):
    q = embed(query)
    scored = [(i, len(q & v)) for i, v in enumerate(chunk_vectors)]
    scored.sort(key=lambda x: x[1], reverse=True)  # 分數高的排前面
    return [chunks[i] for i, score in scored[:top_k] if score > 0]

# 6) Prompt 組裝：把檢索到的內容夾進提問
def build_prompt(query, context):
    joined = "\n".join(f"- {c}" for c in context)
    return f"請只根據以下資料回答問題。\n\n資料：\n{joined}\n\n問題：{query}"

# 7) Generate（簡化版 LLM）：只根據資料回答，找不到就說不知道
def fake_llm(context):
    if not context:
        return "資料中沒有提到，無法回答。"
    return "根據資料：" + context[0]

# 串起來
query = "咖啡太苦怎麼辦？"
context = retrieve(query)
answer = fake_llm(context)

print("問題：", query)
print("檢索到的來源：", context)
print("回答：", answer)
