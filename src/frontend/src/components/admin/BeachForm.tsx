import type { Beach } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAddBeach, useUpdateBeach } from "@/hooks/use-beaches";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Loader2, Plus, X } from "lucide-react";
import { type FormEvent, useState } from "react";
import { parseCoordinate } from "./admin-utils";

interface BeachDraft {
  nameEn: string;
  nameFa: string;
  latitude: string;
  longitude: string;
  descriptionEn: string;
  descriptionFa: string;
  active: boolean;
}

const EMPTY_DRAFT: BeachDraft = {
  nameEn: "",
  nameFa: "",
  latitude: "",
  longitude: "",
  descriptionEn: "",
  descriptionFa: "",
  active: true,
};

function draftFromBeach(beach: Beach): BeachDraft {
  return {
    nameEn: beach.nameEn,
    nameFa: beach.nameFa,
    latitude: String(beach.latitude),
    longitude: String(beach.longitude),
    descriptionEn: beach.descriptionEn,
    descriptionFa: beach.descriptionFa,
    active: beach.active,
  };
}

const FIELD_CLASS =
  "min-h-11 rounded-xl border-input bg-background/60 text-sm focus-visible:ring-accent";

const LABEL_CLASS =
  "text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground";

export function BeachForm({
  beach,
  onDone,
}: {
  beach: Beach | null;
  onDone: () => void;
}) {
  const { t } = useI18n();
  const addBeach = useAddBeach();
  const updateBeach = useUpdateBeach();
  const [draft, setDraft] = useState<BeachDraft>(() =>
    beach ? draftFromBeach(beach) : EMPTY_DRAFT,
  );
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const pending = addBeach.isPending || updateBeach.isPending;

  function set<K extends keyof BeachDraft>(key: K, value: BeachDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(false);

    const latitude = parseCoordinate(draft.latitude);
    const longitude = parseCoordinate(draft.longitude);
    if (draft.nameEn.trim() === "" || draft.nameFa.trim() === "") {
      setError(t("admin.beach.error"));
      return;
    }
    if (latitude === null || longitude === null) {
      setError(t("admin.beach.error"));
      return;
    }

    const payload = {
      nameEn: draft.nameEn.trim(),
      nameFa: draft.nameFa.trim(),
      latitude,
      longitude,
      descriptionEn: draft.descriptionEn.trim(),
      descriptionFa: draft.descriptionFa.trim(),
    };

    const onSuccess = () => {
      setSaved(true);
      if (!beach) setDraft(EMPTY_DRAFT);
    };
    const onError = () => setError(t("admin.beach.error"));

    if (beach) {
      updateBeach.mutate(
        { ...payload, id: beach.id, active: draft.active },
        { onSuccess, onError },
      );
    } else {
      addBeach.mutate(payload, { onSuccess, onError });
    }
  }

  return (
    <form
      data-ocid="admin.beach.form"
      onSubmit={handleSubmit}
      className="surface-neon-edge relative overflow-hidden p-4 md:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-foreground">
          {beach ? t("admin.beach.edit") : t("admin.beach.add")}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          data-ocid="admin.beach.cancel_button"
          aria-label={t("common.cancel")}
          onClick={onDone}
          className="size-9 shrink-0 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="beach-name-en" className={LABEL_CLASS}>
            {t("admin.beach.nameEn")}
          </Label>
          <Input
            id="beach-name-en"
            data-ocid="admin.beach.name_en_input"
            value={draft.nameEn}
            onChange={(e) => set("nameEn", e.target.value)}
            className={FIELD_CLASS}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="beach-name-fa" className={LABEL_CLASS}>
            {t("admin.beach.nameFa")}
          </Label>
          <Input
            id="beach-name-fa"
            data-ocid="admin.beach.name_fa_input"
            dir="rtl"
            value={draft.nameFa}
            onChange={(e) => set("nameFa", e.target.value)}
            className={FIELD_CLASS}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="beach-lat" className={LABEL_CLASS}>
            {t("admin.beach.lat")}
          </Label>
          <Input
            id="beach-lat"
            data-ocid="admin.beach.lat_input"
            type="number"
            inputMode="decimal"
            step="any"
            min={-90}
            max={90}
            value={draft.latitude}
            onChange={(e) => set("latitude", e.target.value)}
            className={cn(FIELD_CLASS, "numeric font-mono")}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="beach-lng" className={LABEL_CLASS}>
            {t("admin.beach.lng")}
          </Label>
          <Input
            id="beach-lng"
            data-ocid="admin.beach.lng_input"
            type="number"
            inputMode="decimal"
            step="any"
            min={-180}
            max={180}
            value={draft.longitude}
            onChange={(e) => set("longitude", e.target.value)}
            className={cn(FIELD_CLASS, "numeric font-mono")}
            required
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="beach-desc-en" className={LABEL_CLASS}>
            {t("admin.beach.descEn")}
          </Label>
          <Textarea
            id="beach-desc-en"
            data-ocid="admin.beach.desc_en_input"
            value={draft.descriptionEn}
            onChange={(e) => set("descriptionEn", e.target.value)}
            rows={2}
            className="rounded-xl border-input bg-background/60 text-sm focus-visible:ring-accent"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="beach-desc-fa" className={LABEL_CLASS}>
            {t("admin.beach.descFa")}
          </Label>
          <Textarea
            id="beach-desc-fa"
            data-ocid="admin.beach.desc_fa_input"
            dir="rtl"
            value={draft.descriptionFa}
            onChange={(e) => set("descriptionFa", e.target.value)}
            rows={2}
            className="rounded-xl border-input bg-background/60 text-sm focus-visible:ring-accent"
          />
        </div>
        {beach ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/40 px-3 py-2.5 sm:col-span-2">
            <Label
              htmlFor="beach-active"
              className="text-xs font-bold uppercase tracking-[0.1em] text-foreground"
            >
              {t("admin.beach.active")}
            </Label>
            <Switch
              id="beach-active"
              data-ocid="admin.beach.active_switch"
              checked={draft.active}
              onCheckedChange={(checked) => set("active", checked)}
            />
          </div>
        ) : null}
      </div>

      {error ? (
        <p
          role="alert"
          data-ocid="admin.beach.error_state"
          className="mt-3 flex items-center gap-1.5 text-sm text-destructive"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
      {saved ? (
        <p
          data-ocid="admin.beach.success_state"
          className="mt-3 flex items-center gap-1.5 text-sm text-success"
        >
          <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          {t("admin.beach.saved")}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button
          type="submit"
          data-ocid="admin.beach.submit_button"
          disabled={pending}
          className="min-h-11 rounded-full bg-gradient-primary px-5 font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-neon hover:brightness-110"
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Plus className="size-4" aria-hidden="true" />
          )}
          {t("common.save")}
        </Button>
        <Button
          type="button"
          variant="ghost"
          data-ocid="admin.beach.cancel_button"
          onClick={onDone}
          className="min-h-11 rounded-full px-4 font-bold uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground"
        >
          {t("common.cancel")}
        </Button>
      </div>
    </form>
  );
}
