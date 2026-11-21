import type { SuitabilityStatus } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";

const STATUS_KEY = {
  favorable: "status.favorable",
  caution: "status.caution",
  unfavorable: "status.unfavorable",
  insufficient: "status.insufficient",
} as const;

const STATUS_ICON = {
  favorable: CheckCircle2,
  caution: AlertTriangle,
  unfavorable: ShieldAlert,
  insufficient: HelpCircle,
} as const;

/** Distinct neon treatment per status: colour, glow, icon and label. */
const STATUS_CLASSES: Record<SuitabilityStatus, string> = {
  favorable:
    "border-success/60 bg-success/15 text-success shadow-[0_0_16px_-6px_oklch(0.8_0.16_172/0.85)]",
  caution:
    "border-warning/70 bg-warning/15 text-warning shadow-[0_0_16px_-6px_oklch(0.8_0.16_62/0.85)]",
  unfavorable:
    "border-destructive/70 bg-destructive/15 text-destructive shadow-[0_0_16px_-6px_oklch(0.63_0.24_12/0.85)]",
  insufficient:
    "border-border bg-secondary/60 text-muted-foreground shadow-none",
};

export function CompareStatus({
  status,
  className,
  "data-ocid": dataOcid,
}: {
  status: SuitabilityStatus;
  className?: string;
  "data-ocid"?: string;
}) {
  const { t } = useI18n();
  const Icon = STATUS_ICON[status];
  return (
    <span
      data-ocid={dataOcid}
      data-status={status}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em]",
        STATUS_CLASSES[status],
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      {t(STATUS_KEY[status])}
    </span>
  );
}
