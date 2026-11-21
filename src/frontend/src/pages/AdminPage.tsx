import { AdminGate } from "@/components/admin/AdminGate";
import { BeachManager } from "@/components/admin/BeachManager";
import { ReportReview } from "@/components/admin/ReportReview";
import { WarningManager } from "@/components/admin/WarningManager";
import { PageHeader, PageShell } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsAdmin } from "@/hooks/use-admin";
import { useI18n } from "@/lib/i18n";
import { ClipboardList, Megaphone, Waves } from "lucide-react";

const TAB_TRIGGER_CLASS =
  "min-h-11 flex-1 gap-2 rounded-full px-4 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground transition-smooth hover:text-foreground data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-neon sm:flex-none";

export default function AdminPage() {
  const { t } = useI18n();
  const admin = useIsAdmin();

  return (
    <PageShell>
      <PageHeader
        eyebrow={t("app.name")}
        title={t("admin.title")}
        subtitle={t("admin.subtitle")}
      />

      <div className="mt-6">
        <AdminGate isAdmin={admin.data === true} isLoading={admin.isLoading}>
          <Tabs defaultValue="beaches" data-ocid="admin.tabs">
            <TabsList
              data-ocid="admin.tabs.list"
              className="h-auto w-full justify-start gap-1.5 rounded-full border border-border/70 bg-card/70 p-1.5 backdrop-blur sm:w-fit"
            >
              <TabsTrigger
                value="beaches"
                data-ocid="admin.tab.beaches"
                className={TAB_TRIGGER_CLASS}
              >
                <Waves className="size-4" aria-hidden="true" />
                {t("admin.tab.beaches")}
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                data-ocid="admin.tab.reports"
                className={TAB_TRIGGER_CLASS}
              >
                <ClipboardList className="size-4" aria-hidden="true" />
                {t("admin.tab.reports")}
              </TabsTrigger>
              <TabsTrigger
                value="warnings"
                data-ocid="admin.tab.warnings"
                className={TAB_TRIGGER_CLASS}
              >
                <Megaphone className="size-4" aria-hidden="true" />
                {t("admin.tab.warnings")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="beaches" className="mt-5">
              <BeachManager />
            </TabsContent>
            <TabsContent value="reports" className="mt-5">
              <ReportReview />
            </TabsContent>
            <TabsContent value="warnings" className="mt-5">
              <WarningManager />
            </TabsContent>
          </Tabs>
        </AdminGate>
      </div>
    </PageShell>
  );
}
