import { uvCategory } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { type HourlyPoint, formatClock } from "@/lib/marine";
import { cn } from "@/lib/utils";

function valueOrDash(
  value: number | null,
  digits: number,
  num: (n: number, d?: number) => string,
) {
  return value === null ? "—" : num(value, digits);
}

export function HourlyStrip({
  hours,
  className,
}: {
  hours: HourlyPoint[];
  className?: string;
}) {
  const { t, num } = useI18n();

  return (
    <section
      data-ocid="dashboard.hourly_panel"
      aria-labelledby="hourly-title"
      className={cn("surface-neon-edge overflow-hidden rounded-2xl", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 px-5 py-4">
        <h2
          id="hourly-title"
          className="font-display text-base font-extrabold uppercase tracking-wide text-foreground"
        >
          {t("section.hourly")}
        </h2>
        <p className="text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
          {t("common.forecast")} · {t("common.timezone")}
        </p>
      </div>

      {hours.length === 0 ? (
        <p
          data-ocid="dashboard.hourly_empty_state"
          className="px-5 py-6 text-sm text-muted-foreground"
        >
          {t("chart.noData")}
        </p>
      ) : (
        <div className="overflow-x-auto scrollbar-slim">
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <caption className="sr-only">{t("section.hourly")}</caption>
            <thead>
              <tr className="border-b border-border/60 text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                <th scope="col" className="px-3 py-2 text-start font-semibold">
                  {t("chart.hour")}
                </th>
                <th scope="col" className="px-3 py-2 text-end font-semibold">
                  {t("metric.waveHeight")}
                </th>
                <th scope="col" className="px-3 py-2 text-end font-semibold">
                  {t("metric.windSpeed")}
                </th>
                <th scope="col" className="px-3 py-2 text-end font-semibold">
                  {t("metric.waterTemp")}
                </th>
                <th scope="col" className="px-3 py-2 text-end font-semibold">
                  {t("metric.uvIndex")}
                </th>
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, index) => {
                const uv = uvCategory(hour.uvIndex);
                return (
                  <tr
                    key={hour.time}
                    data-ocid={`dashboard.hourly_row.${index + 1}`}
                    className="border-b border-border/40 last:border-0 hover:bg-primary/10"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-3 py-2 text-start font-mono text-xs font-medium text-foreground"
                    >
                      {formatClock(hour.time) ?? hour.time}
                    </th>
                    <td className="numeric px-3 py-2 text-end font-mono text-xs text-foreground">
                      {valueOrDash(hour.waveHeight, 1, num)}
                      <span className="ms-1 text-[0.6rem] text-muted-foreground">
                        {t("common.meters")}
                      </span>
                    </td>
                    <td className="numeric px-3 py-2 text-end font-mono text-xs text-foreground">
                      {valueOrDash(hour.windSpeed, 0, num)}
                      <span className="ms-1 text-[0.6rem] text-muted-foreground">
                        {t("common.kmh")}
                      </span>
                    </td>
                    <td className="numeric px-3 py-2 text-end font-mono text-xs text-foreground">
                      {valueOrDash(hour.waterTemp, 1, num)}
                      <span className="ms-1 text-[0.6rem] text-muted-foreground">
                        {t("common.celsius")}
                      </span>
                    </td>
                    <td className="numeric px-3 py-2 text-end font-mono text-xs text-foreground">
                      {valueOrDash(hour.uvIndex, 1, num)}
                      {uv ? (
                        <span className="ms-1 text-[0.6rem] text-muted-foreground">
                          {t(`uv.${uv}`)}
                        </span>
                      ) : null}
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
