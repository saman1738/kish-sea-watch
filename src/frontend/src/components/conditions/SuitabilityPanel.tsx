import {
  STATUS_TONE,
  type SuitabilityResult,
  type SuitabilityStatus,
} from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";

const STATUS_KEY: Record<
  SuitabilityStatus,
  | "status.favorable"
  | "status.caution"
  | "status.unfavorable"
  | "status.insufficient"
> = {
  favorable: "status.favorable",
  caution: "status.caution",
  unfavorable: "status.unfavorable",
  insufficient: "status.insufficient",
};

const STATUS_DESC_KEY: Record<
  SuitabilityStatus,
  | "status.favorable.desc"
  | "status.caution.desc"
  | "status.unfavorable.desc"
  | "status.insufficient.desc"
> = {
  favorable: "status.favorable.desc",
  caution: "status.caution.desc",
  unfavorable: "status.unfavorable.desc",
  insufficient: "status.insufficient.desc",
};

const STATUS_ICON: Record<SuitabilityStatus, typeof CheckCircle2> = {
  favorable: CheckCircle2,
  caution: AlertTriangle,
  unfavorable: ShieldAlert,
  insufficient: HelpCircle,
};

/** Accent rule colour per status, used for the panel's signature top edge. */
const STATUS_EDGE: Record<SuitabilityStatus, string> = {
  favorable: "from-success via-success/40 to-transparent",
  caution: "from-warning via-warning/40 to-transparent",
  unfavorable: "from-destructive via-destructive/40 to-transparent",
  insufficient: "from-muted-foreground via-muted-foreground/30 to-transparent",
};

export function SuitabilityBadge({
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
    <StatusBadge
      tone={STATUS_TONE[status]}
      className={cn("uppercase", className)}
      icon={<Icon className="size-3.5" aria-hidden="true" />}
      data-ocid={dataOcid}
    >
      {t(STATUS_KEY[status])}
    </StatusBadge>
  );
}

export function SuitabilityPanel({
  result,
  beachName,
  className,
}: {
  result: SuitabilityResult;
  beachName?: string;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <section
      data-ocid="suitability.panel"
      aria-labelledby="suitability-title"
      className={cn(
        "surface-glass relative flex flex-col overflow-hidden rounded-2xl p-5",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r",
          STATUS_EDGE[result.status],
        )}
      />
      <h2 id="suitability-title" className="label-caps text-primary">
        {t("section.suitability")}
      </h2>
      <div className="mt-3">
        <SuitabilityBadge
          status={result.status}
          data-ocid="suitability.badge"
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground">
        {t(STATUS_DESC_KEY[result.status])}
        {beachName ? ` ${beachName}.` : ""}
      </p>
      {result.reasons.length > 0 ? (
        <ul className="mt-3 space-y-1.5 border-t border-border/60 pt-3">
          {result.reasons.map((reason) => (
            <li
              key={reason}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span
                className="mt-1.5 size-1 shrink-0 rounded-full bg-accent shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]"
                aria-hidden="true"
              />
              {reason}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-auto pt-3 text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
        {t("common.forecast")} · {t("section.dataQuality")}: {result.coverage}%
      </p>
    </section>
  );
}
