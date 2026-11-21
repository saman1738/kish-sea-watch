import type { Beach } from "@/backend";
import type { ActivityKey, SuitabilityStatus } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { CompareStatus } from "./CompareStatus";

export interface ActivityRanking {
  activity: ActivityKey;
  result: { status: SuitabilityStatus; reasons: string[]; coverage: number };
}

const ACTIVITY_KEY = {
  swimming: "activity.swimming",
  fishing: "activity.fishing",
  surfing: "activity.surfing",
  kayaking: "activity.kayaking",
} as const;

const ACTIVITIES: ActivityKey[] = [
  "swimming",
  "fishing",
  "surfing",
  "kayaking",
];

export interface CompareRow {
  beach: Beach;
  rankings: ActivityRanking[];
}

/**
 * Compact per-beach card for narrow screens: identity header, then one row per
 * activity with its status pill and written reason. No horizontal overflow.
 */
export function CompareMatrix({
  rows,
  className,
}: {
  rows: CompareRow[];
  className?: string;
}) {
  const { pick, t } = useI18n();

  return (
    <div
      data-ocid="compare.matrix"
      className={cn("flex flex-col gap-3", className)}
    >
      {rows.map(({ beach, rankings }, index) => (
        <article
          key={beach.id.toString()}
          data-ocid={`compare.matrix_row.${index}`}
          className="surface-glass min-w-0 overflow-hidden rounded-2xl"
        >
          <header className="flex items-center justify-between gap-2 border-b border-border/60 px-3.5 py-2.5">
            <div className="flex min-w-0 items-center gap-1.5">
              <MapPin
                className="size-3.5 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]"
                aria-hidden="true"
              />
              <h3 className="truncate font-display text-sm font-extrabold uppercase tracking-tight text-foreground">
                {pick(beach.nameEn, beach.nameFa)}
              </h3>
            </div>
            <Link
              to="/beaches/$beachId"
              params={{ beachId: beach.id.toString() }}
              data-ocid={`compare.matrix_view_beach.${index}`}
              aria-label={`${t("common.viewBeach")} — ${pick(beach.nameEn, beach.nameFa)}`}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border/70 px-2 py-1 text-[0.65rem] font-semibold text-primary transition-smooth hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("common.viewBeach")}
              <ArrowRight
                className="size-3 rtl:rotate-180"
                aria-hidden="true"
              />
            </Link>
          </header>

          <ul className="divide-y divide-border/50">
            {ACTIVITIES.map((activity) => {
              const ranking = rankings.find((r) => r.activity === activity);
              return (
                <li
                  key={activity}
                  data-ocid={`compare.matrix_cell.${index}.${activity}`}
                  className="flex flex-col gap-1 px-3.5 py-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[0.72rem] font-semibold text-foreground">
                      {t(ACTIVITY_KEY[activity])}
                    </span>
                    {ranking ? (
                      <CompareStatus
                        status={ranking.result.status}
                        className="px-2 py-0.5 text-[0.6rem]"
                        data-ocid={`compare.matrix_status.${index}.${activity}`}
                      />
                    ) : (
                      <span className="text-[0.65rem] text-muted-foreground">
                        {t("common.noData")}
                      </span>
                    )}
                  </div>
                  {ranking ? (
                    <p className="text-[0.68rem] leading-snug text-muted-foreground">
                      {ranking.result.reasons.length > 0
                        ? ranking.result.reasons.join(" · ")
                        : t(
                            ranking.result.status === "insufficient"
                              ? "status.insufficient.desc"
                              : "status.favorable.desc",
                          )}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </div>
  );
}
