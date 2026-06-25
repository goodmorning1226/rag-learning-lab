import { FlowArrow } from "./primitives";
import { cn } from "@/lib/utils";

function ChunkBar({ label, cells }: { label: string; cells: [string, boolean][] }) {
  return (
    <div className="flex-1">
      <div className="flex overflow-hidden rounded-lg border border-border">
        {cells.map(([t, overlap], i) => (
          <div
            key={i}
            className={cn(
              "flex-1 px-2 py-3 text-center text-xs",
              overlap ? "bg-primary/15 font-medium text-primary" : "bg-muted/40",
            )}
          >
            {t}
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/** Chunking：原始文件如何被切成帶 overlap 的 chunks。 */
export function ChunkingDiagram() {
  return (
    <div className="space-y-3">
      <div>
        <p className="mb-1 text-xs font-medium text-muted-foreground">原始文件</p>
        <div className="flex overflow-hidden rounded-lg border border-border">
          {["A", "B", "C", "D", "E", "F", "G"].map((t) => (
            <div
              key={t}
              className="flex-1 border-r border-border/60 bg-muted/40 px-2 py-3 text-center text-xs last:border-r-0"
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <FlowArrow className="mx-auto md:rotate-90" />

      <div>
        <p className="mb-1 text-xs font-medium text-muted-foreground">切成帶 overlap 的 chunks</p>
        <div className="flex flex-col gap-3 md:flex-row">
          <ChunkBar label="Chunk 1" cells={[["A", false], ["B", false], ["C", true]]} />
          <ChunkBar label="Chunk 2" cells={[["C", true], ["D", false], ["E", true]]} />
          <ChunkBar label="Chunk 3" cells={[["E", true], ["F", false], ["G", false]]} />
        </div>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-primary/50 align-middle" />
        標示的格子是相鄰 chunk 重疊（overlap）的部分，避免語意被從邊界切斷。
      </p>
    </div>
  );
}
