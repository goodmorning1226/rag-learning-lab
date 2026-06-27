# 最單純的定長切割：每 size 個字元切一塊。

def fixed_size_chunk(text, size):
    return [text[i:i + size] for i in range(0, len(text), size)]

doc = "RAG 先檢索再生成。檢索品質決定回答品質。切太大或太小都不好。"

for size in (8, 20):
    chunks = fixed_size_chunk(doc, size)
    print(f"size={size} -> {len(chunks)} 塊")
    print(chunks)
