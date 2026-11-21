import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type StatusTone =
  | "success"
  | "warning"
  | "destructive"
  | "muted"
  | "accent";

const TONE_CLASSES: Record<StatusTone, string> = {
  success:
    "border-success/50 bg-success/15 text-success shadow-[0_0_18px_-6px_oklch(0.8_0.16_172/0.7)]",
  warning:
    "border-warning/60 bg-warning/15 text-warning shadow-[0_0_18px_-6px_oklch(0.8_0.16_62/0.7)]",
  destructive:
    "border-destructive/60 bg-destructive/15 text-destructive shadow-[0_0_18px_-6px_oklch(0.63_0.24_12/0.7)]",
  muted: "border-border bg-secondary/50 text-muted-foreground",
  accent:
    "border-accent/50 bg-accent/15 text-accent shadow-[0_0_18px_-6px_oklch(0.68_0.24_345/0.7)]",
};

export function StatusBadge({
  tone,
  children,
  className,
  icon,
  "data-ocid": dataOcid,
}: {
  tone: StatusTone;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  "data-ocid"?: string;
}) {
  return (
    <span
      data-ocid={dataOcid}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em]",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
