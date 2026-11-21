import type { Beach, Report } from "@/backend";
import { ConditionsError } from "@/components/conditions/ConditionsStates";
import { PageHeader, PageShell } from "@/components/layout/PageHeader";
import { ReportCard } from "@/components/reports/ReportCard";
import { ReportForm } from "@/components/reports/ReportForm";
import { Button } from "@/components/ui/button";
import { useBeaches } from "@/hooks/use-beaches";
import { useReports } from "@/hooks/use-reports";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ClipboardList, MessageSquarePlus, Waves } from "lucide-react";
import { useMemo, useState } from "react";

const SKELETON_IDS = Array.from(
  { length: 4 },
  (_, i) => `report-skeleton-${i}`,
);

function ReportSkeleton() {
  const { t } = useI18n();
  return (
    <div
      data-ocid="reports.loading_state"
      aria-busy="true"
      className="flex flex-col gap-3"
    >
      <span className="sr-only">{t("common.loading")}</span>
      {SKELETON_IDS.map((id) => (
        <div
          key={id}
          className="h-28 animate-pulse rounded-2xl border border-border/60 bg-secondary/40 motion-reduce:animate-none"
        />
      ))}
    </div>
  );
}

export default function ReportsPage() {
  const { t, pick } = useI18n();
  const reportsQuery = useReports();
  const beachesQuery = useBeaches();
  const [beachFilter, setBeachFilter] = useState<string>("all");

  const beaches = beachesQuery.data ?? [];
  const beachById = useMemo(() => {
    const map = new Map<string, Beach>();
    for (const beach of beaches) map.set(beach.id.toString(), beach);
    return map;
  }, [beaches]);

  const reports = useMemo<Report[]>(() => {
    const all = reportsQuery.data ?? [];
    const sorted = [...all].sort((a, b) =>
      a.submittedAt === b.submittedAt
        ? 0
        : a.submittedAt > b.submittedAt
          ? -1
          : 1,
    );
    if (beachFilter === "all") return sorted;
    return sorted.filter((report) => report.beachId.toString() === beachFilter);
  }, [reportsQuery.data, beachFilter]);

  const filterOptions = [
    { id: "all", label: t("common.allBeaches") },
    ...beaches.map((beach) => ({
      id: beach.id.toString(),
      label: pick(beach.nameEn, beach.nameFa),
    })),
  ];

  return (
    <PageShell data-ocid="reports.page">
      <PageHeader
        eyebrow={t("app.name")}
        title={t("reports.title")}
        subtitle={t("reports.subtitle")}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section aria-labelledby="reports-feed-heading" className="min-w-0">
          <div className="surface-glass rounded-2xl p-4">
            <div className="flex items-center justify-between gap-3">
              <h2
                id="reports-feed-heading"
                className="flex items-center gap-2 font-display text-base font-extrabold uppercase tracking-wide text-foreground"
              >
                <ClipboardList
                  className="size-4 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.7)]"
                  aria-hidden="true"
                />
                {t("reports.feedHeading")}
              </h2>
              <span className="numeric rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
                {reports.length}
              </span>
            </div>

            <fieldset
              aria-label={t("reports.beachFilterLabel")}
              data-ocid="reports.filter.tabs"
              className="scrollbar-slim -mx-1 mt-3 flex gap-2 overflow-x-auto border-0 px-1 pb-1"
            >
              {filterOptions.map((option, optionIndex) => {
                const active = beachFilter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    data-ocid={`reports.filter.tab.${optionIndex}`}
                    aria-pressed={active}
                    onClick={() => setBeachFilter(option.id)}
                    className={cn(
                      "min-h-11 shrink-0 rounded-full border px-4 text-xs font-bold uppercase tracking-wide transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "border-transparent bg-gradient-primary text-primary-foreground shadow-neon"
                        : "border-border bg-background/50 text-muted-foreground hover:border-accent/60 hover:text-foreground",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </fieldset>
          </div>

          <div className="mt-4">
            {reportsQuery.isPending ? (
              <ReportSkeleton />
            ) : reportsQuery.isError ? (
              <ConditionsError
                onRetry={() => void reportsQuery.refetch()}
                isRetrying={reportsQuery.isFetching}
              />
            ) : reports.length === 0 ? (
              <div
                data-ocid="reports.empty_state"
                className="surface-glass flex flex-col items-center gap-3 rounded-2xl border-dashed px-6 py-12 text-center"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-neon">
                  <MessageSquarePlus className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-base font-bold uppercase tracking-wide text-foreground">
                    {beachFilter !== "all"
                      ? t("reports.emptyFeed")
                      : t("reports.empty")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("reports.emptyBody")}
                  </p>
                </div>
                {beachFilter !== "all" ? (
                  <Button
                    type="button"
                    variant="outline"
                    data-ocid="reports.clear_filter_button"
                    onClick={() => setBeachFilter("all")}
                    className="min-h-11 rounded-full border-accent/50 bg-transparent text-accent-foreground hover:bg-accent/10"
                  >
                    {t("common.allBeaches")}
                  </Button>
                ) : null}
              </div>
            ) : (
              <ul data-ocid="reports.list" className="flex flex-col gap-3">
                {reports.map((report, index) => (
                  <ReportCard
                    key={report.id.toString()}
                    report={report}
                    beach={beachById.get(report.beachId.toString())}
                    index={index + 1}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>

        <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
          <ReportForm />
          <p className="mt-3 flex items-start gap-2 px-1 text-xs leading-relaxed text-muted-foreground">
            <Waves
              className="mt-0.5 size-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            {t("reports.subtitle")}
          </p>
        </aside>
      </div>
    </PageShell>
  );
}
