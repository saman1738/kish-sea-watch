import { UV_BANDS, type UvCategory, uvCategory } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Sun } from "lucide-react";

const BAND_COLORS: Record<UvCategory, string> = {
  low: "bg-success",
  moderate: "bg-warning",
  high: "bg-warning/80",
  veryHigh: "bg-destructive/80",
  extreme: "bg-destructive",
};

const ADVICE_KEY: Record<
  UvCategory,
  | "uv.advice.low"
  | "uv.advice.moderate"
  | "uv.advice.high"
  | "uv.advice.veryHigh"
  | "uv.advice.extreme"
> = {
  low: "uv.advice.low",
  moderate: "uv.advice.moderate",
  high: "uv.advice.high",
  veryHigh: "uv.advice.veryHigh",
  extreme: "uv.advice.extreme",
};

const LABEL_KEY: Record<
  UvCategory,
  "uv.low" | "uv.moderate" | "uv.high" | "uv.veryHigh" | "uv.extreme"
> = {
  low: "uv.low",
  moderate: "uv.moderate",
  high: "uv.high",
  veryHigh: "uv.veryHigh",
  extreme: "uv.extreme",
};

export function UvAdvicePanel({
  uv,
  dailyMax,
  className,
}: {
  uv: number | null;
  dailyMax?: number | null;
  className?: string;
}) {
  const { t, num } = useI18n();
  const category = uvCategory(uv);
  const maxCategory = uvCategory(dailyMax ?? null);

  return (
    <section
      data-ocid="uv.panel"
      aria-labelledby="uv-panel-title"
      className={cn("surface-glass rounded-2xl p-5", className)}
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id="uv-panel-title"
          className="label-caps flex items-center gap-2 text-warning"
        >
          <Sun className="size-4" aria-hidden="true" />
          {t("section.uv")}
        </h2>
        {category ? (
          <span className="numeric font-display text-xl font-extrabold text-foreground">
            {num(uv ?? 0, 0)}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex gap-1" aria-hidden="true">
        {UV_BANDS.map((band) => (
          <span
            key={band.category}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              BAND_COLORS[band.category],
              category === band.category
                ? "opacity-100 shadow-[0_0_10px_oklch(0.8_0.16_62/0.6)]"
                : "opacity-30",
            )}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[0.58rem] uppercase tracking-wide text-muted-foreground">
        <span>{t("uv.low")}</span>
        <span>{t("uv.moderate")}</span>
        <span>{t("uv.high")}</span>
        <span>{t("uv.veryHigh")}</span>
        <span>{t("uv.extreme")}</span>
      </div>

      <p className="mt-3 font-display text-base font-bold text-foreground">
        {category ? t(LABEL_KEY[category]) : t("common.noData")}
        {dailyMax !== undefined && dailyMax !== null && maxCategory ? (
          <span className="ms-2 text-xs font-normal text-muted-foreground">
            {t("metric.uvMax")}: {num(dailyMax, 0)} ·{" "}
            {t(LABEL_KEY[maxCategory])}
          </span>
        ) : null}
      </p>

      <div className="mt-3 rounded-xl border border-warning/25 bg-warning/10 p-3">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-warning">
          {t("uv.sunAdvice")}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-foreground">
          {category ? t(ADVICE_KEY[category]) : t("common.noData")}
        </p>
      </div>
      <p className="mt-2 text-[0.66rem] text-muted-foreground">
        {t("uv.seaSeparate")}
      </p>
    </section>
  );
}
