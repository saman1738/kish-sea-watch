import type { Beach } from "@/backend";
import { SuitabilityBadge } from "@/components/conditions/SuitabilityPanel";
import { BeachSwitcher } from "@/components/layout/BeachSwitcher";
import { LastUpdated } from "@/components/layout/LastUpdated";
import { type SuitabilityResult, gaugePosition } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { type MarineSnapshot, compassLabel, formatClock } from "@/lib/marine";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Waves, Wind } from "lucide-react";

interface HeroMetric {
  key: string;
  label: string;
  value: string | null;
  unit?: string;
  detail?: string | null;
  gauge?: number;
  /** True when the reading comes from the marine provider. */
  marine: boolean;
}

function fmt(
  value: number | null,
  digits: number,
  num: (n: number, d?: number) => string,
) {
  return value === null ? null : num(value, digits);
}

export function HeroSection({
  beaches,
  activeBeach,
  onSelect,
  snapshot,
  suitability,
  fetchedAt,
  onRefresh,
  isRefreshing,
  showMetrics = true,
  className,
}: {
  beaches: Beach[];
  activeBeach: Beach | null;
  onSelect: (id: bigint) => void;
  snapshot: MarineSnapshot | null;
  suitability: SuitabilityResult | null;
  fetchedAt: string | null;
  onRefresh: () => void;
  isRefreshing: boolean;
  /** Render the live metric strip; hidden until a beach's conditions resolve. */
  showMetrics?: boolean;
  className?: string;
}) {
  const { t, num, pick } = useI18n();
  const current = snapshot?.current ?? null;
  const observedClock = formatClock(snapshot?.observedAt ?? current?.time);
  const marineMissing = snapshot?.marineMissing ?? false;

  const metrics: HeroMetric[] = [
    {
      key: "waterTemp",
      label: t("metric.waterTemp"),
      value: fmt(current?.waterTemp ?? null, 1, num),
      unit: t("common.celsius"),
      gauge: gaugePosition(current?.waterTemp ?? null, 18, 34),
      marine: true,
    },
    {
      key: "waveHeight",
      label: t("metric.waveHeight"),
      value: fmt(current?.waveHeight ?? null, 1, num),
      unit: t("common.meters"),
      detail: compassLabel(current?.waveDirection ?? null),
      gauge: gaugePosition(current?.waveHeight ?? null, 0, 2.5),
      marine: true,
    },
    {
      key: "windSpeed",
      label: t("metric.windSpeed"),
      value: fmt(current?.windSpeed ?? null, 0, num),
      unit: t("common.kmh"),
      detail: compassLabel(current?.windDirection ?? null),
      gauge: gaugePosition(current?.windSpeed ?? null, 0, 50),
      marine: false,
    },
    {
      key: "uvIndex",
      label: t("metric.uvIndex"),
      value: fmt(current?.uvIndex ?? null, 1, num),
      gauge: gaugePosition(current?.uvIndex ?? null, 0, 12),
      marine: false,
    },
  ];

  return (
    <section
      data-ocid="dashboard.hero"
      aria-labelledby="hero-headline"
      className={cn(
        "hero-vice relative overflow-hidden rounded-3xl border border-border/60 shadow-elevated",
        className,
      )}
    >
      <div className="relative z-10 flex flex-col gap-6 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <p className="label-caps text-primary drop-shadow-[0_0_10px_oklch(0.8_0.14_195/0.6)]">
              {t("hero.eyebrow")}
            </p>
            <h1
              id="hero-headline"
              className="mt-2 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground drop-shadow-[0_2px_18px_oklch(0.1_0.05_275/0.7)] sm:text-5xl lg:text-6xl"
            >
              {t("hero.headline")}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/85 sm:text-base">
              {t("hero.subline")}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
            <LastUpdated
              fetchedAt={fetchedAt}
              onRefresh={onRefresh}
              isRefreshing={isRefreshing}
              className="rounded-full border border-border/60 bg-background/40 px-3 py-1.5 backdrop-blur"
            />
            <Link
              to="/map"
              data-ocid="dashboard.hero_map_link"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-neon transition-smooth hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("hero.cta")}
              <ArrowRight
                className="size-4 rtl:rotate-180"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {activeBeach ? (
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <MapPin
                className="size-4 shrink-0 text-accent drop-shadow-[0_0_8px_oklch(0.68_0.24_345/0.8)]"
                aria-hidden="true"
              />
              <span className="truncate font-display text-lg font-extrabold uppercase tracking-wide text-foreground">
                {pick(activeBeach.nameEn, activeBeach.nameFa)}
              </span>
            </span>
            <span className="numeric rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[0.7rem] text-foreground/80 backdrop-blur">
              {activeBeach.latitude.toFixed(4)}° ·{" "}
              {activeBeach.longitude.toFixed(4)}°
            </span>
            {suitability ? (
              <SuitabilityBadge
                status={suitability.status}
                data-ocid="dashboard.hero_suitability_badge"
              />
            ) : null}
          </div>
        ) : null}

        {beaches.length > 0 ? (
          <BeachSwitcher
            beaches={beaches}
            activeId={activeBeach?.id ?? null}
            onSelect={onSelect}
            className="max-w-3xl"
          />
        ) : null}

        <div className="rounded-2xl border border-border/50 bg-background/45 p-3 backdrop-blur-md sm:p-4">
          <p className="label-caps text-primary">{t("hero.conditionsLabel")}</p>
          {showMetrics ? (
            <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {metrics.map((metric) => {
                const missing = metric.value === null;
                const unavailable = missing && metric.marine && marineMissing;
                return (
                  <div
                    key={metric.key}
                    data-ocid={`dashboard.hero_metric.${metric.key}`}
                    className="relative flex min-w-0 flex-col gap-1 overflow-hidden rounded-xl border border-border/50 bg-card/60 px-3 py-2.5"
                  >
                    <dt className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {metric.label}
                    </dt>
                    <dd className="flex min-w-0 items-baseline gap-1">
                      <span
                        className={cn(
                          "numeric font-display text-2xl font-extrabold leading-none tracking-tight",
                          missing
                            ? "text-sm font-medium text-muted-foreground"
                            : "text-foreground",
                        )}
                      >
                        {metric.value ?? t("common.noData")}
                      </span>
                      {!missing && metric.unit ? (
                        <span className="text-xs font-semibold text-muted-foreground">
                          {metric.unit}
                        </span>
                      ) : null}
                      {metric.detail ? (
                        <span className="ms-1 inline-flex items-center gap-0.5 text-[0.65rem] font-bold uppercase text-accent">
                          {metric.key === "windSpeed" ? (
                            <Wind className="size-3" aria-hidden="true" />
                          ) : metric.key === "waveHeight" ? (
                            <Waves className="size-3" aria-hidden="true" />
                          ) : null}
                          {metric.detail}
                        </span>
                      ) : null}
                    </dd>
                    {typeof metric.gauge === "number" ? (
                      <span
                        aria-hidden="true"
                        className="mt-1 block h-0.5 w-full overflow-hidden rounded-full bg-border/70"
                      >
                        <span
                          className="block h-0.5 rounded-full bg-gradient-primary shadow-neon"
                          style={{
                            width: `${Math.round(
                              Math.min(1, Math.max(0, metric.gauge)) * 100,
                            )}%`,
                          }}
                        />
                      </span>
                    ) : null}
                    <span
                      className={cn(
                        "mt-0.5 truncate text-[0.58rem] uppercase tracking-[0.08em]",
                        unavailable
                          ? "text-destructive/90"
                          : "text-foreground/55",
                      )}
                    >
                      {unavailable
                        ? t("map.conditionsUnavailable")
                        : missing
                          ? t("common.noData")
                          : `${metric.marine ? t("common.observedAt") : t("common.forecastAt")} ${observedClock ?? t("common.noData")}`}
                    </span>
                  </div>
                );
              })}
            </dl>
          ) : (
            <p
              data-ocid="dashboard.hero_metrics_pending"
              className="mt-3 rounded-xl border border-border/50 bg-card/60 px-3 py-3 text-sm text-muted-foreground"
            >
              {t("common.loading")}
            </p>
          )}
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.08em] text-foreground/60">
            {t("common.forecast")} · {t("common.timezone")}
          </p>
        </div>
      </div>
    </section>
  );
}
