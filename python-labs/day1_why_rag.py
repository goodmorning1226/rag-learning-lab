# 示範「沒有 RAG」vs「有 RAG」的差別（用 mock 函式，不需 API key）。

def llm_without_rag(question: str) -> str:
    """只靠記憶回答的 LLM —— 對私有問題會編造。"""
    return "貴公司的退款政策是 30 天內無條件退款。"  # ← 它其實在猜

def llm_with_rag(question: str, context: str) -> str:
    """先給它檢索到的真實資料，再回答。"""
    return f"根據文件：{context}"

question = "我們公司內部的退款政策是幾天？"

# 沒有 RAG：模型沒讀過你的文件，卻給了肯定的答案（幻覺）
print("無 RAG：", llm_without_rag(question))

# 有 RAG：先從知識庫檢索到正確段落，再讓模型依據它回答
retrieved = "本公司商品自簽收日起 7 天內可申請退款。"
print("有 RAG：", llm_with_rag(question, retrieved))
