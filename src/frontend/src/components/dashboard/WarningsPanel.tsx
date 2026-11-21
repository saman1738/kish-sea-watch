import type { Warning } from "@/backend";
import { WarningList } from "@/components/conditions/WarningList";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Megaphone } from "lucide-react";

function issuedClock(issuedAt: bigint): string | null {
  const date = new Date(Number(issuedAt / 1_000_000n));
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tehran",
    hour12: false,
  }).format(date);
}

export function WarningsPanel({
  warnings,
  className,
}: {
  warnings: Warning[];
  className?: string;
}) {
  const { t } = useI18n();

  return (
    <section
      data-ocid="dashboard.warnings_panel"
      aria-labelledby="warnings-title"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-warning/40 bg-warning/10 p-5 backdrop-blur-md shadow-[0_18px_44px_-24px_oklch(0.8_0.16_62/0.5)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-warning via-warning/40 to-transparent"
      />
      <h2
        id="warnings-title"
        className="flex items-center gap-2 font-display text-base font-extrabold uppercase tracking-wide text-foreground"
      >
        <Megaphone className="size-4 text-warning" aria-hidden="true" />
        {t("section.warnings")}
      </h2>

      {warnings.length === 0 ? (
        <p
          data-ocid="dashboard.warnings_empty_state"
          className="mt-2 text-sm text-muted-foreground"
        >
          {t("common.empty")}
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          <WarningList warnings={warnings} />
          <ul className="space-y-1 border-t border-warning/30 pt-2">
            {warnings.map((warning) => (
              <li
                key={warning.id.toString()}
                className="flex flex-wrap items-baseline gap-x-2 text-[0.68rem] text-muted-foreground"
              >
                <span className="font-semibold uppercase tracking-[0.1em]">
                  {t("admin.issuedAt")}
                </span>
                <span className="numeric font-mono text-foreground">
                  {issuedClock(warning.issuedAt) ?? t("common.noData")}
                </span>
                <span>
                  ·{" "}
                  {warning.beachId === undefined
                    ? t("common.allBeaches")
                    : t("common.beach")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
