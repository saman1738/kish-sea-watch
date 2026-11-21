import { type ReportKind, WarningSeverity } from "@/backend";
import type { TranslationKey } from "@/lib/i18n";

/** Motoko Time.now() values are nanosecond bigints. */
export function timestampToDate(timestamp: bigint): Date | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatTimestamp(
  timestamp: bigint,
  locale: string,
): string | null {
  const date = timestampToDate(timestamp);
  if (!date) return null;
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Tehran",
  }).format(date);
}

export const REPORT_KIND_KEY: Record<ReportKind, TranslationKey> = {
  strongCurrents: "reports.kind.strongCurrents",
  waterClarity: "reports.kind.waterClarity",
  unusualWaves: "reports.kind.unusualWaves",
  jellyfish: "reports.kind.jellyfish",
  calmWater: "reports.kind.calmWater",
  otherHazard: "reports.kind.otherHazard",
  roughWater: "reports.kind.roughWater",
};

export const SEVERITY_KEY: Record<WarningSeverity, TranslationKey> = {
  info: "admin.severity.info",
  advisory: "admin.severity.advisory",
  warning: "admin.severity.warning",
  danger: "admin.severity.danger",
};

export const SEVERITY_ORDER: WarningSeverity[] = [
  WarningSeverity.info,
  WarningSeverity.advisory,
  WarningSeverity.warning,
  WarningSeverity.danger,
];

/** Parse a decimal coordinate string; returns null when not a finite number. */
export function parseCoordinate(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}
