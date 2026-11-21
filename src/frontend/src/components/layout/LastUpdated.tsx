import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

/** "Updated 14:20 · Asia/Tehran" with a manual refresh action. */
export function LastUpdated({
  fetchedAt,
  onRefresh,
  isRefreshing,
  className,
}: {
  fetchedAt: string | null;
  onRefresh: () => void;
  isRefreshing?: boolean;
  className?: string;
}) {
  const { t } = useI18n();
  let clock: string | null = null;
  if (fetchedAt) {
    const date = new Date(fetchedAt);
    if (!Number.isNaN(date.getTime())) {
      clock = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Tehran",
        hour12: false,
      }).format(date);
    }
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs text-muted-foreground",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className={cn(
            "size-1.5 rounded-full bg-success shadow-[0_0_8px_oklch(0.8_0.16_172/0.9)]",
            !isRefreshing && "motion-safe:animate-pulse-soft",
          )}
        />
        <span className="uppercase tracking-[0.1em]">
          {t("common.updated")}
        </span>
        <span className="numeric font-mono font-semibold text-foreground">
          {clock ?? t("common.noData")}
        </span>
        <span className="hidden sm:inline">· {t("common.timezone")}</span>
      </span>
      <button
        type="button"
        data-ocid="conditions.refresh_button"
        onClick={onRefresh}
        disabled={isRefreshing}
        aria-label={t("common.refresh")}
        className="inline-flex items-center gap-1 rounded-full border border-border/70 px-2 py-1 font-semibold text-primary transition-smooth hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60"
      >
        <RefreshCw
          className={cn("size-3.5", isRefreshing && "animate-spin")}
          aria-hidden="true"
        />
        <span className="hidden sm:inline">{t("common.refresh")}</span>
      </button>
    </div>
  );
}
