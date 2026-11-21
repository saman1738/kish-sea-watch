import type { Warning, WarningSeverity } from "@/backend";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Megaphone, ShieldAlert } from "lucide-react";

const SEVERITY_STYLE: Record<
  WarningSeverity,
  { wrap: string; icon: typeof Info; iconClass: string }
> = {
  info: {
    wrap: "border-primary/35 bg-primary/10",
    icon: Info,
    iconClass: "text-primary",
  },
  advisory: {
    wrap: "border-warning/40 bg-warning/10",
    icon: Megaphone,
    iconClass: "text-warning",
  },
  warning: {
    wrap: "border-warning/60 bg-warning/15",
    icon: AlertTriangle,
    iconClass: "text-warning",
  },
  danger: {
    wrap: "border-destructive/50 bg-destructive/12",
    icon: ShieldAlert,
    iconClass: "text-destructive",
  },
};

const SEVERITY_KEY: Record<
  WarningSeverity,
  | "admin.severity.info"
  | "admin.severity.advisory"
  | "admin.severity.warning"
  | "admin.severity.danger"
> = {
  info: "admin.severity.info",
  advisory: "admin.severity.advisory",
  warning: "admin.severity.warning",
  danger: "admin.severity.danger",
};

export function WarningList({
  warnings,
  className,
  emptyLabel,
}: {
  warnings: Warning[];
  className?: string;
  emptyLabel?: string;
}) {
  const { t, pick } = useI18n();
  if (warnings.length === 0) {
    return (
      <p
        data-ocid="warnings.empty_state"
        className={cn("text-sm text-muted-foreground", className)}
      >
        {emptyLabel ?? t("common.empty")}
      </p>
    );
  }
  return (
    <ul data-ocid="warnings.list" className={cn("space-y-2", className)}>
      {warnings.map((warning, index) => {
        const style = SEVERITY_STYLE[warning.severity];
        const Icon = style.icon;
        return (
          <li
            key={warning.id.toString()}
            data-ocid={`warnings.item.${index + 1}`}
            className={cn(
              "flex items-start gap-3 rounded-xl border p-3 backdrop-blur",
              style.wrap,
            )}
          >
            <Icon
              className={cn("mt-0.5 size-4 shrink-0", style.iconClass)}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p
                className={cn(
                  "text-[0.64rem] font-bold uppercase tracking-[0.14em]",
                  style.iconClass,
                )}
              >
                {t(SEVERITY_KEY[warning.severity])}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-foreground">
                {pick(warning.messageEn, warning.messageFa)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
