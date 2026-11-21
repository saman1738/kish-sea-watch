import { MetricTile } from "@/components/conditions/MetricTile";
import { StatusBadge } from "@/components/conditions/StatusBadge";
import { SuitabilityBadge } from "@/components/conditions/SuitabilityPanel";
import { type SuitabilityResult, gaugePosition } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import {
  type HourlyPoint,
  type MarineSnapshot,
  compassLabel,
  formatClock,
} from "@/lib/marine";
import { cn } from "@/lib/utils";
import { Droplets, Sunrise, Sunset, Waves, Wind } from "lucide-react";

function fmt(
  value: number | null,
  digits: number,
  num: (n: number, d?: number) => string,
) {
  return value === null ? null : num(value, digits);
}

export function CurrentConditions({
  snapshot,
  suitability,
  className,
}: {
  snapshot: MarineSnapshot;
  suitability: SuitabilityResult;
  className?: string;
}) {
  const { t, num } = useI18n();
  const current: HourlyPoint | null = snapshot.current;
  const today = snapshot.daily[0] ?? null;
  const sunrise = formatClock(today?.sunrise);
  const sunset = formatClock(today?.sunset);
  const windDir = compassLabel(current?.windDirection ?? null);
  const currentDir = compassLabel(current?.currentDirection ?? null);
  const waveDir = compassLabel(current?.waveDirection ?? null);

  return (
    <section
      data-ocid="dashboard.current_panel"
      aria-labelledby="current-title"
      className={cn("surface-neon-edge overflow-hidden rounded-2xl", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-4">
        <div className="min-w-0">
          <h2
            id="current-title"
            className="font-display text-base font-extrabold uppercase tracking-wide text-foreground"
          >
            {t("section.current")}
          </h2>
          <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
            {t("common.forecast")} · {t("common.timezone")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SuitabilityBadge
            status={suitability.status}
            data-ocid="dashboard.suitability_badge"
          />
          {snapshot.marineMissing ? (
            <StatusBadge
              tone="muted"
              data-ocid="dashboard.marine_missing_badge"
            >
              {t("common.noData")}
            </StatusBadge>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4">
        <MetricTile
          data-ocid="dashboard.metric.water_temp"
          label={t("metric.waterTemp")}
          value={fmt(current?.waterTemp ?? null, 1, num)}
          unit={t("common.celsius")}
          gauge={gaugePosition(current?.waterTemp ?? null, 18, 34)}
        />
        <MetricTile
          data-ocid="dashboard.metric.wave_height"
          label={t("metric.waveHeight")}
          value={fmt(current?.waveHeight ?? null, 1, num)}
          unit={t("common.meters")}
          detail={waveDir}
          gauge={gaugePosition(current?.waveHeight ?? null, 0, 2.5)}
        />
        <MetricTile
          data-ocid="dashboard.metric.wind"
          label={t("metric.windSpeed")}
          value={fmt(current?.windSpeed ?? null, 0, num)}
          unit={t("common.kmh")}
          detail={windDir}
          gauge={gaugePosition(current?.windSpeed ?? null, 0, 50)}
        />
        <MetricTile
          data-ocid="dashboard.metric.currents"
          label={t("metric.currentSpeed")}
          value={fmt(current?.currentSpeed ?? null, 2, num)}
          unit={t("common.ms")}
          detail={currentDir}
          gauge={gaugePosition(current?.currentSpeed ?? null, 0, 1)}
        />
        <MetricTile
          data-ocid="dashboard.metric.uv"
          label={t("metric.uvIndex")}
          value={fmt(current?.uvIndex ?? null, 1, num)}
          gauge={gaugePosition(current?.uvIndex ?? null, 0, 12)}
        />
        <MetricTile
          data-ocid="dashboard.metric.air_temp"
          label={t("metric.airTemp")}
          value={fmt(current?.airTemp ?? null, 1, num)}
          unit={t("common.celsius")}
        />
        <MetricTile
          data-ocid="dashboard.metric.sunrise"
          label={t("metric.sunrise")}
          value={sunrise}
          caption={t("common.forecast")}
        />
        <MetricTile
          data-ocid="dashboard.metric.sunset"
          label={t("metric.sunset")}
          value={sunset}
          caption={t("common.forecast")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border/60 px-5 py-3 text-[0.7rem] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Waves className="size-3.5 text-accent" aria-hidden="true" />
          {t("metric.wavePeriod")}:{" "}
          <span className="numeric font-mono text-foreground">
            {current?.wavePeriod !== null && current?.wavePeriod !== undefined
              ? `${num(current.wavePeriod, 1)} ${t("common.seconds")}`
              : t("common.noData")}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Wind className="size-3.5 text-accent" aria-hidden="true" />
          {t("metric.windGusts")}:{" "}
          <span className="numeric font-mono text-foreground">
            {current?.windGusts !== null && current?.windGusts !== undefined
              ? `${num(current.windGusts, 0)} ${t("common.kmh")}`
              : t("common.noData")}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Droplets className="size-3.5 text-accent" aria-hidden="true" />
          {t("metric.precipitation")}:{" "}
          <span className="numeric font-mono text-foreground">
            {current?.precipitation !== null &&
            current?.precipitation !== undefined
              ? `${num(current.precipitation, 1)} ${t("common.mm")}`
              : t("common.noData")}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Sunrise className="size-3.5 text-accent" aria-hidden="true" />
          <Sunset className="size-3.5 text-accent" aria-hidden="true" />
          {t("common.forecast")}
        </span>
      </div>
    </section>
  );
}
