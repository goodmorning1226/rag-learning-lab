# 簡化版遞迴切割：依序嘗試分隔符，子段仍過長就用下一個分隔符再切。

def recursive_split(text, max_len, separators=("\n\n", "\n", "。", "")):
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
print(recursive_split(text, max_len=10))
