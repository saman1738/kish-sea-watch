import type { Beach } from "@/backend";
import { StatusBadge } from "@/components/conditions/StatusBadge";
import { Button } from "@/components/ui/button";
import { useBeaches, useUpdateBeach } from "@/hooks/use-beaches";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Loader2, MapPin, Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { BeachForm } from "./BeachForm";

function BeachRow({
  beach,
  onEdit,
}: {
  beach: Beach;
  onEdit: () => void;
}) {
  const { t, pick } = useI18n();
  const updateBeach = useUpdateBeach();
  const [error, setError] = useState<string | null>(null);

  function toggleActive() {
    setError(null);
    updateBeach.mutate(
      {
        id: beach.id,
        nameEn: beach.nameEn,
        nameFa: beach.nameFa,
        latitude: beach.latitude,
        longitude: beach.longitude,
        descriptionEn: beach.descriptionEn,
        descriptionFa: beach.descriptionFa,
        active: !beach.active,
      },
      { onError: () => setError(t("admin.beach.error")) },
    );
  }

  return (
    <li
      data-ocid="admin.beach.item"
      className="surface-glass flex flex-col gap-3 rounded-2xl p-3.5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-display text-sm font-bold uppercase tracking-wide text-foreground">
            {pick(beach.nameEn, beach.nameFa)}
          </span>
          <StatusBadge tone={beach.active ? "success" : "muted"}>
            {beach.active ? t("admin.beach.active") : t("beach.inactive")}
          </StatusBadge>
        </div>
        <p className="numeric mt-1.5 flex items-center gap-1.5 font-mono text-[0.7rem] text-muted-foreground">
          <MapPin
            className="size-3 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.7)]"
            aria-hidden="true"
          />
          {beach.latitude.toFixed(4)}° · {beach.longitude.toFixed(4)}°
        </p>
        {error ? (
          <p role="alert" className="mt-1 text-xs text-destructive">
            {error}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          type="button"
          variant="outline"
          data-ocid="admin.beach.edit_button"
          onClick={onEdit}
          className="min-h-10 rounded-full border-accent/50 bg-transparent px-3.5 font-bold uppercase tracking-[0.06em] text-accent hover:bg-accent/10 hover:text-accent"
        >
          <Pencil className="size-3.5" aria-hidden="true" />
          {t("admin.beach.edit")}
        </Button>
        <Button
          type="button"
          variant="ghost"
          data-ocid="admin.beach.toggle_button"
          onClick={toggleActive}
          disabled={updateBeach.isPending}
          className={cn(
            "min-h-10 rounded-full px-3.5 font-bold uppercase tracking-[0.06em]",
            beach.active
              ? "text-destructive hover:bg-destructive/10 hover:text-destructive"
              : "text-success hover:bg-success/10 hover:text-success",
          )}
        >
          {updateBeach.isPending ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          ) : null}
          {beach.active
            ? t("admin.warning.unpublish")
            : t("admin.beach.active")}
        </Button>
      </div>
    </li>
  );
}

export function BeachManager() {
  const { t } = useI18n();
  const beaches = useBeaches();
  const [editing, setEditing] = useState<Beach | null>(null);
  const [creating, setCreating] = useState(false);

  const showForm = creating || editing !== null;

  function closeForm() {
    setCreating(false);
    setEditing(null);
  }

  return (
    <section data-ocid="admin.beaches.section" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-foreground">
          {t("admin.tab.beaches")}
        </h2>
        {!showForm ? (
          <Button
            type="button"
            data-ocid="admin.beach.add_button"
            onClick={() => {
              setEditing(null);
              setCreating(true);
            }}
            className="min-h-11 rounded-full bg-gradient-primary px-5 font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-neon hover:brightness-110"
          >
            <Plus className="size-4" aria-hidden="true" />
            {t("admin.beach.add")}
          </Button>
        ) : null}
      </div>

      {showForm ? (
        <BeachForm
          key={editing ? `edit-${editing.id.toString()}` : "create"}
          beach={editing}
          onDone={closeForm}
        />
      ) : null}

      {beaches.isLoading ? (
        <p
          data-ocid="admin.beaches.loading_state"
          className="text-sm text-muted-foreground"
        >
          {t("common.loading")}
        </p>
      ) : beaches.isError ? (
        <div
          data-ocid="admin.beaches.error_state"
          role="alert"
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive backdrop-blur"
        >
          {t("admin.beach.error")}
          <Button
            type="button"
            variant="outline"
            data-ocid="admin.beaches.retry_button"
            onClick={() => void beaches.refetch()}
            className="min-h-10 rounded-full border-destructive/50 bg-transparent text-destructive hover:bg-destructive/15 hover:text-destructive"
          >
            {t("common.retry")}
          </Button>
        </div>
      ) : beaches.data && beaches.data.length > 0 ? (
        <ul data-ocid="admin.beaches.list" className="space-y-2.5">
          {beaches.data.map((beach) => (
            <BeachRow
              key={beach.id.toString()}
              beach={beach}
              onEdit={() => {
                setCreating(false);
                setEditing(beach);
              }}
            />
          ))}
        </ul>
      ) : (
        <p
          data-ocid="admin.beaches.empty_state"
          className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-6 text-center text-sm text-muted-foreground"
        >
          {t("dashboard.noBeaches")}
        </p>
      )}
    </section>
  );
}
