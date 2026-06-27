export interface AdvancedTopic {
  title: string;
  en: string;
  what: string;
  why: string;
  how: string;
  when: string;
}

export const advancedTopics: AdvancedTopic[] = [
  {
    title: "混合檢索",
    en: "Hybrid search",
    what: "同時用「關鍵字檢索（如 BM25）」與「向量檢索」，再把兩邊的結果合併。",
    why: "向量擅長語意相近、但對專有名詞／代號／精確字串較弱；關鍵字剛好相反。兩者互補能同時抓到語意與精確比對。",
    how: "分別跑關鍵字與向量檢索，用 RRF（Reciprocal Rank Fusion）之類的方法合併排名，取合併後的 Top-k。",
    when: "文件含很多專有名詞、產品代號、數字或精確字串，純語意檢索常漏掉時。",
  },
  {
    title: "重排序",
    en: "Reranking",
    what: "先用向量檢索粗撈較多候選（例如 Top-20），再用更準的模型重新排序，取前 3~5 名。",
    why: "雙塔 embedding 檢索很快但較粗；cross-encoder reranker 把「問題＋每個候選」一起讀，判斷更準但較慢。兩階段兼顧速度與精度。",
    how: "檢索回較大的候選集 → 丟給 reranker 模型（如 bge-reranker、Cohere Rerank）逐一評分 → 取最高分的幾個。",
    when: "檢索召回沒問題、但排序不夠準，且預算允許多一次模型呼叫時。",
  },
  {
    title: "查詢改寫",
    en: "Query rewriting",
    what: "把使用者口語、含糊或多意的問題，改寫成更利於檢索的查詢，或拆成多個子查詢。",
    why: "原始問題的用詞可能和文件不同、或一句話包含多個意圖；直接拿去檢索容易撈不準。",
    how: "用 LLM 改寫問題；或用 HyDE（先讓 LLM 生成一段假設答案，再用它去 embedding 檢索）；多跳問題可拆成數個子查詢分別檢索。",
    when: "對話式問答（要把代名詞補回）、模糊問題、需要多步推理的問題。",
  },
  {
    title: "代理式 RAG",
    en: "Agentic RAG",
    what: "讓 LLM 自己決定「要不要檢索、檢索幾次、用哪個工具」，而不是固定只檢索一次。",
    why: "固定一次檢索無法處理需要多步推理、或要綜合多個來源的複雜問題。",
    how: "用 ReAct 之類的迴圈：模型思考 → 呼叫工具（檢索／搜尋／計算）→ 看結果 → 再決定下一步，直到能回答。",
    when: "複雜任務、需要多步驟與多來源、或要結合外部工具（搜尋、資料庫、API）時。",
  },
];

export const upgradeEmbeddingCode = `# 把簡化的「詞頻向量」換成真正的 embedding 模型
# pip install sentence-transformers
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def embed(text):
    # 回傳一個語意向量（list of float）；query 與 document 都用同一個模型
    return model.encode(text).tolist()`;

export const upgradeLlmCode = `# 把 mock_llm 換成真正的 LLM API（以 Anthropic Claude 為例）
# pip install anthropic   （需設定環境變數 ANTHROPIC_API_KEY）
import anthropic

client = anthropic.Anthropic()

def generate(prompt):
    msg = client.messages.create(
        model="claude-haiku-4-5",   # 便宜夠用；要更強可換 claude-sonnet / claude-opus
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return msg.content[0].text

# OpenAI / Gemini 也是類似：把 build_prompt 的結果送進去、取回文字即可，
# RAG 的其他步驟（檢索、組 prompt、顯示來源、grounded 檢查）完全不變。`;
