import type { HourlyPoint } from "@/lib/marine";

export type SuitabilityStatus =
  | "favorable"
  | "caution"
  | "unfavorable"
  | "insufficient";

export type ActivityKey = "swimming" | "fishing" | "surfing" | "kayaking";

export type UvCategory = "low" | "moderate" | "high" | "veryHigh" | "extreme";

export interface UvBand {
  category: UvCategory;
  min: number;
  max: number;
}

/** UV bands: 0–2 Low, 3–5 Moderate, 6–7 High, 8–10 Very High, 11+ Extreme. */
export const UV_BANDS: UvBand[] = [
  { category: "low", min: 0, max: 2 },
  { category: "moderate", min: 3, max: 5 },
  { category: "high", min: 6, max: 7 },
  { category: "veryHigh", min: 8, max: 10 },
  { category: "extreme", min: 11, max: Number.POSITIVE_INFINITY },
];

export function uvCategory(uv: number | null): UvCategory | null {
  if (uv === null || !Number.isFinite(uv) || uv < 0) return null;
  const band = UV_BANDS.find((b) => uv >= b.min && uv <= b.max);
  return band ? band.category : null;
}

export interface SuitabilityResult {
  status: SuitabilityStatus;
  /** Human-readable reasons, already ordered by severity. */
  reasons: string[];
  /** 0–100 confidence in the estimate, based on how many inputs were present. */
  coverage: number;
}

interface Thresholds {
  waveCaution: number;
  waveUnfavorable: number;
  windCaution: number;
  windUnfavorable: number;
  currentCaution: number;
  currentUnfavorable: number;
}

const SWIM_THRESHOLDS: Thresholds = {
  waveCaution: 0.8,
  waveUnfavorable: 1.5,
  windCaution: 20,
  windUnfavorable: 35,
  currentCaution: 0.3,
  currentUnfavorable: 0.6,
};

const ACTIVITY_THRESHOLDS: Record<ActivityKey, Thresholds> = {
  swimming: SWIM_THRESHOLDS,
  fishing: {
    waveCaution: 1.2,
    waveUnfavorable: 2.2,
    windCaution: 28,
    windUnfavorable: 45,
    currentCaution: 0.5,
    currentUnfavorable: 0.9,
  },
  surfing: {
    waveCaution: 2.5,
    waveUnfavorable: 3.5,
    windCaution: 35,
    windUnfavorable: 55,
    currentCaution: 0.8,
    currentUnfavorable: 1.4,
  },
  kayaking: {
    waveCaution: 0.6,
    waveUnfavorable: 1.2,
    windCaution: 18,
    windUnfavorable: 30,
    currentCaution: 0.3,
    currentUnfavorable: 0.6,
  },
};

type ReasonKey =
  | "waveCaution"
  | "waveUnfavorable"
  | "windCaution"
  | "windUnfavorable"
  | "currentCaution"
  | "currentUnfavorable";

const REASON_TEXT: Record<ReasonKey, { en: string; fa: string }> = {
  waveCaution: { en: "Waves are elevated", fa: "موج‌ها بلندتر از حد معمول‌اند" },
  waveUnfavorable: {
    en: "Waves are too high for this activity",
    fa: "موج‌ها برای این فعالیت بیش از حد بلندند",
  },
  windCaution: { en: "Wind is picking up", fa: "باد در حال افزایش است" },
  windUnfavorable: { en: "Strong wind", fa: "باد شدید" },
  currentCaution: { en: "Noticeable current", fa: "جریان محسوس آب" },
  currentUnfavorable: { en: "Strong current", fa: "جریان شدید آب" },
};

export interface SuitabilityOptions {
  lang?: "en" | "fa";
  activity?: ActivityKey;
}

/**
 * Estimate suitability from wave height, wind speed and current speed.
 * Missing inputs are excluded from the score; when fewer than two inputs are
 * available the result is "insufficient" rather than a guess.
 */
export function assessSuitability(
  point: HourlyPoint | null,
  options: SuitabilityOptions = {},
): SuitabilityResult {
  const lang = options.lang ?? "en";
  const thresholds = ACTIVITY_THRESHOLDS[options.activity ?? "swimming"];
  if (!point) {
    return { status: "insufficient", reasons: [], coverage: 0 };
  }

  const inputs: Array<{
    value: number | null;
    caution: number;
    unfavorable: number;
    key: ReasonKey;
  }> = [
    {
      value: point.waveHeight,
      caution: thresholds.waveCaution,
      unfavorable: thresholds.waveUnfavorable,
      key: "waveCaution",
    },
    {
      value: point.windSpeed,
      caution: thresholds.windCaution,
      unfavorable: thresholds.windUnfavorable,
      key: "windCaution",
    },
    {
      value: point.currentSpeed,
      caution: thresholds.currentCaution,
      unfavorable: thresholds.currentUnfavorable,
      key: "currentCaution",
    },
  ];

  const present = inputs.filter((input) => input.value !== null);
  const coverage = Math.round((present.length / inputs.length) * 100);
  if (present.length < 2) {
    return { status: "insufficient", reasons: [], coverage };
  }

  let status: SuitabilityStatus = "favorable";
  const reasons: string[] = [];
  for (const input of present) {
    const value = input.value as number;
    if (value >= input.unfavorable) {
      status = "unfavorable";
      const key = input.key.replace("Caution", "Unfavorable") as ReasonKey;
      reasons.push(REASON_TEXT[key][lang]);
    } else if (value >= input.caution) {
      if (status === "favorable") status = "caution";
      reasons.push(REASON_TEXT[input.key][lang]);
    }
  }

  return { status, reasons, coverage };
}

/** Rank activities for a beach, best first. */
export function rankActivities(
  point: HourlyPoint | null,
  lang: "en" | "fa" = "en",
): Array<{ activity: ActivityKey; result: SuitabilityResult }> {
  const order: Record<SuitabilityStatus, number> = {
    favorable: 0,
    caution: 1,
    insufficient: 2,
    unfavorable: 3,
  };
  const activities: ActivityKey[] = [
    "swimming",
    "fishing",
    "surfing",
    "kayaking",
  ];
  return activities
    .map((activity) => ({
      activity,
      result: assessSuitability(point, { lang, activity }),
    }))
    .sort((a, b) => order[a.result.status] - order[b.result.status]);
}

/** Position (0–1) of a value inside a range, clamped. Used by the tide-gauge rule. */
export function gaugePosition(
  value: number | null,
  min: number,
  max: number,
): number {
  if (value === null || max <= min) return 0;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

export const STATUS_TONE: Record<
  SuitabilityStatus,
  "success" | "warning" | "destructive" | "muted"
> = {
  favorable: "success",
  caution: "warning",
  unfavorable: "destructive",
  insufficient: "muted",
};
