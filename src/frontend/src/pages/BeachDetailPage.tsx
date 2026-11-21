import type { Beach } from "@/backend";
import { BeachReports } from "@/components/beach/BeachReports";
import { BeachWarnings } from "@/components/beach/BeachWarnings";
import { CurrentConditions } from "@/components/beach/CurrentConditions";
import { DailyForecast } from "@/components/beach/DailyForecast";
import { HourlyForecast } from "@/components/beach/HourlyForecast";
import {
  ConditionsError,
  ConditionsSkeleton,
} from "@/components/conditions/ConditionsStates";
import { SuitabilityPanel } from "@/components/conditions/SuitabilityPanel";
import { UvAdvicePanel } from "@/components/conditions/UvAdvicePanel";
import { BeachSwitcher } from "@/components/layout/BeachSwitcher";
import { LastUpdated } from "@/components/layout/LastUpdated";
import { PageShell } from "@/components/layout/PageHeader";
import { useBeach, useBeaches } from "@/hooks/use-beaches";
import { useConditions } from "@/hooks/use-conditions";
import { useReportsForBeach } from "@/hooks/use-reports";
import { usePublishedWarnings } from "@/hooks/use-warnings";
import { assessSuitability } from "@/lib/conditions";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Compass, MapPin, Waves } from "lucide-react";

function parseBeachId(raw: string): bigint | null {
  if (!/^\d+$/.test(raw)) return null;
  try {
    return BigInt(raw);
  } catch {
    return null;
  }
}

function BeachNotFound() {
  const { t } = useI18n();
  return (
    <PageShell>
      <div
        data-ocid="beach.not_found_state"
        className="surface-glass flex flex-col items-start gap-3 rounded-2xl border-dashed p-6"
      >
        <Compass className="size-6 text-accent" aria-hidden="true" />
        <h1 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
          {t("beach.notFound")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("beach.notFoundBody")}
        </p>
        <Link
          to="/"
          data-ocid="beach.back_link"
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1.5 text-sm font-semibold text-primary transition-smooth hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          {t("common.allBeaches")}
        </Link>
      </div>
    </PageShell>
  );
}

