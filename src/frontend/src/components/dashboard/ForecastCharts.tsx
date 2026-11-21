import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useI18n } from "@/lib/i18n";
import { type HourlyPoint, formatClock } from "@/lib/marine";
import { cn } from "@/lib/utils";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

type MetricKey = "waveHeight" | "windSpeed" | "airTemp" | "uvIndex";

interface MetricSpec {
  key: MetricKey;
  labelKey:
    | "chart.waveHeight"
    | "chart.windSpeed"
    | "chart.airTemp"
    | "chart.uvIndex";
  unitKey: "common.meters" | "common.kmh" | "common.celsius" | null;
  color: string;
  digits: number;
}

const METRICS: MetricSpec[] = [
  {
    key: "waveHeight",
    labelKey: "chart.waveHeight",
    unitKey: "common.meters",
    color: "var(--chart-1)",
    digits: 1,
  },
  {
    key: "windSpeed",
    labelKey: "chart.windSpeed",
    unitKey: "common.kmh",
    color: "var(--chart-2)",
    digits: 0,
  },
  {
    key: "airTemp",
    labelKey: "chart.airTemp",
    unitKey: "common.celsius",
    color: "var(--chart-5)",
    digits: 0,
  },
  {
    key: "uvIndex",
    labelKey: "chart.uvIndex",
    unitKey: null,
    color: "var(--chart-3)",
    digits: 1,
  },
];

interface ChartRow {
  time: string;
  label: string;
  value: number | null;
}

function buildRows(hours: HourlyPoint[], key: MetricKey): ChartRow[] {
  return hours.map((hour) => ({
    time: hour.time,
    label: formatClock(hour.time) ?? hour.time,
    value: hour[key],
  }));
}

function MetricChart({
  spec,
  hours,
}: { spec: MetricSpec; hours: HourlyPoint[] }) {
  const { t } = useI18n();
  const rows = buildRows(hours, spec.key);
  const hasData = rows.some((row) => row.value !== null);
  const config: ChartConfig = {
    value: { label: t(spec.labelKey), color: spec.color },
  };

  return (
    <figure
      data-ocid={`dashboard.chart.${spec.key}`}
      className="rounded-xl border border-border/50 bg-background/40 p-3"
    >
      <figcaption className="mb-2 flex items-baseline justify-between gap-2">
        <span className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
          {t(spec.labelKey)}
        </span>
        <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
          {spec.unitKey ? t(spec.unitKey) : ""}
        </span>
      </figcaption>

      {hasData ? (
        <ChartContainer config={config} className="aspect-[16/7] w-full">
          <AreaChart
            data={rows}
            margin={{ top: 4, right: 6, left: -18, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`fill-${spec.key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={spec.color} stopOpacity={0.28} />
                <stop offset="100%" stopColor={spec.color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="oklch(0.36 0.06 272 / 0.55)"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval={Math.max(0, Math.floor(rows.length / 5) - 1)}
              tickMargin={6}
              fontSize={10}
              stroke="oklch(0.76 0.03 255)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={34}
              fontSize={10}
              domain={["auto", "auto"]}
              stroke="oklch(0.76 0.03 255)"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.label ?? ""
                  }
                />
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={spec.color}
              strokeWidth={2}
              fill={`url(#fill-${spec.key})`}
              connectNulls={false}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>
      ) : (
        <p className="py-8 text-center text-xs text-muted-foreground">
          {t("common.noData")}
        </p>
      )}
    </figure>
  );
}

export function ForecastCharts({
  hours,
  className,
}: {
  hours: HourlyPoint[];
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <section
      data-ocid="dashboard.charts_panel"
      aria-labelledby="charts-title"
      className={cn(
        "surface-neon-edge overflow-hidden rounded-2xl p-4",
        className,
      )}
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="charts-title"
          className="font-display text-base font-extrabold uppercase tracking-wide text-foreground"
        >
          {t("section.hourly")}
        </h2>
        <p className="text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
          {t("common.forecast")}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {METRICS.map((spec) => (
          <MetricChart key={spec.key} spec={spec} hours={hours} />
        ))}
      </div>
    </section>
  );
}
