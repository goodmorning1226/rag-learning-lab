# 把 mock_llm 換成真正的 LLM API（以 Anthropic Claude 為例）
# pip install anthropic   （需設定環境變數 ANTHROPIC_API_KEY）
import anthropic

client = anthropic.Anthropic()

def generate(prompt):
    msg = client.messages.create(
        model="claude-haiku-4-5",   # 便宜夠用；要更強可換 claude-sonnet / claude-opus
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return msg.content[0].text

# OpenAI / Gemini 也是類似：把 build_prompt 的結果送進去、取回文字即可，
# RAG 的其他步驟（檢索、組 prompt、顯示來源、grounded 檢查）完全不變。
