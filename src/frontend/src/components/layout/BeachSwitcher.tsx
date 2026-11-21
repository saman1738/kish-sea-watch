import type { Beach } from "@/backend";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";

/** Beach selector: a dropdown on mobile, a pill row on desktop. */
export function BeachSwitcher({
  beaches,
  activeId,
  onSelect,
  className,
}: {
  beaches: Beach[];
  activeId: bigint | null;
  /** When provided, selecting a beach updates local state instead of navigating. */
  onSelect?: (id: bigint) => void;
  className?: string;
}) {
  const { pick, t } = useI18n();
  const [open, setOpen] = useState(false);
  const active = beaches.find((beach) => beach.id === activeId) ?? beaches[0];

  if (beaches.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        data-ocid="beach.switcher_button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-border/80 bg-card/80 px-3 py-2.5 text-sm font-semibold backdrop-blur transition-smooth hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
      >
        <span className="flex min-w-0 items-center gap-2">
          <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
          <span className="truncate">
            {active
              ? pick(active.nameEn, active.nameFa)
              : t("dashboard.selectBeach")}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          data-ocid="beach.switcher_list"
          className="absolute inset-x-0 top-full z-30 mt-1.5 overflow-hidden rounded-xl border border-border/80 bg-popover/95 shadow-elevated backdrop-blur-xl md:hidden"
        >
          {beaches.map((beach) => (
            <li key={beach.id.toString()}>
              {onSelect ? (
                <button
                  type="button"
                  onClick={() => {
                    onSelect(beach.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "block w-full px-3 py-2.5 text-start text-sm transition-smooth",
                    beach.id === active?.id
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-foreground hover:bg-secondary/60",
                  )}
                >
                  {pick(beach.nameEn, beach.nameFa)}
                </button>
              ) : (
                <Link
                  to="/beaches/$beachId"
                  params={{ beachId: beach.id.toString() }}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 text-sm transition-smooth",
                    beach.id === active?.id
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-foreground hover:bg-secondary/60",
                  )}
                >
                  {pick(beach.nameEn, beach.nameFa)}
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="hidden flex-wrap gap-2 md:flex">
        {beaches.map((beach, index) => {
          const isActive = beach.id === active?.id;
          const itemClass = cn(
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            isActive
              ? "border-transparent bg-gradient-primary text-primary-foreground shadow-neon"
              : "border-border/80 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
          );
          const dot = (
            <span
              aria-hidden="true"
              className={cn(
                "size-1.5 rounded-full",
                isActive
                  ? "bg-primary-foreground motion-safe:animate-pulse-soft"
                  : "bg-muted-foreground/40",
              )}
            />
          );
          if (onSelect) {
            return (
              <button
                key={beach.id.toString()}
                type="button"
                onClick={() => onSelect(beach.id)}
                data-ocid={`beach.switcher_item.${index + 1}`}
                aria-pressed={isActive}
                className={itemClass}
              >
                {dot}
                {pick(beach.nameEn, beach.nameFa)}
              </button>
            );
          }
          return (
            <Link
              key={beach.id.toString()}
              to="/beaches/$beachId"
              params={{ beachId: beach.id.toString() }}
              data-ocid={`beach.switcher_item.${index + 1}`}
              aria-current={isActive ? "page" : undefined}
              className={itemClass}
            >
              {dot}
              {pick(beach.nameEn, beach.nameFa)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
