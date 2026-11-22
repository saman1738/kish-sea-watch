/**
 * Open-Meteo marine + weather data layer.
 *
 * Two providers are merged into one normalized snapshot:
 *  - https://marine-api.open-meteo.com/v1/marine  (waves, swell, currents, sea temp)
 *  - https://api.open-meteo.com/v1/forecast       (air, wind, UV, sun, precipitation)
 *
 * Every value is `number | null`; a null is rendered as "No data" and never
 * replaced with a fabricated number.
 */

export const MARINE_ENDPOINT = "https://marine-api.open-meteo.com/v1/marine";
export const WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
export const FORECAST_TIMEZONE = "Asia/Tehran";

/**
 * Marine hourly variables. The provider names sea temperature
 * `sea_surface_temperature`; `water_temperature` is rejected with a 400.
 */
const MARINE_HOURLY = [
  "sea_surface_temperature",
  "wave_height",
  "wave_direction",
  "wave_period",
  "swell_wave_height",
  "swell_wave_direction",
  "ocean_current_velocity",
  "ocean_current_direction",
] as const;

const MARINE_CURRENT = [
  "sea_surface_temperature",
  "wave_height",
  "wave_direction",
  "wave_period",
  "ocean_current_velocity",
  "ocean_current_direction",
] as const;

const WEATHER_HOURLY = [
  "temperature_2m",
  "wind_speed_10m",
  "wind_direction_10m",
  "wind_gusts_10m",
  "precipitation",
  "cloud_cover",
  "uv_index",
] as const;

const WEATHER_DAILY = [
  "uv_index_max",
  "sunrise",
  "sunset",
  "wind_speed_10m_max",
  "temperature_2m_max",
  "temperature_2m_min",
] as const;

const WEATHER_CURRENT = [
  "temperature_2m",
  "wind_speed_10m",
  "wind_direction_10m",
  "wind_gusts_10m",
  "precipitation",
  "cloud_cover",
  "uv_index",
] as const;

export interface HourlyPoint {
  /** ISO local time in Asia/Tehran, e.g. "2026-11-21T14:00". */
  time: string;
  waterTemp: number | null;
  waveHeight: number | null;
  waveDirection: number | null;
  wavePeriod: number | null;
  swellHeight: number | null;
  swellDirection: number | null;
  /** Ocean current speed in m/s (provider reports km/h). */
  currentSpeed: number | null;
  currentDirection: number | null;
  airTemp: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  windGusts: number | null;
  precipitation: number | null;
  cloudCover: number | null;
  uvIndex: number | null;
}

export interface DailyPoint {
  date: string;
  uvMax: number | null;
  sunrise: string | null;
  sunset: string | null;
  waveHeightMax: number | null;
  windSpeedMax: number | null;
  tempMax: number | null;
  tempMin: number | null;
}

export interface MarineSnapshot {
  latitude: number;
  longitude: number;
  timezone: string;
  /** Provider generation time (ISO), used for the "last updated" label. */
  fetchedAt: string;
  /** Observation time of the current reading (ISO local), when provided. */
  observedAt: string | null;
  current: HourlyPoint | null;
  hourly: HourlyPoint[];
  daily: DailyPoint[];
  /** True when the marine provider returned no usable rows. */
  marineMissing: boolean;
}

type Json = Record<string, unknown>;

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function arr(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function series(hourly: Json, key: string): unknown[] {
  return arr(hourly[key]);
}

function at(list: unknown[], index: number): unknown {
  return index >= 0 && index < list.length ? list[index] : null;
}

function buildUrl(base: string, params: Record<string, string>): string {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params))
    url.searchParams.set(key, value);
  return url.toString();
}

export function marineUrl(latitude: number, longitude: number): string {
  return buildUrl(MARINE_ENDPOINT, {
    latitude: latitude.toFixed(4),
    longitude: longitude.toFixed(4),
    hourly: MARINE_HOURLY.join(","),
    current: MARINE_CURRENT.join(","),
    daily: "wave_height_max",
    timezone: FORECAST_TIMEZONE,
    forecast_days: "7",
    cell_selection: "sea",
  });
}

