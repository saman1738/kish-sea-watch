import { type Report, ReviewStatus, createActor } from "@/backend";
import {
  StatusBadge,
  type StatusTone,
} from "@/components/conditions/StatusBadge";
import { Button } from "@/components/ui/button";
import { useBeaches } from "@/hooks/use-beaches";
import { REPORTS_KEY, useReports } from "@/hooks/use-reports";
import { useI18n } from "@/lib/i18n";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Loader2, X } from "lucide-react";
import { useState } from "react";
import { REPORT_KIND_KEY, formatTimestamp } from "./admin-utils";

const STATUS_TONE: Record<ReviewStatus, StatusTone> = {
  unverified: "warning",
  verified: "success",
  dismissed: "muted",
};

const STATUS_KEY = {
  unverified: "common.unverified",
  verified: "common.verified",
  dismissed: "common.dismissed",
} as const;

function useReviewReport() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id: bigint; status: ReviewStatus }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.reviewReport(input.id, input.status);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: REPORTS_KEY });
    },
  });
}

function ReportRow({
  report,
  beachName,
  index,
}: {
  report: Report;
  beachName: string;
  index: number;
}) {
  const { t, lang } = useI18n();
  const review = useReviewReport();
  const [error, setError] = useState<string | null>(null);
  const locale = lang === "fa" ? "fa-IR" : "en-US";
  const submitted = formatTimestamp(report.submittedAt, locale);

  function setStatus(status: ReviewStatus) {
    setError(null);
    review.mutate(
      { id: report.id, status },
      { onError: () => setError(t("admin.beach.error")) },
    );
  }

  return (
    <li
      data-ocid={`admin.report.item.${index + 1}`}
      className="surface-glass rounded-2xl p-3.5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
          {t(REPORT_KIND_KEY[report.kind])}
        </span>
        <StatusBadge tone={STATUS_TONE[report.status]}>
          {t(STATUS_KEY[report.status])}
        </StatusBadge>
        <span className="numeric ms-auto font-mono text-[0.7rem] text-muted-foreground">
          {submitted ?? t("common.noData")}
        </span>
      </div>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
        {beachName}
      </p>
      {report.note ? (
        <p className="mt-2 break-words text-sm leading-relaxed text-foreground">
          {report.note}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          type="button"
          data-ocid={`admin.report.verify_button.${index + 1}`}
          onClick={() => setStatus(ReviewStatus.verified)}
          disabled={review.isPending || report.status === ReviewStatus.verified}
          className="min-h-10 rounded-full border border-success/50 bg-success/15 px-3.5 font-bold uppercase tracking-[0.06em] text-success hover:bg-success/25 hover:text-success"
        >
          {review.isPending ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Check className="size-3.5" aria-hidden="true" />
          )}
          {t("admin.report.verify")}
        </Button>
        <Button
          type="button"
          variant="outline"
          data-ocid={`admin.report.dismiss_button.${index + 1}`}
          onClick={() => setStatus(ReviewStatus.dismissed)}
          disabled={
            review.isPending || report.status === ReviewStatus.dismissed
          }
          className="min-h-10 rounded-full border-border bg-transparent px-3.5 font-bold uppercase tracking-[0.06em] text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="size-3.5" aria-hidden="true" />
          {t("admin.report.dismiss")}
        </Button>
      </div>
    </li>
  );
}

export function ReportReview() {
  const { t, pick } = useI18n();
  const reports = useReports();
  const beaches = useBeaches();

  const beachName = (beachId: bigint) => {
    const beach = beaches.data?.find((b) => b.id === beachId);
    return beach ? pick(beach.nameEn, beach.nameFa) : t("common.noData");
  };

  const sorted = [...(reports.data ?? [])].sort((a, b) =>
    a.submittedAt === b.submittedAt
      ? 0
      : a.submittedAt > b.submittedAt
        ? -1
        : 1,
  );

  return (
    <section data-ocid="admin.reports.section" className="space-y-4">
      <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-foreground">
        {t("admin.tab.reports")}
      </h2>

      {reports.isLoading ? (
        <p
          data-ocid="admin.reports.loading_state"
          className="text-sm text-muted-foreground"
        >
          {t("common.loading")}
        </p>
      ) : reports.isError ? (
        <div
          data-ocid="admin.reports.error_state"
          role="alert"
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive backdrop-blur"
        >
          {t("reports.error")}
          <Button
            type="button"
            variant="outline"
            data-ocid="admin.reports.retry_button"
            onClick={() => void reports.refetch()}
            className="min-h-10 rounded-full border-destructive/50 bg-transparent text-destructive hover:bg-destructive/15 hover:text-destructive"
          >
            {t("common.retry")}
          </Button>
        </div>
      ) : sorted.length > 0 ? (
        <ul data-ocid="admin.reports.list" className="space-y-2.5">
          {sorted.map((report, index) => (
            <ReportRow
              key={report.id.toString()}
              report={report}
              index={index}
              beachName={beachName(report.beachId)}
            />
          ))}
        </ul>
      ) : (
        <p
          data-ocid="admin.reports.empty_state"
          className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-6 text-center text-sm text-muted-foreground"
        >
          {t("admin.report.empty")}
        </p>
      )}
    </section>
  );
}
