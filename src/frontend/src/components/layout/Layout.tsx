import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Map as MapIcon,
  ShieldCheck,
  Waves,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

const NAV_ITEMS = [
  { to: "/", key: "nav.dashboard", icon: LayoutDashboard, exact: true },
  { to: "/compare", key: "nav.compare", icon: BarChart3, exact: false },
  { to: "/map", key: "nav.map", icon: MapIcon, exact: false },
  { to: "/reports", key: "nav.reports", icon: ClipboardList, exact: false },
  { to: "/admin", key: "nav.admin", icon: ShieldCheck, exact: false },
] as const;

function Wordmark() {
  const { t } = useI18n();
  return (
    <Link
      to="/"
      data-ocid="nav.home_link"
      className="group flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-neon">
        <Waves
          className="size-5 text-primary-foreground motion-safe:animate-swell"
          aria-hidden="true"
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-sm font-extrabold uppercase tracking-[0.14em] text-gradient-accent">
          {t("app.name")}
        </span>
        <span className="hidden truncate text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground sm:block">
          {t("app.tagline")}
        </span>
      </span>
    </Link>
  );
}

function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <fieldset
      aria-label={t("lang.label")}
      data-ocid="nav.lang_switcher"
      className="m-0 flex min-w-0 items-center rounded-full border border-border/80 bg-background/40 p-0.5"
    >
      {(["en", "fa"] as const).map((code) => (
        <button
          key={code}
          type="button"
          data-ocid={`nav.lang_${code}_button`}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            lang === code
              ? "bg-gradient-primary text-primary-foreground shadow-neon"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code === "en" ? t("lang.en") : t("lang.fa")}
        </button>
      ))}
    </fieldset>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-card/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-2.5 md:flex-row md:items-center md:justify-between md:gap-6 md:py-3">
          <div className="flex items-center justify-between gap-3">
            <Wordmark />
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
          </div>

          <nav
            aria-label={t("nav.dashboard")}
            data-ocid="nav.primary"
            className="-mx-1 flex items-center gap-1 overflow-x-auto px-1 pb-0.5 scrollbar-slim md:mx-0 md:overflow-visible md:pb-0"
          >
            {NAV_ITEMS.map((item) => {
              const active = item.exact
                ? pathname === item.to
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  data-ocid={`nav.${item.key.replace("nav.", "")}_link`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4",
                      active && "drop-shadow-[0_0_6px_oklch(0.8_0.14_195/0.8)]",
                    )}
                    aria-hidden="true"
                  />
                  <span>{t(item.key)}</span>
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-[9px] h-0.5 rounded-full bg-gradient-primary shadow-neon md:-bottom-[13px]"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="relative border-t border-border/70 bg-sidebar/80">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-primary opacity-70"
        />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="font-display text-sm font-bold uppercase tracking-[0.12em] text-foreground">
              {t("app.name")}
            </p>
            <p className="max-w-md leading-relaxed">{t("common.disclaimer")}</p>
          </div>
          <div className="flex flex-col gap-1 md:items-end">
            <p>
              {t("common.dataSource")}: {t("footer.sources")}
            </p>
            <p className="numeric font-mono">{t("footer.timezone")}</p>
            <p>
              © {year ?? ""}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window === "undefined" ? "" : window.location.hostname,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-border underline-offset-2 transition-smooth hover:text-accent"
              >
                {t("common.builtWith")}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
