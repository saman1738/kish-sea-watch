import { uvCategory } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { type DailyPoint, formatClock, formatDayLabel } from "@/lib/marine";
import { cn } from "@/lib/utils";
import { CloudRain, Sun, Sunrise, Sunset, Waves, Wind } from "lucide-react";

function dash(
  value: number | null,
  digits: number,
  num: (n: number, d?: number) => string,
) {
  return value === null ? "—" : num(value, digits);
}

export function DailyForecast({
  days,
  className,
}: {
  days: DailyPoint[];
  className?: string;
}) {
  const { t, num, lang } = useI18n();

  return (
    <section
      data-ocid="dashboard.daily_panel"
      aria-labelledby="daily-title"
      className={cn("surface-neon-edge overflow-hidden rounded-2xl", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 px-5 py-4">
        <h2
          id="daily-title"
          className="font-display text-base font-extrabold uppercase tracking-wide text-foreground"
        >
          {t("section.daily")}
        </h2>
        <p className="text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
          {t("common.forecast")}
        </p>
      </div>

      {days.length === 0 ? (
        <p
          data-ocid="dashboard.daily_empty_state"
          className="px-5 py-6 text-sm text-muted-foreground"
        >
          {t("common.noData")}
        </p>
      ) : (
        <ul className="divide-y divide-border/50">
          {days.map((day, index) => {
            const uv = uvCategory(day.uvMax);
            return (
              <li
                key={day.date}
                data-ocid={`dashboard.daily_item.${index + 1}`}
                className="flex flex-col gap-2 px-5 py-3 transition-smooth hover:bg-primary/10 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-24 shrink-0 font-display text-sm font-bold uppercase tracking-wide text-foreground">
                    {index === 0
                      ? t("common.today")
                      : index === 1
                        ? t("common.tomorrow")
                        : formatDayLabel(day.date, lang)}
                  </span>
                  <span className="numeric font-mono text-xs text-muted-foreground">
                    {dash(day.tempMin, 0, num)}° / {dash(day.tempMax, 0, num)}°
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Waves
                      className="size-3.5 text-accent"
                      aria-hidden="true"
                    />
                    <span className="numeric font-mono text-foreground">
                      {dash(day.waveHeightMax, 1, num)}
                    </span>
                    {t("common.meters")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Wind className="size-3.5 text-accent" aria-hidden="true" />
                    <span className="numeric font-mono text-foreground">
                      {dash(day.windSpeedMax, 0, num)}
                    </span>
                    {t("common.kmh")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Sun className="size-3.5 text-warning" aria-hidden="true" />
                    <span className="numeric font-mono text-foreground">
                      {dash(day.uvMax, 1, num)}
                    </span>
                    {uv ? <span>· {t(`uv.${uv}`)}</span> : null}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Sunrise
                      className="size-3.5 text-accent"
                      aria-hidden="true"
                    />
                    <span className="numeric font-mono text-foreground">
                      {formatClock(day.sunrise) ?? "—"}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Sunset
                      className="size-3.5 text-accent"
                      aria-hidden="true"
                    />
                    <span className="numeric font-mono text-foreground">
                      {formatClock(day.sunset) ?? "—"}
                    </span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="flex items-center gap-1.5 border-t border-border/60 px-5 py-2.5 text-[0.65rem] text-muted-foreground">
        <CloudRain className="size-3.5" aria-hidden="true" />
        {t("common.disclaimer")}
      </p>
    </section>
  );
}
