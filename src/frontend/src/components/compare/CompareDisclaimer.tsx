import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

/** Persistent forecast-estimate disclaimer for the comparison rankings. */
export function CompareDisclaimer({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <aside
      data-ocid="compare.disclaimer"
      className={cn(
        "relative flex items-start gap-3 overflow-hidden rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs leading-relaxed text-foreground backdrop-blur",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 start-0 w-1 bg-gradient-primary"
      />
      <Info
        className="mt-0.5 size-4 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]"
        aria-hidden="true"
      />
      <p className="min-w-0">
        <span className="font-display font-bold uppercase tracking-[0.08em] text-accent">
          {t("common.forecast")}.
        </span>{" "}
        <span className="text-muted-foreground">{t("common.disclaimer")}</span>
      </p>
    </aside>
  );
}
