"use client";

import { useState } from "react";
import { Loader2, Play } from "lucide-react";
import { getPyodide, isPyodideStarted } from "@/lib/pyodide";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "running" | "done" | "error";

/** 在瀏覽器以 Pyodide 執行 Python，並顯示輸出。 */
export function PyRunner({ code }: { code: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [output, setOutput] = useState("");

  const busy = status === "loading" || status === "running";

  async function run() {
    setOutput("");
    setStatus(isPyodideStarted() ? "running" : "loading");
    try {
      const py = await getPyodide();
      setStatus("running");
      let buf = "";
      const append = (s: string) => {
        buf += s + "\n";
      };
      py.setStdout({ batched: append });
      py.setStderr({ batched: append });
      await py.runPythonAsync(code);
      setOutput(buf.trimEnd() || "（程式沒有輸出）");
      setStatus("done");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setOutput(msg);
      setStatus("error");
    }
  }

  return (
    <div className="border-t border-zinc-800">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <button
          type="button"
          onClick={run}
          disabled={busy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-60",
            "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25",
          )}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> 載入 Python 執行環境…
            </>
          ) : status === "running" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> 執行中…
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" /> 執行
            </>
          )}
        </button>
        <span className="text-[11px] text-zinc-500">在瀏覽器以 Pyodide 執行</span>
      </div>

      {output !== "" && (
        <div className="border-t border-zinc-800">
          <p className="px-4 pt-2 text-[11px] font-medium text-zinc-500">輸出</p>
          <pre
            className={cn(
              "max-h-72 overflow-auto px-4 pb-3 pt-1 font-mono text-xs leading-relaxed",
              status === "error" ? "text-red-300" : "text-zinc-200",
            )}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
