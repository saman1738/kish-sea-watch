import { BackendError } from "@/components/conditions/ConditionsStates";
import { LastUpdated } from "@/components/layout/LastUpdated";
import { PageHeader, PageShell } from "@/components/layout/PageHeader";
import { BeachMapCard } from "@/components/map/BeachMapCard";
import { IslandMap, useMapBeaches } from "@/components/map/IslandMap";
import { Button } from "@/components/ui/button";
import { useBeaches } from "@/hooks/use-beaches";
import { useConditions } from "@/hooks/use-conditions";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { MapPin, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function MapPage() {
  const { pick, t } = useI18n();
  const beachesQuery = useBeaches();
  const beaches = beachesQuery.data ?? [];
  const entries = useMapBeaches(beaches);
  const [selectedId, setSelectedId] = useState<bigint | null>(null);

  const selected =
    entries.find((entry) => entry.beach.id === selectedId)?.beach ?? null;
  const conditions = useConditions(
    selected?.latitude ?? null,
    selected?.longitude ?? null,
  );

  const isRefreshing = beachesQuery.isFetching || conditions.isFetching;

  const refresh = () => {
    void beachesQuery.refetch();
    if (selected) void conditions.refetch();
  };

  const fetchedAt =
    conditions.data?.fetchedAt ??
    (beachesQuery.dataUpdatedAt
      ? new Date(beachesQuery.dataUpdatedAt).toISOString()
      : null);

  const backendFailed = beachesQuery.isError && beaches.length === 0;
  const noCoordinates =
    !beachesQuery.isPending && !backendFailed && entries.length === 0;

  return (
    <PageShell>
      <PageHeader
        eyebrow={t("app.tagline")}
        title={t("map.title")}
        subtitle={t("map.subtitle")}
        actions={
          <LastUpdated
            fetchedAt={fetchedAt}
            onRefresh={refresh}
            isRefreshing={isRefreshing}
          />
        }
      />

      {backendFailed ? (
        <BackendError
          className="mt-6"
          onRetry={() => void beachesQuery.refetch()}
          isRetrying={beachesQuery.isFetching}
        />
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div className="min-w-0">
            {beachesQuery.isPending ? (
              <div
                data-ocid="map.loading_state"
                aria-busy="true"
                className="aspect-[4/3] w-full animate-pulse rounded-2xl border border-primary/20 bg-secondary/50 sm:aspect-[16/10]"
              />
            ) : (
              <IslandMap
                entries={entries}
                selectedId={selectedId}
                onSelect={setSelectedId}
                showEmpty={false}
              />
            )}

            {noCoordinates ? (
              <div
                data-ocid="map.no_coordinates_state"
                className="mt-3 flex flex-col gap-1 rounded-2xl border border-dashed border-border/70 bg-card/60 px-4 py-3"
              >
                <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  {t("map.noCoordinates")}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {t("map.noCoordinatesBody")}
                </p>
              </div>
            ) : null}

            <div
              data-ocid="map.legend"
              className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-full border border-border/60 bg-card/60 px-3 py-2 text-[0.7rem] text-muted-foreground backdrop-blur"
            >
              <span className="label-caps text-primary">
                {t("map.legendHeading")}
              </span>
              <LegendItem tone="success" label={t("status.favorable")} />
              <LegendItem tone="warning" label={t("status.caution")} />
              <LegendItem tone="destructive" label={t("status.unfavorable")} />
              <LegendItem tone="muted" label={t("status.insufficient")} />
            </div>
          </div>

          <div className="min-w-0">
            {selected ? (
              <BeachMapCard
                beach={selected}
                snapshot={conditions.data}
                isLoading={conditions.isLoading}
                isError={conditions.isError}
                onClose={() => setSelectedId(null)}
              />
            ) : (
              <div
                data-ocid="map.hint_panel"
                className="surface-glass rounded-2xl p-5"
              >
                <span className="grid size-9 place-items-center rounded-full bg-accent/15 text-accent shadow-neon-pink">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                <p className="mt-3 font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  {t("map.openBeach")}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t("map.selectHint")}
                </p>
              </div>
            )}

            {selected && conditions.data?.marineMissing ? (
              <p
                data-ocid="map.selected_marine_missing"
                className="mt-3 rounded-xl border border-border/60 bg-secondary/40 px-3 py-2 text-[0.7rem] leading-relaxed text-muted-foreground"
              >
                {t("map.conditionsUnavailableBody")}
              </p>
            ) : null}

            {selected && conditions.isError ? (
              <Button
                type="button"
                variant="outline"
                data-ocid="map.retry_button"
                onClick={() => void conditions.refetch()}
                disabled={conditions.isFetching}
                className="mt-3 w-full rounded-full border-accent/40 text-accent-foreground hover:bg-accent/10"
              >
                <RefreshCw
                  className={
                    conditions.isFetching ? "size-4 animate-spin" : "size-4"
                  }
                  aria-hidden="true"
                />
                {t("common.retry")}
              </Button>
            ) : null}

            {entries.length > 0 ? (
              <div className="mt-4">
                <p className="label-caps mb-2 text-primary">
                  {t("map.beachListLabel")}
                </p>
                <ul
                  data-ocid="map.beach_list"
                  className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur"
                >
                  {entries.map((entry, index) => {
                    const active = entry.beach.id === selectedId;
                    return (
                      <li key={entry.beach.id.toString()}>
                        <button
                          type="button"
                          data-ocid={`map.beach_item.${index + 1}`}
                          aria-pressed={active}
                          onClick={() => setSelectedId(entry.beach.id)}
                          className={cn(
                            "flex w-full items-center justify-between gap-2 px-3 py-2.5 text-start transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
                            active
                              ? "bg-accent/10 shadow-[inset_3px_0_0_oklch(0.68_0.24_345)]"
                              : "hover:bg-primary/10",
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <span
                              aria-hidden="true"
                              className={cn(
                                "size-1.5 shrink-0 rounded-full",
                                active
                                  ? "bg-accent shadow-[0_0_8px_oklch(0.68_0.24_345/0.95)]"
                                  : "bg-primary/70",
                              )}
                            />
                            <span
                              className={cn(
                                "min-w-0 truncate text-sm font-medium",
                                active
                                  ? "text-foreground"
                                  : "text-foreground/90",
                              )}
                            >
                              {pick(entry.beach.nameEn, entry.beach.nameFa)}
                            </span>
                          </span>
                          <span className="numeric shrink-0 font-mono text-[0.65rem] text-muted-foreground">
                            {entry.beach.latitude.toFixed(3)}°,{" "}
                            {entry.beach.longitude.toFixed(3)}°
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </PageShell>
  );
}

const LEGEND_TONE = {
  success: "bg-success shadow-[0_0_8px_oklch(0.8_0.16_172/0.9)]",
  warning: "bg-warning shadow-[0_0_8px_oklch(0.8_0.16_62/0.9)]",
  destructive: "bg-destructive shadow-[0_0_8px_oklch(0.63_0.24_12/0.9)]",
  muted: "bg-muted-foreground",
} as const;

function LegendItem({
  tone,
  label,
}: {
  tone: keyof typeof LEGEND_TONE;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden="true"
        className={cn("size-2 rounded-full", LEGEND_TONE[tone])}
      />
      {label}
    </span>
  );
}
