import type { Beach } from "@/backend";
import { CompareBeachCard } from "@/components/compare/CompareBeachCard";
import { CompareDisclaimer } from "@/components/compare/CompareDisclaimer";
import { CompareMatrix } from "@/components/compare/CompareMatrix";
import { ConditionsError } from "@/components/conditions/ConditionsStates";
import { LastUpdated } from "@/components/layout/LastUpdated";
import { PageHeader, PageShell } from "@/components/layout/PageHeader";
import { useBeaches } from "@/hooks/use-beaches";
import { useConditions } from "@/hooks/use-conditions";
import { type ActivityKey, rankActivities } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const ACTIVITY_KEY = {
  swimming: "activity.swimming",
  fishing: "activity.fishing",
  surfing: "activity.surfing",
  kayaking: "activity.kayaking",
} as const;

const ACTIVITIES: ActivityKey[] = [
  "swimming",
  "fishing",
  "surfing",
  "kayaking",
];

function BeachColumn({
  beach,
  index,
  isBest,
}: {
  beach: Beach;
  index: number;
  isBest: boolean;
}) {
  const { lang } = useI18n();
  const query = useConditions(beach.latitude, beach.longitude);
  const rankings = useMemo(
    () => rankActivities(query.data?.current ?? null, lang),
    [query.data, lang],
  );

  if (query.isPending) {
    return (
      <div
        data-ocid={`compare.loading_state.${index}`}
        aria-busy="true"
        className="surface-glass flex flex-col gap-2 rounded-2xl p-4"
      >
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="mt-2 space-y-2">
          {["a", "b", "c", "d"].map((slot) => (
            <div
              key={slot}
              className="h-12 animate-pulse rounded-lg bg-muted/70"
            />
          ))}
        </div>
      </div>
    );
  }

  if (query.isError) {
    return (
      <ConditionsError
        onRetry={() => void query.refetch()}
        isRetrying={query.isFetching}
        className="h-full"
      />
    );
  }

  return (
    <CompareBeachCard
      beach={beach}
      rankings={rankings}
      position={index}
      isBest={isBest}
    />
  );
}

/**
 * Mobile per-beach card: owns the beach's conditions query so the compact view
 * ranks all four activities with a status and written reason.
 */
function MatrixRow({ beach, index }: { beach: Beach; index: number }) {
  const { lang } = useI18n();
  const query = useConditions(beach.latitude, beach.longitude);
  const rankings = useMemo(
    () => rankActivities(query.data?.current ?? null, lang),
    [query.data, lang],
  );

  if (query.isPending) {
    return (
      <div
        data-ocid={`compare.loading_state.${index}`}
        aria-busy="true"
        className="surface-glass flex flex-col gap-2 rounded-2xl p-4"
      >
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="mt-2 space-y-2">
          {["a", "b", "c", "d"].map((slot) => (
            <div
              key={slot}
              className="h-10 animate-pulse rounded-lg bg-muted/70"
            />
          ))}
        </div>
      </div>
    );
  }

  if (query.isError) {
    return (
      <ConditionsError
        onRetry={() => void query.refetch()}
        isRetrying={query.isFetching}
      />
    );
  }

  return <CompareMatrix rows={[{ beach, rankings }]} />;
}

/** Best beach per activity, derived from the same rankings shown in the cards. */
function BestPerActivity({ beaches }: { beaches: Beach[] }) {
  const { t } = useI18n();

  return (
    <section
      data-ocid="compare.best_section"
      className="surface-glass rounded-2xl p-4"
    >
      <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.1em] text-foreground">
        {t("compare.bestPerActivity")}
      </h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIVITIES.map((activity) => (
          <BestActivityItem
            key={activity}
            activity={activity}
            beaches={beaches}
          />
        ))}
      </ul>
    </section>
  );
}

/** One activity summary: owns a query per beach so hooks stay at the top level. */
function BestActivityItem({
  activity,
  beaches,
}: {
  activity: ActivityKey;
  beaches: Beach[];
}) {
  const { t } = useI18n();

  return (
    <li
      data-ocid={`compare.best.${activity}`}
      className="min-w-0 rounded-xl border border-border/60 bg-background/40 px-3 py-2"
    >
      <p className="label-caps truncate">{t(ACTIVITY_KEY[activity])}</p>
      <BestActivityWinner activity={activity} beaches={beaches} />
    </li>
  );
}

