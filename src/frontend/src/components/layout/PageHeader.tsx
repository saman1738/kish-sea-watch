import type { Beach } from "@/backend";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";

/** Shared page header: eyebrow, title, subtitle and optional trailing slot. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative flex flex-col gap-3 pb-5 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <p className="label-caps text-primary">{eyebrow}</p> : null}
        <h1 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      ) : null}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-primary opacity-80"
      />
    </header>
  );
}

/** Standard page container with the shared vertical rhythm. */
export function PageShell({
  children,
  className,
  "data-ocid": dataOcid,
}: {
  children: React.ReactNode;
  className?: string;
  "data-ocid"?: string;
}) {
  return (
    <div
      data-ocid={dataOcid}
      className={cn("mx-auto w-full max-w-6xl px-4 py-6 md:py-10", className)}
    >
      {children}
    </div>
  );
}

/** Beach identity line: name, coordinates and a link to the detail page. */
export function BeachIdentity({
  beach,
  showLink = true,
  className,
}: {
  beach: Beach;
  showLink?: boolean;
  className?: string;
}) {
  const { pick, t } = useI18n();
  return (
    <div
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1",
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-1.5">
        <MapPin
          className="size-3.5 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.7)]"
          aria-hidden="true"
        />
        <span className="truncate font-display text-sm font-bold uppercase tracking-wide text-foreground">
          {pick(beach.nameEn, beach.nameFa)}
        </span>
      </span>
      <span className="numeric rounded-full border border-border/70 bg-background/50 px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
        {beach.latitude.toFixed(4)}° · {beach.longitude.toFixed(4)}°
      </span>
      {showLink ? (
        <Link
          to="/beaches/$beachId"
          params={{ beachId: beach.id.toString() }}
          className="inline-flex items-center gap-1 text-[0.7rem] font-semibold text-primary underline-offset-4 transition-smooth hover:text-accent hover:underline"
        >
          {t("common.viewBeach")}
          <ArrowRight className="size-3 rtl:rotate-180" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