export function weatherUrl(latitude: number, longitude: number): string {
  return buildUrl(WEATHER_ENDPOINT, {
    latitude: latitude.toFixed(4),
    longitude: longitude.toFixed(4),
    hourly: WEATHER_HOURLY.join(","),
    daily: WEATHER_DAILY.join(","),
    current: WEATHER_CURRENT.join(","),
    timezone: FORECAST_TIMEZONE,
    forecast_days: "7",
  });
}

async function fetchJson(url: string, signal?: AbortSignal): Promise<Json> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Provider responded ${response.status}`);
  }
  const data: unknown = await response.json();
  if (!data || typeof data !== "object") {
    throw new Error("Provider returned an unexpected payload");
  }
  return data as Json;
}

/** Index of the hourly row closest to (but not after) the provider's current time. */
function currentIndex(times: unknown[], currentTime: string | null): number {
  if (times.length === 0) return -1;
  if (!currentTime) return 0;
  let best = 0;
  for (let i = 0; i < times.length; i += 1) {
    const value = str(times[i]);
    if (!value) continue;
    if (value <= currentTime) best = i;
    else break;
  }
  return best;
}

function hourlyTimes(marine: Json | null, weather: Json | null): unknown[] {
  const wHourly = (weather?.hourly as Json | undefined) ?? {};
  const mHourly = (marine?.hourly as Json | undefined) ?? {};
  const wTimes = series(wHourly, "time");
  return wTimes.length > 0 ? wTimes : series(mHourly, "time");
}

function mergeHourly(
  marine: Json | null,
  weather: Json | null,
  index: number,
): HourlyPoint | null {
  const mHourly = (marine?.hourly as Json | undefined) ?? {};
  const wHourly = (weather?.hourly as Json | undefined) ?? {};
  const times = hourlyTimes(marine, weather);
  if (index < 0 || index >= times.length) return null;
  const time = str(times[index]);
  if (!time) return null;

  const m = (key: string) => num(at(series(mHourly, key), index));
  const w = (key: string) => num(at(series(wHourly, key), index));
  const currentKmh = m("ocean_current_velocity");

  return {
    time,
    waterTemp: m("sea_surface_temperature"),
    waveHeight: m("wave_height"),
    waveDirection: m("wave_direction"),
    wavePeriod: m("wave_period"),
    swellHeight: m("swell_wave_height"),
    swellDirection: m("swell_wave_direction"),
    currentSpeed: currentKmh === null ? null : currentKmh / 3.6,
    currentDirection: m("ocean_current_direction"),
    airTemp: w("temperature_2m"),
    windSpeed: w("wind_speed_10m"),
    windDirection: w("wind_direction_10m"),
    windGusts: w("wind_gusts_10m"),
    precipitation: w("precipitation"),
    cloudCover: w("cloud_cover"),
    uvIndex: w("uv_index"),
  };
}

function buildHourly(marine: Json | null, weather: Json | null): HourlyPoint[] {
  const times = hourlyTimes(marine, weather);
  const points: HourlyPoint[] = [];
  for (let i = 0; i < times.length; i += 1) {
    const point = mergeHourly(marine, weather, i);
    if (point) points.push(point);
  }
  return points;
}

function buildDaily(marine: Json | null, weather: Json | null): DailyPoint[] {
  const wDaily = (weather?.daily as Json | undefined) ?? {};
  const mDaily = (marine?.daily as Json | undefined) ?? {};
  const dates =
    series(wDaily, "time").length > 0
      ? series(wDaily, "time")
      : series(mDaily, "time");
  const points: DailyPoint[] = [];
  for (let i = 0; i < dates.length; i += 1) {
    const date = str(dates[i]);
    if (!date) continue;
    points.push({
      date,
      uvMax: num(at(series(wDaily, "uv_index_max"), i)),
      sunrise: str(at(series(wDaily, "sunrise"), i)),
      sunset: str(at(series(wDaily, "sunset"), i)),
      waveHeightMax: num(at(series(mDaily, "wave_height_max"), i)),
      windSpeedMax: num(at(series(wDaily, "wind_speed_10m_max"), i)),
      tempMax: num(at(series(wDaily, "temperature_2m_max"), i)),
      tempMin: num(at(series(wDaily, "temperature_2m_min"), i)),
    });
  }
  return points;
}

/** Merge both provider payloads into one normalized snapshot. */
export function normalizeSnapshot(
  marine: Json | null,
  weather: Json | null,
  latitude: number,
  longitude: number,
): MarineSnapshot {
  const hourly = buildHourly(marine, weather);
  const times = hourlyTimes(marine, weather);
  const currentTime = str((weather?.current as Json | undefined)?.time);
  const idx = currentIndex(times, currentTime);
  // Prefer the provider's `current` block; fall back to the hourly row at the
  // current hour so a provider that omits `current` still yields a reading.
  const current = mergeHourly(marine, weather, idx) ?? hourly[0] ?? null;

  const marineMissing =
    !marine ||
    (num(current?.waveHeight) === null &&
      num(current?.waterTemp) === null &&
      num(current?.currentSpeed) === null);

  return {
    latitude,
    longitude,
    timezone:
      str(weather?.timezone) ?? str(marine?.timezone) ?? FORECAST_TIMEZONE,
    fetchedAt: new Date().toISOString(),
    observedAt: current?.time ?? null,
    current,
    hourly,
    daily: buildDaily(marine, weather),
    marineMissing,
  };
}

/** Fetch and merge both providers. Throws when the weather provider fails. */
export async function fetchMarineSnapshot(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<MarineSnapshot> {
  const [marineResult, weatherResult] = await Promise.allSettled([
    fetchJson(marineUrl(latitude, longitude), signal),
    fetchJson(weatherUrl(latitude, longitude), signal),
  ]);

  if (weatherResult.status === "rejected") {
    throw weatherResult.reason instanceof Error
      ? weatherResult.reason
      : new Error("Weather provider failed");
  }
  const marine =
    marineResult.status === "fulfilled" ? marineResult.value : null;
  return normalizeSnapshot(marine, weatherResult.value, latitude, longitude);
}

/** Parse an Open-Meteo local ISO string ("2026-11-21T14:00") as Tehran wall time. */
export function parseLocalTime(value: string | null | undefined): Date | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(value);
  if (!match) return null;
  const [, y, mo, d, h = "0", mi = "0"] = match;
  const date = new Date(
    Number(y),
    Number(mo) - 1,
    Number(d),
    Number(h),
    Number(mi),
  );
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Format an Open-Meteo local time as HH:mm. */
export function formatClock(value: string | null | undefined): string | null {
  const date = parseLocalTime(value);
  if (!date) return null;
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

/** Format an Open-Meteo local date as a short weekday + day. */
export function formatDayLabel(value: string, lang: "en" | "fa"): string {
  const date = parseLocalTime(value);
  if (!date) return value;
  return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", {
    weekday: "short",
    day: "numeric",
  }).format(date);
}

/** Compass label for a bearing in degrees. */
export function compassLabel(degrees: number | null): string | null {
  if (degrees === null) return null;
  const points = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const normalized = ((degrees % 360) + 360) % 360;
  return points[Math.round(normalized / 45) % 8];
}

/** Slice the next `count` hourly points starting at the current hour. */
export function upcomingHours(
  hourly: HourlyPoint[],
  count = 24,
): HourlyPoint[] {
  if (hourly.length === 0) return [];
  const now = new Date();
  const nowKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:00`;
  let start = hourly.findIndex((point) => point.time >= nowKey);
  if (start < 0) start = 0;
  return hourly.slice(start, start + count);
}
