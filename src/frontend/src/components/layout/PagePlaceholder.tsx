import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

/** Placeholder body for a route whose page task has not landed yet. */
export function PagePlaceholder({
  titleKey,
  subtitleKey,
}: {
  titleKey:
    | "dashboard.title"
    | "compare.title"
    | "map.title"
    | "reports.title"
    | "admin.title";
  subtitleKey:
    | "dashboard.subtitle"
    | "compare.subtitle"
    | "map.subtitle"
    | "reports.subtitle"
    | "admin.subtitle";
}) {
  const { t } = useI18n();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <header className="relative border-b border-border/70 pb-5">
        <p className="label-caps text-primary">{t("app.tagline")}</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          {t(titleKey)}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {t(subtitleKey)}
        </p>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-primary opacity-80"
        />
      </header>
      <div
        data-ocid="page.empty_state"
        className="surface-glass mt-8 flex flex-col items-start gap-3 rounded-2xl border-dashed p-6"
      >
        <span className="grid size-10 place-items-center rounded-xl bg-accent/15 ring-1 ring-accent/30">
          <Compass className="size-5 text-accent" aria-hidden="true" />
        </span>
        <p className="text-sm text-muted-foreground">{t("common.empty")}</p>
        <Link
          to="/"
          className="text-sm font-semibold text-primary underline underline-offset-4 transition-smooth hover:text-accent"
        >
          {t("nav.dashboard")}
        </Link>
      </div>
    </div>
  );
}
