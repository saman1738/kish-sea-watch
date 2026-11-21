import { MetricTile } from "@/components/conditions/MetricTile";
import { gaugePosition } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { type HourlyPoint, compassLabel, formatClock } from "@/lib/marine";
import { cn } from "@/lib/utils";
import { Waves } from "lucide-react";

/** Full current-conditions instrument cluster for one beach. */
export function CurrentConditions({
  current,
  sunrise,
  sunset,
  dailyUvMax,
  className,
}: {
  current: HourlyPoint | null;
  sunrise: string | null;
  sunset: string | null;
  dailyUvMax: number | null;
  className?: string;
}) {
  const { t, num } = useI18n();
  const forecast = t("common.forecast");

  const value = (n: number | null, digits = 1) =>
    n === null ? null : num(n, digits);
  const dir = (degrees: number | null) => compassLabel(degrees);

  const tiles = [
    {
      key: "water",
      label: t("metric.waterTemp"),
      value: value(current?.waterTemp ?? null, 0),
      unit: t("common.celsius"),
      gauge: gaugePosition(current?.waterTemp ?? null, 18, 32),
    },
    {
      key: "wave",
      label: t("metric.waveHeight"),
      value: value(current?.waveHeight ?? null),
      unit: t("common.meters"),
      gauge: gaugePosition(current?.waveHeight ?? null, 0, 2.5),
    },
    {
      key: "waveDir",
      label: t("metric.waveDirection"),
      value: dir(current?.waveDirection ?? null),
      unit: t("common.degrees"),
    },
    {
      key: "wavePeriod",
      label: t("metric.wavePeriod"),
      value: value(current?.wavePeriod ?? null, 0),
      unit: t("common.seconds"),
    },
    {
      key: "swell",
      label: t("metric.swellHeight"),
      value: value(current?.swellHeight ?? null),
      unit: t("common.meters"),
      gauge: gaugePosition(current?.swellHeight ?? null, 0, 2.5),
    },
    {
      key: "swellDir",
      label: t("metric.swellDirection"),
      value: dir(current?.swellDirection ?? null),
      unit: t("common.degrees"),
    },
    {
      key: "current",
      label: t("metric.currentSpeed"),
      value: value(current?.currentSpeed ?? null, 2),
      unit: t("common.ms"),
      gauge: gaugePosition(current?.currentSpeed ?? null, 0, 1),
    },
    {
      key: "currentDir",
      label: t("metric.currentDirection"),
      value: dir(current?.currentDirection ?? null),
      unit: t("common.degrees"),
    },
    {
      key: "wind",
      label: t("metric.windSpeed"),
      value: value(current?.windSpeed ?? null, 0),
      unit: t("common.kmh"),
      detail: dir(current?.windDirection ?? null),
      gauge: gaugePosition(current?.windSpeed ?? null, 0, 45),
    },
    {
      key: "gusts",
      label: t("metric.windGusts"),
      value: value(current?.windGusts ?? null, 0),
      unit: t("common.kmh"),
    },
    {
      key: "air",
      label: t("metric.airTemp"),
      value: value(current?.airTemp ?? null, 0),
      unit: t("common.celsius"),
      gauge: gaugePosition(current?.airTemp ?? null, 12, 40),
    },
    {
      key: "rain",
      label: t("metric.precipitation"),
      value: value(current?.precipitation ?? null, 1),
      unit: t("common.mm"),
    },
    {
      key: "cloud",
      label: t("metric.cloudCover"),
      value: value(current?.cloudCover ?? null, 0),
      unit: t("common.percent"),
      gauge: gaugePosition(current?.cloudCover ?? null, 0, 100),
    },
    {
      key: "uv",
      label: t("metric.uvIndex"),
      value: value(current?.uvIndex ?? null, 0),
      unit: "",
      gauge: gaugePosition(current?.uvIndex ?? null, 0, 12),
    },
    {
      key: "uvMax",
      label: t("metric.uvMax"),
      value: value(dailyUvMax, 0),
      unit: "",
      gauge: gaugePosition(dailyUvMax, 0, 12),
    },
    {
      key: "sunrise",
      label: t("metric.sunrise"),
      value: formatClock(sunrise),
      unit: "",
    },
    {
      key: "sunset",
      label: t("metric.sunset"),
      value: formatClock(sunset),
      unit: "",
    },
  ];

  return (
    <section
      data-ocid="beach.current_panel"
      aria-labelledby="beach-current-title"
      className={cn(
        "surface-neon-edge relative overflow-hidden p-5 md:p-6",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-12 -top-12 size-48 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-16 bottom-0 size-40 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <h2
          id="beach-current-title"
          className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-tight text-foreground"
        >
          <Waves className="size-4 text-primary" aria-hidden="true" />
          {t("section.current")}
        </h2>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-accent">
          {forecast}
        </span>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {tiles.map((tile) => (
          <MetricTile
            key={tile.key}
            data-ocid={`beach.metric.${tile.key}`}
            label={tile.label}
            value={tile.value}
            unit={tile.unit || undefined}
            detail={tile.detail ?? null}
            caption={forecast}
            gauge={tile.gauge}
          />
        ))}
      </div>
    </section>
  );
}
