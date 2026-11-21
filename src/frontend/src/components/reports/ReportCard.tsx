import type { Beach, Report } from "@/backend";
import { ReviewStatus } from "@/backend";
import {
  StatusBadge,
  type StatusTone,
} from "@/components/conditions/StatusBadge";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Clock, MapPin, ShieldQuestion } from "lucide-react";
import {
  REPORT_KIND_LABEL,
  REVIEW_STATUS_LABEL,
  formatReportTime,
} from "./report-meta";

const STATUS_TONE: Record<ReviewStatus, StatusTone> = {
  [ReviewStatus.unverified]: "warning",
  [ReviewStatus.verified]: "success",
  [ReviewStatus.dismissed]: "muted",
};

export function ReportCard({
  report,
  beach,
  index,
}: {
  report: Report;
  beach: Beach | undefined;
  index: number;
}) {
  const { t, pick, lang } = useI18n();
  const submitted = formatReportTime(report.submittedAt, lang);
  const beachName = beach ? pick(beach.nameEn, beach.nameFa) : null;
  const isUnverified = report.status === ReviewStatus.unverified;

  return (
    <li
      data-ocid={`reports.item.${index}`}
      className={cn(
        "surface-glass group relative overflow-hidden rounded-2xl p-4 transition-smooth hover:-translate-y-0.5 hover:border-accent/50",
        isUnverified && "border-warning/40",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 start-0 w-1",
          isUnverified ? "bg-warning/80" : "bg-gradient-primary",
        )}
      />
      <div className="flex flex-wrap items-start justify-between gap-2 ps-2">
        <div className="min-w-0">
          <p className="font-display text-base font-bold uppercase tracking-wide text-foreground">
            {t(REPORT_KIND_LABEL[report.kind])}
          </p>
          <p className="mt-1.5 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex min-w-0 items-center gap-1">
              <MapPin
                className="size-3 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.7)]"
                aria-hidden="true"
              />
              <span className="truncate font-semibold text-foreground/90">
                {beachName ?? t("common.noData")}
              </span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3 shrink-0" aria-hidden="true" />
              <span className="numeric font-mono">
                {submitted ?? t("common.noData")}
              </span>
            </span>
          </p>
        </div>
        <StatusBadge
          tone={STATUS_TONE[report.status]}
          data-ocid={`reports.status.${index}`}
        >
          {t(REVIEW_STATUS_LABEL[report.status])}
        </StatusBadge>
      </div>

      {report.note.trim() ? (
        <p className="mt-3 break-words rounded-xl border border-border/60 bg-background/40 px-3 py-2.5 text-sm leading-relaxed text-foreground/90">
          {report.note}
        </p>
      ) : null}

      {isUnverified ? (
        <p className="mt-2.5 flex items-center gap-1.5 ps-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-warning/90">
          <ShieldQuestion className="size-3.5 shrink-0" aria-hidden="true" />
          {t("reports.unverifiedLabel")}
        </p>
      ) : null}
    </li>
  );
}
