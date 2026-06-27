# 把每個 chunk embed 成向量，存回 chunk 物件。

VOCAB = ["水溫", "咖啡", "苦", "烘焙", "豆"]
def embed(text):
    return [text.count(w) for w in VOCAB]

def embed_chunks(chunks):
    for c in chunks:
        c["vector"] = embed(c["text"])
    return chunks

chunks = [{"text": "水溫太高會讓咖啡變苦。", "source": "coffee.md", "para": 1}]
embed_chunks(chunks)
print(chunks[0]["vector"])
