export interface GlossaryTerm {
  term: string;
  en: string;
  def: string;
}

/** RAG 名詞速查表（中英對照 + 一句白話）。 */
export const glossary: GlossaryTerm[] = [
  {
    term: "RAG（檢索增強生成）",
    en: "Retrieval-Augmented Generation",
    def: "讓 LLM 回答前先去知識庫「查資料」，再根據查到的內容回答；像把閉書考試變成開書考試。",
  },
  {
    term: "LLM（大型語言模型）",
    en: "Large Language Model",
    def: "用海量文字訓練、很會生成文字的模型；知識會過期、會幻覺，也不知道你的私有資料。",
  },
  {
    term: "嵌入 / Embedding",
    en: "Embedding",
    def: "把文字轉成一串代表「語意」的數字（向量），意思相近的文字向量也會靠得近。",
  },
  {
    term: "向量",
    en: "Vector",
    def: "一串數字，代表文字在語意空間中的位置；檢索就是在這個空間找最近的點。",
  },
  {
    term: "餘弦相似度",
    en: "Cosine similarity",
    def: "用兩個向量的夾角衡量相似度，值域 -1~1，越接近 1 越相似；不受文字長短影響。",
  },
  {
    term: "切塊 / Chunk",
    en: "Chunk",
    def: "把長文件切成的一小段，是檢索與儲存的最小單位。",
  },
  {
    term: "Chunk size",
    en: "Chunk size",
    def: "每一塊切多大（字元或 token 數）。太大混入雜訊、太小切斷語意。",
  },
  {
    term: "重疊 / Overlap",
    en: "Chunk overlap",
    def: "讓相鄰 chunk 共享一小段內容，避免語意或答案被從邊界切斷。",
  },
  {
    term: "遞迴切割",
    en: "Recursive splitting",
    def: "優先在段落→句子→詞的自然邊界切，盡量不切斷語意；生產環境常用。",
  },
  {
    term: "向量資料庫",
    en: "Vector Database",
    def: "專門存向量、並能快速找出最相似 Top-k 的資料庫，例如 Chroma / FAISS / pgvector。",
  },
  {
    term: "Top-k",
    en: "Top-k",
    def: "檢索時取相似度最高的前 k 筆。k 太小會漏、太大會吵。",
  },
  {
    term: "檢索 / Retrieval",
    en: "Retrieval",
    def: "把問題轉成向量、在知識庫找出最相關段落的步驟；檢索品質是 RAG 的天花板。",
  },
  {
    term: "脈絡注入",
    en: "Context injection",
    def: "把檢索到的段落（含來源編號）插入 prompt，讓模型有資料可依據。",
  },
  {
    term: "Prompt 模板",
    en: "Prompt template",
    def: "把「指令 + context + 問題」組成一致結構的固定模板，讓回答更穩定、好迭代。",
  },
  {
    term: "幻覺",
    en: "Hallucination",
    def: "模型一本正經地編造、講出資料裡沒有的內容；RAG 用檢索 + grounding 指令來降低它。",
  },
  {
    term: "有依據 / 忠實度",
    en: "Groundedness / Faithfulness",
    def: "答案的每一句是否都能在檢索資料裡找到根據；是 RAG 最重要的品質指標。",
  },
  {
    term: "引用來源",
    en: "Citation / Source",
    def: "在答案旁標出資料出自哪份文件、第幾段，讓答案可被查證（可溯源）。",
  },
  {
    term: "精確率 / 召回率",
    en: "Precision / Recall",
    def: "Precision＝撈回的有多少相關（乾不乾淨）；Recall＝相關的撈回了多少（有沒有漏）。",
  },
  {
    term: "重排序",
    en: "Reranking",
    def: "先粗檢索較多候選，再用更準的模型重新排序取前幾名，兼顧召回與精度。",
  },
  {
    term: "混合檢索",
    en: "Hybrid search",
    def: "結合關鍵字檢索（精確詞、專有名詞）與向量檢索（語意），兩者互補。",
  },
];
