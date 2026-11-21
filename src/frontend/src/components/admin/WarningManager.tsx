import { type Warning, WarningSeverity } from "@/backend";
import {
  StatusBadge,
  type StatusTone,
} from "@/components/conditions/StatusBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useBeaches } from "@/hooks/use-beaches";
import {
  useAllWarnings,
  useCreateWarning,
  useSetWarningPublished,
} from "@/hooks/use-warnings";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Megaphone,
  Send,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { SEVERITY_KEY, SEVERITY_ORDER, formatTimestamp } from "./admin-utils";

const ALL_BEACHES = "all";

const SEVERITY_TONE: Record<WarningSeverity, StatusTone> = {
  info: "accent",
  advisory: "warning",
  warning: "warning",
  danger: "destructive",
};

const LABEL_CLASS =
  "text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground";

function WarningRow({ warning, index }: { warning: Warning; index: number }) {
  const { t, lang, pick } = useI18n();
  const beaches = useBeaches();
  const setPublished = useSetWarningPublished();
  const [error, setError] = useState<string | null>(null);
  const locale = lang === "fa" ? "fa-IR" : "en-US";
  const issued = formatTimestamp(warning.issuedAt, locale);
  const beach =
    warning.beachId !== null
      ? beaches.data?.find((b) => b.id === warning.beachId)
      : undefined;
  const scope = beach
    ? pick(beach.nameEn, beach.nameFa)
    : t("admin.warning.allBeaches");

  function toggle() {
    setError(null);
    setPublished.mutate(
      { id: warning.id, published: !warning.published },
      { onError: () => setError(t("admin.warning.error")) },
    );
  }

  return (
    <li
      data-ocid={`admin.warning.item.${index + 1}`}
      className="surface-glass rounded-2xl p-3.5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone={SEVERITY_TONE[warning.severity]}>
          {t(SEVERITY_KEY[warning.severity])}
        </StatusBadge>
        <StatusBadge
          tone={warning.published ? "success" : "muted"}
          data-ocid={`admin.warning.status.${index + 1}`}
        >
          {warning.published
            ? t("admin.warning.published")
            : t("admin.warning.unpublished")}
        </StatusBadge>
        <span className="numeric ms-auto font-mono text-[0.7rem] text-muted-foreground">
          {issued ?? t("common.noData")}
        </span>
      </div>
      <p className="mt-2 break-words text-sm leading-relaxed text-foreground">
        {pick(warning.messageEn, warning.messageFa)}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
        {scope}
      </p>
      {error ? (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
      <Button
        type="button"
        variant="outline"
        data-ocid={`admin.warning.toggle_button.${index + 1}`}
        onClick={toggle}
        disabled={setPublished.isPending}
        className={cn(
          "mt-3 min-h-10 rounded-full bg-transparent px-3.5 font-bold uppercase tracking-[0.06em]",
          warning.published
            ? "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            : "border-accent/50 text-accent hover:bg-accent/10 hover:text-accent",
        )}
      >
        {setPublished.isPending ? (
          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
        ) : null}
        {warning.published
          ? t("admin.warning.unpublish")
          : t("admin.warning.publish")}
      </Button>
    </li>
  );
}

function WarningForm() {
  const { t, pick } = useI18n();
  const beaches = useBeaches();
  const createWarning = useCreateWarning();
  const [messageEn, setMessageEn] = useState("");
  const [messageFa, setMessageFa] = useState("");
  const [severity, setSeverity] = useState<WarningSeverity>(
    WarningSeverity.advisory,
  );
  const [beachId, setBeachId] = useState<string>(ALL_BEACHES);
  const [published, setPublished] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(false);
    if (messageEn.trim() === "" || messageFa.trim() === "") {
      setError(t("admin.warning.error"));
      return;
    }
    createWarning.mutate(
      {
        beachId: beachId === ALL_BEACHES ? null : BigInt(beachId),
        messageEn: messageEn.trim(),
        messageFa: messageFa.trim(),
        severity,
        published,
      },
      {
        onSuccess: () => {
          setMessageEn("");
          setMessageFa("");
          setSaved(true);
        },
        onError: () => setError(t("admin.warning.error")),
      },
    );
  }

  return (
    <form
      data-ocid="admin.warning.form"
      onSubmit={handleSubmit}
      className="surface-neon-edge relative overflow-hidden p-4 md:p-5"
    >
      <h3 className="flex items-center gap-2 font-display text-base font-extrabold uppercase tracking-tight text-foreground">
        <Megaphone className="size-4 text-accent" aria-hidden="true" />
        {t("admin.warning.create")}
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="warning-severity" className={LABEL_CLASS}>
            {t("admin.warning.severity")}
          </Label>
          <Select
            value={severity}
            onValueChange={(value) => setSeverity(value as WarningSeverity)}
          >
            <SelectTrigger
              id="warning-severity"
              data-ocid="admin.warning.severity_select"
              className="min-h-11 w-full rounded-xl border-input bg-background/60"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SEVERITY_ORDER.map((value) => (
                <SelectItem key={value} value={value}>
                  {t(SEVERITY_KEY[value])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="warning-beach" className={LABEL_CLASS}>
            {t("admin.warning.beach")}
          </Label>
          <Select value={beachId} onValueChange={setBeachId}>
            <SelectTrigger
              id="warning-beach"
              data-ocid="admin.warning.beach_select"
              className="min-h-11 w-full rounded-xl border-input bg-background/60"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_BEACHES}>
                {t("admin.warning.allBeaches")}
              </SelectItem>
              {(beaches.data ?? []).map((beach) => (
                <SelectItem
                  key={beach.id.toString()}
                  value={beach.id.toString()}
                >
                  {pick(beach.nameEn, beach.nameFa)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="warning-message-en" className={LABEL_CLASS}>
            {t("admin.warning.messageEn")}
          </Label>
          <Textarea
            id="warning-message-en"
            data-ocid="admin.warning.message_en_input"
            value={messageEn}
            onChange={(e) => setMessageEn(e.target.value)}
            rows={2}
            className="rounded-xl border-input bg-background/60 text-sm focus-visible:ring-accent"
            required
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="warning-message-fa" className={LABEL_CLASS}>
            {t("admin.warning.messageFa")}
          </Label>
          <Textarea
            id="warning-message-fa"
            data-ocid="admin.warning.message_fa_input"
            dir="rtl"
            value={messageFa}
            onChange={(e) => setMessageFa(e.target.value)}
            rows={2}
            className="rounded-xl border-input bg-background/60 text-sm focus-visible:ring-accent"
            required
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="warning-issued" className={LABEL_CLASS}>
            {t("admin.issuedAt")}
          </Label>
          <p
            id="warning-issued"
            data-ocid="admin.warning.issued_note"
            className="rounded-xl border border-dashed border-border/80 bg-muted/30 px-3 py-2 text-xs text-muted-foreground"
          >
            {t("admin.issuedAt")}: {t("common.now")} · {t("common.timezone")}
          </p>
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          data-ocid="admin.warning.error_state"
          className="mt-3 flex items-center gap-1.5 text-sm text-destructive"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
      {saved ? (
        <p
          data-ocid="admin.warning.success_state"
          className="mt-3 flex items-center gap-1.5 text-sm text-success"
        >
          <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          {t("admin.warning.saved")}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button
          type="submit"
          data-ocid="admin.warning.submit_button"
          disabled={createWarning.isPending}
          className="min-h-11 rounded-full bg-gradient-primary px-5 font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-neon hover:brightness-110"
        >
          {createWarning.isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {t("admin.warning.create")}
        </Button>
        <Button
          type="button"
          variant="ghost"
          data-ocid="admin.warning.publish_toggle"
          onClick={() => setPublished((current) => !current)}
          aria-pressed={published}
          className={cn(
            "min-h-11 rounded-full px-4 font-bold uppercase tracking-[0.08em]",
            published
              ? "text-success hover:bg-success/10 hover:text-success"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {published
            ? t("admin.warning.published")
            : t("admin.warning.unpublished")}
        </Button>
      </div>
    </form>
  );
}

export function WarningManager() {
  const { t } = useI18n();
  const warnings = useAllWarnings();

  const sorted = [...(warnings.data ?? [])].sort((a, b) =>
    a.issuedAt === b.issuedAt ? 0 : a.issuedAt > b.issuedAt ? -1 : 1,
  );

  return (
    <section data-ocid="admin.warnings.section" className="space-y-4">
      <h2 className="flex items-center gap-2 font-display text-lg font-extrabold uppercase tracking-tight text-foreground">
        <Megaphone className="size-4 text-accent" aria-hidden="true" />
        {t("admin.tab.warnings")}
      </h2>

      <WarningForm />

      {warnings.isLoading ? (
        <p
          data-ocid="admin.warnings.loading_state"
          className="text-sm text-muted-foreground"
        >
          {t("common.loading")}
        </p>
      ) : warnings.isError ? (
        <div
          data-ocid="admin.warnings.error_state"
          role="alert"
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive backdrop-blur"
        >
          {t("admin.warning.error")}
          <Button
            type="button"
            variant="outline"
            data-ocid="admin.warnings.retry_button"
            onClick={() => void warnings.refetch()}
            className="min-h-10 rounded-full border-destructive/50 bg-transparent text-destructive hover:bg-destructive/15 hover:text-destructive"
          >
            {t("common.retry")}
          </Button>
        </div>
      ) : sorted.length > 0 ? (
        <ul data-ocid="admin.warnings.list" className="space-y-2.5">
          {sorted.map((warning, index) => (
            <WarningRow
              key={warning.id.toString()}
              warning={warning}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <p
          data-ocid="admin.warnings.empty_state"
          className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-6 text-center text-sm text-muted-foreground"
        >
          {t("admin.warning.empty")}
        </p>
      )}
    </section>
  );
}
