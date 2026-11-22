import { a as useI18n, n as cn, p as require_jsx_runtime, t as createLucideIcon, u as useQuery } from "./createLucideIcon-Cedqr6G7.js";
import { i as RefreshCw } from "./ConditionsStates-SatpB9DR.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleHelp = createLucideIcon("circle-help", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
		key: "1u773s"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TriangleAlert = createLucideIcon("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
//#endregion
//#region src/lib/conditions.ts
/** UV bands: 0–2 Low, 3–5 Moderate, 6–7 High, 8–10 Very High, 11+ Extreme. */
var UV_BANDS = [
	{
		category: "low",
		min: 0,
		max: 2
	},
	{
		category: "moderate",
		min: 3,
		max: 5
	},
	{
		category: "high",
		min: 6,
		max: 7
	},
	{
		category: "veryHigh",
		min: 8,
		max: 10
	},
	{
		category: "extreme",
		min: 11,
		max: Number.POSITIVE_INFINITY
	}
];
function uvCategory(uv) {
	if (uv === null || !Number.isFinite(uv) || uv < 0) return null;
	const band = UV_BANDS.find((b) => uv >= b.min && uv <= b.max);
	return band ? band.category : null;
}
var ACTIVITY_THRESHOLDS = {
	swimming: {
		waveCaution: .8,
		waveUnfavorable: 1.5,
		windCaution: 20,
		windUnfavorable: 35,
		currentCaution: .3,
		currentUnfavorable: .6
	},
	fishing: {
		waveCaution: 1.2,
		waveUnfavorable: 2.2,
		windCaution: 28,
		windUnfavorable: 45,
		currentCaution: .5,
		currentUnfavorable: .9
	},
	surfing: {
		waveCaution: 2.5,
		waveUnfavorable: 3.5,
		windCaution: 35,
		windUnfavorable: 55,
		currentCaution: .8,
		currentUnfavorable: 1.4
	},
	kayaking: {
		waveCaution: .6,
		waveUnfavorable: 1.2,
		windCaution: 18,
		windUnfavorable: 30,
		currentCaution: .3,
		currentUnfavorable: .6
	}
};
var REASON_TEXT = {
	waveCaution: {
		en: "Waves are elevated",
		fa: "موج‌ها بلندتر از حد معمول‌اند"
	},
	waveUnfavorable: {
		en: "Waves are too high for this activity",
		fa: "موج‌ها برای این فعالیت بیش از حد بلندند"
	},
	windCaution: {
		en: "Wind is picking up",
		fa: "باد در حال افزایش است"
	},
	windUnfavorable: {
		en: "Strong wind",
		fa: "باد شدید"
	},
	currentCaution: {
		en: "Noticeable current",
		fa: "جریان محسوس آب"
	},
	currentUnfavorable: {
		en: "Strong current",
		fa: "جریان شدید آب"
	}
};
/**
* Estimate suitability from wave height, wind speed and current speed.
* Missing inputs are excluded from the score; when fewer than two inputs are
* available the result is "insufficient" rather than a guess.
*/
function assessSuitability(point, options = {}) {
	const lang = options.lang ?? "en";
	const thresholds = ACTIVITY_THRESHOLDS[options.activity ?? "swimming"];
	if (!point) return {
		status: "insufficient",
		reasons: [],
		coverage: 0
	};
	const inputs = [
		{
			value: point.waveHeight,
			caution: thresholds.waveCaution,
			unfavorable: thresholds.waveUnfavorable,
			key: "waveCaution"
		},
		{
			value: point.windSpeed,
			caution: thresholds.windCaution,
			unfavorable: thresholds.windUnfavorable,
			key: "windCaution"
		},
		{
			value: point.currentSpeed,
			caution: thresholds.currentCaution,
			unfavorable: thresholds.currentUnfavorable,
			key: "currentCaution"
		}
	];
	const present = inputs.filter((input) => input.value !== null);
	const coverage = Math.round(present.length / inputs.length * 100);
	if (present.length < 2) return {
		status: "insufficient",
		reasons: [],
		coverage
	};
	let status = "favorable";
	const reasons = [];
	for (const input of present) {
		const value = input.value;
		if (value >= input.unfavorable) {
			status = "unfavorable";
			const key = input.key.replace("Caution", "Unfavorable");
			reasons.push(REASON_TEXT[key][lang]);
		} else if (value >= input.caution) {
			if (status === "favorable") status = "caution";
			reasons.push(REASON_TEXT[input.key][lang]);
		}
	}
	return {
		status,
		reasons,
		coverage
	};
}
/** Rank activities for a beach, best first. */
function rankActivities(point, lang = "en") {
	const order = {
		favorable: 0,
		caution: 1,
		insufficient: 2,
		unfavorable: 3
	};
	return [
		"swimming",
		"fishing",
		"surfing",
		"kayaking"
	].map((activity) => ({
		activity,
		result: assessSuitability(point, {
			lang,
			activity
		})
	})).sort((a, b) => order[a.result.status] - order[b.result.status]);
}
/** Position (0–1) of a value inside a range, clamped. Used by the tide-gauge rule. */
function gaugePosition(value, min, max) {
	if (value === null || max <= min) return 0;
	return Math.min(1, Math.max(0, (value - min) / (max - min)));
}
var STATUS_TONE = {
	favorable: "success",
	caution: "warning",
	unfavorable: "destructive",
	insufficient: "muted"
};
//#endregion
//#region src/lib/marine.ts
var import_jsx_runtime = require_jsx_runtime();
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
var MARINE_ENDPOINT = "https://marine-api.open-meteo.com/v1/marine";
var WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
var FORECAST_TIMEZONE = "Asia/Tehran";
/**
* Marine hourly variables. The provider names sea temperature
* `sea_surface_temperature`; `water_temperature` is rejected with a 400.
*/
var MARINE_HOURLY = [
	"sea_surface_temperature",
	"wave_height",
	"wave_direction",
	"wave_period",
	"swell_wave_height",
	"swell_wave_direction",
	"ocean_current_velocity",
	"ocean_current_direction"
];
var MARINE_CURRENT = [
	"sea_surface_temperature",
	"wave_height",
	"wave_direction",
	"wave_period",
	"ocean_current_velocity",
	"ocean_current_direction"
];
var WEATHER_HOURLY = [
	"temperature_2m",
	"wind_speed_10m",
	"wind_direction_10m",
	"wind_gusts_10m",
	"precipitation",
	"cloud_cover",
	"uv_index"
];
var WEATHER_DAILY = [
	"uv_index_max",
	"sunrise",
	"sunset",
	"wind_speed_10m_max",
	"temperature_2m_max",
	"temperature_2m_min"
];
var WEATHER_CURRENT = [
	"temperature_2m",
	"wind_speed_10m",
	"wind_direction_10m",
	"wind_gusts_10m",
	"precipitation",
	"cloud_cover",
	"uv_index"
];
function num(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function str(value) {
	return typeof value === "string" && value.length > 0 ? value : null;
}
function arr(value) {
	return Array.isArray(value) ? value : [];
}
function series(hourly, key) {
	return arr(hourly[key]);
}
function at(list, index) {
	return index >= 0 && index < list.length ? list[index] : null;
}
function buildUrl(base, params) {
	const url = new URL(base);
	for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
	return url.toString();
}
function marineUrl(latitude, longitude) {
	return buildUrl(MARINE_ENDPOINT, {
		latitude: latitude.toFixed(4),
		longitude: longitude.toFixed(4),
		hourly: MARINE_HOURLY.join(","),
		current: MARINE_CURRENT.join(","),
		daily: "wave_height_max",
		timezone: FORECAST_TIMEZONE,
		forecast_days: "7",
		cell_selection: "sea"
	});
}
function weatherUrl(latitude, longitude) {
	return buildUrl(WEATHER_ENDPOINT, {
		latitude: latitude.toFixed(4),
		longitude: longitude.toFixed(4),
		hourly: WEATHER_HOURLY.join(","),
		daily: WEATHER_DAILY.join(","),
		current: WEATHER_CURRENT.join(","),
		timezone: FORECAST_TIMEZONE,
		forecast_days: "7"
	});
}
async function fetchJson(url, signal) {
	const response = await fetch(url, { signal });
	if (!response.ok) throw new Error(`Provider responded ${response.status}`);
	const data = await response.json();
	if (!data || typeof data !== "object") throw new Error("Provider returned an unexpected payload");
	return data;
}
/** Index of the hourly row closest to (but not after) the provider's current time. */
function currentIndex(times, currentTime) {
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
function hourlyTimes(marine, weather) {
	const wHourly = weather?.hourly ?? {};
	const mHourly = marine?.hourly ?? {};
	const wTimes = series(wHourly, "time");
	return wTimes.length > 0 ? wTimes : series(mHourly, "time");
}
function mergeHourly(marine, weather, index) {
	const mHourly = marine?.hourly ?? {};
	const wHourly = weather?.hourly ?? {};
	const times = hourlyTimes(marine, weather);
	if (index < 0 || index >= times.length) return null;
	const time = str(times[index]);
	if (!time) return null;
	const m = (key) => num(at(series(mHourly, key), index));
	const w = (key) => num(at(series(wHourly, key), index));
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
		uvIndex: w("uv_index")
	};
}
function buildHourly(marine, weather) {
	const times = hourlyTimes(marine, weather);
	const points = [];
	for (let i = 0; i < times.length; i += 1) {
		const point = mergeHourly(marine, weather, i);
		if (point) points.push(point);
	}
	return points;
}
function buildDaily(marine, weather) {
	const wDaily = weather?.daily ?? {};
	const mDaily = marine?.daily ?? {};
	const dates = series(wDaily, "time").length > 0 ? series(wDaily, "time") : series(mDaily, "time");
	const points = [];
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
			tempMin: num(at(series(wDaily, "temperature_2m_min"), i))
		});
	}
	return points;
}
/** Merge both provider payloads into one normalized snapshot. */
function normalizeSnapshot(marine, weather, latitude, longitude) {
	const hourly = buildHourly(marine, weather);
	const current = mergeHourly(marine, weather, currentIndex(hourlyTimes(marine, weather), str((weather?.current)?.time))) ?? hourly[0] ?? null;
	const marineMissing = !marine || num(current?.waveHeight) === null && num(current?.waterTemp) === null && num(current?.currentSpeed) === null;
	return {
		latitude,
		longitude,
		timezone: str(weather?.timezone) ?? str(marine?.timezone) ?? "Asia/Tehran",
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
		observedAt: current?.time ?? null,
		current,
		hourly,
		daily: buildDaily(marine, weather),
		marineMissing
	};
}
/** Fetch and merge both providers. Throws when the weather provider fails. */
async function fetchMarineSnapshot(latitude, longitude, signal) {
	const [marineResult, weatherResult] = await Promise.allSettled([fetchJson(marineUrl(latitude, longitude), signal), fetchJson(weatherUrl(latitude, longitude), signal)]);
	if (weatherResult.status === "rejected") throw weatherResult.reason instanceof Error ? weatherResult.reason : /* @__PURE__ */ new Error("Weather provider failed");
	return normalizeSnapshot(marineResult.status === "fulfilled" ? marineResult.value : null, weatherResult.value, latitude, longitude);
}
/** Parse an Open-Meteo local ISO string ("2026-11-21T14:00") as Tehran wall time. */
function parseLocalTime(value) {
	if (!value) return null;
	const match = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(value);
	if (!match) return null;
	const [, y, mo, d, h = "0", mi = "0"] = match;
	const date = new Date(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi));
	return Number.isNaN(date.getTime()) ? null : date;
}
/** Format an Open-Meteo local time as HH:mm. */
function formatClock(value) {
	const date = parseLocalTime(value);
	if (!date) return null;
	return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
/** Format an Open-Meteo local date as a short weekday + day. */
function formatDayLabel(value, lang) {
	const date = parseLocalTime(value);
	if (!date) return value;
	return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", {
		weekday: "short",
		day: "numeric"
	}).format(date);
}
/** Compass label for a bearing in degrees. */
function compassLabel(degrees) {
	if (degrees === null) return null;
	const points = [
		"N",
		"NE",
		"E",
		"SE",
		"S",
		"SW",
		"W",
		"NW"
	];
	const normalized = (degrees % 360 + 360) % 360;
	return points[Math.round(normalized / 45) % 8];
}
/** Slice the next `count` hourly points starting at the current hour. */
function upcomingHours(hourly, count = 24) {
	if (hourly.length === 0) return [];
	const now = /* @__PURE__ */ new Date();
	const nowKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:00`;
	let start = hourly.findIndex((point) => point.time >= nowKey);
	if (start < 0) start = 0;
	return hourly.slice(start, start + count);
}
//#endregion
//#region src/components/layout/LastUpdated.tsx
/** "Updated 14:20 · Asia/Tehran" with a manual refresh action. */
function LastUpdated({ fetchedAt, onRefresh, isRefreshing, className }) {
	const { t } = useI18n();
	let clock = null;
	if (fetchedAt) {
		const date = new Date(fetchedAt);
		if (!Number.isNaN(date.getTime())) clock = new Intl.DateTimeFormat("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			timeZone: "Asia/Tehran",
			hour12: false
		}).format(date);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2 text-xs text-muted-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: cn("size-1.5 rounded-full bg-success shadow-[0_0_8px_oklch(0.8_0.16_172/0.9)]", !isRefreshing && "motion-safe:animate-pulse-soft")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "uppercase tracking-[0.1em]",
					children: t("common.updated")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "numeric font-mono font-semibold text-foreground",
					children: clock ?? t("common.noData")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "hidden sm:inline",
					children: ["· ", t("common.timezone")]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"data-ocid": "conditions.refresh_button",
			onClick: onRefresh,
			disabled: isRefreshing,
			"aria-label": t("common.refresh"),
			className: "inline-flex items-center gap-1 rounded-full border border-border/70 px-2 py-1 font-semibold text-primary transition-smooth hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
				className: cn("size-3.5", isRefreshing && "animate-spin"),
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden sm:inline",
				children: t("common.refresh")
			})]
		})]
	});
}
//#endregion
//#region src/hooks/use-conditions.ts
/** Cache window for provider responses: 10 minutes. */
var STALE_MS = 6e5;
function conditionsQueryKey(latitude, longitude) {
	return [
		"conditions",
		latitude.toFixed(4),
		longitude.toFixed(4)
	];
}
/**
* Live Open-Meteo conditions for a coordinate pair.
* `refetch()` is the manual refresh action; the visible "last updated" time
* comes from `data.fetchedAt`.
*/
function useConditions(latitude, longitude) {
	return useQuery({
		queryKey: latitude !== null && longitude !== null ? conditionsQueryKey(latitude, longitude) : ["conditions", "none"],
		queryFn: async ({ signal }) => {
			if (latitude === null || longitude === null) throw new Error("Missing coordinates");
			return fetchMarineSnapshot(latitude, longitude, signal);
		},
		enabled: latitude !== null && longitude !== null,
		staleTime: STALE_MS,
		gcTime: 18e5,
		retry: 1,
		refetchOnWindowFocus: false
	});
}
//#endregion
export { formatDayLabel as a, UV_BANDS as c, rankActivities as d, uvCategory as f, formatClock as i, assessSuitability as l, CircleHelp as m, LastUpdated as n, upcomingHours as o, TriangleAlert as p, compassLabel as r, STATUS_TONE as s, useConditions as t, gaugePosition as u };
