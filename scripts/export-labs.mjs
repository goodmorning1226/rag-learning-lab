// 從 data/*.ts 抽出所有 Python 範例，輸出成可直接執行的 .py 檔到 python-labs/。
// 用法： node scripts/export-labs.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const out = join(root, "python-labs");
mkdirSync(out, { recursive: true });
mkdirSync(join(out, "upgrades"), { recursive: true });

// 把 .ts 原始碼裡的 template literal 還原成真正的程式內容
// （主要是把被加倍的反斜線 \\ 還原成 \，例如 "\\n" → "\n"）
function unescape(code) {
  return code.replace(/\\`/g, "`").replace(/\\\$/g, "$").replace(/\\\\/g, "\\");
}

let count = 0;
function write(relPath, code) {
  const full = join(out, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, unescape(code).trimEnd() + "\n", "utf8");
  count++;
  console.log("  ✓", "python-labs/" + relPath.replace(/\\/g, "/"));
}

// 1) courseData.ts 的所有 pythonExample
const course = readFileSync(join(root, "data", "courseData.ts"), "utf8");
const exRe =
  /filename:\s*"([^"]+\.py)",\s*\r?\n\s*language:\s*"[^"]*",\s*\r?\n\s*code:\s*`([\s\S]*?)`,\s*\r?\n/g;
const seen = new Set();
let m;
while ((m = exRe.exec(course))) {
  const [, filename, code] = m;
  if (seen.has(filename)) continue;
  seen.add(filename);
  write(filename, code);
}

// 2) finalProject.ts 的完整參考解答
const fp = readFileSync(join(root, "data", "finalProject.ts"), "utf8");
const fpm = fp.match(/fullCode:\s*`([\s\S]*?)`,\s*\r?\n/);
if (fpm) write("final_project.py", fpm[1]);

// 3) advanced.ts 的升級範例
const adv = readFileSync(join(root, "data", "advanced.ts"), "utf8");
const embM = adv.match(/upgradeEmbeddingCode\s*=\s*`([\s\S]*?)`;/);
if (embM) write("upgrades/real_embedding.py", embM[1]);
const llmM = adv.match(/upgradeLlmCode\s*=\s*`([\s\S]*?)`;/);
if (llmM) write("upgrades/real_llm.py", llmM[1]);

// 4) requirements.txt 與 README.md
writeFileSync(
  join(out, "requirements.txt"),
  `# 課程中的核心範例皆使用 Python 標準庫，不需安裝任何套件。
# 若要把簡化版升級為真實系統（見 upgrades/），再安裝以下（擇需安裝）：
# sentence-transformers
# chromadb
# anthropic
`,
  "utf8",
);

writeFileSync(
  join(out, "README.md"),
  `# python-labs

由 \`scripts/export-labs.mjs\` 從課程內容自動產生的可執行 Python 範例。

## 執行

\`\`\`bash
python <檔名>.py
\`\`\`

核心範例只用 Python 標準庫，直接執行即可，不需安裝任何套件。

- \`day*_*.py\` — 各單元的範例
- \`final_project.py\` — 最終專案完整參考解答
- \`upgrades/\` — 升級為真實系統的範例（需安裝對應套件，見 requirements.txt）

> 重新產生：\`node scripts/export-labs.mjs\`
`,
  "utf8",
);

console.log(`\n完成，共輸出 ${count} 個 .py 檔到 python-labs/`);
