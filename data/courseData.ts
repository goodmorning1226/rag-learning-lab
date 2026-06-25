import type { Day, Unit } from "./types";

/**
 * 課程內容單一真實來源。
 * Day 1–4 已完整實作（含白話說明、實務直覺、圖解描述、Python 範例與練習）。
 * Day 5–7 已具備完整結構與教學文字，練習與程式範例將於後續補齊。
 */
export const courseData: Day[] = [
  // ──────────────────────────────── DAY 1 ────────────────────────────────
  {
    id: "day1",
    num: 1,
    title: "LLM 與 RAG 基礎",
    subtitle: "為什麼需要 RAG、它如何運作",
    estimatedTime: "約 90 分鐘",
    summary: "理解為什麼需要 RAG、它解決什麼問題，並看懂 RAG 的完整流程。",
    ragStages: ["overview"],
    learningGoals: [
      "說出 LLM 的三大限制，以及 RAG 如何補救",
      "完整說出並畫出 RAG 的七步驟流程",
      "區分 RAG 與 Fine-tuning 的適用情境",
      "讀懂一個最小版 RAG 的運作方式",
    ],
    units: [
      {
        id: "1.1",
        slug: "why-rag",
        title: "為什麼需要 RAG",
        concept: "RAG 讓 LLM 在回答前先去查資料，從「閉書考試」變成「開書考試」。",
        plainExplanation:
          "大型語言模型（LLM）很會講話，但它有三個天生的限制：\n\n1. 知識會過期：模型只學到「訓練截止日」之前的資料，之後發生的事它不知道。\n2. 會幻覺（hallucination）：遇到不確定的問題，它常會「自信地編造」一個聽起來很合理、其實是錯的答案。\n3. 不知道你的私有資料：你公司的內部文件、你上傳的 PDF，模型從沒讀過。\n\nRAG（Retrieval-Augmented Generation，檢索增強生成）的解法很單純：與其讓模型憑記憶硬答，不如先去「查資料」，再根據查到的內容回答。就像把閉書考試變成開書考試——先翻到對的那一頁，再下筆。\n\n實務上，幾乎所有「企業知識庫問答」「客服機器人」「文件助理」都是用 RAG 做的：把公司文件變成可檢索的知識庫，使用者一問問題，系統先撈出相關段落，再讓模型根據這些段落回答，而且能標出資料來源。",
        diagramDescription:
          "左右對比卡：左邊「閉書考試的 LLM」——只靠記憶、會過期、會編造；右邊「開書考試的 LLM（RAG）」——先檢索知識庫，再根據撈到的資料回答，並附上來源。中間用一個箭頭標示「加上檢索這一步」。",
        keyPoints: [
          "LLM 有三大限制：知識會過期、會幻覺、不知道你的私有資料。",
          "RAG = 讓模型先檢索、再根據資料回答（開書考試）。",
          "企業知識庫、客服、文件問答幾乎都是 RAG 的應用場景。",
        ],
        pythonExample: {
          filename: "day1_why_rag.py",
          language: "python",
          code: `# 示範「沒有 RAG」vs「有 RAG」的差別（用 mock 函式，不需 API key）。

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
print("有 RAG：", llm_with_rag(question, retrieved))`,
          codeExplanation: [
            { code: "llm_without_rag(question)", note: "模擬只靠記憶回答的 LLM——面對沒讀過的私有問題，它會自信地編造答案（幻覺）。" },
            { code: "retrieved = 政策文字", note: "先從知識庫檢索到正確的政策段落（這裡用一個字串代表檢索結果）。" },
            { code: "llm_with_rag(question, retrieved)", note: "把檢索到的資料一起給模型，讓它根據真實依據回答，而不是憑空猜。" },
          ],
        },
        exercises: [
          {
            id: "ex-1.1-a",
            title: "哪種情境最適合用 RAG？",
            type: "multiple-choice",
            question: "下列哪一組情境「最適合」用 RAG 來解決？",
            options: [
              "計算 123 + 456 的結果",
              "回答使用者上傳 PDF 的內容，以及公司會不定期更新的產品規格",
              "把一句日常中文翻譯成英文",
              "解一元二次方程式",
            ],
            expectedAnswer:
              "回答使用者上傳 PDF 的內容，以及公司會不定期更新的產品規格",
            explanation:
              "RAG 的價值在於『提供模型本來不知道、或會過期的外部知識』。上傳的 PDF 是私有資料、會更新的規格是時效性資料，兩者都適合 RAG。其餘三個是純運算或模型本身就會的通用能力，用 RAG 反而多此一舉。",
            hint: "想一想：哪個情境的答案『不在模型的記憶裡』，需要去查外部資料？",
          },
        ],
        summary:
          "LLM 會過期、會幻覺、不懂你的私有資料；RAG 透過「先檢索、再回答」補上這些缺口，是企業知識庫與文件問答的主流做法。",
      },
      {
        id: "1.2",
        slug: "rag-flow",
        title: "RAG 的核心流程",
        concept:
          "RAG 由七個步驟組成：Documents → Chunking → Embedding → Vector DB → Retrieval → Prompt → Answer。",
        plainExplanation:
          "可以用「圖書館」來想像整個 RAG 流程：\n\n1. Documents（文件）：原始知識來源，例如 PDF、Markdown、網頁。\n2. Chunking（切塊）：把長文件切成一段段，方便檢索。\n3. Embedding（嵌入）：幫每一段文字編一個「語意索引」——也就是向量。\n4. Vector DB（向量資料庫）：把這些向量存進索引櫃，之後能快速查找。\n5. Retrieval（檢索）：使用者提問時，找出最相關的幾段。\n6. Prompt（組裝）：把檢索到的段落夾進提問，交給模型。\n7. Answer（生成）：LLM 根據這些段落產生回答。\n\n關鍵心法：前四步（Documents → Vector DB）是「事前準備」，通常只做一次，把知識庫建好；後三步（Retrieval → Answer）是「每次提問即時執行」。理解這個分界，你就懂了為什麼建索引慢沒關係，但檢索一定要快。",
        diagramDescription:
          "一條由左到右的七格流程圖：Documents → Chunking → Embedding → Vector DB → Retrieval → Prompt → Answer。用一條虛線把前四格框成「事前準備（建立知識庫）」、後三格框成「即時查詢（每次提問）」。每格標上中英對照。",
        keyPoints: [
          "RAG 七步驟：Documents → Chunking → Embedding → Vector DB → Retrieval → Prompt → Answer。",
          "前四步是「事前建立知識庫」，後三步是「每次提問即時執行」。",
          "Embedding 是把文字變成向量；Retrieval 是用向量找最相關的段落。",
        ],
        pythonExample: {
          filename: "day1_rag_flow.py",
          language: "python",
          code: `# 用「印出步驟」的方式，先看清楚 RAG 七步驟的骨架（細節後面幾天會逐一實作）。

def build_knowledge_base(documents):
    print("1) Documents：載入原始文件")
    chunks = chunking(documents)
    vectors = embedding(chunks)
    store_in_vector_db(vectors)
    print("→ 知識庫建立完成（事前準備，只做一次）\\n")

def chunking(documents):
    print("2) Chunking：把長文件切成小段")
    return documents

def embedding(chunks):
    print("3) Embedding：把每段文字轉成向量")
    return chunks

def store_in_vector_db(vectors):
    print("4) Vector DB：把向量存進向量資料庫")

def answer(question):
    print("5) Retrieval：找出與問題最相關的段落")
    print("6) Prompt：把段落夾進提問")
    print("7) Answer：LLM 根據段落產生回答")

build_knowledge_base(["doc1", "doc2"])
answer("RAG 是什麼？")`,
          codeExplanation: [
            { code: "build_knowledge_base(documents)", note: "事前準備：依序做 Documents→Chunking→Embedding→Vector DB，把知識庫建好（通常只跑一次）。" },
            { code: "chunking / embedding / store_in_vector_db", note: "三個子步驟分別對應切塊、轉成向量、存進向量資料庫。" },
            { code: "answer(question)", note: "每次提問即時執行的三步：Retrieval → Prompt → Answer。" },
          ],
        },
        exercises: [
          {
            id: "ex-1.2-a",
            title: "Chunking 的下一步",
            type: "short-answer",
            question:
              "在 RAG 流程中，把文件切塊（Chunking）之後，下一步是把每一段文字轉成一串代表語意的數字。請寫出這個步驟的名稱（英文一個字即可）。",
            expectedAnswer: "embedding",
            explanation:
              "Chunking 之後是 Embedding（嵌入）：把每段文字轉成向量。有了向量才能存進 Vector DB、之後用相似度檢索。",
            hint: "它的中文叫「嵌入」，是把文字變成向量的步驟。",
          },
          {
            id: "ex-1.2-b",
            title: "哪些步驟是「即時執行」？",
            type: "multiple-choice",
            question:
              "使用者每問一個問題時，下列哪一組步驟是「當下即時執行」的？",
            options: [
              "Documents、Chunking、Embedding",
              "Chunking、Embedding、Vector DB",
              "Retrieval、Prompt、Answer",
              "全部七個步驟每次都要重做一遍",
            ],
            expectedAnswer: "Retrieval、Prompt、Answer",
            explanation:
              "前四步（Documents → Vector DB）是事前準備、建立知識庫，通常只做一次。每次提問即時跑的是後三步：Retrieval（檢索）→ Prompt（組裝）→ Answer（生成）。",
            hint: "知識庫建立好之後，提問時還需要重新切塊、重新建索引嗎？",
          },
        ],
        summary:
          "RAG 是七步驟流程，分成「事前建知識庫」與「即時查詢回答」兩段。記住這條流程，後面幾天就是逐一把每個方塊做出來。",
      },
      {
        id: "1.3",
        slug: "rag-vs-finetuning",
        title: "RAG vs Fine-tuning",
        concept:
          "RAG 是「給模型一本可隨時換的參考書」；Fine-tuning 是「把知識訓練進模型的腦袋」。",
        plainExplanation:
          "新手最常問：「為什麼不直接 fine-tune 一個模型就好？」這兩者解決的問題其實不同。\n\nFine-tuning（微調）是用你的資料再訓練模型，改變模型本身的權重。它擅長改變「風格與格式」——例如讓模型固定用某種語氣、輸出特定 JSON 格式。但缺點是：更新昂貴（資料一變就要重訓）、仍然會幻覺、而且無法告訴你答案的來源。\n\nRAG 是把知識放在外部知識庫，回答時即時檢索。它的優點是：更新便宜（換文件就好）、可溯源（能標出答案出自哪份文件）、特別適合「知識會變動」的場景。缺點是每次要多花檢索的時間，且答得好不好很依賴檢索品質。\n\n實務上的常見答案是：兩者併用。用 fine-tuning 調整模型的語氣與輸出格式，用 RAG 提供最新、私有、可溯源的知識。一句話總結：要『新知識』找 RAG，要『新行為/風格』找 fine-tuning。\n\n快速對照（五個面向）——更新成本：RAG 低（換文件即可）、Fine-tuning 高（要重新訓練）；即時性：RAG 可即時更新、Fine-tuning 需重訓才生效；可溯源：RAG 能標出來源、Fine-tuning 無法；幻覺：RAG 較少（答案有依據）、Fine-tuning 仍會；擅長的事：RAG 補『知識』、Fine-tuning 調『風格與格式』。",
        diagramDescription:
          "一張兩欄比較表：欄位為「更新成本、即時性、可溯源、會不會幻覺、擅長什麼」，左欄 RAG、右欄 Fine-tuning。表格下方放一個小決策樹：『需要最新/私有知識？→ RAG』『需要固定風格/格式？→ Fine-tuning』『兩者都要？→ 併用』。",
        keyPoints: [
          "Fine-tuning 改變模型本身，擅長風格/格式，但更新貴、不可溯源。",
          "RAG 把知識放外部，更新便宜、可溯源，適合知識會變動的場景。",
          "要『新知識』找 RAG；要『新行為/風格』找 fine-tuning；常常兩者併用。",
        ],
        pythonExample: {
          filename: "day1_rag_vs_finetuning.py",
          language: "python",
          code: `# 一個小決策函式：依需求建議該用 RAG 還是 Fine-tuning。

def recommend(need_fresh_knowledge: bool, need_fixed_style: bool) -> str:
    if need_fresh_knowledge and need_fixed_style:
        return "兩者併用：RAG 供知識，Fine-tuning 調風格"
    if need_fresh_knowledge:
        return "用 RAG：知識會變動、需要可溯源"
    if need_fixed_style:
        return "用 Fine-tuning：要固定的語氣或輸出格式"
    return "可能都不需要，先試試直接 prompting"

# 情境：客服要回答『會更新的產品規格』，且要用公司固定的客服語氣
print(recommend(need_fresh_knowledge=True, need_fixed_style=True))

# 情境：只是要回答最新的內部文件
print(recommend(need_fresh_knowledge=True, need_fixed_style=False))`,
          codeExplanation: [
            { code: "recommend(need_fresh_knowledge, need_fixed_style)", note: "依『是否需要新知識』與『是否需要固定風格』兩個條件，給出建議。" },
            { code: "True, True", note: "兩者都要時 → 併用：RAG 供知識、Fine-tuning 調風格。" },
            { code: "need_fixed_style=False", note: "只需要最新／私有知識 → 用 RAG 即可，不必動模型本身。" },
          ],
        },
        exercises: [
          {
            id: "ex-1.3-a",
            title: "選擇正確做法",
            type: "multiple-choice",
            question:
              "「要讓客服機器人能回答『本週剛更新的產品規格』」——最適合的做法是？",
            options: [
              "用 Fine-tuning，把這週的規格訓練進模型",
              "用 RAG，把最新規格文件放進知識庫，回答時即時檢索",
              "不需要任何處理，靠模型既有知識就能答",
              "每次規格更新就重新訓練一個全新的大模型",
            ],
            expectedAnswer:
              "用 RAG，把最新規格文件放進知識庫，回答時即時檢索",
            explanation:
              "規格會「頻繁更新」，正是 RAG 的強項：換上新文件即可，不必重訓模型，而且能標出答案來源。用 fine-tuning 處理會變動的知識，更新成本高又難溯源。",
            hint: "規格會「一直更新」。哪種做法更新起來最便宜、又能溯源？",
          },
        ],
        summary:
          "RAG 與 Fine-tuning 不是二選一：前者補『知識』，後者改『行為/風格』。面試與實務都要能依情境說出該用哪一個，或為何併用。",
      },
      {
        id: "1.4",
        slug: "minimal-rag",
        title: "一個最小版 RAG 的概念範例",
        concept:
          "用純 Python（不需 API、不需套件）把七步驟濃縮成幾十行，親眼看 RAG 如何運作。",
        plainExplanation:
          "概念講再多，不如看一個能跑的最小範例。下面這段程式不需要任何 API 或套件，就把 RAG 的完整流程走過一遍：\n\n- documents 就是我們的知識庫（步驟 1）。\n- 這裡每句已經夠短，直接一句當一個 chunk（步驟 2）。\n- embed() 用「文字的字元集合」當作最陽春的語意表示——真實情況會用模型把文字轉成向量，但概念一樣：把文字變成可以比較相似度的東西（步驟 3）。\n- chunk_vectors 就是我們的「向量資料庫」（步驟 4）。\n- retrieve() 用『共同字元的數量』當相似度分數，挑出最相關的幾段（步驟 5）。\n- build_prompt() 把檢索到的段落夾進提問（步驟 6）。\n- fake_llm() 模擬模型「只根據資料回答」，找不到就說不知道（步驟 7）。\n\n看懂這 40 行，你就掌握了 RAG 的骨架。接下來幾天，只是把 embed 換成真正的 embedding 模型、把 retrieve 換成真正的向量資料庫、把 fake_llm 換成真正的 LLM API 而已。",
        diagramDescription:
          "把最小範例的每個函式對應到 RAG 七步驟的資訊卡：documents=Documents、chunks=Chunking、embed=Embedding、chunk_vectors=Vector DB、retrieve=Retrieval、build_prompt=Prompt、fake_llm=Answer。用箭頭依序串起來，強調「真實版只是把每個盒子換成更強的工具」。",
        keyPoints: [
          "RAG 的骨架可以用幾十行純 Python 表達，核心是「檢索 → 組裝 → 生成」。",
          "embed 把文字變成可比較的東西、retrieve 用相似度挑段落，這就是檢索的本質。",
          "進階只是把每個零件升級：真 embedding 模型、真向量資料庫、真 LLM。",
        ],
        pythonExample: {
          filename: "day1_minimal_rag.py",
          language: "python",
          code: `# 一個最小版 RAG：不需要任何 API 或套件，用純 Python 串起完整流程。

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
    joined = "\\n".join(f"- {c}" for c in context)
    return f"請只根據以下資料回答問題。\\n\\n資料：\\n{joined}\\n\\n問題：{query}"

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
print("回答：", answer)`,
          codeExplanation: [
            { code: "documents / chunks", note: "步驟 1–2：知識庫與切塊（這裡每句已夠短，一句一個 chunk）。" },
            { code: "def embed(text)", note: "步驟 3：用『字元集合』當最陽春的向量表示，真實版會換成 embedding 模型。" },
            { code: "def retrieve(query, top_k)", note: "步驟 4–5：用共同字元數當相似度分數，排序取最相關的前 k 段。" },
            { code: "def build_prompt(...)", note: "步驟 6：把檢索到的段落夾進提問。" },
            { code: "def fake_llm(context)", note: "步驟 7：模擬 LLM 只根據資料回答，沒撈到就說不知道。" },
            { code: "print(...)", note: "印出問題、檢索到的來源與最終答案，看完整流程跑一次。" },
          ],
        },
        exercises: [
          {
            id: "ex-1.4-a",
            title: "填空：讓最相關的排前面",
            type: "code-fill",
            question:
              "在 retrieve() 中，我們希望「相似度分數最高（最相關）」的段落排在最前面。請補上排序的參數，讓下面這行正確運作：",
            starterCode: `scored.sort(key=lambda x: x[1], reverse=____)`,
            expectedAnswer: "True",
            explanation:
              "reverse=True 代表由大到小排序，所以分數最高（最相關）的會排在最前面，取前 top_k 個就是最相關的段落。若寫 False，會變成取到最不相關的段落。",
            hint: "sort 預設由小到大。要讓「大的（最相關）」排前面，reverse 要設成什麼？",
          },
          {
            id: "ex-1.4-b",
            title: "預測輸出",
            type: "code-output",
            question:
              "執行上面的最小版 RAG，最後一行 print(\"回答：\", answer) 會印出「回答：」後面接什麼內容？",
            expectedAnswer: "根據資料：若咖啡喝起來太苦，可能是萃取過度或水溫太高。",
            explanation:
              "query「咖啡太苦怎麼辦？」與第 4 句「若咖啡喝起來太苦…」共用最多字元（咖、啡、太、苦），相似度最高，排在 context[0]。fake_llm 回傳「根據資料：」加上 context[0]，所以答案就是該句。",
            hint: "哪一句與『咖啡太苦』共用最多字？fake_llm 會用 context 的第一個元素。",
          },
        ],
        summary:
          "你已經看懂一個能跑的最小 RAG：檢索 → 組裝 → 生成。後面幾天就是把每個簡化的零件，換成真正的 embedding 模型、向量資料庫與 LLM。",
      },
    ],
  },

  // ──────────────────────────────── DAY 2 ────────────────────────────────
  {
    id: "day2",
    num: 2,
    title: "文件處理與 Chunking",
    subtitle: "把文件變成可檢索的片段",
    estimatedTime: "約 100 分鐘",
    summary: "學會讀取與清理文件，並用適當的方式把長文切成 chunk。",
    ragStages: ["documents", "chunking"],
    learningGoals: [
      "把文件讀取並清理成乾淨純文字（垃圾進、垃圾出）",
      "理解 chunk size 與 overlap 的作用與取捨",
      "理解 recursive splitting 為何優於定長切割",
      "體會 chunking 如何直接影響檢索品質",
    ],
    units: [
      {
        id: "2.1",
        slug: "load-clean",
        title: "文件讀取與清理",
        concept: "檢索品質從讀檔就決定了：先把雜訊清掉，留下乾淨純文字。",
        plainExplanation:
          "RAG 的第一步是把原始檔案（txt、md、PDF、HTML）讀成文字。但「讀進來」不等於「能用」——真實文件往往很髒：PDF 抽出來的文字常有被硬斷的換行、重複的頁首頁尾、單獨成行的頁碼、以及一堆多餘空白。\n\n清理的目標是把這些雜訊去掉，只留下乾淨、連貫的純文字。常見動作：壓縮多餘空白、移除只有頁碼的行、把過多的空行合併成段落分隔。\n\n實務直覺：在實習裡，你會發現 RAG 專案有很大一部分時間花在「資料清理」上。一份沒清乾淨的文件，會讓後面的 chunking、embedding、檢索全部跟著變差——這就是「垃圾進、垃圾出」。先把輸入弄乾淨，後面每一步都會更輕鬆。",
        diagramDescription:
          "流程小圖：原始檔（PDF/HTML/TXT）→ 抽取文字 → 清理（壓縮空白／移除頁碼／合併空行／修補斷行）→ 乾淨純文字，準備進入 Chunking。",
        keyPoints: [
          "讀檔與清理是 RAG 的第一步，常被忽略卻決定了上限。",
          "常見清理：壓縮空白、移除頁碼行、合併過多空行。",
          "垃圾進、垃圾出：髒資料會讓後面每一步都變差。",
        ],
        pythonExample: {
          filename: "day2_clean_text.py",
          language: "python",
          code: `# 只用標準字串方法做基本清理，不依賴外部套件。

def clean_text(raw: str) -> str:
    lines = []
    for line in raw.splitlines():
        line = " ".join(line.split())      # 壓縮每行的多餘空白
        if line.strip().isdigit():         # 跳過「整行只有頁碼」的行
            continue
        lines.append(line)
    text = "\\n".join(lines)
    while "\\n\\n\\n" in text:               # 過多空行壓成段落分隔
        text = text.replace("\\n\\n\\n", "\\n\\n")
    return text.strip()

raw = "第一段文字。      \\n\\n\\n\\n12\\n\\n第二段文字。"
print(clean_text(raw))
# 輸出：
# 第一段文字。
#
# 第二段文字。`,
        },
        exercises: [
          {
            id: "ex-2.1-a",
            title: "哪個不是清理步驟？",
            type: "multiple-choice",
            question: "下列哪一項「不是」文件清理常見的步驟？",
            options: [
              "壓縮多餘的空白與空行",
              "移除頁首、頁尾與單獨成行的頁碼",
              "修補 PDF 造成的硬斷行",
              "把所有文字翻譯成英文",
            ],
            expectedAnswer: "把所有文字翻譯成英文",
            explanation:
              "清理的目的是去除雜訊、保留原意，不會去改變語言或內容。翻譯是另一回事，且會改變原文，不屬於清理。其餘三項都是常見且必要的清理動作。",
            hint: "清理應該『去雜訊、保留原意』。哪一項會改變內容本身？",
          },
        ],
        summary:
          "乾淨的輸入是好檢索的前提。先把文件整理成乾淨純文字，再進入切塊——這一步省下的麻煩，會在後面每一個環節回報你。",
      },
      {
        id: "2.2",
        slug: "chunk-size",
        title: "Chunk size 是什麼",
        concept: "chunk size 控制每一塊文字的大小；太大有雜訊、太小斷語意。",
        plainExplanation:
          "Chunk size 就是「每一塊切多大」，通常以字元數或 token 數計算。為什麼要切？因為不能把整份文件丟給模型——context 有限，而且檢索需要「剛好大小」的片段才準。\n\n切太大：一個 chunk 裡混了好幾個主題，檢索時相關的部分被無關內容稀釋，分數變低；而且塞進 prompt 會吃掉很多 token、變貴。\n切太小：一句話被拆成兩半，語意不完整，模型拿到也看不懂。\n\n實務直覺：常見的 chunk size 落在 200–1000 字元 / tokens 之間，但沒有萬用值。技術文件、FAQ、長篇文章適合的大小都不同。正確做法是：先給一個合理初值，再用實際問題去評估檢索效果、回頭調整。chunk size 是你最常調的旋鈕之一。\n\n實務選擇的起手式：FAQ／短問答用較小（約 100–300）、一般文章與文件用中等（約 300–600）、技術手冊或法律條文用較大（約 600–1000）並搭配 overlap。中文用『字元數』估、英文用『token 數』估，最後一定要用實際問題驗證再微調。",
        diagramDescription:
          "條狀圖：同一段文字分別用 size=100 / 300 / 600 切，並排顯示切出的塊數與內容範圍；標註『太大→混主題、太小→斷語意、適中→一塊一個重點』。",
        keyPoints: [
          "chunk size = 每塊的大小（字元或 token 數）。",
          "太大：混入多主題、稀釋相關性、更耗 token；太小：語意被切斷。",
          "沒有萬用值，依文件類型給初值再用評估調整。",
        ],
        pythonExample: {
          filename: "day2_chunk_size.py",
          language: "python",
          code: `# 最單純的定長切割：每 size 個字元切一塊。

def fixed_size_chunk(text, size):
    return [text[i:i + size] for i in range(0, len(text), size)]

doc = "RAG 先檢索再生成。檢索品質決定回答品質。切太大或太小都不好。"

for size in (8, 20):
    chunks = fixed_size_chunk(doc, size)
    print(f"size={size} -> {len(chunks)} 塊")
    print(chunks)`,
          codeExplanation: [
            { code: "fixed_size_chunk(text, size)", note: "最單純的定長切割：每 size 個字元切一塊，用串列推導一次切完。" },
            { code: "for size in (8, 20)", note: "用兩種大小切同一段文字，比較塊數與內容——直接看出 size 大小的影響。" },
          ],
        },
        exercises: [
          {
            id: "ex-2.2-a",
            title: "切太大的壞處",
            type: "multiple-choice",
            question: "把 chunk_size 設得「太大」，最可能的壞處是？",
            options: [
              "一個 chunk 混入多個主題，檢索時相關性被稀釋，也更耗 token",
              "一句話被切成兩半，語意不完整",
              "完全不影響檢索品質",
              "會讓 embedding 模型無法執行",
            ],
            expectedAnswer:
              "一個 chunk 混入多個主題，檢索時相關性被稀釋，也更耗 token",
            explanation:
              "太大的 chunk 會把多個主題混在一起，使得真正相關的句子被無關內容稀釋，檢索分數下降，且塞進 prompt 更花 token。『語意被切斷』是切太小的壞處，要分清楚兩者。",
            hint: "『混入多主題』是太大還是太小造成的？『語意被切斷』又是哪一種？",
          },
        ],
        summary:
          "chunk size 是檢索品質的關鍵旋鈕：太大稀釋相關性又耗 token、太小斷語意。先給合理初值，再用評估結果調整。",
      },
      {
        id: "2.3",
        slug: "chunk-overlap",
        title: "Chunk overlap 為什麼重要",
        concept: "讓相鄰 chunk 重疊一小段，避免跨邊界的語意或答案被切斷而漏掉。",
        plainExplanation:
          "如果只是把文字硬切成一塊塊，邊界上常會出問題：一個完整的句子、或一個問題的答案，剛好被切在兩塊的交界處，於是兩塊都只拿到一半，檢索時誰都不夠完整。\n\nOverlap（重疊）就是讓相鄰的 chunk 共享一小段內容：第二塊的開頭，會包含第一塊結尾的一部分。這樣即使重點落在邊界，至少有一塊能完整涵蓋它。\n\n實務直覺：overlap 常設成 chunk size 的 10–20%（例如 size=500、overlap=50~100）。太少：邊界資訊還是會漏；太多：相鄰塊大量重複，造成儲存與檢索的冗餘，也可能讓同一段內容重複命中。它是和 chunk size 搭配調整的第二個旋鈕。",
        diagramDescription:
          "兩條相鄰 chunk 的色塊圖：chunk1 結尾與 chunk2 開頭有一段重疊（用第三種顏色標示）；旁邊註明 overlap = 相鄰塊共享的字數，標出『落在邊界的句子因為 overlap 而被完整保留』。",
        keyPoints: [
          "overlap 讓相鄰塊重疊，保住落在邊界的語意或答案。",
          "常見設定：chunk size 的 10–20%。",
          "太少漏邊界資訊、太多造成重複與冗餘。",
        ],
        pythonExample: {
          filename: "day2_chunk_overlap.py",
          language: "python",
          code: `# 帶 overlap 的切割：每次往後移動 (size - overlap) 個字元。

def chunk_with_overlap(text, size, overlap):
    step = size - overlap
    return [text[i:i + size] for i in range(0, len(text), step)]

# 用英文字母方便觀察重疊的部分
doc = "ABCDEFGHIJ"
print(chunk_with_overlap(doc, size=4, overlap=2))
# 每塊長度 4，每次往後移 2 → 相鄰塊重疊 2 個字元`,
          codeExplanation: [
            { code: "step = size - overlap", note: "每次往後移動的距離＝塊大小減重疊量；overlap 越大、步進越小、重疊越多。" },
            { code: "range(0, len(text), step)", note: "從 0 開始每次 +step 取一塊，相鄰塊自然就共享 overlap 個字元。" },
          ],
        },
        exercises: [
          {
            id: "ex-2.3-a",
            title: "預測切割結果",
            type: "code-output",
            question:
              "執行 chunk_with_overlap(\"ABCDEFGHIJ\", size=4, overlap=2) 會回傳什麼 list？",
            expectedAnswer: "['ABCD', 'CDEF', 'EFGH', 'GHIJ', 'IJ']",
            explanation:
              "step = size - overlap = 4 - 2 = 2，所以從索引 0、2、4、6、8 各取 4 個字元：ABCD、CDEF、EFGH、GHIJ、IJ（最後一塊不足 4 個就取到結尾）。相鄰兩塊各重疊 2 個字元。",
            hint: "step = size - overlap = 2。從 0 開始每次 +2，取 4 個字元，最後一塊可能不足 4。",
          },
        ],
        summary:
          "overlap 是用一點重疊換取邊界完整性的設計。和 chunk size 一起調：通常設成 size 的 10–20%，避免漏掉跨邊界的重點。",
      },
      {
        id: "2.4",
        slug: "recursive-splitting",
        title: "Recursive splitting 的直覺",
        concept: "優先在段落→句子→詞的自然邊界切，盡量不把語意從中間切斷。",
        plainExplanation:
          "定長切割（每 N 個字硬切）最大的問題是：它不管語意，常常切在句子中間。更好的做法是「遞迴切割」：先試著用最大的自然邊界切，不夠小再換更細的邊界。\n\n優先順序通常是：段落（空行 \\n\\n）→ 換行（\\n）→ 句子（句號）→ 詞 / 空白 → 最後才硬切字元。先用段落切；如果某段還是太長，就對那一段改用句子切；還太長就再往下。這樣每個 chunk 都盡量是一個完整的語意單位。這就是 LangChain 的 RecursiveCharacterTextSplitter 的核心想法。\n\n實務直覺：生產環境幾乎都用這種遞迴/結構感知的切法。對 Markdown、程式碼、HTML 還有更進階的「依標題、依函式、依標籤」切割。重點心法一致：盡量沿著內容本來的結構切，而不是無腦數字數。",
        diagramDescription:
          "樹狀流程：輸入文字 →『長度 ≤ 上限?』是→直接成為一塊；否→用目前最高優先分隔符（\\n\\n）切，對仍過長的子段遞迴改用下一個分隔符（\\n→句號→空白），最後才硬切字元。",
        keyPoints: [
          "依結構切（段落→句子→詞）優於無腦定長切。",
          "遞迴：先用大邊界，過長的子段再換更細的邊界。",
          "RecursiveCharacterTextSplitter 是這個想法的標準實作。",
        ],
        pythonExample: {
          filename: "day2_recursive_split.py",
          language: "python",
          code: `# 簡化版遞迴切割：依序嘗試分隔符，子段仍過長就用下一個分隔符再切。

def recursive_split(text, max_len, separators=("\\n\\n", "\\n", "。", "")):
    if len(text) <= max_len:
        return [text]

    sep, rest = separators[0], separators[1:]
    if sep == "":                       # 沒有分隔符可用 → 最後手段：硬切
        return [text[i:i + max_len] for i in range(0, len(text), max_len)]

    chunks = []
    for piece in text.split(sep):
        if not piece:
            continue
        if len(piece) <= max_len:
            chunks.append(piece)
        else:
            chunks.extend(recursive_split(piece, max_len, rest))  # 還太長→換更細的分隔符
    return chunks

text = "第一段較短。第二段比較長一點需要再切細。第三段。"
print(recursive_split(text, max_len=10))`,
        },
        exercises: [
          {
            id: "ex-2.4-a",
            title: "分隔符的優先順序",
            type: "multiple-choice",
            question:
              "Recursive splitting 嘗試分隔符的順序，下列哪一個最合理？",
            options: [
              "先用段落，再用句子，再用詞/空白，最後才硬切字元",
              "先硬切字元，再用詞，再用句子，最後才用段落",
              "隨機挑一個分隔符來切",
              "永遠只用空白來切",
            ],
            expectedAnswer:
              "先用段落，再用句子，再用詞/空白，最後才硬切字元",
            explanation:
              "遞迴切割的精神是『盡量沿著大的自然邊界切，不夠小才往更細的邊界走』。所以順序是段落→句子→詞/空白→（不得已才）硬切字元，這樣最能保住完整語意。",
            hint: "我們希望盡量保留完整語意。應該先試『大邊界』還是先『硬切』？",
          },
        ],
        summary:
          "遞迴切割讓每個 chunk 盡量是完整語意單位：先用大邊界、過長再換細邊界，最後才硬切。這是生產環境的預設做法。",
      },
      {
        id: "2.5",
        slug: "chunking-quality",
        title: "Chunking 對檢索品質的影響",
        concept: "切法直接決定能不能撈到對的段落——chunking 是最被低估的旋鈕。",
        plainExplanation:
          "前面四個單元的所有努力，最終都是為了一件事：讓檢索能撈到「對的、完整的、乾淨的」段落。chunking 切得好不好，會直接決定檢索的命中率與雜訊量。\n\n切太大，撈回來的 chunk 雖然包含答案，但混了一堆無關內容，模型要在雜訊裡找重點；切太小或切斷語意，答案可能根本沒被完整收進任何一塊，於是怎麼檢索都撈不到。\n\n實務直覺：當你的 RAG 系統答錯時，很多人第一直覺是去換更大的模型或改 prompt，但更常見的根因其實在 chunking 與檢索。養成習慣：先把『檢索撈回了什麼』印出來看，再回頭檢查 chunk 是怎麼切的。chunking 是最便宜、卻最常被忽略的改善點。",
        diagramDescription:
          "對照圖：同一個問題，上排『壞切法』撈回一塊混雜多主題的大段（答案被雜訊淹沒）、下排『好切法』撈回一塊聚焦的小段（答案乾淨明確）。右側標出『答錯時先檢查 chunking 與檢索』。",
        keyPoints: [
          "chunking 直接影響檢索的命中率與雜訊量。",
          "答案沒被完整收進任何一塊，就怎麼也檢索不到。",
          "RAG 答錯時，先看檢索撈回什麼、再回頭檢查切法。",
        ],
        pythonExample: {
          filename: "day2_chunking_quality.py",
          language: "python",
          code: `# 用最陽春的關鍵字計分，示範『切法』如何影響撈回的內容品質。

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
print("好切法撈到：", best_good)   # 撈到聚焦的「週末公休。」`,
        },
        exercises: [
          {
            id: "ex-2.5-a",
            title: "RAG 答錯先檢查什麼？",
            type: "multiple-choice",
            question:
              "你的 RAG 系統對某個問題答錯了。根據本日內容，最該優先回頭檢查的是？",
            options: [
              "chunk 切得對不對，以及檢索撈回了什麼",
              "把模型換成參數量更大的版本",
              "電腦的螢幕解析度",
              "網路連線速度",
            ],
            expectedAnswer: "chunk 切得對不對，以及檢索撈回了什麼",
            explanation:
              "RAG 答錯時，根因常在『檢索沒撈到對的段落』，而檢索品質很大程度由 chunking 決定。先把檢索結果印出來、回頭檢查切法，比急著換大模型有效得多。",
            hint: "答案如果根本沒被撈回來，換再大的模型也沒用。問題比較可能在哪一層？",
          },
        ],
        summary:
          "chunking 是檢索品質的源頭，也是最被低估的改善點。RAG 答錯時，先檢查切法與檢索結果，再考慮模型與 prompt。",
      },
    ],
  },

  // ──────────────────────────────── DAY 3 ────────────────────────────────
  {
    id: "day3",
    num: 3,
    title: "Embedding 與語意搜尋",
    subtitle: "把文字變成向量，用相似度檢索",
    estimatedTime: "約 100 分鐘",
    summary: "理解 embedding 與 cosine similarity，並親手做一個簡單的語意搜尋。",
    ragStages: ["embedding"],
    learningGoals: [
      "用直覺解釋 embedding 與向量空間",
      "理解並用純 Python 計算 cosine similarity",
      "串起 embedding + 相似度做出簡單語意搜尋",
      "理解 query 與 document 必須在同一個向量空間",
    ],
    units: [
      {
        id: "3.1",
        slug: "what-embedding",
        title: "Embedding 是什麼",
        concept: "把文字變成一串代表「語意」的數字，意思相近的向量也相近。",
        plainExplanation:
          "Embedding（嵌入）就是把一段文字變成一串數字（向量），而且這串數字能代表文字的「語意」。關鍵性質是：意思相近的文字，向量也會靠得近——「貓」和「貓咪」的向量很接近，「貓」和「報稅」則離得很遠。有了這個性質，電腦就能用『向量的距離』來判斷兩段文字語意相不相關。\n\n真實的 embedding 模型（例如 sentence-transformers、或各家的 embedding API）會把文字轉成幾百維的向量，這些維度是模型從大量資料學來的語意特徵，人看不懂，但數學上很好用。\n\n實務直覺：你幾乎不需要自己訓練 embedding 模型，直接用現成的就好。但你一定要懂『相似度 = 語意接近』這個前提——因為當檢索撈錯東西時，往往就是 embedding 沒有把語意抓對，或 query 與文件用了不相容的表示方式。下面我們先用一個『固定詞表的詞頻向量』來體會概念。",
        diagramDescription:
          "2D 語意空間散點圖：『貓、貓咪、寵物、狗』聚成一簇，『報稅、發票、會計』聚成另一簇，兩簇明顯分開；標註『語意相近 → 向量相近 → 散點靠在一起』。",
        keyPoints: [
          "Embedding = 文字 → 代表語意的向量。",
          "語意相近 → 向量相近，這是語意檢索的基礎。",
          "實務直接用現成 embedding 模型；重點是理解這個前提。",
        ],
        pythonExample: {
          filename: "day3_what_embedding.py",
          language: "python",
          code: `# 用一個固定詞表，把句子轉成「詞頻向量」—— 最陽春的 embedding。
# （真實模型會輸出幾百維的語意向量，但概念一樣：文字 → 數字向量）

VOCAB = ["咖啡", "水溫", "苦", "烘焙", "報稅"]

def embed(text):
    return [text.count(word) for word in VOCAB]

print(embed("咖啡太苦，可能是水溫太高"))   # [1, 1, 1, 0, 0]
print(embed("咖啡豆的烘焙程度"))           # [1, 0, 0, 1, 0]
print(embed("我要報稅"))                   # [0, 0, 0, 0, 1]`,
        },
        exercises: [
          {
            id: "ex-3.1-a",
            title: "預測詞頻向量",
            type: "code-output",
            question:
              "用上面的 VOCAB 與 embed()，embed(\"咖啡烘焙與水溫\") 會回傳什麼？",
            expectedAnswer: "[1, 1, 0, 1, 0]",
            explanation:
              "依 VOCAB 順序 [咖啡, 水溫, 苦, 烘焙, 報稅] 數每個詞出現幾次：咖啡 1、水溫 1、苦 0、烘焙 1、報稅 0 → [1, 1, 0, 1, 0]。",
            hint: "依 VOCAB 的順序，逐一數每個詞在句子裡出現幾次。",
          },
        ],
        summary:
          "Embedding 把文字放進語意空間，讓「相似」變成可計算的距離。實務用現成模型，但要牢記『相似度 = 語意接近』這個前提。",
      },
      {
        id: "3.2",
        slug: "vector-space",
        title: "向量空間的直覺",
        concept: "把每段文字想成空間中的一個點，距離近代表語意相近。",
        plainExplanation:
          "把 embedding 想成「把文字放到一張地圖上」：每段文字是地圖上的一個點，意思相近的點靠在一起，無關的點離得遠。檢索的本質，就是在這張地圖上找『離問題最近的幾個點』。\n\n向量的每個維度可以想成一個語意特徵軸。我們的玩具範例只有 5 個維度（5 個詞），真實模型有幾百維，雖然沒辦法畫出來，但『近 = 相似、遠 = 不相似』的直覺完全一樣。\n\n實務直覺：建立這個『語意地圖』的心像很有用——它讓你理解為什麼換一個 embedding 模型，整個知識庫都要重新 embedding（因為換了地圖，舊座標就無效了），也讓你理解檢索其實只是『最近鄰搜尋』。",
        diagramDescription:
          "示意圖：一個二維平面上散布數個點，標出 query 點，並畫出它到各文件點的距離；最近的兩個點被圈起來表示『會被檢索到』。",
        keyPoints: [
          "文字 = 空間中的點；距離近 = 語意相近。",
          "維度 = 語意特徵軸；真實模型有幾百維但直覺相同。",
          "檢索 = 在語意地圖上找離 query 最近的點（最近鄰）。",
        ],
        pythonExample: {
          filename: "day3_vector_space.py",
          language: "python",
          code: `# 用歐式距離觀察：兩個咖啡句子比較近，咖啡 vs 報稅比較遠。

def distance(a, b):
    return sum((x - y) ** 2 for x, y in zip(a, b)) ** 0.5

coffee1 = [1, 1, 1, 0, 0]   # 咖啡 / 水溫 / 苦
coffee2 = [1, 0, 0, 1, 0]   # 咖啡 / 烘焙
tax     = [0, 0, 0, 0, 1]   # 報稅

print(round(distance(coffee1, coffee2), 2))  # 1.73：兩個咖啡句較近
print(round(distance(coffee1, tax), 2))      # 2.0 ：咖啡 vs 報稅較遠`,
        },
        exercises: [
          {
            id: "ex-3.2-a",
            title: "語意相近對應到什麼？",
            type: "multiple-choice",
            question: "在向量空間裡，「兩段文字語意相近」對應到下列哪一個？",
            options: [
              "兩個點之間的距離比較近",
              "兩個點之間的距離比較遠",
              "兩個向量的長度剛好相同",
              "兩個向量的維度數量相同",
            ],
            expectedAnswer: "兩個點之間的距離比較近",
            explanation:
              "embedding 的核心性質就是『語意相近 → 向量相近（距離近）』。維度數量本來就一樣（同一個模型），向量長度也不直接代表語意，所以關鍵是『距離近』。",
            hint: "把文字想成地圖上的點，『意思像』在地圖上表現成什麼？",
          },
        ],
        summary:
          "向量空間是一張語意地圖：近=相似、遠=不相似。檢索就是在這張地圖上找離 query 最近的點。換模型等於換地圖，舊座標就要重算。",
      },
      {
        id: "3.3",
        slug: "cosine-similarity",
        title: "Cosine similarity",
        concept: "用向量「夾角」衡量相似度：方向越一致越相似，不受長度影響。",
        plainExplanation:
          "衡量兩個向量相不相似，最常用的是 cosine similarity（餘弦相似度）。它看的是兩個向量「指的方向像不像」，而不是它們有多長。公式是：兩向量內積，除以各自長度的乘積。\n\n值域是 -1 到 1：1 代表方向完全一致（幾乎同義）、0 代表垂直（無關）、-1 代表完全相反。對 RAG 常見的非負向量，實際範圍多落在 0 到 1。\n\n為什麼用 cosine 而不是直接用距離？因為它「不受長度影響」。一篇長文件和一句短句，就算講同一件事，向量長度也會差很多；用 cosine 只看方向，對長短不同的文字比較公平。實務直覺：向量資料庫的相似度預設幾乎都是 cosine（或等價的內積），你會非常頻繁地看到它。",
        diagramDescription:
          "兩個向量從原點射出的夾角圖：夾角小→cosine 接近 1→相似；夾角 90 度→cosine 0→無關；並標註『cosine 只看方向、不看長度』。",
        keyPoints: [
          "cosine = 內積 / (各自長度的乘積)，看方向不看長度。",
          "值域 -1~1：1 同向、0 無關、-1 相反。",
          "對長短不同的文字較公平，是向量檢索的預設相似度。",
        ],
        pythonExample: {
          filename: "day3_cosine_similarity.py",
          language: "python",
          code: `# 純 Python 實作 cosine similarity，不需要 numpy。

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

def norm(a):
    return sum(x * x for x in a) ** 0.5

def cosine_similarity(a, b):
    denom = norm(a) * norm(b)
    return dot(a, b) / denom if denom else 0.0

q       = [1, 1, 1, 0, 0]
doc_hit = [1, 1, 0, 0, 0]   # 與 q 方向接近
doc_off = [0, 0, 0, 0, 1]   # 與 q 完全無關

print(round(cosine_similarity(q, doc_hit), 3))  # 0.816：相關
print(round(cosine_similarity(q, doc_off), 3))  # 0.0  ：無關

# （用 numpy 會更快：np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))）`,
          codeExplanation: [
            { code: "dot(a, b)", note: "內積：對應位置相乘再相加，衡量兩向量「方向是否一致」。" },
            { code: "norm(a)", note: "向量長度（各項平方和開根號），用來正規化、消除文字長短的影響。" },
            { code: "dot / (norm(a) * norm(b))", note: "cosine＝內積除以兩長度乘積，值域 -1~1，越接近 1 越相似。" },
          ],
        },
        exercises: [
          {
            id: "ex-3.3-a",
            title: "補完 cosine 公式",
            type: "code-fill",
            question:
              "cosine similarity 的分母是「兩個向量長度的乘積」。請補上空格，讓函式正確：",
            starterCode: `def cosine_similarity(a, b):
    return dot(a, b) / (norm(a) * ____)`,
            expectedAnswer: "norm(b)",
            explanation:
              "cosine = 內積 / (|a| × |b|)。分母是兩個向量各自長度的乘積，所以空格要填 norm(b)，代表向量 b 的長度。",
            hint: "分母是『a 的長度 × b 的長度』。已經有 norm(a) 了，還缺哪一個？",
          },
        ],
        summary:
          "cosine similarity 用夾角衡量語意相似度，不受文字長短影響，值域 -1~1。它是向量檢索的預設相似度，務必能手寫公式。",
      },
      {
        id: "3.4",
        slug: "semantic-search",
        title: "用 Python 做簡單語意搜尋",
        concept: "embed 全部文件 + 算 cosine + 由高到低排序取 Top-k，就是檢索。",
        plainExplanation:
          "把前面三個單元組起來，就能做出一個最小的『語意搜尋』：先把所有文件都 embed 成向量存起來；使用者輸入問題時，把問題也 embed 成向量，跟每個文件向量算 cosine，再由高分到低分排序，取前 k 個——這就是 retrieval 的本質，完全不需要資料庫。\n\n實務直覺：你之後會用的向量資料庫（Chroma、FAISS…）做的就是這件事，只是把 embed 換成真正的模型、把『逐一比對』換成有索引的高速搜尋。但邏輯一模一樣。先親手寫過這個 20 行版本，你對任何向量檢索工具都會有踏實的理解，而不是把它當黑盒子。",
        diagramDescription:
          "流程圖：query → embed → 對知識庫中每個 doc 向量算 cosine → 由高到低排序 → 取 Top-k；右側列出 (分數, 文件) 的排序結果示意。",
        keyPoints: [
          "語意搜尋 = embed 全部 + 算相似度 + 排序取 Top-k。",
          "query 也要 embed，才能和文件向量比較。",
          "向量資料庫只是把這件事做得更快、更大。",
        ],
        pythonExample: {
          filename: "day3_semantic_search.py",
          language: "python",
          code: `# 串起 embed + cosine + 排序，做一個最小語意搜尋（純 Python）。

VOCAB = ["咖啡", "水溫", "苦", "烘焙", "豆"]

def embed(t):
    return [t.count(w) for w in VOCAB]

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    denom = (sum(x * x for x in a) ** 0.5) * (sum(y * y for y in b) ** 0.5)
    return dot / denom if denom else 0.0

docs = [
    "手沖咖啡的水溫很重要",
    "咖啡豆的烘焙程度",
    "咖啡太苦怎麼辦",
]
doc_vecs = [embed(d) for d in docs]

def search(query, top_k=2):
    qv = embed(query)
    scored = [(cosine(qv, dv), d) for dv, d in zip(doc_vecs, docs)]
    scored.sort(key=lambda x: x[0], reverse=True)   # 分數高的排前面
    return scored[:top_k]

for score, d in search("水溫"):
    print(round(score, 2), d)`,
        },
        exercises: [
          {
            id: "ex-3.4-a",
            title: "讓最相關的排前面",
            type: "short-answer",
            question:
              "語意搜尋要取「最相關」的結果，排序時要由高分到低分。上面 scored.sort(...) 裡要加上哪個參數？（寫出 參數=值）",
            expectedAnswer: "reverse=True",
            explanation:
              "sort 預設由小到大，最相關（分數最高）會排在最後。加上 reverse=True 改成由大到小，取前 top_k 才是最相關的結果。",
            hint: "預設是由小到大。要讓『分數高的』排最前面，要設哪個參數？",
          },
        ],
        summary:
          "語意搜尋的本質就是 embed + 算相似度 + 排序取 Top-k。手寫過這 20 行，之後用任何向量資料庫都不會是黑盒子。",
      },
      {
        id: "3.5",
        slug: "query-document-embedding",
        title: "Query 與 document embedding 的關係",
        concept: "query 與文件必須用同一個 embedding 模型放進同一個向量空間，才能比較。",
        plainExplanation:
          "語意搜尋有一個很容易被忽略、卻很關鍵的前提：問題（query）和文件（document）必須用『同一個 embedding 模型』轉到『同一個向量空間』，算出來的相似度才有意義。如果 query 用 A 模型、文件用 B 模型，兩邊的座標系不同，距離完全沒有意義——就像拿台北的地址去對照東京的地圖。\n\n進階一點：有些 embedding 模型是『非對稱』的，會建議你給 query 和 document 加上不同的提示詞（例如在問題前面加 \"query: \"、文件前面加 \"passage: \"），因為『一個短問題』和『一段長文件』的最佳表示方式略有不同。但不論對稱或非對稱，核心規則不變：兩邊要用相容的同一套表示方式。\n\n實務直覺：這條規則有兩個常見後果——(1) 一旦你決定換 embedding 模型，整個知識庫都要用新模型重新 embedding（不能新舊混用）；(2) 線上服務的 query 端，一定要呼叫和建庫時相同的模型。很多『檢索莫名其妙不準』的 bug，根源就是兩邊用了不一致的 embedding。",
        diagramDescription:
          "上半：query 與 documents 都經過『同一個 embed 模型』進入同一個向量空間，可以正確比較（打勾）。下半：query 用了不同模型/詞表，落在不相容的空間，距離無意義（打叉）。",
        keyPoints: [
          "query 與 document 要用同一個模型、同一個向量空間。",
          "換 embedding 模型 → 整個知識庫都要重新 embedding。",
          "檢索莫名不準，常是 query 端與建庫端 embedding 不一致。",
        ],
        pythonExample: {
          filename: "day3_query_doc_embedding.py",
          language: "python",
          code: `# query 與 document 必須用「同一個 embed 函式（同一個向量空間）」才能比較。

VOCAB = ["咖啡", "水溫", "苦"]
def embed(t):
    return [t.count(w) for w in VOCAB]

# 正確：query 與 document 用同一個 embed，落在同一空間
q_vec   = embed("咖啡 水溫")
doc_vec = embed("手沖咖啡要注意水溫")
print("同一空間，可比較：", q_vec, doc_vec)   # [1, 1, 0] 與 [1, 1, 0]

# 錯誤示範：query 用了不同的詞表 → 維度/意義對不上，距離無意義
WRONG_VOCAB = ["報稅", "發票"]
def embed_wrong(t):
    return [t.count(w) for w in WRONG_VOCAB]
print("不同空間，無法比較：", embed_wrong("咖啡 水溫"))   # [0, 0]`,
        },
        exercises: [
          {
            id: "ex-3.5-a",
            title: "query 與 document 的關係",
            type: "multiple-choice",
            question: "關於 query 與 document 的 embedding，下列何者正確？",
            options: [
              "兩者必須用同一個 embedding 模型轉到同一個向量空間，才能比較相似度",
              "query 用 A 模型、document 用 B 模型也沒關係",
              "只有 document 要 embedding，query 不用",
              "只要向量維度數一樣就能比較，用不同模型沒差",
            ],
            expectedAnswer:
              "兩者必須用同一個 embedding 模型轉到同一個向量空間，才能比較相似度",
            explanation:
              "相似度只有在『同一個向量空間』裡才有意義。維度數一樣但模型不同，座標系也不同，距離不可比。所以 query 與 document 一定要用同一個（相容的）embedding 模型。",
            hint: "拿台北的地址去對照東京的地圖，距離有意義嗎？兩邊要用同一張地圖。",
          },
        ],
        summary:
          "檢索能成立的前提是 query 與 document 在同一個向量空間。換模型要整庫重建、線上 query 要用同一模型——這是很多檢索 bug 的根源。",
      },
    ],
  },

  // ──────────────────────────────── DAY 4 ────────────────────────────────
  {
    id: "day4",
    num: 4,
    title: "Vector Database",
    subtitle: "高效儲存與查詢向量",
    estimatedTime: "約 100 分鐘",
    summary: "認識向量資料庫，比較常見方案，並學會存向量、查 Top-k、用 metadata。",
    ragStages: ["vectordb"],
    learningGoals: [
      "說出 vector DB 的職責：高效存向量、快速找 Top-k",
      "比較 FAISS / Chroma / Supabase pgvector 的定位",
      "用 list + cosine 模擬向量資料庫的存與查",
      "理解 metadata 在過濾、溯源與權限上的用途",
    ],
    units: [
      {
        id: "4.1",
        slug: "what-vectordb",
        title: "Vector Database 是什麼",
        concept: "專門存向量、並能快速找出最相似 Top-k 的資料庫。",
        plainExplanation:
          "向量資料庫（Vector DB）是一種專門為『向量』設計的儲存系統。它做兩件核心的事：(1) 存進大量的向量（通常還附帶原文與 metadata）；(2) 給一個查詢向量，快速找出最相似的 Top-k。\n\n你可能會問：Day 3 不是已經用 list + cosine 做到了嗎？是的，但當資料從幾十筆變成幾十萬、幾百萬筆時，每次查詢都『逐一比對所有向量』會慢到不能用。Vector DB 用近似最近鄰索引（例如 HNSW、IVF）讓搜尋快好幾個數量級，代價是極小的精度損失。此外它還幫你處理持久化（存到磁碟）、metadata 過濾、增刪改等雜事。\n\n實務直覺：別過早上重工具。資料量小的時候，list + cosine（或 numpy）就很夠用，好懂又好 debug；等到資料量大、查詢變慢，再換上真正的 Vector DB。理解『它本質上就是把 Day 3 的語意搜尋做快做大』，你就不會把它當神秘黑盒子。",
        diagramDescription:
          "對比圖：左『線性搜尋』逐一比對全部向量（資料一多就慢）；右『索引搜尋（HNSW）』沿著圖結構快速跳到相似區域。下方標出 Vector DB 額外負責：持久化、metadata 過濾、增刪改。",
        keyPoints: [
          "Vector DB 的兩個核心：存向量 + 快速找 Top-k。",
          "用近似最近鄰索引換取大規模下的速度。",
          "解決的是『規模與速度』，本質仍是 Day 3 的語意搜尋。",
        ],
        pythonExample: {
          filename: "day4_simple_store.py",
          language: "python",
          code: `# 用 list + cosine 模擬一個最小的向量資料庫（後面幾個單元會沿用這個想法）。

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

# 一個「向量資料庫」其實可以只是一個 list，每筆存 (id, 向量, metadata)
store = []
store.append(("c1", [1, 0, 1], {"source": "coffee.md"}))
store.append(("c2", [0, 1, 0], {"source": "tea.md"}))

print("目前向量數：", len(store))
print("第一筆：", store[0])`,
        },
        exercises: [
          {
            id: "ex-4.1-a",
            title: "Vector DB 解決什麼？",
            type: "multiple-choice",
            question: "向量資料庫主要解決的核心問題是？",
            options: [
              "在大量向量中『快速』找出最相似的 Top-k（規模與速度）",
              "讓語言模型的推理能力變強",
              "自動幫你清理與切割文件",
              "取代 LLM，直接生成答案",
            ],
            expectedAnswer:
              "在大量向量中『快速』找出最相似的 Top-k（規模與速度）",
            explanation:
              "Vector DB 的價值在於規模與速度：用索引在海量向量中快速找最相似的幾個。它不改變檢索的本質（仍是相似度搜尋），也不負責清理/切割文件或生成答案。",
            hint: "Day 3 的 list+cosine 已經能檢索，Vector DB 多給了什麼？想想資料變很大時的瓶頸。",
          },
        ],
        summary:
          "Vector DB 是專為向量設計的儲存與檢索系統，用索引把語意搜尋做快做大。小資料先用 list+cosine，量大再升級。",
      },
      {
        id: "4.2",
        slug: "compare-vectordb",
        title: "FAISS、Chroma、Supabase pgvector 的概念比較",
        concept: "函式庫 vs 開箱即用 vs 長在 SQL 裡——三種定位，依場景選擇。",
        plainExplanation:
          "常見的向量檢索方案可以用『定位』來區分：\n\n- FAISS：Facebook 出的向量搜尋『函式庫』，非常快、索引選擇多，但它只負責搜尋，原文、id、持久化都要你自己管。適合需要極致效能、願意自己組裝周邊的情境。\n- Chroma：開箱即用的向量資料庫，API 簡單、可本地持久化、自帶 embedding 流程，幾行就能 add 與 query。最適合學習與中小型專案，本課程也用它。\n- Supabase pgvector：在 PostgreSQL 上的向量擴充。如果你的團隊本來就用 Postgres，pgvector 讓你把向量和既有的關聯式資料放在一起，用熟悉的 SQL 查詢，省下維運一個新系統的成本。\n\n實務直覺：沒有『最好』，只有『最適合場景』。學習與雛形用 Chroma；已有 Postgres 用 pgvector 最省事；要極致效能或超大規模，考慮 FAISS 或雲端服務（Pinecone、Weaviate、Milvus 等）。面試常考這題，重點是說得出每個方案的取捨，而不是背名字。",
        diagramDescription:
          "三欄比較表：欄位為『型態、是否開箱即用、持久化、適用場景』，分別填入 FAISS（函式庫／需自管／自理／極致效能）、Chroma（資料庫／是／內建／學習與小專案）、pgvector（Postgres 擴充／用 SQL／隨 DB／已有 Postgres 的團隊）。",
        keyPoints: [
          "FAISS：超快的函式庫，但原文/持久化要自己管。",
          "Chroma：開箱即用，最適合學習與中小專案。",
          "pgvector：向量住在 Postgres，適合已有 SQL 的團隊。",
        ],
        pythonExample: {
          filename: "day4_compare_api.py",
          language: "python",
          code: `# 三種方案的「概念 API」其實很像：都在做 add（存）與 query（查 Top-k）。
# 下面用註解對照（實際語法略有不同），重點是看出它們的共同形狀。

# FAISS（函式庫；原文與 id 要自己另外存）：
#   index.add(vectors)
#   distances, ids = index.search(query_vector, k)

# Chroma（開箱即用）：
#   collection.add(ids=..., embeddings=..., documents=..., metadatas=...)
#   collection.query(query_embeddings=..., n_results=k)

# Supabase pgvector（用 SQL）：
#   INSERT INTO docs (embedding, content) VALUES (...);
#   SELECT content FROM docs ORDER BY embedding <=> :query LIMIT k;

print("共同點：都支援 add（存向量）與 query（找 Top-k 相似）")`,
        },
        exercises: [
          {
            id: "ex-4.2-a",
            title: "哪個情境最適合 pgvector？",
            type: "multiple-choice",
            question: "下列哪一個情境，最適合選用 Supabase pgvector？",
            options: [
              "團隊已經在用 PostgreSQL，想把向量和既有資料一起管理、用 SQL 查詢",
              "只是想零安裝、在本機快速做一個學習用的小雛形",
              "想要一個極輕量的函式庫，且願意自己管理原文與儲存",
              "完全不想寫任何程式",
            ],
            expectedAnswer:
              "團隊已經在用 PostgreSQL，想把向量和既有資料一起管理、用 SQL 查詢",
            explanation:
              "pgvector 的最大優勢是『長在 Postgres 裡』：已有 Postgres 的團隊能用熟悉的 SQL、把向量和關聯式資料一起管理，省下維運新系統。零安裝小雛形比較適合 Chroma；極輕量自管則是 FAISS 的定位。",
            hint: "pgvector 的關鍵字是『PostgreSQL』。哪個情境本來就在用 SQL 資料庫？",
          },
        ],
        summary:
          "FAISS（函式庫）、Chroma（開箱即用）、pgvector（長在 Postgres）各有定位。選型看場景：學習用 Chroma、已有 SQL 用 pgvector、要效能用 FAISS。",
      },
      {
        id: "4.3",
        slug: "store-vectors",
        title: "如何儲存向量",
        concept: "把每個 chunk embed 成向量，連同 id 與 metadata 一起存進向量庫。",
        plainExplanation:
          "『儲存向量』就是把知識庫建起來的動作：對每一個 chunk，先用 embedding 模型轉成向量，再把『id、向量、metadata』一起存進向量資料庫。其中 metadata 很關鍵——它記錄這個 chunk 來自哪份文件、第幾段、甚至建立時間或權限標籤，是之後『顯示來源』與『過濾檢索』的基礎。\n\n這一步屬於 RAG 的『事前準備』，通常只做一次（或文件更新時才重做）。建好之後，每次查詢都直接用，不必重新 embedding 整個知識庫。\n\n實務直覺：兩個設計重點。(1) id 要穩定且唯一，這樣日後要更新或刪除某個 chunk 才找得到。(2) metadata 要在建庫前就規劃好欄位（來源、章節、日期、權限…），因為很多功能（引用、過濾、權限控管）都靠它，事後補很麻煩。下面用 list 模擬 add 的過程。",
        diagramDescription:
          "流程圖：每個 chunk → embed() → 得到向量 → 連同 id 與 metadata 打包 → append 進向量庫（store）；右側展開一筆紀錄的結構 (id, vector, metadata{source, para, text})。",
        keyPoints: [
          "儲存 = 對每個 chunk：embed 成向量，連同 id、metadata 一起存。",
          "metadata 記錄來源/段落，是日後溯源與過濾的基礎。",
          "id 要穩定唯一；metadata 欄位要在建庫前規劃好。",
        ],
        pythonExample: {
          filename: "day4_store_vectors.py",
          language: "python",
          code: `# 把多個 chunk 連同 metadata 存進「向量庫」（用 list 模擬，可單獨執行）。

VOCAB = ["咖啡", "水溫", "苦", "烘焙"]
def embed(t):
    return [t.count(w) for w in VOCAB]

# 每個 chunk 帶上來源檔名與段落號（日後溯源用）
chunks = [
    ("手沖咖啡的水溫建議 88 到 96 度", "coffee.md", 1),
    ("咖啡太苦可能是萃取過度",         "coffee.md", 2),
    ("咖啡豆的烘焙程度分三種",         "coffee.md", 3),
]

store = []   # 每筆：(id, vector, metadata)
for i, (text, source, para) in enumerate(chunks):
    store.append((
        f"chunk-{i}",
        embed(text),
        {"source": source, "para": para, "text": text},
    ))

print("已存入向量數：", len(store))     # 3
print("第一筆 metadata：", store[0][2])`,
        },
        exercises: [
          {
            id: "ex-4.3-a",
            title: "為了溯源要一起存什麼？",
            type: "short-answer",
            question:
              "儲存向量時，為了日後能標出「答案出自哪份文件、第幾段」，我們會連同向量一起存什麼資料？（中文或英文皆可）",
            expectedAnswer: "metadata|中繼資料|中介資料|來源資訊",
            explanation:
              "我們會一起存 metadata（中繼資料），例如來源檔名、段落號、日期、權限等。它是之後『顯示引用來源』與『過濾檢索』的依據。",
            hint: "它記錄來源檔名、段落號等附帶資訊，英文是一個常見的字。",
          },
        ],
        summary:
          "儲存向量 = 把每個 chunk embed 後，連同穩定的 id 與規劃好的 metadata 一起存。這一步建一次就能重複查詢，metadata 是日後溯源與過濾的關鍵。",
      },
      {
        id: "4.4",
        slug: "query-topk",
        title: "如何查詢 Top-k 相似內容",
        concept: "把問題 embed 成查詢向量，對庫內向量算相似度，取最相似的前 k 筆。",
        plainExplanation:
          "查詢的流程和 Day 3 的語意搜尋完全一致：把使用者問題用『同一個 embedding 模型』轉成查詢向量，對庫裡每個向量算 cosine（真實 Vector DB 用索引免逐一比），由高到低排序，取前 k 筆。回傳時通常會連 metadata 一起帶出來，方便顯示來源。\n\nTop-k 的 k 是一個重要取捨：k 太小，可能漏掉關鍵段落；k 太大，會把不相關的內容也塞進後面的 prompt，增加雜訊與成本。常見起點是 k=3~5，再依效果調整。\n\n實務直覺：永遠記得『檢索是 RAG 的天花板』——如果 Top-k 裡根本沒有正確段落，後面再強的模型也回答不出來。所以 debug RAG 時，第一件事就是把 query 的 Top-k 結果印出來看，確認對的段落有沒有被撈回。",
        diagramDescription:
          "流程圖：問題 → embed → 查詢向量 → 對 store 內每個向量算 cosine → 由高到低排序 → 取前 k → 回傳 (分數, 文字, metadata)。標註『k 太小漏、太大吵』。",
        keyPoints: [
          "查詢 = 問題 embed → 算相似度 → 排序取 Top-k。",
          "k 是取捨：太小漏關鍵、太大加雜訊與成本（常從 3~5 起）。",
          "檢索是天花板：Top-k 沒有正確段落，模型就答不對。",
        ],
        pythonExample: {
          filename: "day4_query_topk.py",
          language: "python",
          code: `# 對「向量庫」查詢 Top-k 相似內容（可單獨執行）。

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

VOCAB = ["咖啡", "水溫", "苦", "烘焙"]
def embed(t):
    return [t.count(w) for w in VOCAB]

store = [
    ("chunk-0", embed("手沖咖啡的水溫建議 88 到 96 度"), {"text": "水溫 88-96 度"}),
    ("chunk-1", embed("咖啡太苦可能是萃取過度"),         {"text": "太苦：萃取過度"}),
    ("chunk-2", embed("咖啡豆的烘焙程度分三種"),         {"text": "烘焙程度"}),
]

def query(question, k=2):
    qv = embed(question)
    scored = [(cosine(qv, vec), meta["text"]) for _id, vec, meta in store]
    scored.sort(key=lambda x: x[0], reverse=True)
    return scored[:k]

for score, text in query("咖啡為什麼太苦"):
    print(round(score, 3), text)`,
        },
        exercises: [
          {
            id: "ex-4.4-a",
            title: "預測 Top-1 結果",
            type: "code-output",
            question:
              "執行上面的程式，query(\"咖啡為什麼太苦\") 印出的「第一行」會是什麼？（分數四捨五入到小數第 3 位 + 文字）",
            expectedAnswer: "1.0 太苦：萃取過度",
            explanation:
              "query「咖啡為什麼太苦」的向量是 [1,0,1,0]（咖啡、苦各 1）。chunk-1「咖啡太苦可能是萃取過度」的向量也是 [1,0,1,0]，方向完全相同，cosine = 1.0，排在第一。所以第一行是『1.0 太苦：萃取過度』。",
            hint: "哪個 chunk 的向量和 query 的向量方向完全一樣？那一個 cosine 會是 1.0。",
          },
        ],
        summary:
          "查 Top-k = 問題 embed 後算相似度、排序取前 k。k 要平衡漏與吵，而且務必確認正確段落有被撈回——檢索是 RAG 的天花板。",
      },
      {
        id: "4.5",
        slug: "metadata",
        title: "Metadata 在 RAG 裡的用途",
        concept: "metadata 讓你能過濾檢索範圍、標出答案來源、做權限控管。",
        plainExplanation:
          "metadata 是跟著每個 chunk 一起存的『附帶資訊』，例如來源檔名、段落號、日期、語言、作者、權限標籤等。它在 RAG 裡有三個很實用的用途：\n\n1. 過濾（filter）：先用 metadata 縮小範圍，再做相似度檢索。例如只查某個產品的文件、只用最新版本、只查某種語言。這能大幅提升相關性、減少雜訊。\n2. 溯源（citation）：回答時把用到的 chunk 來源一起列出來（『本回答參考 coffee.md 第 2 段』），讓答案可被查證——這是專業 RAG 的標配。\n3. 權限控管（access control）：只檢索『這個使用者有權看』的文件，避免把機密內容洩漏給沒權限的人。\n\n實務直覺：metadata 看起來不起眼，卻是把『玩具 RAG』變成『可上線系統』的關鍵。權限、時效、來源顯示這些真實需求，全都靠它。所以在建知識庫之前，就要先想清楚要存哪些 metadata 欄位。",
        diagramDescription:
          "示意圖：query 進來後先經過『metadata 過濾』（例如 lang=zh、permission=user 可見）縮小候選，再對縮小後的集合做相似度檢索；輸出的答案附上來源 metadata 作為引用。",
        keyPoints: [
          "metadata 三大用途：過濾、溯源（引用）、權限控管。",
          "先用 metadata 過濾再檢索，能提升相關性、減少雜訊。",
          "它是把玩具 RAG 變成可上線系統的關鍵，建庫前先規劃欄位。",
        ],
        pythonExample: {
          filename: "day4_metadata_filter.py",
          language: "python",
          code: `# 示範用 metadata 先過濾，再進行檢索（這裡簡化為只看過濾）。

store = [
    ("c0", "手沖咖啡水溫",      {"source": "coffee.md",    "lang": "zh"}),
    ("c1", "espresso pressure", {"source": "coffee_en.md", "lang": "en"}),
    ("c2", "咖啡烘焙程度",      {"source": "coffee.md",    "lang": "zh"}),
]

def retrieve(only_lang=None):
    pool = store
    if only_lang:                                  # 先用 metadata 過濾
        pool = [r for r in store if r[2]["lang"] == only_lang]
    return [doc_id for doc_id, _text, _meta in pool]  # 接著才會做相似度檢索

print("全部：", retrieve())                 # ['c0', 'c1', 'c2']
print("只查中文：", retrieve(only_lang="zh"))  # ['c0', 'c2']`,
        },
        exercises: [
          {
            id: "ex-4.5-a",
            title: "metadata 的用途",
            type: "multiple-choice",
            question: "下列哪一項「不是」 metadata 在 RAG 裡的用途？",
            options: [
              "提升語言模型本身的推理能力",
              "過濾：只檢索特定來源或語言的內容",
              "溯源：在回答中標出資料來源",
              "權限控管：只檢索使用者有權看的文件",
            ],
            expectedAnswer: "提升語言模型本身的推理能力",
            explanation:
              "metadata 負責的是過濾、溯源、權限控管這類『檢索與治理』的工作，並不會改變模型本身的推理能力。模型的能力來自模型本身，與 metadata 無關。",
            hint: "metadata 是『資料的附帶資訊』，它能改變的是檢索與治理，還是模型的腦袋？",
          },
        ],
        summary:
          "metadata 讓 RAG 能過濾範圍、標示來源、控管權限，是把玩具變成可上線系統的關鍵。建庫前先規劃好要存哪些欄位。",
      },
    ],
  },

  // ──────────────────────────────── DAY 5 ────────────────────────────────
  {
    id: "day5",
    num: 5,
    title: "Retrieval 與 Prompt 組裝",
    subtitle: "檢索相關內容並組裝成提問",
    estimatedTime: "約 110 分鐘",
    summary: "把問題轉成查詢、取回 Top-k，組裝結構化 prompt，並用技巧降低幻覺。",
    ragStages: ["retrieval", "prompt", "answer"],
    learningGoals: [
      "把問題轉成 query embedding，並用與建庫相同的模型",
      "取回 Top-k 並理解 k 的取捨",
      "把檢索內容注入結構化 prompt template",
      "用 prompt 技巧降低幻覺、要求模型只根據資料回答",
    ],
    units: [
      {
        id: "5.1",
        slug: "query-embedding",
        title: "Query embedding",
        concept: "把使用者問題用「和建庫時相同的模型」轉成查詢向量。",
        plainExplanation:
          "檢索的第一步，是把使用者的問題（query）也轉成向量。這裡有個鐵則：query 必須用『和建立知識庫時相同的 embedding 模型』，否則兩邊不在同一個向量空間，算出來的相似度沒有意義（這是 Day 3 最後一個單元強調過的）。\n\n問題通常很短、文件通常較長，兩者的表達方式略有不同。有些模型會建議在 query 前面加提示詞（例如 query:），有時我們還會做 query rewriting（把口語問題改寫成更好檢索的形式），來提升召回率。\n\n實務直覺：線上服務的 query 端，一定要呼叫和 ingest 階段相同的 embedding。很多『檢索莫名其妙不準』的 bug，根源就是兩邊用了不一致的模型或前處理。",
        diagramDescription:
          "流程小圖：使用者問題 →（可選的 query rewriting）→ 用『與建庫相同的 embedding 模型』→ 查詢向量，準備拿去比相似度。",
        keyPoints: [
          "query 要用和建庫相同的 embedding 模型，才能比較。",
          "問題短、文件長，有些模型建議給 query 加提示詞。",
          "query rewriting 可提升召回；前處理兩邊要一致。",
        ],
        pythonExample: {
          filename: "day5_query_embedding.py",
          language: "python",
          code: `# 把問題轉成查詢向量（用和建庫時相同的 embed 函式）。

VOCAB = ["水溫", "咖啡", "苦", "烘焙"]
def embed(text):
    return [text.count(w) for w in VOCAB]

query = "咖啡為什麼很苦"
print("查詢向量：", embed(query))   # 依 VOCAB 順序數每個詞`,
        },
        exercises: [
          {
            id: "ex-5.1-a",
            title: "預測查詢向量",
            type: "code-output",
            question:
              "用 VOCAB = [\"水溫\", \"咖啡\", \"苦\", \"烘焙\"] 與 embed()，embed(\"咖啡為什麼很苦\") 會回傳什麼？",
            expectedAnswer: "[0, 1, 1, 0]",
            explanation:
              "依 VOCAB 順序數：水溫 0、咖啡 1、苦 1、烘焙 0 → [0, 1, 1, 0]。query 必須用和建庫相同的 embed，才能和文件向量比較。",
            hint: "依 VOCAB 的順序，逐一數每個詞在『咖啡為什麼很苦』裡出現幾次。",
          },
        ],
        summary:
          "query embedding 要用和建庫相同的模型轉到同一向量空間。兩邊不一致是檢索 bug 的常見根源。",
      },
      {
        id: "5.2",
        slug: "topk-retrieval",
        title: "Top-k retrieval",
        concept: "取相似度最高的前 k 段；k 太小漏關鍵、太大加雜訊與成本。",
        plainExplanation:
          "有了查詢向量，就對知識庫中每個 chunk 算相似度、由高到低排序，取前 k 個——這就是 Top-k retrieval。\n\nk 是一個重要的取捨：k 太小，可能漏掉關鍵段落，導致答案不完整；k 太大，會把不相關的內容也塞進後面的 prompt，增加雜訊、稀釋重點，也更花 token 和錢。常見起點是 k=3~5，再依實際效果調整。\n\n實務直覺：進階做法是『先撈多一點（例如 k=20），再用 reranker 重新排序取前 3~5』，兼顧召回與精度。但不論怎麼做，都要記住：檢索是 RAG 的天花板——如果 Top-k 裡根本沒有正確段落，後面再強的模型也救不回來。",
        diagramDescription:
          "流程：查詢向量 → 對每個 chunk 算相似度 → 由高到低排序 → 取前 k；旁邊用刻度標示『k 太小→漏、k 太大→吵』的取捨。",
        keyPoints: [
          "Top-k = 算相似度、排序、取前 k 段。",
          "k 太小漏關鍵、太大加雜訊與成本，常從 3~5 起。",
          "進階：先多撈再 rerank；檢索是 RAG 的天花板。",
        ],
        pythonExample: {
          filename: "day5_topk_retrieval.py",
          language: "python",
          code: `# 取回 Top-k 最相關的段落。

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

VOCAB = ["水溫", "咖啡", "苦", "烘焙"]
def embed(t):
    return [t.count(w) for w in VOCAB]

store = [
    {"text": "水溫太高會讓咖啡變苦", "v": embed("水溫太高會讓咖啡變苦")},
    {"text": "咖啡豆的烘焙程度",     "v": embed("咖啡豆的烘焙程度")},
    {"text": "手沖的水溫建議",       "v": embed("手沖的水溫建議")},
]

def retrieve(query, k=2):
    qv = embed(query)
    return sorted(store, key=lambda c: cosine(qv, c["v"]), reverse=True)[:k]

for c in retrieve("咖啡為什麼苦", k=2):
    print(c["text"])`,
        },
        exercises: [
          {
            id: "ex-5.2-a",
            title: "k 設太大的壞處",
            type: "multiple-choice",
            question: "把 Top-k 的 k 設得「太大」，最主要的壞處是？",
            options: [
              "把不相關的內容也塞進 prompt，增加雜訊、稀釋重點，也更花 token",
              "會讓 embedding 模型壞掉",
              "一定會讓檢索變得更準",
              "完全沒有任何缺點",
            ],
            expectedAnswer:
              "把不相關的內容也塞進 prompt，增加雜訊、稀釋重點，也更花 token",
            explanation:
              "k 太大會把相關性較低的段落也一起塞進 context，模型要在更多雜訊裡找重點，回答品質可能下降，且 token 用量與成本上升。k 太小則可能漏掉關鍵段落。",
            hint: "k 越大，撈回來的東西越多。多出來的那些通常是更相關還是更不相關？",
          },
        ],
        summary:
          "Top-k 取最相關的前 k 段，k 是漏與吵的取捨。先確認正確段落有被撈回，再談生成——檢索是天花板。",
      },
      {
        id: "5.3",
        slug: "context-injection",
        title: "Context injection",
        concept: "把檢索到的段落「注入」prompt 的 context 區塊，最相關的放前面。",
        plainExplanation:
          "Context injection 就是把 Top-k 檢索到的段落，插入到要送給模型的 prompt 裡。怎麼插很有講究：\n\n- 用清楚的分隔與編號，讓模型知道哪些是參考資料、各段是什麼。\n- 把最相關的放前面（模型對開頭的內容通常更敏感）。\n- 帶上來源資訊（檔名/編號），這樣模型回答時才能標引用，我們也能溯源。\n- 控制總長度，不要超過模型的 context window，也不要塞太多稀釋重點。\n\n實務直覺：context 的組織方式會直接影響回答品質與可溯源性。一個常見錯誤是把所有段落黏成一坨、沒有分隔也沒有來源，模型就很難引用、我們也無法追查答案根據。",
        diagramDescription:
          "圖示：Top-k 段落（各帶來源）被格式化成『[1] …（來源 A）/ [2] …（來源 B）』的 context 區塊，最相關的排在最上面，再插入 prompt。",
        keyPoints: [
          "context injection = 把檢索段落插入 prompt。",
          "用編號與分隔、最相關放前面、帶上來源。",
          "控制長度：別超過 context window、別塞太多雜訊。",
        ],
        pythonExample: {
          filename: "day5_context_injection.py",
          language: "python",
          code: `# 把檢索到的段落，格式化成帶編號與來源的 context 區塊。

chunks = [
    {"text": "水溫太高會讓咖啡變苦", "source": "coffee.md"},
    {"text": "深烘焙較苦",           "source": "roast.md"},
]

def build_context(chunks):
    return "\\n".join(
        f"[{i + 1}] {c['text']}（來源：{c['source']}）"
        for i, c in enumerate(chunks)
    )

print(build_context(chunks))
# [1] 水溫太高會讓咖啡變苦（來源：coffee.md）
# [2] 深烘焙較苦（來源：roast.md）`,
        },
        exercises: [
          {
            id: "ex-5.3-a",
            title: "為什麼要標來源編號？",
            type: "multiple-choice",
            question: "在 context 區塊裡為每段標上來源編號（[1]、[2]…），主要好處是？",
            options: [
              "方便模型在回答時引用，也讓我們能追查答案的依據（可溯源）",
              "讓 prompt 看起來比較長",
              "可以讓 embedding 變快",
              "沒有任何作用，只是習慣",
            ],
            expectedAnswer:
              "方便模型在回答時引用，也讓我們能追查答案的依據（可溯源）",
            explanation:
              "標來源編號讓模型可以在答案裡寫『（依據 [1]）』，使用者與我們都能回頭核對答案出自哪一段。可溯源是專業 RAG 的重要特徵。",
            hint: "想想答案後面那句『（依據 [1]）』是怎麼來的、有什麼用。",
          },
        ],
        summary:
          "context injection 是把檢索段落有結構地插入 prompt：編號、分隔、來源、控制長度。它直接影響回答品質與溯源能力。",
      },
      {
        id: "5.4",
        slug: "prompt-template",
        title: "Prompt template",
        concept: "固定的 prompt 結構：system 指令 + context + question，可重複套用。",
        plainExplanation:
          "Prompt template 是一個帶有空格（placeholder）的固定模板，把『指令、檢索到的 context、使用者問題』組織成一致的結構，每次提問只要填空即可。\n\n一個典型的 RAG prompt template 包含三個部分：(1) system / 指令——告訴模型角色與規則（例如「只根據資料回答」）；(2) context——注入檢索到的段落；(3) question——使用者的問題。\n\n實務直覺：用固定模板有兩個好處——回答品質更穩定（不會因為每次手寫而忽好忽壞），也方便你做 A/B 測試與迭代（只改模板就能比較效果）。模板裡的『指令』寫得好不好，往往是 RAG 品質的分水嶺，下一個單元會專門講。",
        diagramDescription:
          "拼裝圖：一個模板有三個欄位框——[system 指令]、[context 區塊]、[question]；箭頭顯示每次提問把 context 與 question 填進去，產生完整 prompt。",
        keyPoints: [
          "template = 帶 placeholder 的固定 prompt 結構。",
          "三部分：system 指令 + context + question。",
          "好處：回答穩定、方便迭代與 A/B 測試。",
        ],
        pythonExample: {
          filename: "day5_prompt_template.py",
          language: "python",
          code: `# 用一個固定模板組裝 prompt：system 指令 + context + question。

TEMPLATE = """你是嚴謹的助理。請只根據「資料」回答「問題」。
若資料中沒有答案，請回答「資料中沒有提到」，不要自行編造。

資料：
{context}

問題：{question}
答案："""

def build_prompt(context, question):
    return TEMPLATE.format(context=context, question=question)

prompt = build_prompt("[1] 水溫太高會讓咖啡變苦（來源：coffee.md）", "咖啡為什麼苦？")
print(prompt)`,
        },
        exercises: [
          {
            id: "ex-5.4-a",
            title: "模板不該包含什麼？",
            type: "multiple-choice",
            question: "一個 RAG 的 prompt template，通常「不會」包含下列哪一項？",
            options: [
              "模型的訓練資料原文",
              "告訴模型規則的 system 指令",
              "檢索到的 context 段落",
              "使用者的問題",
            ],
            expectedAnswer: "模型的訓練資料原文",
            explanation:
              "prompt template 由『指令 + context + 問題』組成。模型的訓練資料是模型內部的東西，不會（也無法）放進 prompt。RAG 的重點正是用外部檢索到的 context 取代『靠訓練記憶硬答』。",
            hint: "template 是我們每次提問現組的。模型的訓練資料是我們能放進去的東西嗎？",
          },
        ],
        summary:
          "prompt template 把指令、context、問題組成一致結構，讓回答穩定、方便迭代。指令的好壞是 RAG 品質的分水嶺。",
      },
      {
        id: "5.5",
        slug: "reduce-hallucination",
        title: "如何降低幻覺",
        concept: "降幻覺的根本是提升檢索品質，prompt 指令是第二道防線。",
        plainExplanation:
          "幻覺（hallucination）是模型『一本正經地編造』。在 RAG 裡，幻覺常見的成因有三個：檢索沒撈到正確資料（模型沒料只好瞎掰）、prompt 沒有限制模型只用資料、以及模型傾向『填補空白』把話講完。\n\n降低幻覺的手段，依重要性排序：\n1. 提升檢索品質——這是最根本的。如果 context 裡就有正確答案，模型編造的動機就小很多。\n2. 在 prompt 明確限制——『只根據資料回答、找不到就說不知道』。\n3. 要求標註來源——讓答案可被核對，也讓模型更謹慎。\n4. 視情況調低 temperature，減少發散。\n\n實務直覺：很多人一遇到幻覺就猛改 prompt，但如果根因是『檢索根本沒撈到』，改 prompt 幫助有限。正確順序是：先確認檢索撈對了，再用 prompt 指令當第二道防線。",
        diagramDescription:
          "對比圖：左『無防護』——檢索沒撈到 + 無限制指令 → 模型編造；右『有防護』——檢索撈到正確段落 + 限制只用資料 + 允許說不知道 → 不亂掰。",
        keyPoints: [
          "幻覺成因：檢索沒撈到、prompt 沒限制、模型愛填空白。",
          "降幻覺第一步是提升檢索品質，prompt 是第二道防線。",
          "輔助：要求標來源、視情況調低 temperature。",
        ],
        pythonExample: {
          filename: "day5_reduce_hallucination.py",
          language: "python",
          code: `# 用一個 mock LLM 示範：沒撈到資料時，無防護會編造、有防護會誠實。

def fake_llm(question, context, strict):
    if not context:                       # 檢索沒撈到任何資料
        if strict:
            return "資料中沒有提到。"        # 有防護：誠實說不知道
        return "退款政策是 30 天。"          # 無防護：憑空編造
    return "根據資料：" + context[0]

print("無防護：", fake_llm("退款幾天？", [], strict=False))
print("有防護：", fake_llm("退款幾天？", [], strict=True))`,
        },
        exercises: [
          {
            id: "ex-5.5-a",
            title: "降幻覺的根本第一步",
            type: "multiple-choice",
            question: "在 RAG 系統裡，降低幻覺「最根本」的第一步通常是？",
            options: [
              "提升檢索品質，讓模型真的拿到正確的資料",
              "把 temperature 調到最高",
              "把 prompt 寫得更模糊一些",
              "移除所有指令，讓模型自由發揮",
            ],
            expectedAnswer: "提升檢索品質，讓模型真的拿到正確的資料",
            explanation:
              "幻覺常源於『檢索沒撈到正確資料，模型只好編造』。所以最根本的第一步是提升檢索品質；prompt 指令（只用資料、可說不知道）是重要但其次的第二道防線。",
            hint: "如果 context 裡根本沒有正確答案，光改 prompt 有用嗎？問題的源頭在哪？",
          },
        ],
        summary:
          "降幻覺要對症：先提升檢索品質讓模型有正確料，再用 prompt 指令與標來源當第二道防線。",
      },
      {
        id: "5.6",
        slug: "grounded-only",
        title: "要求模型只根據資料回答",
        concept: "明確指令『只用資料、找不到說不知道、標來源』是 grounding 的關鍵。",
        plainExplanation:
          "這是 RAG prompt 最核心的一條指令：要求模型『只根據提供的資料回答；如果資料裡找不到，就明說資料中沒有提到，而不是猜；回答時標註用到的來源編號』。\n\n這條指令做了三件事：把模型的回答限制在可驗證的範圍內、給模型一個誠實的『逃生出口』（可以說不知道）、讓答案可被溯源。一個願意說『資料中沒有提到』的 RAG，比一個永遠給答案但偶爾亂掰的 RAG 可靠得多。\n\n實務直覺：在真實系統裡，這段指令通常放在 system prompt。你會發現『允許說不知道』這點特別重要——少了它，模型為了『有問必答』就容易硬掰。這也是企業導入 RAG 時最看重的特性之一：寧可說不知道，不要給錯資訊。",
        diagramDescription:
          "決策圖：問題進來 → 檢索 → context 裡有答案嗎？是→根據資料回答並標來源；否→回答『資料中沒有提到』（而不是編造）。",
        keyPoints: [
          "核心指令：只用資料、找不到說不知道、標來源。",
          "給模型誠實的逃生出口，避免為了有問必答而硬掰。",
          "願意說『不知道』的 RAG 更可靠，是企業最看重的特性之一。",
        ],
        pythonExample: {
          filename: "day5_grounded_only.py",
          language: "python",
          code: `# grounded 回答：有資料就根據資料答並標來源；沒資料就誠實說不知道。

def answer_grounded(question, context):
    # 真實情況：把這個規則寫進 system prompt，再呼叫 LLM API
    if not context:
        return "資料中沒有提到。"
    return f"{context[0]}（來源 [1]）"

print(answer_grounded("咖啡為什麼苦？", ["水溫太高會讓咖啡變苦"]))
print(answer_grounded("公司股價多少？", []))   # 資料外 → 誠實說不知道`,
          codeExplanation: [
            { code: "if not context", note: "沒檢索到任何資料時，誠實回「資料中沒有提到」而不是猜——這是降幻覺的關鍵。" },
            { code: "（來源 [1]）", note: "有資料時，回答附上來源編號，讓答案可被核對、可溯源。" },
            { code: "answer_grounded('公司股價多少？', [])", note: "用資料外問題驗證：context 為空時系統應誠實說不知道。" },
          ],
        },
        exercises: [
          {
            id: "ex-5.6-a",
            title: "資料外問題該怎麼答？",
            type: "short-answer",
            question:
              "當檢索不到任何相關資料時，一個 grounded（有依據）的 RAG 系統，應該回答什麼，而不是去猜？（寫出大意即可）",
            expectedAnswer: "資料中沒有提到|沒有提到|不知道|我不知道|查無資料",
            explanation:
              "grounded 的 RAG 在沒有依據時應誠實表示『資料中沒有提到』（或類似的不知道），而不是編造答案。這個『逃生出口』是降低幻覺、提升可靠度的關鍵。",
            hint: "寧可說『不知道』，也不要硬掰。它應該誠實表示什麼？",
          },
        ],
        summary:
          "『只根據資料回答、找不到就說不知道、標來源』是 RAG 的核心 grounding 指令，讓答案可驗證、可溯源、不亂掰。",
      },
    ],
  },

  // ──────────────────────────────── DAY 6 ────────────────────────────────
  {
    id: "day6",
    num: 6,
    title: "RAG Pipeline 實作",
    subtitle: "把所有零件組成完整系統",
    estimatedTime: "約 150 分鐘",
    summary: "串起 Day 1–5，做出一個能對自己文件問答、且會列出引用來源的 mini RAG。",
    ragStages: ["documents", "chunking", "embedding", "vectordb", "retrieval", "prompt", "answer"],
    learningGoals: [
      "看懂並串起完整 RAG pipeline 的八個步驟",
      "從 load、split、embed、store 建立知識庫",
      "從 retrieve、generate 完成問答",
      "在回答時顯示引用來源，做到可溯源",
    ],
    units: [
      {
        id: "6.1",
        slug: "pipeline-overview",
        title: "RAG pipeline 全流程",
        concept: "把八個步驟串成一支能跑的程式：建庫一次、提問即時。",
        plainExplanation:
          "前五天我們把 RAG 的每個零件都拆開練過了。今天把它們接成一條完整的 pipeline。整體分成兩段：\n\n- 建庫（只做一次）：load documents → split chunks → embed → store。\n- 問答（每次提問）：retrieve context → build prompt → generate → 顯示來源。\n\n下面這支程式就是一個能跑的『簡化版 RAG』，不需要任何 API 或套件（embedding 用詞頻向量、LLM 用 mock，真實版只要把這兩塊換成模型即可）。先把它跑起來、看懂每個函式對應哪個步驟，後面 6.2~6.8 會逐一深入每一步。",
        diagramDescription:
          "完整流程圖（八格）：load → split → embed → store ┊ retrieve → prompt → generate → cite。用虛線把前四格框成『建庫（一次）』、後四格框成『問答（每次）』。",
        keyPoints: [
          "pipeline 兩段：建庫（一次）＋ 問答（每次）。",
          "ask() 內部依序做 retrieve → build_prompt → generate。",
          "真實版只是把 embed 換模型、把 fake_llm 換成 LLM API。",
        ],
        pythonExample: {
          filename: "day6_pipeline.py",
          language: "python",
          code: `# 簡化版 RAG pipeline（純 Python，可單獨執行）。

# 1) Documents
documents = {
    "coffee.md": "手沖咖啡的水溫建議 88 到 96 度。水溫太高會讓咖啡變苦。",
    "roast.md": "咖啡豆的烘焙程度分為淺中深三種。深烘焙較苦。",
}

# 2) Split chunks（依句號切，保留來源與段落）
def split_chunks(docs):
    chunks = []
    for source, text in docs.items():
        for i, s in enumerate(p for p in text.split("。") if p):
            chunks.append({"text": s + "。", "source": source, "para": i})
    return chunks

# 3) Embedding（簡化：詞頻向量）
VOCAB = ["水溫", "咖啡", "苦", "烘焙", "豆"]
def embed(text):
    return [text.count(w) for w in VOCAB]

# 4) Store（list 模擬向量庫）
def build_store(chunks):
    for c in chunks:
        c["vector"] = embed(c["text"])
    return chunks

# 5) Retrieve top-k
def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

def retrieve(store, query, k=2):
    qv = embed(query)
    ranked = sorted(store, key=lambda c: cosine(qv, c["vector"]), reverse=True)
    return ranked[:k]

# 6) Build prompt   7) Generate（mock LLM）
def generate(query, context):
    if not context:
        return "資料中沒有提到。"
    return f"根據資料：{context[0]['text']}"

# 8) ask：串起來並顯示來源
def ask(store, query, k=2):
    context = retrieve(store, query, k)
    answer = generate(query, context)
    sources = [f"{c['source']} 第 {c['para']} 句" for c in context]
    return answer, sources

store = build_store(split_chunks(documents))
answer, sources = ask(store, "為什麼咖啡會苦？")
print("回答：", answer)
print("來源：", sources)`,
          codeExplanation: [
            { code: "split_chunks(docs)", note: "建庫第 1–2 步：載入文件並依句號切塊，保留 source 與 para 兩個 metadata。" },
            { code: "embed / build_store", note: "建庫第 3–4 步：把每個 chunk 轉成向量並存進 list（模擬向量庫）。" },
            { code: "retrieve(store, query, k)", note: "查詢第 1 步：把問題 embed 後算 cosine，取相似度最高的前 k 段。" },
            { code: "generate(query, context)", note: "查詢第 2 步：用 context 產生回答；沒撈到就回『資料中沒有提到』。" },
            { code: "ask(store, query)", note: "把檢索、生成、來源整理串起來，回傳答案與來源清單。" },
          ],
        },
        exercises: [
          {
            id: "ex-6.1-a",
            title: "預測檢索 Top-1",
            type: "code-output",
            question:
              "執行整支 pipeline，對問題「為什麼咖啡會苦？」retrieve 回傳的「第一段（最相關）」文字是哪一句？",
            expectedAnswer: "水溫太高會讓咖啡變苦。",
            explanation:
              "query「為什麼咖啡會苦？」的向量同時命中『咖啡』與『苦』。在四個 chunk 裡，「水溫太高會讓咖啡變苦。」同時含這兩個詞、方向最接近，cosine 最高（約 0.816），所以排第一。",
            hint: "哪一句同時包含 query 裡的『咖啡』和『苦』？那一句相似度最高。",
          },
        ],
        summary:
          "RAG pipeline = 建庫（load→split→embed→store）＋ 問答（retrieve→prompt→generate→cite）。先跑通這支，再逐步深入每一步。",
      },
      {
        id: "6.2",
        slug: "load-documents",
        title: "Load documents",
        concept: "把原始檔案讀進來，整理成『檔名 → 文字』的對應。",
        plainExplanation:
          "pipeline 的第一步是載入文件。實務上會用 pathlib 走訪資料夾、讀取每個檔案（txt/md/pdf）的內容，整理成一個『檔名 → 文字』的對應（dict）。檔名之後會當作 metadata 的來源，用來顯示引用。\n\n實務直覺：載入階段也是做基本清理的好時機（接 Day 2 的 clean_text）。另外要決定『以什麼為一個文件單位』——一個檔案、一個網頁、還是資料庫的一筆紀錄。這個單位會影響後面 metadata 怎麼設計。",
        diagramDescription:
          "流程：資料夾/來源 → 逐一讀取檔案 → （清理）→ 得到 {檔名: 文字內容} 的對應，準備進入 split。",
        keyPoints: [
          "load 的產出：檔名 → 文字內容 的對應。",
          "檔名會成為 metadata 來源，用於日後引用。",
          "載入時順手做基本清理，並決定『文件單位』。",
        ],
        pythonExample: {
          filename: "day6_load_documents.py",
          language: "python",
          code: `from pathlib import Path

def load_documents(folder):
    """讀取資料夾下所有 .md，回傳 {檔名: 內容}。"""
    docs = {}
    for path in Path(folder).glob("*.md"):
        docs[path.name] = path.read_text(encoding="utf-8")
    return docs

# 範例（不需真實檔案）：直接用 dict 模擬載入結果
documents = {
    "coffee.md": "手沖咖啡的水溫建議 88 到 96 度。水溫太高會讓咖啡變苦。",
    "roast.md": "咖啡豆的烘焙程度分為淺中深三種。深烘焙較苦。",
}
print("載入文件數：", len(documents))`,
        },
        exercises: [
          {
            id: "ex-6.2-a",
            title: "load 階段的產出",
            type: "multiple-choice",
            question: "RAG pipeline 的 load documents 階段，產出最接近下列哪一個？",
            options: [
              "一份『檔名 → 文字內容』的對應",
              "每個 chunk 的向量",
              "最終答案",
              "組好的 prompt",
            ],
            expectedAnswer: "一份『檔名 → 文字內容』的對應",
            explanation:
              "load 只負責把原始檔案讀成文字、整理成 {檔名: 內容}。轉向量是 embed 階段、組 prompt 與生成答案則更後面。",
            hint: "『載入』這一步只是把檔案讀進來，還沒做切塊或 embedding。",
          },
        ],
        summary:
          "load documents 把原始檔案讀成『檔名 → 文字』的對應，並順手清理。檔名是日後引用來源的依據。",
      },
      {
        id: "6.3",
        slug: "split-chunks",
        title: "Split chunks",
        concept: "把每份文件切成帶有來源與段落號的小段。",
        plainExplanation:
          "載入後，用 Day 2 學的方法把每份文件切成 chunk。關鍵是：切的時候要同時記下每個 chunk 的 metadata——來自哪個檔案、第幾段。這些 metadata 之後在顯示引用、過濾、debug 時都會用到。\n\n這裡用最簡單的『依句號切』示範。實務上會用 recursive splitting，並設定合適的 chunk size 與 overlap（Day 2 的內容）。\n\n實務直覺：chunk 是檢索的最小單位，它的好壞直接決定檢索品質（Day 2 的結論）。一邊切、一邊把來源資訊綁上去，是讓系統『可溯源』的起點。",
        diagramDescription:
          "流程：每份文件 → 切成多個 chunk →每個 chunk 變成 {text, source, para} 的物件，帶著來源資訊往下走。",
        keyPoints: [
          "切塊時同時記錄 metadata（來源、段落號）。",
          "chunk 是檢索最小單位，切法決定檢索品質。",
          "示範用句號切；實務用 recursive splitting + size/overlap。",
        ],
        pythonExample: {
          filename: "day6_split_chunks.py",
          language: "python",
          code: `# 把文件切成帶 metadata 的 chunk（依句號切）。

def split_chunks(documents):
    chunks = []
    for source, text in documents.items():
        for i, sent in enumerate(s for s in text.split("。") if s):
            chunks.append({"text": sent + "。", "source": source, "para": i})
    return chunks

documents = {"coffee.md": "水溫建議 88 到 96 度。水溫太高會變苦。"}
chunks = split_chunks(documents)
print("chunk 數：", len(chunks))
for c in chunks:
    print(c)`,
        },
        exercises: [
          {
            id: "ex-6.3-a",
            title: "切出幾個 chunk？",
            type: "short-answer",
            question:
              "用上面的 split_chunks，文件 \"水溫建議 88 到 96 度。水溫太高會變苦。\" 會切出幾個 chunk？（寫數字）",
            expectedAnswer: "2",
            explanation:
              "依句號切會得到「水溫建議 88 到 96 度」「水溫太高會變苦」與一個空字串；程式用 if s 濾掉空字串，所以是 2 個 chunk（各自補回句號）。",
            hint: "數一數有幾個句號結尾的句子。結尾句號後面的空字串會被過濾掉。",
          },
        ],
        summary:
          "split chunks 把文件切成帶『來源 + 段落號』的小段。一邊切一邊綁 metadata，是可溯源的起點。",
      },
      {
        id: "6.4",
        slug: "embed-chunks",
        title: "Embed chunks",
        concept: "把每個 chunk 的文字轉成向量，存回 chunk 物件。",
        plainExplanation:
          "接著把每個 chunk 的文字 embed 成向量。真實情況會用 embedding 模型（例如 sentence-transformers 或 embedding API）一次處理一批 chunk；這裡用詞頻向量示範概念。\n\n重點是：所有 chunk 都要用『同一個模型』embedding，而且之後 query 也要用同一個（Day 3、Day 5 的鐵則）。embedding 完，每個 chunk 就同時帶著文字、metadata 和向量，準備存進向量庫。\n\n實務直覺：embedding 是建庫裡最花時間/花錢的一步（呼叫模型）。所以通常會批次處理、並把結果持久化保存，避免每次都重算。",
        diagramDescription:
          "流程：每個 chunk 的 text → embed 模型 → 向量；向量寫回 chunk 物件，使其同時擁有 {text, source, para, vector}。",
        keyPoints: [
          "所有 chunk 用同一個 embedding 模型（query 也要同一個）。",
          "embedding 後 chunk 同時帶著文字、metadata、向量。",
          "embedding 花時間/花錢，通常批次處理並持久化。",
        ],
        pythonExample: {
          filename: "day6_embed_chunks.py",
          language: "python",
          code: `# 把每個 chunk embed 成向量，存回 chunk 物件。

VOCAB = ["水溫", "咖啡", "苦", "烘焙", "豆"]
def embed(text):
    return [text.count(w) for w in VOCAB]

def embed_chunks(chunks):
    for c in chunks:
        c["vector"] = embed(c["text"])
    return chunks

chunks = [{"text": "水溫太高會讓咖啡變苦。", "source": "coffee.md", "para": 1}]
embed_chunks(chunks)
print(chunks[0]["vector"])`,
        },
        exercises: [
          {
            id: "ex-6.4-a",
            title: "預測 chunk 向量",
            type: "code-output",
            question:
              "用 VOCAB = [\"水溫\", \"咖啡\", \"苦\", \"烘焙\", \"豆\"]，embed(\"水溫太高會讓咖啡變苦。\") 會是什麼？",
            expectedAnswer: "[1, 1, 1, 0, 0]",
            explanation:
              "依序數每個詞：水溫 1、咖啡 1、苦 1、烘焙 0、豆 0 → [1, 1, 1, 0, 0]。",
            hint: "依 VOCAB 順序，數每個詞在『水溫太高會讓咖啡變苦。』裡出現幾次。",
          },
        ],
        summary:
          "embed chunks 把每段文字轉成向量並存回 chunk。要用同一個模型、通常批次處理並持久化。",
      },
      {
        id: "6.5",
        slug: "store-vectors",
        title: "Store vectors",
        concept: "把帶向量的 chunk 放進向量庫並（真實情況）落地保存。",
        plainExplanation:
          "把帶有向量的 chunk 存進向量庫，就完成了建庫。在我們的簡化版裡，『向量庫』其實就是一個帶 vector 欄位的 chunk list；真實情況會用 Chroma、FAISS、pgvector 等，並把索引落地保存到磁碟。\n\n關鍵心法：store 屬於『事前準備』，通常只做一次。建好並持久化之後，每次提問都直接用，不必重新 load/split/embed 整個知識庫——這就是為什麼建庫慢沒關係、但查詢要快。\n\n實務直覺：要規劃『什麼時候重建索引』。文件更新時，可以只增量更新變動的 chunk（用穩定的 id），不必整庫重建。",
        diagramDescription:
          "流程：帶 vector 的 chunk 集合 → 寫入向量庫（list / Chroma / pgvector）→ 落地保存；標註『事前準備、只做一次、可增量更新』。",
        keyPoints: [
          "store 完成建庫，屬於事前準備、只做一次。",
          "簡化版用 list；真實用 Chroma/FAISS/pgvector 並持久化。",
          "文件更新可用穩定 id 做增量更新，免整庫重建。",
        ],
        pythonExample: {
          filename: "day6_store_vectors.py",
          language: "python",
          code: `# 簡化版「向量庫」＝帶有 vector 欄位的 chunk list。

def build_store(chunks):
    # 真實情況：改用 Chroma collection.add(...) 並持久化到磁碟
    return [c for c in chunks if "vector" in c]

chunks = [
    {"text": "a", "vector": [1, 0]},
    {"text": "b", "vector": [0, 1]},
]
store = build_store(chunks)
print("已建立向量庫，筆數：", len(store))`,
        },
        exercises: [
          {
            id: "ex-6.5-a",
            title: "store 屬於哪個階段？",
            type: "multiple-choice",
            question: "把向量存進向量庫（store）這一步，屬於 RAG 的哪個階段？",
            options: [
              "事前準備（建庫），通常只做一次",
              "每次提問都要重做一遍",
              "完全不需要，可以省略",
              "由使用者每次手動輸入",
            ],
            expectedAnswer: "事前準備（建庫），通常只做一次",
            explanation:
              "load→split→embed→store 都屬於建庫的事前準備，建好並持久化後，每次提問直接用即可。每次提問即時跑的是 retrieve→prompt→generate。",
            hint: "知識庫建好之後，下次提問還需要重新存一次向量嗎？",
          },
        ],
        summary:
          "store vectors 把帶向量的 chunk 寫進向量庫並持久化，完成建庫。它是只做一次的事前準備，可增量更新。",
      },
      {
        id: "6.6",
        slug: "retrieve-context",
        title: "Retrieve context",
        concept: "問題進來時，embed 成查詢向量、取回最相關的 Top-k chunk。",
        plainExplanation:
          "建庫完成後，進入『每次提問即時執行』的部分。第一步是 retrieve：把問題用同一個模型 embed 成查詢向量，對庫裡每個 chunk 算相似度、排序、取 Top-k。回傳的 chunk 會帶著文字與 metadata，供下一步組 prompt 與顯示來源用。\n\n實務直覺：這就是 Day 5 學的 Top-k retrieval，只是現在接在 pipeline 裡。retrieve 的品質決定整個回答的上限，所以 debug 時第一個要看的就是『retrieve 回傳了什麼』。",
        diagramDescription:
          "流程：問題 → embed → 查詢向量 → 對 store 算相似度 → 取 Top-k chunk（帶 text 與 metadata）→ 交給組 prompt。",
        keyPoints: [
          "retrieve = 問題 embed → 算相似度 → 取 Top-k。",
          "回傳的 chunk 帶 metadata，供組 prompt 與顯示來源。",
          "retrieve 品質是回答上限；debug 先看它回傳什麼。",
        ],
        pythonExample: {
          filename: "day6_retrieve_context.py",
          language: "python",
          code: `# 從向量庫取回最相關的 Top-k chunk。

def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

VOCAB = ["水溫", "咖啡", "苦", "烘焙", "豆"]
def embed(t):
    return [t.count(w) for w in VOCAB]

store = [
    {"text": "水溫太高會讓咖啡變苦。",     "vector": embed("水溫太高會讓咖啡變苦。")},
    {"text": "咖啡豆的烘焙程度分三種。", "vector": embed("咖啡豆的烘焙程度分三種。")},
]

def retrieve(store, query, k=1):
    qv = embed(query)
    return sorted(store, key=lambda c: cosine(qv, c["vector"]), reverse=True)[:k]

print(retrieve(store, "咖啡為什麼苦", k=1)[0]["text"])`,
        },
        exercises: [
          {
            id: "ex-6.6-a",
            title: "預測 Top-1 chunk",
            type: "code-output",
            question:
              "執行上面的程式，retrieve(store, \"咖啡為什麼苦\", k=1)[0][\"text\"] 會印出哪一句？",
            expectedAnswer: "水溫太高會讓咖啡變苦。",
            explanation:
              "query「咖啡為什麼苦」命中『咖啡』『苦』。第一個 chunk 同時含這兩個詞，相似度高於只含『咖啡』的第二個 chunk，所以 Top-1 是「水溫太高會讓咖啡變苦。」。",
            hint: "兩個 chunk 中，哪一句同時包含『咖啡』和『苦』？",
          },
        ],
        summary:
          "retrieve context 把問題 embed 後取回 Top-k chunk（含 metadata），是每次提問的第一步，也是回答品質的上限。",
      },
      {
        id: "6.7",
        slug: "generate-answer",
        title: "Generate answer",
        concept: "把問題與檢索到的 context 組成 prompt，交給 LLM 產生回答。",
        plainExplanation:
          "拿到 Top-k context 後，用 Day 5 的 prompt template 把『指令 + context + 問題』組起來，送給 LLM 產生答案。指令要包含 grounding 規則（只用資料、找不到說不知道、標來源）。\n\n在我們的簡化版裡用 mock LLM 示範；真實情況這一步會呼叫 LLM API——例如 Anthropic 的 claude-haiku-4-5（便宜夠用）或更強的 claude-opus 系列——把組好的 prompt 當輸入，拿回模型的回答。\n\n實務直覺：generate 之前的所有努力（chunking、檢索、prompt）都是為了讓這一步『有好料可用』。如果 context 是對的，這一步通常很穩；如果答案不好，多半要回頭看前面的步驟，而不是只怪模型。",
        diagramDescription:
          "流程：問題 + Top-k context → 套用 prompt template（含 grounding 指令）→ 送 LLM API → 回答；標註 mock LLM 與真實 API 的對應。",
        keyPoints: [
          "generate = 組 prompt（含 grounding 指令）→ 呼叫 LLM。",
          "真實情況呼叫 LLM API（例如 claude-haiku-4-5）。",
          "context 對了通常就穩；答案差多半要回頭查前面步驟。",
        ],
        pythonExample: {
          filename: "day6_generate_answer.py",
          language: "python",
          code: `# 用 context 產生回答（mock LLM；真實改呼叫 LLM API）。

def generate_answer(query, context):
    if not context:
        return "資料中沒有提到。"
    # 真實情況：把 build_prompt(query, context) 送進 LLM API
    # （例如 Anthropic 的 claude-haiku-4-5），取回模型回答。
    return f"根據資料：{context[0]['text']}"

context = [{"text": "水溫太高會讓咖啡變苦。", "source": "coffee.md"}]
print(generate_answer("咖啡為什麼苦？", context))`,
        },
        exercises: [
          {
            id: "ex-6.7-a",
            title: "真實系統的 generate 做什麼？",
            type: "multiple-choice",
            question: "在真實的 RAG 系統裡，generate answer 這一步主要做什麼？",
            options: [
              "把組好的 prompt（指令 + context + 問題）送給 LLM API 產生回答",
              "重新把文件切成 chunk",
              "重新對全部文件做 embedding",
              "重新建立向量索引",
            ],
            expectedAnswer:
              "把組好的 prompt（指令 + context + 問題）送給 LLM API 產生回答",
            explanation:
              "generate 是把前面組好的 prompt 交給 LLM、取回答案。切 chunk、embedding、建索引都屬於更前面的建庫階段，不會在生成這一步重做。",
            hint: "這一步的主角是 LLM。它拿到 prompt 之後要做什麼？",
          },
        ],
        summary:
          "generate answer 把指令 + context + 問題組成 prompt 交給 LLM。真實版呼叫 LLM API；答案差時多半回頭查前面步驟。",
      },
      {
        id: "6.8",
        slug: "show-citations",
        title: "顯示引用來源",
        concept: "用 chunk 的 metadata，在答案旁列出來源檔名與段落。",
        plainExplanation:
          "最後一步，把這次回答用到的 chunk 來源列出來——靠的就是當初存在 chunk 上的 metadata（檔名、段落號）。可溯源是專業 RAG 與玩具 RAG 最大的差別：使用者能點開來源核對，你也能在 debug 時追查答案根據。\n\n實務直覺：好的引用會把『答案裡的哪句話』對應到『哪個來源』。進階做法是讓模型在答案中插入 [1][2] 標記，再對應到來源清單。最基本的版本，就是把這次 Top-k 用到的 chunk 來源全部列出來。",
        diagramDescription:
          "輸出卡：上方是答案，下方是『引用來源：[1] coffee.md 第 1 句 / [2] …』，由 context 各 chunk 的 metadata 組成。",
        keyPoints: [
          "顯示來源靠的是 chunk 上的 metadata。",
          "可溯源是專業 RAG 與玩具 RAG 的關鍵差別。",
          "進階：答案內插 [1][2] 標記，對應來源清單。",
        ],
        pythonExample: {
          filename: "day6_show_citations.py",
          language: "python",
          code: `# 用 chunk 的 metadata 顯示引用來源。

def format_with_citations(answer, context):
    lines = [answer, "", "引用來源："]
    for i, c in enumerate(context):
        lines.append(f"  [{i + 1}] {c['source']} 第 {c['para']} 句")
    return "\\n".join(lines)

context = [{"text": "水溫太高會讓咖啡變苦。", "source": "coffee.md", "para": 1}]
print(format_with_citations("水溫太高會讓咖啡變苦。", context))`,
          codeExplanation: [
            { code: "c['source'] / c['para']", note: "從每個 chunk 的 metadata 取出來源檔名與段落號——正是切塊時就一起存好的資訊。" },
            { code: "[{i + 1}] ...", note: "用編號把答案和來源對應起來，做到可溯源，這是專業 RAG 的標配。" },
          ],
        },
        exercises: [
          {
            id: "ex-6.8-a",
            title: "顯示來源靠什麼？",
            type: "short-answer",
            question:
              "RAG 在答案旁顯示『出自 coffee.md 第 1 句』，靠的是當初存在每個 chunk 上的什麼資料？（中文或英文皆可）",
            expectedAnswer: "metadata|中繼資料|中介資料|來源資訊",
            explanation:
              "靠的是 chunk 的 metadata（中繼資料），例如 source（檔名）與 para（段落號）。這也是為什麼 Day 4、Day 6 一直強調切塊與存向量時要把來源資訊一起帶上。",
            hint: "就是切塊、存向量時一起帶上的那些附帶資訊，英文是一個常見的字。",
          },
        ],
        summary:
          "顯示引用來源用的是 chunk 的 metadata。可溯源是專業 RAG 的標配，也讓 debug 時能追查答案依據。",
      },
    ],
  },

  // ──────────────────────────────── DAY 7 ────────────────────────────────
  {
    id: "day7",
    num: 7,
    title: "評估、Debug 與最終專案",
    subtitle: "從做得出來，到做得好、會除錯",
    estimatedTime: "約 130 分鐘",
    summary: "學會評估檢索與答案品質、系統性 debug，並完成你的結業專案。",
    ragStages: ["retrieval", "answer"],
    learningGoals: [
      "用 precision / recall 評估檢索品質",
      "用 faithfulness / groundedness 評估答案品質",
      "系統性 debug 常見 RAG 問題",
      "完成簡化版公司知識庫問答的結業專案",
    ],
    units: [
      {
        id: "7.1",
        slug: "retrieval-quality",
        title: "Retrieval quality 怎麼看",
        concept: "用 precision（撈回的乾不乾淨）與 recall（該撈的有沒有漏）量化檢索。",
        plainExplanation:
          "要改善 RAG，先要能『量』它。檢索品質最常用兩個指標：\n\n- Precision（精確率）：撈回來的 k 個 chunk 裡，有多少是真正相關的。高=雜訊少。\n- Recall（召回率）：所有真正相關的 chunk 裡，有多少被撈了回來。高=該撈的沒漏。\n\nRAG 答錯，很多時候是 recall 太低——正確段落根本沒進到 Top-k，後面再強的模型也沒辦法。\n\n實務直覺：要量這兩個，你需要一個小小的『標準答案集』：幾個問題，各自標出『哪些 chunk 才是正確的』。這份標註雖然要花點工，但它讓你能客觀比較『改了 chunk size / 換了 embedding / 調了 k』之後到底有沒有變好——不要只憑感覺調參。下面示範最常用的 Recall@k。",
        diagramDescription:
          "韋恩圖：『撈回的 k 個』與『真正相關的』兩圈相交；Precision = 交集 / 撈回，Recall = 交集 / 相關。旁邊標『RAG 常死於 recall 低』。",
        keyPoints: [
          "Precision = 撈回中相關的比例；Recall = 相關中被撈回的比例。",
          "RAG 答錯常是 recall 低：正確段落沒進 Top-k。",
          "需要一份標準答案集，才能客觀比較調整前後。",
        ],
        pythonExample: {
          filename: "day7_retrieval_quality.py",
          language: "python",
          code: `# 用一個小標準答案集，計算 Recall@k。

# 每個問題「正確的 chunk id」
gold = {"q1": {"c2"}, "q2": {"c5"}}
# 系統實際檢索回來的 chunk id（Top-k）
retrieved = {"q1": ["c2", "c9"], "q2": ["c1", "c3"]}

def recall_at_k(gold, retrieved):
    hit = sum(1 for q in gold if gold[q] & set(retrieved[q]))
    return hit / len(gold)

print("Recall@k：", recall_at_k(gold, retrieved))
# q1 有撈到 c2（命中），q2 沒撈到 c5（沒中）→ 1/2`,
          codeExplanation: [
            { code: "gold / retrieved", note: "gold 是人工標註的正確 chunk，retrieved 是系統實際撈回的——評估就是比對這兩者。" },
            { code: "gold[q] & set(retrieved[q])", note: "用集合交集判斷『這題的正確 chunk 有沒有被撈回』。" },
            { code: "hit / len(gold)", note: "命中題數除以總題數＝Recall@k，衡量『該撈的有沒有漏』。" },
          ],
        },
        exercises: [
          {
            id: "ex-7.1-a",
            title: "計算 Recall@k",
            type: "code-output",
            question:
              "用上面的 gold 與 retrieved，recall_at_k(gold, retrieved) 會印出多少？",
            expectedAnswer: "0.5",
            explanation:
              "q1 的正確答案 c2 有出現在撈回結果（命中）；q2 的正確答案 c5 沒有出現（沒中）。2 題中命中 1 題 → 1/2 = 0.5。",
            hint: "兩題裡，各自的正確 chunk 有沒有出現在它的 retrieved 清單？數命中幾題除以總題數。",
          },
        ],
        summary:
          "檢索品質用 precision/recall 量化，RAG 常死於 recall 低。建一份標準答案集，才能客觀判斷調整有沒有變好。",
      },
      {
        id: "7.2",
        slug: "answer-quality",
        title: "Answer quality 怎麼看",
        concept: "答案品質要看正確、完整、相關，而不只是『讀起來順』。",
        plainExplanation:
          "檢索撈對了，不代表答案就好。答案品質通常看幾個面向：相關性（有沒有回答到問題）、正確性（內容對不對）、完整性（有沒有漏重點）、以及最關鍵的 faithfulness（有沒有忠於檢索資料、有沒有亂加東西，下個單元細講）。\n\n怎麼量？常見兩種：(1) 人工評分——用一張 rubric（評分準則）打分，最可靠但花人力；(2) LLM-as-judge——請另一個模型依準則評分，可規模化但要小心它自己的偏誤。\n\n實務直覺：最危險的答案，是『讀起來很順、很有自信，但其實是錯的或編的』。所以評估答案千萬不能只看流暢度。下面用一個『必含重點覆蓋率』的簡化評分示範這個精神。",
        diagramDescription:
          "雷達圖/評分卡：四個面向（相關性、正確性、完整性、faithfulness）各打分；旁註『流暢 ≠ 正確，最危險的是流暢卻錯誤的答案』。",
        keyPoints: [
          "答案品質看：相關、正確、完整、faithful，不只看流暢。",
          "量法：人工 rubric（可靠）或 LLM-as-judge（可規模化）。",
          "最危險的是『流暢但錯誤/編造』的答案。",
        ],
        pythonExample: {
          filename: "day7_answer_quality.py",
          language: "python",
          code: `# 簡化評分：答案是否涵蓋必要重點（真實會用人工 rubric 或 LLM-as-judge）。

def coverage_score(answer, must_include):
    covered = sum(1 for kw in must_include if kw in answer)
    return covered / len(must_include)

answer = "水溫太高會讓咖啡變苦"
print(coverage_score(answer, ["水溫", "苦"]))    # 兩個重點都有 → 1.0
print(coverage_score(answer, ["烘焙", "苦"]))    # 只命中「苦」 → 0.5`,
        },
        exercises: [
          {
            id: "ex-7.2-a",
            title: "評估答案的正確觀念",
            type: "multiple-choice",
            question: "關於評估 answer quality，下列哪個觀念正確？",
            options: [
              "不能只看『流暢好讀』，還要看『正確』與『是否有檢索資料當依據』",
              "只要句子通順，就是好答案",
              "答案越長就一定越好",
              "只要模型有回答，就代表品質好",
            ],
            expectedAnswer:
              "不能只看『流暢好讀』，還要看『正確』與『是否有檢索資料當依據』",
            explanation:
              "LLM 很會把話講得流暢自信，但流暢不等於正確。評估答案要看相關性、正確性、完整性與 faithfulness，最危險的正是『流暢卻錯誤』的答案。",
            hint: "模型最擅長把話講順。光是『順』能保證『對』嗎？",
          },
        ],
        summary:
          "答案品質要看相關、正確、完整、faithful，不能只看流暢。可用人工 rubric 或 LLM-as-judge 評分。",
      },
      {
        id: "7.3",
        slug: "groundedness-faithfulness",
        title: "Groundedness / Faithfulness",
        concept: "答案的每一句，是否都能在檢索到的資料裡找到根據。",
        plainExplanation:
          "Groundedness（有依據）/ Faithfulness（忠實）問的是同一件事：答案是不是完全建立在檢索到的 context 上，有沒有『加油添醋』講了資料裡沒有的東西。這是 RAG 最重要的品質指標——因為 RAG 的賣點就是『有依據、可溯源』，一旦答案脫離資料，這個賣點就破功了。\n\n怎麼檢查？概念上是把答案拆成一句句，逐句問『這句能在 context 找到支持嗎？』。實務上常用 LLM-as-judge 來判斷，或用更嚴謹的 claim 比對。\n\n實務直覺：faithfulness 和『正確性』不完全一樣——答案可能剛好正確、但不是來自 context（那仍算不 grounded，因為下次就可能編錯）。我們要的是『答案來自資料』這個性質本身。下面用一個超簡化的『答案字詞是否都來自 context』示範這個精神。",
        diagramDescription:
          "範例卡：一段答案逐句標記——綠色（能在 context 找到依據）/ 紅色（context 沒有、屬於捏造）；下方給 grounded 比例。",
        keyPoints: [
          "Groundedness/Faithfulness = 答案是否完全由 context 支持。",
          "是 RAG 最重要的指標，脫離資料就失去 RAG 的賣點。",
          "正確 ≠ grounded：剛好對但不來自資料，仍不算 grounded。",
        ],
        pythonExample: {
          filename: "day7_groundedness.py",
          language: "python",
          code: `# 超簡化的 grounded 檢查：答案的字詞，是否都能在 context 找到。

def grounded_ratio(answer, context_text):
    words = [w for w in answer if w.strip() and w not in "，。、（）[]"]
    if not words:
        return 0.0
    supported = sum(1 for w in words if w in context_text)
    return supported / len(words)

context = "水溫太高會讓咖啡變苦"
print(round(grounded_ratio("咖啡變苦", context), 2))   # 字都在 context → 1.0
print(round(grounded_ratio("股價上漲", context), 2))   # 都不在 → 0.0`,
        },
        exercises: [
          {
            id: "ex-7.3-a",
            title: "計算 grounded 比例",
            type: "code-output",
            question:
              "context = \"水溫太高會讓咖啡變苦\"，round(grounded_ratio(\"咖啡變苦\", context), 2) 會印出多少？",
            expectedAnswer: "1.0",
            explanation:
              "「咖啡變苦」四個字（咖、啡、變、苦）全都出現在 context「水溫太高會讓咖啡變苦」裡，支持比例 4/4 = 1.0，代表這個答案完全 grounded。",
            hint: "『咖啡變苦』每個字都能在 context 裡找到嗎？找得到的比例是多少？",
          },
        ],
        summary:
          "Faithfulness/Groundedness 看答案是否完全由 context 支持，是 RAG 最重要的指標。正確不等於 grounded。",
      },
      {
        id: "7.4",
        slug: "common-issues",
        title: "常見 RAG 問題",
        concept: "把常見症狀對應到可能的根因，加速定位問題。",
        plainExplanation:
          "RAG 出問題時，症狀和根因往往不直觀。把常見情況整理成對照表，能幫你快速縮小範圍：\n\n- 『答案明明在資料裡，卻沒答出來』→ 多半是檢索沒撈到：chunk 切太大/太小、embedding 沒抓對語意、或 k 太小。\n- 『答案是資料裡沒有的、憑空編造』→ 缺少 grounding 指令，或檢索撈到一堆不相關的雜訊。\n- 『答案只對了一半』→ chunk 太大混入雜訊，或 k 太小漏掉另一半資訊。\n- 『檢索很慢』→ 資料量大但還在用線性搜尋，該上有索引的向量資料庫。\n\n實務直覺：絕大多數 RAG 問題，根因落在『檢索層』而不是『模型不夠強』。先別急著換大模型，先看檢索撈了什麼。",
        diagramDescription:
          "對照表：左欄『症狀』（沒答出來/編造/只對一半/很慢），右欄『可能根因』（檢索沒撈到/缺 grounding 或雜訊/chunk 大或 k 小/該上索引）。",
        keyPoints: [
          "多數 RAG 問題的根因在檢索層，不是模型不夠強。",
          "『有資料卻沒答出來』通常是 recall 問題（chunk/embedding/k）。",
          "『憑空編造』通常缺 grounding 指令或撈到雜訊。",
        ],
        pythonExample: {
          filename: "day7_common_issues.py",
          language: "python",
          code: `# 一張「症狀 → 可能根因」對照表，幫你快速定位。

issues = {
    "答案在資料裡卻沒答出來": "檢索沒撈到（chunk 切法 / embedding / k 太小）",
    "答案是資料裡沒有的、憑空編造": "缺少 grounding 指令，或檢索撈到雜訊",
    "答案只對了一半": "chunk 太大混入雜訊，或 k 太小漏掉資訊",
    "檢索很慢": "資料量大仍用線性搜尋，該上向量資料庫索引",
}

for symptom, cause in issues.items():
    print(f"症狀：{symptom}\\n  → 可能根因：{cause}\\n")`,
        },
        exercises: [
          {
            id: "ex-7.4-a",
            title: "編造答案的根因",
            type: "multiple-choice",
            question: "「答案是資料裡根本沒有的、憑空編造的」最可能的根因是？",
            options: [
              "缺少 grounding 指令，或檢索撈到一堆不相關的雜訊",
              "電腦螢幕太小",
              "chunk_size 剛好是整數",
              "模型的版本號太新",
            ],
            expectedAnswer:
              "缺少 grounding 指令，或檢索撈到一堆不相關的雜訊",
            explanation:
              "憑空編造通常有兩個來源：prompt 沒要求『只根據資料、找不到說不知道』（缺 grounding），或檢索撈回的內容不相關，模型只好自己填。兩者都該優先排查。",
            hint: "模型為什麼會編？是不是『沒被限制只用資料』，或『拿到的資料根本不相關』？",
          },
        ],
        summary:
          "把症狀對應到根因能加速 debug。記住：多數 RAG 問題出在檢索層，先看檢索撈了什麼，別急著換模型。",
      },
      {
        id: "7.5",
        slug: "debug-methods",
        title: "Debug RAG 的方法",
        concept: "分層排查：先看檢索撈對沒，再看 prompt 與生成。",
        plainExplanation:
          "RAG 是多步驟系統，debug 的關鍵是『分層排查』，不要一次盯著最終答案瞎猜。標準流程：\n\n1. 先看 retrieve 回傳了什麼——正確段落有沒有在 Top-k 裡？沒有 → 問題在檢索層（回頭查 chunking、embedding、k）。\n2. 如果正確段落有被撈回，答案還是錯 → 問題在生成層（檢查 prompt 指令、context 格式、模型）。\n\n最有效的工具，就是把『每一層的中間結果』印出來：檢索到的 chunk、組好的 prompt、模型的原始輸出。問題往往一印就現形。\n\n實務直覺：養成寫一個 debug_ask() 的習慣，它和正常 ask() 一樣，但會把中間結果都印出來。這比反覆改 prompt 卻不知道檢索對不對，有效率太多了。",
        diagramDescription:
          "決策樹：答案不好 → retrieve 的 Top-k 有正確段落嗎？否→查 chunking/embedding/k；是→查 prompt/context 格式/模型。",
        keyPoints: [
          "分層排查：先檢索層、後生成層。",
          "把每層中間結果印出來，問題一印就現形。",
          "寫一個 debug_ask() 印出 context / prompt / 原始輸出。",
        ],
        pythonExample: {
          filename: "day7_debug_ask.py",
          language: "python",
          code: `# debug_ask：和正常 ask 一樣，但把每一層中間結果印出來。

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

# 用法：把你 pipeline 裡的 retrieve / build_prompt / llm 傳進來即可逐層觀察。`,
          codeExplanation: [
            { code: "① 檢索到的 context", note: "第一層：先看 retrieve 撈回什麼，確認正確段落有沒有在 Top-k 裡。" },
            { code: "② 組好的 prompt", note: "第二層：檢查 context 與指令有沒有正確組進 prompt。" },
            { code: "③ 模型的回答", note: "第三層：context 對了卻還答錯，問題才在生成（prompt／模型）。" },
          ],
        },
        exercises: [
          {
            id: "ex-7.5-a",
            title: "Debug 的正確順序",
            type: "multiple-choice",
            question: "RAG 答案不好時，最有效率的 debug 順序是？",
            options: [
              "先看檢索撈對了沒（Top-k 有無正確段落），再看 prompt 與模型",
              "先把模型換成最大的版本，不行再說",
              "先重灌作業系統",
              "隨機改參數，碰碰運氣",
            ],
            expectedAnswer:
              "先看檢索撈對了沒（Top-k 有無正確段落），再看 prompt 與模型",
            explanation:
              "RAG 是多步驟系統，要分層排查。先確認檢索層（正確段落有沒有進 Top-k），再看生成層（prompt、模型）。把每層中間結果印出來最有效，比盲目換模型或亂改參數有效率得多。",
            hint: "如果連正確段落都沒被撈回，改 prompt 或換模型有用嗎？應該先檢查哪一層？",
          },
        ],
        summary:
          "Debug RAG 靠分層排查：先檢索層、後生成層，把每層中間結果印出來。寫個 debug_ask() 是好習慣。",
      },
      {
        id: "7.6",
        slug: "final-project",
        title: "最終專案：簡化版公司知識庫問答系統",
        concept: "整合所學，做一個能回答、會標來源、會檢查 grounded 的迷你 RAG。",
        plainExplanation:
          "恭喜你走到最後！結業專案是把整週所學收斂成一個能跑的『簡化版公司知識庫問答系統』。下面的程式（純 Python、可單獨執行）完整實作了九個步驟，你只要照著做、再換成自己的內容即可：\n\n1. 準備文件（換成你自己的 FAQ / 筆記 / 文件）\n2. 切 chunk（保留來源與段落）\n3. 建立 embedding\n4. 建立簡化 vector store\n5. 查詢 top-k\n6. 組 prompt（含 grounding 指令）\n7. 產生回答\n8. 顯示引用來源\n9. 檢查回答是否 grounded\n\n完成挑戰（做完你就真的會了）：\n- 把 documents 換成你自己的內容（例如請假規則、IT 設定）。\n- 擴充 VOCAB，或改成真正的 embedding 模型（sentence-transformers）。\n- 把 generate 換成真正的 LLM API（claude-haiku-4-5）。\n- 準備 5 個測試問題，記錄每題的『Top-k 有無命中』與『grounded 比例』，做成一張小評估表。\n- 故意問一個資料外的問題，確認系統會誠實說『資料中沒有提到』。\n\n實務直覺：這支程式雖小，但骨架和真實 RAG 一模一樣。面試時你能指著它說明每一步、以及每個設計的取捨——這正是實習最需要的能力。",
        diagramDescription:
          "結業專案流程圖（九步）：準備文件 → 切 chunk → embedding → vector store → 查 top-k → 組 prompt → 產生回答 → 顯示來源 → grounded 檢查；資料外問題走向『資料中沒有提到』分支。",
        keyPoints: [
          "九步驟：文件→chunk→embed→store→top-k→prompt→回答→來源→grounded 檢查。",
          "進階：換真 embedding 模型與 LLM API、做一張 5 題評估表。",
          "骨架和真實 RAG 一致，能講清楚每步與取捨就是實習戰力。",
        ],
        pythonExample: {
          filename: "final_project_mini_rag.py",
          language: "python",
          code: `# 最終專案：簡化版「公司知識庫問答系統」（純 Python，可單獨執行）
# 完成 9 個步驟：準備文件 → 切 chunk → embedding → vector store
#   → 查 top-k → 組 prompt → 產生回答 → 顯示來源 → 檢查 grounded

# 1) 準備文件（換成你自己的內容即可）
documents = {
    "hr.md": "員工每年有 14 天特休。特休需提前三天申請。",
    "it.md": "公司筆電預設安裝防毒軟體。忘記密碼請聯絡 IT 部門重設。",
}

# 2) 切 chunk（依句號），保留來源與段落
def split_chunks(docs):
    chunks = []
    for source, text in docs.items():
        for i, s in enumerate(p for p in text.split("。") if p):
            chunks.append({"text": s + "。", "source": source, "para": i})
    return chunks

# 3) 建立 embedding（簡化：詞頻向量；真實換成 embedding 模型）
VOCAB = ["特休", "申請", "筆電", "密碼", "防毒", "IT"]
def embed(t):
    return [t.count(w) for w in VOCAB]

# 4) 建立簡化 vector store
def build_store(chunks):
    for c in chunks:
        c["vector"] = embed(c["text"])
    return chunks

# 5) 查詢 top-k
def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na = sum(x * x for x in a) ** 0.5
    nb = sum(y * y for y in b) ** 0.5
    return dot / (na * nb) if na and nb else 0.0

def retrieve(store, query, k=2):
    qv = embed(query)
    ranked = sorted(store, key=lambda c: cosine(qv, c["vector"]), reverse=True)
    return [c for c in ranked if cosine(qv, c["vector"]) > 0][:k]

# 6) 組 prompt（含 grounding 指令與來源編號）
def build_prompt(query, context):
    refs = "\\n".join(f"[{i + 1}] {c['text']}" for i, c in enumerate(context))
    return ("只根據以下資料回答，找不到請說「資料中沒有提到」，並標來源編號。\\n\\n"
            f"資料：\\n{refs}\\n\\n問題：{query}")

# 7) 產生回答（簡化版 LLM；真實改呼叫 LLM API，例如 claude-haiku-4-5）
def generate(query, context):
    if not context:
        return "資料中沒有提到。"
    return context[0]["text"]

# 8) 顯示引用來源
def format_sources(context):
    return [f"{c['source']} 第 {c['para']} 句" for c in context]

# 9) 檢查回答是否 grounded（答案字詞是否來自 context）
def grounded_ratio(answer, context):
    ctx = "".join(c["text"] for c in context)
    words = [w for w in answer if w.strip() and w not in "，。、（）[]"]
    if not words:
        return 0.0
    return sum(1 for w in words if w in ctx) / len(words)

# ---- 串起來 ----
store = build_store(split_chunks(documents))

def ask(query, k=2):
    context = retrieve(store, query, k)
    answer = generate(query, context)
    print("問題：", query)
    print("回答：", answer)
    print("來源：", format_sources(context))
    print("Grounded 比例：", round(grounded_ratio(answer, context), 2))
    print("-" * 30)

ask("特休有幾天？")
ask("公司股價是多少？")   # 資料外 → 應誠實說「資料中沒有提到」`,
          codeExplanation: [
            { code: "documents", note: "步驟 1：知識庫（換成你自己的文件即可）。" },
            { code: "split_chunks(docs)", note: "步驟 2：依句號切塊並保留來源與段落號。" },
            { code: "embed / build_store", note: "步驟 3–4：建立 embedding 與簡化 vector store。" },
            { code: "retrieve(store, query, k)", note: "步驟 5：查 top-k，並過濾掉相似度為 0 的結果（資料外問題就會得到空 context）。" },
            { code: "build_prompt(query, context)", note: "步驟 6：組 prompt，加入 grounding 指令與來源編號。" },
            { code: "generate(query, context)", note: "步驟 7：產生回答（真實版改呼叫 LLM API）。" },
            { code: "format_sources / grounded_ratio", note: "步驟 8–9：顯示引用來源，並計算答案有多少比例能在 context 找到依據（grounded 檢查）。" },
            { code: "ask('公司股價是多少？')", note: "故意問資料外問題，驗證系統會誠實回『資料中沒有提到』、grounded 為 0。" },
          ],
        },
        exercises: [
          {
            id: "ex-7.6-a",
            title: "資料外問題的回答",
            type: "code-output",
            question:
              "執行最終專案，對資料庫裡沒有的問題「公司股價是多少？」，print(\"回答：\", ...) 會印出「回答：」後面接什麼？",
            expectedAnswer: "資料中沒有提到。",
            explanation:
              "「公司股價是多少？」沒有命中任何 VOCAB 詞，查詢向量全為 0，retrieve 過濾掉相似度為 0 的結果後 context 為空，generate 因此回傳「資料中沒有提到。」，grounded 比例為 0.0。這正是 grounded RAG 該有的誠實行為。",
            hint: "這個問題的字都不在 VOCAB 裡，檢索會撈到東西嗎？context 為空時 generate 回傳什麼？",
          },
        ],
        summary:
          "結業專案把九個步驟串成一個會回答、會標來源、會檢查 grounded、也會誠實說不知道的迷你 RAG。換上你自己的文件，你就完成了從零到一的 RAG 實作。",
      },
    ],
  },
];

