# 一個小決策函式：依需求建議該用 RAG 還是 Fine-tuning。

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
print(recommend(need_fresh_knowledge=True, need_fixed_style=False))
