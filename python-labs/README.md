# python-labs

由 `scripts/export-labs.mjs` 從課程內容自動產生的可執行 Python 範例。

## 執行

```bash
python <檔名>.py
```

核心範例只用 Python 標準庫，直接執行即可，不需安裝任何套件。

- `day*_*.py` — 各單元的範例
- `final_project.py` — 最終專案完整參考解答
- `upgrades/` — 升級為真實系統的範例（需安裝對應套件，見 requirements.txt）

> 重新產生：`node scripts/export-labs.mjs`
