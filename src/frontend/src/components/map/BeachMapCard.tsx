import type { Beach } from "@/backend";
import { MetricTile } from "@/components/conditions/MetricTile";
import { SuitabilityBadge } from "@/components/conditions/SuitabilityPanel";
import { Button } from "@/components/ui/button";
import { assessSuitability } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { type MarineSnapshot, compassLabel } from "@/lib/marine";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, X } from "lucide-react";

/** Selected-beach card: name, current forecast conditions and detail link. */
export function BeachMapCard({
  beach,
  snapshot,
  isLoading,
  isError,
  onClose,
  className,
}: {
  beach: Beach;
  snapshot: MarineSnapshot | undefined;
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
  className?: string;
}) {
  const { lang, num, pick, t } = useI18n();
  const current = snapshot?.current ?? null;
  const suitability = assessSuitability(current, { lang });
  const forecast = t("common.forecast");

  const metric = (value: number | null, digits: number) =>
    value === null ? t("common.noData") : num(value, digits);

  return (
    <section
      data-ocid="map.selected_card"
      aria-labelledby="map-selected-title"
      className={cn(
        "surface-neon-edge flex flex-col p-4 shadow-elevated",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="label-caps text-primary">{t("common.beach")}</p>
          <h2
            id="map-selected-title"
            className="mt-0.5 truncate font-display text-lg font-extrabold uppercase tracking-tight text-foreground"
          >
            {pick(beach.nameEn, beach.nameFa)}
          </h2>
          <p className="numeric mt-1 flex items-center gap-1 font-mono text-[0.7rem] text-muted-foreground">
            <MapPin
              className="size-3 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]"
              aria-hidden="true"
            />
            {beach.latitude.toFixed(4)}° · {beach.longitude.toFixed(4)}°
          </p>
        </div>
        <button
          type="button"
          data-ocid="map.close_button"
          onClick={onClose}
          aria-label={t("common.close")}
          className="grid size-8 shrink-0 place-items-center rounded-full border border-border/60 text-muted-foreground transition-smooth hover:border-accent/50 hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      {isLoading ? (
        <div
          data-ocid="map.selected_loading_state"
          aria-busy="true"
          className="mt-3 grid grid-cols-2 gap-2"
        >
          {["water", "wave", "wind", "uv"].map((id) => (
            <div
              key={id}
              className="h-16 animate-pulse rounded-xl border border-border/50 bg-secondary/50"
            />
          ))}
        </div>
      ) : isError ? (
        <p
          data-ocid="map.selected_error_state"
          role="alert"
          className="mt-3 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive"
        >
          {t("common.errorTitle")}
        </p>
      ) : (
        <>
          <div className="mt-3">
            <SuitabilityBadge
              status={suitability.status}
              data-ocid="map.selected_status"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <MetricTile
              label={t("metric.waterTemp")}
              value={metric(current?.waterTemp ?? null, 1)}
              unit={t("common.celsius")}
              caption={forecast}
              data-ocid="map.selected_water_temp"
            />
            <MetricTile
              label={t("metric.waveHeight")}
              value={metric(current?.waveHeight ?? null, 1)}
              unit={t("common.meters")}
              caption={forecast}
              data-ocid="map.selected_wave_height"
            />
            <MetricTile
              label={t("metric.windSpeed")}
              value={metric(current?.windSpeed ?? null, 0)}
              unit={t("common.kmh")}
              detail={compassLabel(current?.windDirection ?? null)}
              caption={forecast}
              data-ocid="map.selected_wind"
            />
            <MetricTile
              label={t("metric.uvIndex")}
              value={metric(current?.uvIndex ?? null, 1)}
              caption={forecast}
              data-ocid="map.selected_uv"
            />
          </div>
        </>
      )}

      <Button
        asChild
        className="mt-4 w-full rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-neon transition-smooth hover:opacity-90"
      >
        <Link
          to="/beaches/$beachId"
          params={{ beachId: beach.id.toString() }}
          data-ocid="map.view_beach_link"
        >
          {t("common.viewBeach")}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </Button>
    </section>
  );
}
