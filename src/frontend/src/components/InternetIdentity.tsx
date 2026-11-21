import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { LogIn, LogOut } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

const DEFAULT_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-neon transition-smooth hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60";

export function SignInButton({ className }: { className?: string }) {
  const { identity, login, clear, isInitializing, isLoggingIn, isLoginError } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const authenticated = !!identity && !identity.getPrincipal().isAnonymous();
  let label = authenticated ? "Sign out" : "Sign in with Internet Identity";
  if (isInitializing) {
    label = "Loading sign-in…";
  } else if (isLoggingIn) {
    label = "Signing in…";
  }
  return (
    <div>
      <button
        type="button"
        data-ocid="auth.button"
        className={className ?? DEFAULT_BUTTON_CLASS}
        disabled={isInitializing || isLoggingIn}
        onClick={() => {
          if (authenticated) {
            void queryClient.cancelQueries();
            queryClient.clear();
            clear();
          } else {
            // Keep the popup inside the user's activation frame: no await before login.
            login();
          }
        }}
      >
        {authenticated ? (
          <LogOut className="size-4" aria-hidden="true" />
        ) : (
          <LogIn className="size-4" aria-hidden="true" />
        )}
        {label}
      </button>
      {isLoginError && (
        <p
          role="alert"
          data-ocid="auth.error_state"
          className="mt-2 text-xs font-medium text-destructive"
        >
          Sign-in did not complete. Please try again.
        </p>
      )}
    </div>
  );
}

/** Each signed-in principal gets its own mounted cache boundary. */
function PrivateQueryBoundary({ children }: { children: ReactNode }) {
  const [queries] = useState(() => new QueryClient());
  useEffect(
    () => () => {
      void queries.cancelQueries();
      queries.clear();
    },
    [queries],
  );
  return <QueryClientProvider client={queries}>{children}</QueryClientProvider>;
}

/** Mount private queries only after sign-in, and isolate their cache when the principal changes. */
export function RequireSignIn({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { identity, isInitializing, isLoggingIn } = useInternetIdentity();
  const principal =
    identity && !identity.getPrincipal().isAnonymous()
      ? identity.getPrincipal().toText()
      : undefined;
  if (isInitializing || isLoggingIn) {
    return (
      <output
        data-ocid="auth.loading_state"
        className="block text-sm text-muted-foreground"
      >
        Loading your session…
      </output>
    );
  }
  if (principal === undefined) {
    return <>{fallback ?? <SignInButton />}</>;
  }
  return (
    <PrivateQueryBoundary key={principal}>{children}</PrivateQueryBoundary>
  );
}

/** Complete first-generation private-app entry point: branded copy cannot remove the sign-in action. */
export function AuthenticatedApp({
  children,
  title = "Sign in to continue",
  description = "Sign in with Internet Identity to access your private workspace.",
  className,
  buttonClassName,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  buttonClassName?: string;
}) {
  return (
    <RequireSignIn
      fallback={
        <section
          aria-label="Sign in"
          data-ocid="auth.panel"
          className={
            className ??
            "relative flex min-h-dvh flex-col items-center justify-center gap-4 overflow-hidden bg-background px-6 text-center text-foreground"
          }
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-sunset opacity-25 blur-2xl"
          />
          <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-primary shadow-neon">
            <LogIn
              className="size-6 text-primary-foreground"
              aria-hidden="true"
            />
          </span>
          <h1 className="relative font-display text-3xl font-extrabold uppercase tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="relative max-w-md text-muted-foreground">
              {description}
            </p>
          )}
          <div className="relative">
            <SignInButton className={buttonClassName ?? DEFAULT_BUTTON_CLASS} />
          </div>
        </section>
      }
    >
      {children}
    </RequireSignIn>
  );
}
