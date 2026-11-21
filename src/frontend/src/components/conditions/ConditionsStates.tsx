import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";

export function ConditionsError({
  onRetry,
  isRetrying,
  className,
}: {
  onRetry: () => void;
  isRetrying?: boolean;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <div
      data-ocid="conditions.error_state"
      role="alert"
      className={cn(
        "flex flex-col items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-5 backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="size-5" aria-hidden="true" />
        <h2 className="font-display text-base font-bold uppercase tracking-wide">
          {t("common.errorTitle")}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground">{t("common.errorBody")}</p>
      <Button
        type="button"
        variant="outline"
        data-ocid="conditions.retry_button"
        onClick={onRetry}
        disabled={isRetrying}
        className="rounded-full border-destructive/50 bg-transparent text-destructive hover:bg-destructive/15 hover:text-destructive"
      >
        <RefreshCw
          className={cn("size-4", isRetrying && "animate-spin")}
          aria-hidden="true"
        />
        {t("common.retry")}
      </Button>
    </div>
  );
}

export function ConditionsSkeleton({ className }: { className?: string }) {
  const { t } = useI18n();
  const ids = Array.from({ length: 6 }, (_, i) => `metric-skeleton-${i}`);
  return (
    <div
      data-ocid="conditions.loading_state"
      aria-busy="true"
      className={cn("surface-glass rounded-2xl p-5", className)}
    >
      <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
        {ids.map((id) => (
          <div
            key={id}
            className="h-20 animate-pulse rounded-xl border border-border/50 bg-secondary/50"
          />
        ))}
      </div>
      <span className="sr-only">{t("common.loading")}</span>
    </div>
  );
}
