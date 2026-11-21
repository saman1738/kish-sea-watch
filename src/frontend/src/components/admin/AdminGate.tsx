import { SignInButton } from "@/components/InternetIdentity";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

function GatePanel({
  icon,
  title,
  body,
  children,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <section
      data-ocid="admin.gate.panel"
      className="surface-neon-edge relative mx-auto flex w-full max-w-lg flex-col items-center gap-4 overflow-hidden p-6 text-center md:p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-sunset opacity-20 blur-2xl"
      />
      <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-neon">
        {icon}
      </span>
      <div className="relative space-y-1.5">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
      <div className="relative flex flex-col items-center gap-2">
        {children}
      </div>
    </section>
  );
}

/**
 * Renders the admin console only for a signed-in administrator.
 * Signed-out visitors get a working sign-in action; signed-in non-admins get a clear notice.
 */
export function AdminGate({
  isAdmin,
  isLoading,
  children,
}: {
  isAdmin: boolean;
  isLoading: boolean;
  children: ReactNode;
}) {
  const { t } = useI18n();
  const { identity, isInitializing, isLoggingIn } = useInternetIdentity();
  const signedIn =
    !!identity && !identity.getPrincipal().isAnonymous() && !isInitializing;

  if (!signedIn) {
    return (
      <GatePanel
        icon={<ShieldCheck className="size-6" aria-hidden="true" />}
        title={t("admin.signIn")}
        body={t("admin.signInBody")}
      >
        <SignInButton />
        {isLoggingIn ? (
          <p className="text-xs text-muted-foreground">{t("common.loading")}</p>
        ) : null}
      </GatePanel>
    );
  }

  if (isLoading) {
    return (
      <output
        data-ocid="admin.loading_state"
        aria-busy="true"
        className="surface-glass mx-auto flex w-full max-w-lg items-center justify-center gap-2 rounded-2xl p-8 text-sm text-muted-foreground"
      >
        <Loader2
          className="size-4 animate-spin text-primary"
          aria-hidden="true"
        />
        {t("common.loading")}
      </output>
    );
  }

  if (!isAdmin) {
    return (
      <GatePanel
        icon={<ShieldAlert className="size-6" aria-hidden="true" />}
        title={t("admin.notAdmin")}
        body={t("admin.signInBody")}
      >
        <Button
          asChild
          variant="outline"
          className="min-h-11 rounded-full border-accent/50 bg-transparent px-5 font-bold uppercase tracking-[0.08em] text-accent hover:bg-accent/10 hover:text-accent"
        >
          <Link to="/" data-ocid="admin.gate.back_link">
            {t("common.back")}
          </Link>
        </Button>
      </GatePanel>
    );
  }

  return <>{children}</>;
}
