import type { Warning } from "@/backend";
import { WarningList } from "@/components/conditions/WarningList";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Megaphone } from "lucide-react";

function formatIssuedAt(timestamp: bigint, lang: "en" | "fa"): string | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tehran",
    hour12: false,
  }).format(date);
}

/** Published official warnings: this beach first, then island-wide. */
export function BeachWarnings({
  warnings,
  beachId,
  className,
}: {
  warnings: Warning[];
  beachId: bigint;
  className?: string;
}) {
  const { t, lang } = useI18n();
  const forBeach = warnings.filter(
    (warning) => warning.beachId !== undefined && warning.beachId === beachId,
  );
  const islandWide = warnings.filter(
    (warning) => warning.beachId === undefined,
  );

  const groups = [
    { key: "beach", title: t("common.beach"), items: forBeach },
    { key: "island", title: t("dashboard.heroTitle"), items: islandWide },
  ].filter((group) => group.items.length > 0);

  return (
    <section
      data-ocid="beach.warnings_section"
      aria-labelledby="beach-warnings-title"
      className={cn("surface-glass rounded-2xl p-5", className)}
    >
      <h2
        id="beach-warnings-title"
        className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-tight text-foreground"
      >
        <Megaphone className="size-4 text-warning" aria-hidden="true" />
        {t("section.warnings")}
      </h2>

      {groups.length === 0 ? (
        <p
          data-ocid="beach.warnings.empty_state"
          className="mt-3 text-sm text-muted-foreground"
        >
          {t("common.empty")}
        </p>
      ) : (
        <div className="mt-3 space-y-4">
          {groups.map((group) => (
            <div key={group.key}>
              <p className="label-caps mb-2 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 rounded-full",
                    group.key === "beach"
                      ? "bg-accent shadow-[0_0_8px_oklch(0.68_0.24_345/0.9)]"
                      : "bg-primary shadow-[0_0_8px_oklch(0.8_0.14_195/0.9)]",
                  )}
                />
                {group.title}
              </p>
              <WarningList warnings={group.items} />
              <ul className="mt-1.5 space-y-0.5">
                {group.items.map((warning) => (
                  <li
                    key={`issued-${warning.id.toString()}`}
                    className="text-[0.65rem] text-muted-foreground"
                  >
                    {t("admin.issuedAt")}:{" "}
                    <span className="numeric font-mono">
                      {formatIssuedAt(warning.issuedAt, lang) ??
                        t("common.noData")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
