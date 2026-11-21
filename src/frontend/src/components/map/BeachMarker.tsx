import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

export type MarkerTone = "success" | "warning" | "destructive" | "muted";

const TONE_DOT: Record<MarkerTone, string> = {
  success: "bg-success shadow-[0_0_8px_oklch(0.8_0.16_172/0.95)]",
  warning: "bg-warning shadow-[0_0_8px_oklch(0.8_0.16_62/0.95)]",
  destructive: "bg-destructive shadow-[0_0_8px_oklch(0.63_0.24_12/0.95)]",
  muted: "bg-muted-foreground",
};

const TONE_RING: Record<MarkerTone, string> = {
  success: "ring-success/40",
  warning: "ring-warning/45",
  destructive: "ring-destructive/40",
  muted: "ring-border",
};

/**
 * A tappable beach marker positioned by percentage inside the map frame.
 * The visible pin is small; the button keeps a 44px touch target.
 */
export function BeachMarker({
  name,
  x,
  y,
  tone,
  selected,
  onSelect,
  index,
}: {
  name: string;
  x: number;
  y: number;
  tone: MarkerTone;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <button
      type="button"
      data-ocid={`map.marker.${index + 1}`}
      aria-pressed={selected}
      aria-label={name}
      onClick={onSelect}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={cn(
        "group absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected ? "z-20" : "hover:z-20",
      )}
    >
      {/* Selected halo pulse */}
      {selected ? (
        <span
          aria-hidden="true"
          className="absolute size-11 rounded-full bg-accent/25 motion-safe:animate-ping"
        />
      ) : null}
      <span
        aria-hidden="true"
        className={cn(
          "relative grid place-items-center rounded-full ring-4 transition-smooth",
          selected
            ? "size-8 bg-accent text-accent-foreground shadow-neon-pink ring-accent/35"
            : "size-6 bg-background/85 text-primary shadow-neon ring-2 group-hover:scale-110",
          !selected && TONE_RING[tone],
        )}
      >
        <MapPin
          className={cn(selected ? "size-4" : "size-3.5")}
          aria-hidden="true"
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute -end-0.5 -top-0.5 size-2 rounded-full ring-2 ring-background",
            TONE_DOT[tone],
          )}
        />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-full mt-1 max-w-[9rem] truncate rounded-full border border-accent/40 bg-background/90 px-2 py-0.5 text-[0.6rem] font-semibold text-foreground shadow-neon-pink backdrop-blur transition-opacity",
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        {name}
      </span>
    </button>
  );
}
