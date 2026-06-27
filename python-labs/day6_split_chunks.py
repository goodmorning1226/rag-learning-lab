# 把文件切成帶 metadata 的 chunk（依句號切）。

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
    print(c)
