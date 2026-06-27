// 以 CDN lazy-load Pyodide（只在使用者第一次點「執行」時才下載）。
// 全站共用同一個實例（module 層級的 promise 快取）。

const PYODIDE_VERSION = "0.26.4";
const BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise: Promise<unknown> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-pyodide="1"]`)) return resolve();
    const el = document.createElement("script");
    el.src = src;
    el.dataset.pyodide = "1";
    el.onload = () => resolve();
    el.onerror = () => reject(new Error("無法載入 Pyodide（請檢查網路連線）"));
    document.head.appendChild(el);
  });
}

/** 取得（必要時載入）Pyodide 實例。 */
export function getPyodide(): Promise<any> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScript(BASE + "pyodide.js");
      // @ts-expect-error window.loadPyodide 由 CDN 腳本注入
      const py = await window.loadPyodide({ indexURL: BASE });
      return py;
    })().catch((err) => {
      pyodidePromise = null; // 失敗後允許重試
      throw err;
    });
  }
  return pyodidePromise as Promise<any>;
}

/** 是否已開始/完成載入（用來決定要不要顯示「載入中」）。 */
export function isPyodideStarted(): boolean {
  return pyodidePromise !== null;
}
