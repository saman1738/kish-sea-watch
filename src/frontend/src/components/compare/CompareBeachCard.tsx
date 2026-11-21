import type { Beach } from "@/backend";
import type { ActivityKey, SuitabilityResult } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { CompareStatus } from "./CompareStatus";

export interface ActivityRanking {
  activity: ActivityKey;
  result: SuitabilityResult;
}

const ACTIVITY_KEY = {
  swimming: "activity.swimming",
  fishing: "activity.fishing",
  surfing: "activity.surfing",
  kayaking: "activity.kayaking",
} as const;

/** One beach column: identity, then each activity's status and written reason. */
export function CompareBeachCard({
  beach,
  rankings,
  position,
  isBest,
  className,
}: {
  beach: Beach;
  rankings: ActivityRanking[];
  position: number;
  isBest: boolean;
  className?: string;
}) {
  const { pick, t } = useI18n();
  const name = pick(beach.nameEn, beach.nameFa);

  return (
    <article
      data-ocid={`compare.beach_card.${position}`}
      className={cn(
        "surface-neon-edge flex min-w-0 flex-col overflow-hidden",
        isBest && "ring-1 ring-accent/40",
        className,
      )}
    >
      <header className="relative flex items-start justify-between gap-2 border-b border-border/70 px-4 py-3.5">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-primary"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <MapPin
              className="size-3.5 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]"
              aria-hidden="true"
            />
            <h3 className="truncate font-display text-base font-extrabold uppercase tracking-tight text-foreground">
              {name}
            </h3>
          </div>
          <p className="numeric mt-1 font-mono text-[0.65rem] text-muted-foreground">
            {beach.latitude.toFixed(4)}° · {beach.longitude.toFixed(4)}°
          </p>
        </div>
        {isBest ? (
          <span
            data-ocid={`compare.best_badge.${position}`}
            className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-accent-foreground shadow-neon-pink"
          >
            {t("activity.best")}
          </span>
        ) : null}
      </header>

      <ul className="flex flex-1 flex-col divide-y divide-border/60">
        {rankings.map(({ activity, result }) => (
          <li
            key={activity}
            data-ocid={`compare.activity.${position}.${activity}`}
            className="flex flex-col gap-1.5 px-4 py-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-foreground">
                {t(ACTIVITY_KEY[activity])}
              </span>
              <CompareStatus
                status={result.status}
                data-ocid={`compare.status.${position}.${activity}`}
              />
            </div>
            <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
              {result.reasons.length > 0
                ? result.reasons.join(" · ")
                : t(
                    result.status === "insufficient"
                      ? "status.insufficient.desc"
                      : "status.favorable.desc",
                  )}
            </p>
          </li>
        ))}
      </ul>

      <footer className="border-t border-border/70 px-4 py-2.5">
        <Link
          to="/beaches/$beachId"
          params={{ beachId: beach.id.toString() }}
          data-ocid={`compare.view_beach.${position}`}
          className="inline-flex items-center gap-1 text-[0.7rem] font-semibold text-primary underline-offset-4 transition-smooth hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("common.viewBeach")}
          <ArrowRight className="size-3 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </footer>
    </article>
  );
}