function BestActivityWinner({
  activity,
  beaches,
}: {
  activity: ActivityKey;
  beaches: Beach[];
}) {
  const { pick, t } = useI18n();
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const report = useCallback((beachId: string, status: string) => {
    setStatuses((prev) =>
      prev[beachId] === status ? prev : { ...prev, [beachId]: status },
    );
  }, []);

  const winner = useMemo(() => {
    let best: Beach | null = null;
    let bestStatus = "";
    for (const beach of beaches) {
      const status = statuses[beach.id.toString()];
      if (!status || status === "insufficient" || status === "unfavorable") {
        continue;
      }
      if (!best || (bestStatus === "caution" && status === "favorable")) {
        best = beach;
        bestStatus = status;
      }
    }
    return best;
  }, [beaches, statuses]);

  return (
    <>
      <p
        className={cn(
          "mt-1 truncate font-display text-sm font-bold",
          winner ? "text-gradient-accent" : "text-muted-foreground",
        )}
      >
        {winner ? pick(winner.nameEn, winner.nameFa) : t("common.noData")}
      </p>
      <div className="hidden">
        {beaches.map((beach) => (
          <BestActivityProbe
            key={beach.id.toString()}
            beach={beach}
            activity={activity}
            onStatus={report}
          />
        ))}
      </div>
    </>
  );
}

/** Reports one beach's status for an activity to its parent summary. */
function BestActivityProbe({
  beach,
  activity,
  onStatus,
}: {
  beach: Beach;
  activity: ActivityKey;
  onStatus: (beachId: string, status: string) => void;
}) {
  const { lang } = useI18n();
  const query = useConditions(beach.latitude, beach.longitude);
  const status = useMemo(() => {
    const ranking = rankActivities(query.data?.current ?? null, lang).find(
      (r) => r.activity === activity,
    );
    return ranking?.result.status ?? "insufficient";
  }, [query.data, lang, activity]);

  useEffect(() => {
    onStatus(beach.id.toString(), status);
  }, [beach.id, status, onStatus]);

  return null;
}

export default function ComparePage() {
  const { t } = useI18n();
  const beachesQuery = useBeaches();
  const beaches = beachesQuery.data ?? [];

  const refreshAll = () => {
    void beachesQuery.refetch();
  };

  const fetchedAt = beachesQuery.dataUpdatedAt
    ? new Date(beachesQuery.dataUpdatedAt).toISOString()
    : null;

  return (
    <PageShell>
      <PageHeader
        eyebrow={t("app.tagline")}
        title={t("compare.title")}
        subtitle={t("compare.subtitle")}
        actions={
          <LastUpdated
            fetchedAt={fetchedAt}
            onRefresh={refreshAll}
            isRefreshing={beachesQuery.isFetching}
          />
        }
      />

      <CompareDisclaimer className="mt-5" />

      <div className="mt-5">
        {beachesQuery.isPending ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {["s1", "s2", "s3", "s4"].map((slot) => (
              <div
                key={slot}
                className="h-64 animate-pulse rounded-2xl border border-border bg-card"
              />
            ))}
          </div>
        ) : beachesQuery.isError ? (
          <ConditionsError
            onRetry={refreshAll}
            isRetrying={beachesQuery.isFetching}
          />
        ) : beaches.length === 0 ? (
          <div
            data-ocid="compare.empty_state"
            className="surface-glass flex flex-col items-start gap-3 rounded-2xl p-6"
          >
            <Compass className="size-6 text-accent" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              {t("compare.empty")}
            </p>
            <Link
              to="/"
              className="text-sm font-semibold text-primary underline underline-offset-4 hover:text-accent"
            >
              {t("nav.dashboard")}
            </Link>
          </div>
        ) : (
          <>
            <BestPerActivity beaches={beaches} />

            <h2 className="mt-6 font-display text-lg font-extrabold uppercase tracking-tight text-foreground">
              {t("compare.heading")}
            </h2>

            <div className="mt-3 flex flex-col gap-3 md:hidden">
              {beaches.map((beach, index) => (
                <MatrixRow
                  key={beach.id.toString()}
                  beach={beach}
                  index={index}
                />
              ))}
            </div>
            <div className="mt-3 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
              {beaches.map((beach, index) => (
                <BeachColumn
                  key={beach.id.toString()}
                  beach={beach}
                  index={index}
                  isBest={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}
