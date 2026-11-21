import { Layout } from "@/components/layout/Layout";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const BeachDetailPage = lazy(() => import("@/pages/BeachDetailPage"));
const ComparePage = lazy(() => import("@/pages/ComparePage"));
const MapPage = lazy(() => import("@/pages/MapPage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

function RouteFallback() {
  return (
    <div
      data-ocid="page.loading_state"
      aria-busy="true"
      className="mx-auto w-full max-w-6xl px-4 py-10"
    >
      <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
      <div className="mt-4 h-40 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const beachRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/beaches/$beachId",
  component: BeachDetailPage,
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: ComparePage,
});

const mapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/map",
  component: MapPage,
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: ReportsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  beachRoute,
  compareRoute,
  mapRoute,
  reportsRoute,
  adminRoute,
]);

export const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
