# 三種方案的「概念 API」其實很像：都在做 add（存）與 query（查 Top-k）。
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

print("共同點：都支援 add（存向量）與 query（找 Top-k 相似）")