// ─────────────────────────── 衍生資料與查詢輔助 ───────────────────────────

/** 攤平後的所有單元（含所屬 day），依課程順序排列。 */
export const allUnits: { day: Day; unit: Unit }[] = courseData.flatMap((day) =>
  day.units.map((unit) => ({ day, unit })),
);

/** 單元總數，用於計算整體進度。 */
export const TOTAL_UNITS = allUnits.length;

/** 所有練習（攤平），用於計算練習完成率。 */
export const allExercises = allUnits.flatMap(({ unit }) => unit.exercises);

/** 練習題總數。 */
export const TOTAL_EXERCISES = allExercises.length;

export function getDay(dayId: string): Day | undefined {
  return courseData.find((d) => d.id === dayId);
}

export function getUnit(dayId: string, unitSlug: string): Unit | undefined {
  return getDay(dayId)?.units.find((u) => u.slug === unitSlug);
}

/** 取得某單元的上一個 / 下一個單元（跨日連續）。 */
export function getAdjacentUnits(dayId: string, unitSlug: string) {
  const index = allUnits.findIndex(
    ({ day, unit }) => day.id === dayId && unit.slug === unitSlug,
  );
  return {
    prev: index > 0 ? allUnits[index - 1] : null,
    next: index >= 0 && index < allUnits.length - 1 ? allUnits[index + 1] : null,
  };
}

/** 該日已完成的單元數。 */
export function dayCompletedCount(day: Day, completedUnits: string[]): number {
  return day.units.filter((u) => completedUnits.includes(u.id)).length;
}