/** Immersive tropical header: identity, coordinates and the headline status. */
function BeachHero({
  beach,
  statusLabel,
  statusTone,
  updated,
}: {
  beach: Beach;
  statusLabel: string | null;
  statusTone: string;
  updated: React.ReactNode;
}) {
  const { t, pick } = useI18n();
  return (
    <header
      data-ocid="beach.hero"
      className="hero-vice relative overflow-hidden rounded-3xl border border-border/60 shadow-elevated"
    >
      <div className="relative z-10 flex flex-col gap-5 p-5 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            data-ocid="beach.back_link"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/25 bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur transition-smooth hover:border-primary/70 hover:bg-background/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowLeft className="size-3.5 rtl:rotate-180" aria-hidden="true" />
            {t("beach.backHome")}
          </Link>
          {updated}
        </div>

        <div className="min-w-0">
          <p className="label-caps text-primary-foreground/80">
            {t("dashboard.heroTitle")} · {t("beach.overview")}
          </p>
          <h1 className="mt-1 break-words font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground drop-shadow-[0_2px_18px_oklch(0.1_0.06_275/0.7)] md:text-6xl">
            {pick(beach.nameEn, beach.nameFa)}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/85">
            {pick(beach.descriptionEn, beach.descriptionFa)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="numeric inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/25 bg-background/45 px-3 py-1 font-mono text-xs text-foreground backdrop-blur">
            <MapPin className="size-3.5 text-accent" aria-hidden="true" />
            {beach.latitude.toFixed(4)}° · {beach.longitude.toFixed(4)}°
          </span>
          {statusLabel ? (
            <span
              data-ocid="beach.hero_status"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] backdrop-blur",
                statusTone,
              )}
            >
              <Waves className="size-3.5" aria-hidden="true" />
              {statusLabel}
            </span>
          ) : null}
          {!beach.active ? (
            <span className="rounded-full border border-warning/50 bg-warning/15 px-3 py-1 text-xs font-semibold text-warning-foreground backdrop-blur">
              {t("beach.inactive")}
            </span>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function BeachDetailBody({ beach }: { beach: Beach }) {
  const { t, pick, lang, num } = useI18n();
  const conditions = useConditions(beach.latitude, beach.longitude);
  const reports = useReportsForBeach(beach.id);
  const warnings = usePublishedWarnings();
  const beaches = useBeaches();

  const snapshot = conditions.data ?? null;
  const current = snapshot?.current ?? null;
  const today = snapshot?.daily[0] ?? null;
  const suitability = assessSuitability(current, { lang });

  const statusLabel =
    suitability.status === "favorable"
      ? t("status.favorable")
      : suitability.status === "caution"
        ? t("status.caution")
        : suitability.status === "unfavorable"
          ? t("status.unfavorable")
          : t("status.insufficient");

  const statusTone =
    suitability.status === "favorable"
      ? "border-success/60 bg-success/20 text-success"
      : suitability.status === "caution"
        ? "border-warning/60 bg-warning/20 text-warning"
        : suitability.status === "unfavorable"
          ? "border-destructive/60 bg-destructive/20 text-destructive"
          : "border-primary-foreground/30 bg-background/40 text-muted-foreground";

  return (
    <PageShell data-ocid="beach.page" className="space-y-6">
      <BeachHero
        beach={beach}
        statusLabel={statusLabel}
        statusTone={statusTone}
        updated={
          <LastUpdated
            fetchedAt={snapshot?.fetchedAt ?? null}
            onRefresh={() => void conditions.refetch()}
            isRefreshing={conditions.isFetching}
          />
        }
      />

      <BeachSwitcher beaches={beaches.data ?? []} activeId={beach.id} />

      {conditions.isPending ? (
        <ConditionsSkeleton />
      ) : conditions.isError ? (
        <ConditionsError
          onRetry={() => void conditions.refetch()}
          isRetrying={conditions.isFetching}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <CurrentConditions
            current={current}
            sunrise={today?.sunrise ?? null}
            sunset={today?.sunset ?? null}
            dailyUvMax={today?.uvMax ?? null}
          />
          <SuitabilityPanel
            result={suitability}
            beachName={pick(beach.nameEn, beach.nameFa)}
          />
        </div>
      )}

      {snapshot ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <HourlyForecast hourly={snapshot.hourly} />
          <div className="flex min-w-0 flex-col gap-4">
            <UvAdvicePanel
              uv={current?.uvIndex ?? null}
              dailyMax={today?.uvMax ?? null}
            />
            <section
              data-ocid="beach.safety_panel"
              aria-labelledby="beach-safety-title"
              className="surface-glass rounded-2xl p-5"
            >
              <h2 id="beach-safety-title" className="label-caps text-primary">
                {t("section.safety")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {t("common.disclaimer")}
              </p>
              <p className="mt-2 text-[0.68rem] text-muted-foreground">
                {t("uv.seaSeparate")}
              </p>
            </section>
          </div>
        </div>
      ) : null}

      {snapshot ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <DailyForecast daily={snapshot.daily} />
          <div className="flex min-w-0 flex-col gap-4">
            <BeachWarnings warnings={warnings.data ?? []} beachId={beach.id} />
            <BeachReports reports={reports.data ?? []} />
          </div>
        </div>
      ) : null}

      <p
        data-ocid="beach.coverage"
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.65rem] text-muted-foreground"
      >
        <span>{t("common.attribution")}</span>
        <span aria-hidden="true">·</span>
        <span>{t("footer.timezone")}</span>
        <span aria-hidden="true">·</span>
        <span>
          {t("beach.coverageLabel")}:{" "}
          <span className="numeric font-mono font-semibold text-foreground">
            {num(suitability.coverage, 0)}%
          </span>
        </span>
      </p>
    </PageShell>
  );
}

export default function BeachDetailPage() {
  const { beachId } = useParams({ from: "/beaches/$beachId" });
  const id = parseBeachId(beachId);
  const beach = useBeach(id);
  const { t } = useI18n();

  if (id === null) return <BeachNotFound />;

  if (beach.isPending) {
    return (
      <PageShell>
        <ConditionsSkeleton />
      </PageShell>
    );
  }

  if (beach.isError) {
    return (
      <PageShell>
        <ConditionsError
          onRetry={() => void beach.refetch()}
          isRetrying={beach.isFetching}
        />
      </PageShell>
    );
  }

  if (!beach.data) return <BeachNotFound />;

  return (
    <div
      className="motion-safe:animate-fade-in"
      aria-label={t("beach.overview")}
    >
      <BeachDetailBody beach={beach.data} />
    </div>
  );
}
