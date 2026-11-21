import type { Beach } from "@/backend";
import { useConditions } from "@/hooks/use-conditions";
import { STATUS_TONE, assessSuitability } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BeachMarker, type MarkerTone } from "./BeachMarker";
import { outlinePath, projectPoint } from "./island-geometry";

export interface MapBeach {
  beach: Beach;
  x: number;
  y: number;
}

/** Beaches with usable coordinates, projected into the island frame. */
export function useMapBeaches(beaches: Beach[]): MapBeach[] {
  return beaches
    .filter(
      (beach) =>
        Number.isFinite(beach.latitude) &&
        Number.isFinite(beach.longitude) &&
        !(beach.latitude === 0 && beach.longitude === 0),
    )
    .map((beach) => {
      const { x, y } = projectPoint(beach.latitude, beach.longitude);
      return { beach, x, y };
    });
}

/** The island frame: neon night chart with coastline, grid and markers. */
export function IslandMap({
  entries,
  selectedId,
  onSelect,
  className,
}: {
  entries: MapBeach[];
  selectedId: bigint | null;
  onSelect: (id: bigint) => void;
  className?: string;
}) {
  const { pick, t } = useI18n();
  const path = outlinePath();

  return (
    <div
      data-ocid="map.canvas"
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-primary/25 bg-gradient-ocean shadow-elevated sm:aspect-[16/10]",
        className,
      )}
    >
      {/* Neon night-chart atmosphere: horizon glow + vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_118%,oklch(0.68_0.24_345/0.32),transparent_62%),radial-gradient(ellipse_60%_50%_at_18%_-10%,oklch(0.8_0.14_195/0.22),transparent_60%)]"
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 size-full"
      >
        <defs>
          <pattern
            id="map-grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 0H0V10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.15"
              className="text-primary/25"
            />
          </pattern>
          <linearGradient id="map-land" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="0%"
              stopColor="oklch(0.8 0.14 195)"
              stopOpacity="0.3"
            />
            <stop
              offset="52%"
              stopColor="oklch(0.68 0.22 292)"
              stopOpacity="0.26"
            />
            <stop
              offset="100%"
              stopColor="oklch(0.68 0.24 345)"
              stopOpacity="0.3"
            />
          </linearGradient>
          <linearGradient id="map-coast" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.86 0.14 195)" />
            <stop offset="55%" stopColor="oklch(0.72 0.2 292)" />
            <stop offset="100%" stopColor="oklch(0.72 0.24 345)" />
          </linearGradient>
          <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100" height="100" fill="url(#map-grid)" />

        {/* Glowing coastline: soft halo under a crisp gradient stroke */}
        <path
          d={`${path} Z`}
          fill="url(#map-land)"
          stroke="url(#map-coast)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeOpacity="0.55"
          filter="url(#map-glow)"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={`${path} Z`}
          fill="none"
          stroke="url(#map-coast)"
          strokeWidth="0.6"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span className="pointer-events-none absolute start-3 top-3 rounded-full border border-primary/30 bg-background/70 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
        {t("dashboard.heroTitle")}
      </span>

      {entries.map((entry, index) => (
        <MarkerWithStatus
          key={entry.beach.id.toString()}
          entry={entry}
          index={index}
          selected={entry.beach.id === selectedId}
          onSelect={() => onSelect(entry.beach.id)}
          name={pick(entry.beach.nameEn, entry.beach.nameFa)}
        />
      ))}

      {entries.length === 0 ? (
        <p
          data-ocid="map.empty_state"
          className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted-foreground"
        >
          {t("map.empty")}
        </p>
      ) : null}
    </div>
  );
}

function MarkerWithStatus({
  entry,
  index,
  selected,
  onSelect,
  name,
}: {
  entry: MapBeach;
  index: number;
  selected: boolean;
  onSelect: () => void;
  name: string;
}) {
  const { lang } = useI18n();
  const { data } = useConditions(entry.beach.latitude, entry.beach.longitude);
  const tone: MarkerTone =
    STATUS_TONE[assessSuitability(data?.current ?? null, { lang }).status];
  return (
    <BeachMarker
      name={name}
      x={entry.x}
      y={entry.y}
      tone={tone}
      selected={selected}
      onSelect={onSelect}
      index={index}
    />
  );
}
