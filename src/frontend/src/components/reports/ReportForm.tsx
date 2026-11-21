import { type ReportKind, ReportKind as ReportKindEnum } from "@/backend";
import { SignInButton } from "@/components/InternetIdentity";
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
import { useSubmitReport } from "@/hooks/use-reports";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  CheckCircle2,
  MessageSquarePlus,
  Send,
} from "lucide-react";
import { useState } from "react";
import { REPORT_KIND_LABEL, REPORT_KIND_ORDER } from "./report-meta";

const NOTE_LIMIT = 280;

export function ReportForm({ className }: { className?: string }) {
  const { t, pick } = useI18n();
  const { data: beaches } = useBeaches();
  const submit = useSubmitReport();
  const { identity, isInitializing } = useInternetIdentity();
  const signedIn =
    !!identity && !identity.getPrincipal().isAnonymous() && !isInitializing;

  const [beachId, setBeachId] = useState<string>("");
  const [kind, setKind] = useState<ReportKind>(ReportKindEnum.roughWater);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const canSubmit = signedIn && beachId !== "" && !submit.isPending;
  const remaining = NOTE_LIMIT - note.length;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    const captured = { beachId: BigInt(beachId), kind, note: note.trim() };
    setNote("");
    setSaved(false);
    submit.mutate(captured, {
      onSuccess: () => setSaved(true),
      onError: () =>
        setNote((current) => (current === "" ? captured.note : current)),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-ocid="reports.form"
      className={cn("surface-neon-edge flex flex-col gap-4 p-5", className)}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-neon">
          <MessageSquarePlus className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-foreground">
            {t("reports.formTitle")}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t("reports.formBody")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="report-beach" className="label-caps">
          {t("common.beach")}
        </Label>
        <Select value={beachId} onValueChange={setBeachId}>
          <SelectTrigger
            id="report-beach"
            data-ocid="reports.beach_select"
            className="min-h-11 w-full rounded-xl border-input bg-background/60"
          >
            <SelectValue placeholder={t("dashboard.selectBeach")} />
          </SelectTrigger>
          <SelectContent>
            {(beaches ?? []).map((beach) => (
              <SelectItem key={beach.id.toString()} value={beach.id.toString()}>
                {pick(beach.nameEn, beach.nameFa)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="report-kind" className="label-caps">
          {t("reports.kind")}
        </Label>
        <Select
          value={kind}
          onValueChange={(value) => setKind(value as ReportKind)}
        >
          <SelectTrigger
            id="report-kind"
            data-ocid="reports.kind_select"
            className="min-h-11 w-full rounded-xl border-input bg-background/60"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {REPORT_KIND_ORDER.map((option) => (
              <SelectItem key={option} value={option}>
                {t(REPORT_KIND_LABEL[option])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <Label htmlFor="report-note" className="label-caps">
            {t("reports.note")}{" "}
            <span className="font-normal normal-case tracking-normal text-muted-foreground">
              ({t("common.optional")})
            </span>
          </Label>
          <span
            className={cn(
              "numeric font-mono text-[0.7rem]",
              remaining <= 20 ? "text-warning" : "text-muted-foreground",
            )}
          >
            {note.length}/{NOTE_LIMIT}
          </span>
        </div>
        <Textarea
          id="report-note"
          data-ocid="reports.note_textarea"
          value={note}
          onChange={(event) => setNote(event.target.value.slice(0, NOTE_LIMIT))}
          placeholder={t("reports.notePlaceholder")}
          rows={3}
          className="resize-none rounded-xl border-input bg-background/60"
        />
      </div>

      {!signedIn ? (
        <div
          data-ocid="reports.sign_in_prompt"
          className="flex flex-col gap-2.5 rounded-xl border border-accent/40 bg-accent/10 p-3"
        >
          <p className="text-sm font-medium text-foreground">
            {t("reports.signInToSubmit")}
          </p>
          <SignInButton className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-neon transition-smooth hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60" />
        </div>
      ) : null}

      {submit.isError ? (
        <p
          role="alert"
          data-ocid="reports.submit_error_state"
          className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t("reports.error")}
        </p>
      ) : null}

      {saved && !submit.isError ? (
        <p
          data-ocid="reports.success_state"
          className="flex items-center gap-2 rounded-xl border border-success/40 bg-success/10 p-3 text-sm text-success"
        >
          <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          {t("reports.success")}
        </p>
      ) : null}

      <Button
        type="submit"
        data-ocid="reports.submit_button"
        disabled={!canSubmit}
        className="min-h-11 w-full rounded-full bg-gradient-primary font-bold uppercase tracking-wide text-primary-foreground shadow-neon transition-smooth hover:opacity-90 disabled:opacity-50"
      >
        <Send className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        {submit.isPending ? t("reports.submitting") : t("reports.submit")}
      </Button>
    </form>
  );
}
