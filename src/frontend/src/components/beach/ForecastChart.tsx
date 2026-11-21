import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useId } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export interface ChartPoint {
  label: string;
  value: number | null;
}

/**
 * Single-series forecast chart. Null values are dropped so a gap in the
 * provider data renders as a gap, never as a fabricated zero.
 */
export function ForecastChart({
  title,
  unit,
  points,
  color = "var(--color-chart-1)",
  className,
  "data-ocid": dataOcid,
}: {
  title: string;
  unit: string;
  points: ChartPoint[];
  color?: string;
  className?: string;
  "data-ocid"?: string;
}) {
  const { t, num } = useI18n();
  const gradientId = `fill-${useId().replace(/:/g, "")}`;
  const data = points.filter(
    (point): point is { label: string; value: number } => point.value !== null,
  );

  const config: ChartConfig = {
    value: { label: title, color },
  };

  return (
    <figure
      data-ocid={dataOcid}
      className={cn(
        "surface-glass flex flex-col rounded-2xl p-4 transition-smooth hover:border-primary/40",
        className,
      )}
    >
      <figcaption className="flex items-baseline justify-between gap-2">
        <span className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
          {title}
        </span>
        <span className="rounded-full border border-border/70 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {unit}
        </span>
      </figcaption>

      {data.length === 0 ? (
        <p className="mt-6 mb-2 text-sm text-muted-foreground">
          {t("chart.noData")}
        </p>
      ) : (
        <ChartContainer
          config={config}
          className="mt-2 aspect-auto h-32 w-full"
          aria-label={`${title} (${unit})`}
        >
          <AreaChart
            data={data}
            margin={{ top: 6, right: 6, bottom: 0, left: -18 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.42} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="oklch(var(--border) / 0.6)"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              minTickGap={18}
              interval="preserveStartEnd"
              tick={{ fill: "oklch(var(--muted-foreground))", fontSize: 10 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={34}
              tickFormatter={(value: number) => num(value, 0)}
              tick={{ fill: "oklch(var(--muted-foreground))", fontSize: 10 }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => (
                    <span className="numeric font-mono">
                      {num(Number(value), 1)} {unit}
                    </span>
                  )}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={false}
              isAnimationActive={false}
              style={{ filter: `drop-shadow(0 0 6px ${color})` }}
            />
          </AreaChart>
        </ChartContainer>
      )}
    </figure>
  );
}
