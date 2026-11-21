import type { Report, ReviewStatus } from "@/backend";
import {
  StatusBadge,
  type StatusTone,
} from "@/components/conditions/StatusBadge";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ClipboardList } from "lucide-react";

const STATUS_TONE: Record<ReviewStatus, StatusTone> = {
  verified: "success",
  unverified: "warning",
  dismissed: "muted",
};

const STATUS_KEY: Record<
  ReviewStatus,
  "common.verified" | "common.unverified" | "common.dismissed"
> = {
  verified: "common.verified",
  unverified: "common.unverified",
  dismissed: "common.dismissed",
};

const KIND_KEY = {
  strongCurrents: "reports.kind.strongCurrents",
  waterClarity: "reports.kind.waterClarity",
  unusualWaves: "reports.kind.unusualWaves",
  jellyfish: "reports.kind.jellyfish",
  calmWater: "reports.kind.calmWater",
  otherHazard: "reports.kind.otherHazard",
  roughWater: "reports.kind.roughWater",
} as const;

/** Backend timestamps are nanosecond bigints. */
function formatSubmittedAt(
  timestamp: bigint,
  lang: "en" | "fa",
): string | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tehran",
    hour12: false,
  }).format(date);
}

export function BeachReports({
  reports,
  className,
}: {
  reports: Report[];
  className?: string;
}) {
  const { t, lang } = useI18n();
  const sorted = [...reports].sort((a, b) =>
    a.submittedAt === b.submittedAt
      ? 0
      : a.submittedAt < b.submittedAt
        ? 1
        : -1,
  );

  return (
    <section
      data-ocid="beach.reports_section"
      aria-labelledby="beach-reports-title"
      className={cn("surface-glass rounded-2xl p-5", className)}
    >
      <div className="flex items-start justify-between gap-2">
        <h2
          id="beach-reports-title"
          className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-tight text-foreground"
        >
          <ClipboardList className="size-4 text-accent" aria-hidden="true" />
          {t("section.reports")}
        </h2>
        <span className="shrink-0 rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-warning">
          {t("reports.unverifiedLabel")}
        </span>
      </div>

      {sorted.length === 0 ? (
        <div
          data-ocid="beach.reports.empty_state"
          className="mt-4 rounded-xl border border-dashed border-border bg-background/30 p-4"
        >
          <p className="text-sm font-medium text-foreground">
            {t("reports.empty")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("reports.emptyBody")}
          </p>
        </div>
      ) : (
        <ul data-ocid="beach.reports.list" className="mt-3 space-y-2">
          {sorted.map((report, index) => {
            const submitted = formatSubmittedAt(report.submittedAt, lang);
            return (
              <li
                key={report.id.toString()}
                data-ocid={`beach.reports.item.${index + 1}`}
                className="rounded-xl border border-border/70 bg-background/35 p-3 transition-smooth hover:border-accent/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                    {t(KIND_KEY[report.kind])}
                  </span>
                  <StatusBadge
                    tone={STATUS_TONE[report.status]}
                    data-ocid={`beach.reports.status.${index + 1}`}
                  >
                    {t(STATUS_KEY[report.status])}
                  </StatusBadge>
                </div>
                {report.note ? (
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                    {report.note}
                  </p>
                ) : null}
                <p className="mt-1.5 text-[0.65rem] text-muted-foreground">
                  {t("reports.submittedAt")}:{" "}
                  <span className="numeric font-mono">
                    {submitted ?? t("common.noData")}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
