import type { ExerciseType } from "@/data/types";

/** 文字正規化：壓縮空白、去頭尾、轉小寫（用於 short-answer 關鍵字比對）。 */
export function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

/** 程式正規化：移除「所有」空白並轉小寫（用於 code-output / code-fill 比對）。 */
export function normalizeCode(text: string): string {
  return text.replace(/\s+/g, "").toLowerCase();
}

/**
 * 判斷使用者答案是否正確。expectedAnswer 可用 "|" 分隔多個可接受答案。
 * 各題型的判斷方式：
 * - multiple-choice：比對選到的選項文字（需完全相符）。
 * - short-answer：關鍵字比對（寬鬆）——使用者答案包含關鍵字、或關鍵字包含答案即可。
 * - code-output：比對預期輸出（忽略所有空白）——使用者輸出包含預期輸出即算對。
 * - code-fill：比對關鍵程式片段（忽略所有空白）——填入的內容包含關鍵片段即算對。
 */
export function isCorrect(
  type: ExerciseType,
  userAnswer: string,
  expectedAnswer: string,
): boolean {
  const accepted = expectedAnswer.split("|");

  if (type === "multiple-choice") {
    return accepted.some((a) => a.trim() === userAnswer.trim());
  }

  if (type === "short-answer") {
    const user = normalize(userAnswer);
    if (!user) return false;
    return accepted.some((a) => {
      const key = normalize(a);
      return key.length > 0 && (user.includes(key) || key.includes(user));
    });
  }

  // code-output / code-fill：忽略空白，使用者內容包含關鍵片段/預期輸出即算對
  const user = normalizeCode(userAnswer);
  if (!user) return false;
  return accepted.some((a) => {
    const key = normalizeCode(a);
    return key.length > 0 && user.includes(key);
  });
}
