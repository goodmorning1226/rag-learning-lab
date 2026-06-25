import { AlertTriangle, Info, KeyRound, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "tip" | "warning" | "key";

const styles: Record<
  CalloutVariant,
  { wrap: string; icon: React.ComponentType<{ className?: string }>; iconColor: string }
> = {
  info: { wrap: "border-primary/30 bg-primary/5", icon: Info, iconColor: "text-primary" },
  tip: { wrap: "border-success/30 bg-success/5", icon: Lightbulb, iconColor: "text-success" },
  warning: { wrap: "border-warning/40 bg-warning/5", icon: AlertTriangle, iconColor: "text-warning" },
  key: { wrap: "border-success/30 bg-success/5", icon: KeyRound, iconColor: "text-success" },
};

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ variant = "info", title, children, className }: CalloutProps) {
  const s = styles[variant];
  const Icon = s.icon;
  return (
    <div className={cn("flex gap-3 rounded-lg border p-4", s.wrap, className)}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", s.iconColor)} />
      <div className="min-w-0 space-y-1 text-sm leading-relaxed">
        {title && <p className="font-semibold text-foreground">{title}</p>}
        <div className="text-foreground/90">{children}</div>
      </div>
    </div>
  );
}
