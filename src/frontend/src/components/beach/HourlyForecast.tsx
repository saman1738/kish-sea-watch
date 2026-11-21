import {
  type ChartPoint,
  ForecastChart,
} from "@/components/beach/ForecastChart";
import { useI18n } from "@/lib/i18n";
import { type HourlyPoint, formatClock, upcomingHours } from "@/lib/marine";
import { cn } from "@/lib/utils";

/** 24-hour forecast charts for wave height, wind, temperature and UV. */
export function HourlyForecast({
  hourly,
  className,
}: {
  hourly: HourlyPoint[];
  className?: string;
}) {
  const { t, num } = useI18n();
  const points = upcomingHours(hourly, 24);

  const series = (pick: (point: HourlyPoint) => number | null): ChartPoint[] =>
    points.map((point) => ({
      label: formatClock(point.time) ?? "",
      value: pick(point),
    }));

  const charts = [
    {
      key: "wave",
      title: t("chart.waveHeight"),
      unit: t("common.meters"),
      points: series((p) => p.waveHeight),
      color: "var(--color-chart-1)",
    },
    {
      key: "wind",
      title: t("chart.windSpeed"),
      unit: t("common.kmh"),
      points: series((p) => p.windSpeed),
      color: "var(--color-chart-2)",
    },
    {
      key: "air",
      title: t("chart.airTemp"),
      unit: t("common.celsius"),
      points: series((p) => p.airTemp),
      color: "var(--color-chart-5)",
    },
    {
      key: "uv",
      title: t("chart.uvIndex"),
      unit: "",
      points: series((p) => p.uvIndex),
      color: "var(--color-chart-3)",
    },
  ];

  return (
    <section
      data-ocid="beach.hourly_section"
      aria-labelledby="beach-hourly-title"
      className={cn("space-y-3", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="min-w-0">
          <h2
            id="beach-hourly-title"
            className="font-display text-xl font-extrabold uppercase tracking-tight text-foreground"
          >
            {t("section.hourly")}
          </h2>
          <p className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
            {t("beach.hourlyOutlook")}
          </p>
        </div>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-accent">
          {t("common.forecast")}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {charts.map((chart) => (
          <ForecastChart
            key={chart.key}
            data-ocid={`beach.chart.${chart.key}`}
            title={chart.title}
            unit={chart.unit}
            points={chart.points}
            color={chart.color}
          />
        ))}
      </div>
      {points.length > 0 ? (
        <p className="text-[0.65rem] text-muted-foreground">
          {t("chart.hour")}: {formatClock(points[0]?.time)} –{" "}
          {formatClock(points[points.length - 1]?.time)} ·{" "}
          {t("common.timezone")} · {num(points.length, 0)} h
        </p>
      ) : null}
    </section>
  );
}
