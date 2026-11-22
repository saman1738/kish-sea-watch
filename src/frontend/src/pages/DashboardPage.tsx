import type { Beach } from "@/backend";
import {
  BackendError,
  ConditionsError,
  ConditionsSkeleton,
} from "@/components/conditions/ConditionsStates";
import { SuitabilityPanel } from "@/components/conditions/SuitabilityPanel";
import { UvAdvicePanel } from "@/components/conditions/UvAdvicePanel";
import { CurrentConditions } from "@/components/dashboard/CurrentConditions";
import { DailyForecast } from "@/components/dashboard/DailyForecast";
import { DashboardEmpty } from "@/components/dashboard/DashboardEmpty";
import { ForecastCharts } from "@/components/dashboard/ForecastCharts";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { HourlyStrip } from "@/components/dashboard/HourlyStrip";
import { SafetyNote } from "@/components/dashboard/SafetyNote";
import { WarningsPanel } from "@/components/dashboard/WarningsPanel";
import { PageShell } from "@/components/layout/PageHeader";
import { useBeaches } from "@/hooks/use-beaches";
import { useConditions } from "@/hooks/use-conditions";
import { usePublishedWarnings } from "@/hooks/use-warnings";
import { assessSuitability } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { upcomingHours } from "@/lib/marine";
import { useMemo, useState } from "react";

export default function DashboardPage() {
  const { pick, lang } = useI18n();
  const beachesQuery = useBeaches();
  const warningsQuery = usePublishedWarnings();
  const [selectedId, setSelectedId] = useState<bigint | null>(null);

  const beaches: Beach[] = beachesQuery.data ?? [];
  const activeBeach =
    beaches.find((beach) => beach.id === selectedId) ?? beaches[0] ?? null;

  const conditions = useConditions(
    activeBeach?.latitude ?? null,
    activeBeach?.longitude ?? null,
  );

  const snapshot = conditions.data ?? null;
  const hours = useMemo(
    () => (snapshot ? upcomingHours(snapshot.hourly, 24) : []),
    [snapshot],
  );
  const suitability = useMemo(
    () => assessSuitability(snapshot?.current ?? null, { lang }),
    [snapshot, lang],
  );

  const warnings = useMemo(() => {
    const all = warningsQuery.data ?? [];
    if (!activeBeach) return all.filter((w) => w.beachId === undefined);
    return all.filter(
      (w) => w.beachId === undefined || w.beachId === activeBeach.id,
    );
  }, [warningsQuery.data, activeBeach]);

  const beachName = activeBeach
    ? pick(activeBeach.nameEn, activeBeach.nameFa)
    : undefined;

  const refresh = () => {
    void beachesQuery.refetch();
    void conditions.refetch();
  };

  const isRefreshing = conditions.isFetching || beachesQuery.isFetching;
  const backendFailed = beachesQuery.isError && beaches.length === 0;
  const showError = conditions.isError && !snapshot;
  const showLoading = conditions.isPending && !snapshot;
  // Only show live metrics once a beach is known and its conditions resolved;
  // otherwise the hero would present "No data" as if it were a reading.
  const showHeroMetrics = !!activeBeach && !!snapshot;

  return (
    <PageShell data-ocid="dashboard.page">
      <HeroSection
        beaches={beaches}
        activeBeach={activeBeach}
        onSelect={setSelectedId}
        snapshot={snapshot}
        suitability={snapshot ? suitability : null}
        fetchedAt={snapshot?.fetchedAt ?? null}
        onRefresh={refresh}
        isRefreshing={isRefreshing}
        showMetrics={showHeroMetrics}
      />

      {backendFailed ? (
        <BackendError
          className="mt-6"
          onRetry={refresh}
          isRetrying={beachesQuery.isFetching}
        />
      ) : beachesQuery.isPending ? (
        <ConditionsSkeleton className="mt-6" />
      ) : beaches.length === 0 ? (
        <DashboardEmpty className="mt-6" />
      ) : showError ? (
        <ConditionsError
          className="mt-6"
          onRetry={refresh}
          isRetrying={isRefreshing}
        />
      ) : showLoading ? (
        <ConditionsSkeleton className="mt-6" />
      ) : snapshot ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="flex min-w-0 flex-col gap-4">
            <CurrentConditions snapshot={snapshot} suitability={suitability} />
            <HourlyStrip hours={hours} />
            <ForecastCharts hours={hours} />
            <DailyForecast days={snapshot.daily.slice(0, 7)} />
          </div>

          <aside className="flex min-w-0 flex-col gap-4">
            <SuitabilityPanel result={suitability} beachName={beachName} />
            <UvAdvicePanel
              uv={snapshot.current?.uvIndex ?? null}
              dailyMax={snapshot.daily[0]?.uvMax ?? null}
            />
            <WarningsPanel warnings={warnings} />
            <SafetyNote />
          </aside>
        </div>
      ) : null}
    </PageShell>
  );
}
