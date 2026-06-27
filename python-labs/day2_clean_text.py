# 只用標準字串方法做基本清理，不依賴外部套件。

def clean_text(raw: str) -> str:
    lines = []
    for line in raw.splitlines():
        line = " ".join(line.split())      # 壓縮每行的多餘空白
        if line.strip().isdigit():         # 跳過「整行只有頁碼」的行
            continue
        lines.append(line)
    text = "\n".join(lines)
    while "\n\n\n" in text:               # 過多空行壓成段落分隔
        text = text.replace("\n\n\n", "\n\n")
    return text.strip()

raw = "第一段文字。      \n\n\n\n12\n\n第二段文字。"
print(clean_text(raw))
# 輸出：
# 第一段文字。
#
# 第二段文字。
