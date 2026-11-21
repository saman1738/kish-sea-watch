import { SuitabilityBadge } from "@/components/conditions/SuitabilityPanel";
import { assessSuitability } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { type DailyPoint, formatDayLabel } from "@/lib/marine";
import { cn } from "@/lib/utils";

/** Seven-day outlook table with a per-day swimming estimate. */
export function DailyForecast({
  daily,
  className,
}: {
  daily: DailyPoint[];
  className?: string;
}) {
  const { t, lang, num } = useI18n();
  const rows = daily.slice(0, 7);

  return (
    <section
      data-ocid="beach.daily_section"
      aria-labelledby="beach-daily-title"
      className={cn("surface-glass rounded-2xl p-5", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="min-w-0">
          <h2
            id="beach-daily-title"
            className="font-display text-xl font-extrabold uppercase tracking-tight text-foreground"
          >
            {t("section.daily")}
          </h2>
          <p className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
            {t("beach.dailyOutlook")}
          </p>
        </div>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-accent">
          {t("common.forecast")}
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          {t("common.noData")}
        </p>
      ) : (
        <div className="mt-3 overflow-x-auto scrollbar-slim">
          <table className="w-full min-w-[30rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                <th scope="col" className="py-2 pe-2 text-start font-semibold">
                  {t("common.today")}
                </th>
                <th scope="col" className="px-2 py-2 text-end font-semibold">
                  {t("metric.waveHeight")}
                </th>
                <th scope="col" className="px-2 py-2 text-end font-semibold">
                  {t("metric.windSpeed")}
                </th>
                <th scope="col" className="px-2 py-2 text-end font-semibold">
                  {t("metric.airTemp")}
                </th>
                <th scope="col" className="ps-2 py-2 text-end font-semibold">
                  {t("section.suitability")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((day, index) => {
                const estimate = assessSuitability(
                  {
                    time: day.date,
                    waterTemp: null,
                    waveHeight: day.waveHeightMax,
                    waveDirection: null,
                    wavePeriod: null,
                    swellHeight: null,
                    swellDirection: null,
                    currentSpeed: null,
                    currentDirection: null,
                    airTemp: day.tempMax,
                    windSpeed: day.windSpeedMax,
                    windDirection: null,
                    windGusts: null,
                    precipitation: null,
                    cloudCover: null,
                    uvIndex: day.uvMax,
                  },
                  { lang },
                );
                return (
                  <tr
                    key={day.date}
                    data-ocid={`beach.daily_row.${index + 1}`}
                    className="border-b border-border/50 transition-smooth last:border-0 hover:bg-primary/5"
                  >
                    <th
                      scope="row"
                      className="py-2.5 pe-2 text-start font-display text-sm font-bold uppercase tracking-wide text-foreground"
                    >
                      {formatDayLabel(day.date, lang)}
                    </th>
                    <td className="numeric px-2 py-2.5 text-end font-mono text-foreground">
                      {day.waveHeightMax === null
                        ? t("common.noData")
                        : `${num(day.waveHeightMax, 1)} ${t("common.meters")}`}
                    </td>
                    <td className="numeric px-2 py-2.5 text-end font-mono text-foreground">
                      {day.windSpeedMax === null
                        ? t("common.noData")
                        : `${num(day.windSpeedMax, 0)} ${t("common.kmh")}`}
                    </td>
                    <td className="numeric px-2 py-2.5 text-end font-mono text-foreground">
                      {day.tempMax === null
                        ? t("common.noData")
                        : `${num(day.tempMax, 0)} ${t("common.celsius")}`}
                    </td>
                    <td className="ps-2 py-2.5 text-end">
                      <SuitabilityBadge
                        status={estimate.status}
                        data-ocid={`beach.daily_status.${index + 1}`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
