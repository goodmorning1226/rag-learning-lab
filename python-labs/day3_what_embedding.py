# 用一個固定詞表，把句子轉成「詞頻向量」—— 最陽春的 embedding。
# （真實模型會輸出幾百維的語意向量，但概念一樣：文字 → 數字向量）

VOCAB = ["咖啡", "水溫", "苦", "烘焙", "報稅"]

def embed(text):
    return [text.count(word) for word in VOCAB]

print(embed("咖啡太苦，可能是水溫太高"))   # [1, 1, 1, 0, 0]
print(embed("咖啡豆的烘焙程度"))           # [1, 0, 0, 1, 0]
print(embed("我要報稅"))                   # [0, 0, 0, 0, 1]
