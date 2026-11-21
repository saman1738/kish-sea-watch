import { ReportKind, ReviewStatus } from "@/backend";
import type { TranslationKey } from "@/lib/i18n";

export const REPORT_KIND_ORDER: ReportKind[] = [
  ReportKind.roughWater,
  ReportKind.calmWater,
  ReportKind.strongCurrents,
  ReportKind.waterClarity,
  ReportKind.jellyfish,
  ReportKind.unusualWaves,
  ReportKind.otherHazard,
];

export const REPORT_KIND_LABEL: Record<ReportKind, TranslationKey> = {
  [ReportKind.roughWater]: "reports.kind.roughWater",
  [ReportKind.calmWater]: "reports.kind.calmWater",
  [ReportKind.strongCurrents]: "reports.kind.strongCurrents",
  [ReportKind.waterClarity]: "reports.kind.waterClarity",
  [ReportKind.jellyfish]: "reports.kind.jellyfish",
  [ReportKind.unusualWaves]: "reports.kind.unusualWaves",
  [ReportKind.otherHazard]: "reports.kind.otherHazard",
};

export const REVIEW_STATUS_LABEL: Record<ReviewStatus, TranslationKey> = {
  [ReviewStatus.unverified]: "common.unverified",
  [ReviewStatus.verified]: "common.verified",
  [ReviewStatus.dismissed]: "common.dismissed",
};

/** Motoko Time.now() is nanoseconds; convert before any Date operation. */
export function timestampToDate(timestamp: bigint): Date | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatReportTime(
  timestamp: bigint,
  lang: "en" | "fa",
): string | null {
  const date = timestampToDate(timestamp);
  if (!date) return null;
  return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tehran",
    hour12: false,
  }).format(date);
}
