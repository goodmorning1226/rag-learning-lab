# 把簡化的「詞頻向量」換成真正的 embedding 模型
# pip install sentence-transformers
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def embed(text):
    # 回傳一個語意向量（list of float）；query 與 document 都用同一個模型
    return model.encode(text).tolist()
