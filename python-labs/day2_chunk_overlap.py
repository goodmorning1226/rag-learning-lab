# 帶 overlap 的切割：每次往後移動 (size - overlap) 個字元。

def chunk_with_overlap(text, size, overlap):
    step = size - overlap
    return [text[i:i + size] for i in range(0, len(text), step)]

# 用英文字母方便觀察重疊的部分
doc = "ABCDEFGHIJ"
print(chunk_with_overlap(doc, size=4, overlap=2))
# 每塊長度 4，每次往後移 2 → 相鄰塊重疊 2 個字元
