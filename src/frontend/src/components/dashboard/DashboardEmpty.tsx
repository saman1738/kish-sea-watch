import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Waves } from "lucide-react";

export function DashboardEmpty({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <div
      data-ocid="dashboard.empty_state"
      className={cn(
        "surface-glass flex flex-col items-center gap-3 rounded-2xl border-dashed px-6 py-14 text-center",
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-full bg-accent/15 ring-1 ring-accent/30 shadow-neon-pink">
        <Waves className="size-6 text-accent" aria-hidden="true" />
      </span>
      <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-foreground">
        {t("dashboard.noBeaches")}
      </h2>
      <p className="max-w-md text-sm text-muted-foreground">
        {t("dashboard.noBeachesBody")}
      </p>
    </div>
  );
}
