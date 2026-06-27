# 用「印出步驟」的方式，先看清楚 RAG 七步驟的骨架（細節後面幾天會逐一實作）。

def build_knowledge_base(documents):
    print("1) Documents：載入原始文件")
    chunks = chunking(documents)
    vectors = embedding(chunks)
    store_in_vector_db(vectors)
    print("→ 知識庫建立完成（事前準備，只做一次）\n")

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
answer("RAG 是什麼？")
