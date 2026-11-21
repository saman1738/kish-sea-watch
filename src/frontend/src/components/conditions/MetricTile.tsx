import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface MetricTileProps {
  label: string;
  value: string | null;
  unit?: string;
  /** Secondary line, e.g. compass direction. */
  detail?: string | null;
  /** Timestamp or "forecast estimate" marker. */
  caption?: string;
  /** 0–1 position for the signature tide-gauge rule. */
  gauge?: number;
  tone?: "default" | "inverse";
  className?: string;
  "data-ocid"?: string;
}

export function MetricTile({
  label,
  value,
  unit,
  detail,
  caption,
  gauge,
  tone = "default",
  className,
  "data-ocid": dataOcid,
}: MetricTileProps) {
  const inverse = tone === "inverse";
  const missing = value === null;
  return (
    <div
      data-ocid={dataOcid}
      className={cn(
        "relative flex min-w-0 flex-col gap-1 overflow-hidden rounded-xl border px-3 py-3",
        inverse
          ? "border-primary/20 bg-background/40"
          : "border-border/60 bg-secondary/40",
        className,
      )}
    >
      <span
        className={cn(
          "text-[0.66rem] font-semibold uppercase tracking-[0.16em]",
          inverse ? "text-primary/80" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
      <div className="flex min-w-0 items-baseline gap-1">
        <span
          className={cn(
            "numeric font-display text-2xl font-extrabold leading-none tracking-tight md:text-[1.75rem]",
            missing && "text-base font-medium",
            inverse ? "text-foreground" : "text-foreground",
            missing && "text-muted-foreground",
          )}
        >
          {value ?? "—"}
        </span>
        {!missing && unit ? (
          <span
            className={cn(
              "text-xs font-semibold",
              inverse ? "text-primary/80" : "text-muted-foreground",
            )}
          >
            {unit}
          </span>
        ) : null}
        {detail ? (
          <span className="ms-1 text-xs font-bold uppercase text-accent">
            {detail}
          </span>
        ) : null}
      </div>
      {caption ? (
        <span
          className={cn(
            "truncate text-[0.62rem] uppercase tracking-[0.08em]",
            inverse ? "text-muted-foreground" : "text-muted-foreground/80",
          )}
        >
          {caption}
        </span>
      ) : null}
      {typeof gauge === "number" ? (
        <span
          aria-hidden="true"
          className={cn(
            "mt-1 block h-0.5 w-full overflow-hidden rounded-full",
            inverse ? "bg-primary/15" : "bg-border",
          )}
        >
          <span
            className="block h-0.5 rounded-full bg-gradient-primary shadow-neon"
            style={{
              width: `${Math.round(Math.min(1, Math.max(0, gauge)) * 100)}%`,
            }}
          />
        </span>
      ) : null}
    </div>
  );
}
