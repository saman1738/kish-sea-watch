import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

const SAFETY_POINTS = [
  "Follow the lifeguard flags and only swim inside marked zones.",
  "Never swim alone, and keep children within arm's reach.",
  "If caught in a current, swim parallel to the shore, not against it.",
] as const;

const SAFETY_POINTS_FA = [
  "پرچم‌های نجات‌غریق را رعایت کنید و فقط در محدوده مشخص‌شده شنا کنید.",
  "هرگز تنها شنا نکنید و کودکان را در فاصله نزدیک نگه دارید.",
  "اگر گرفتار جریان شدید، موازی با ساحل شنا کنید، نه خلاف آن.",
] as const;

export function SafetyNote({ className }: { className?: string }) {
  const { t, lang } = useI18n();
  const points = lang === "fa" ? SAFETY_POINTS_FA : SAFETY_POINTS;

  return (
    <section
      data-ocid="dashboard.safety_panel"
      aria-labelledby="safety-title"
      className={cn("surface-glass rounded-2xl p-5", className)}
    >
      <h2
        id="safety-title"
        className="flex items-center gap-2 font-display text-base font-extrabold uppercase tracking-wide text-foreground"
      >
        <ShieldCheck className="size-4 text-accent" aria-hidden="true" />
        {t("section.safety")}
      </h2>
      <ul className="mt-3 space-y-2">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2 text-sm leading-relaxed text-foreground"
          >
            <span
              aria-hidden="true"
              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]"
            />
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-border/60 pt-3 text-[0.68rem] leading-relaxed text-muted-foreground">
        {t("common.disclaimer")}
      </p>
    </section>
  );
}
