import { a as useI18n, m as require_react, n as cn, p as require_jsx_runtime, t as createLucideIcon, tt as __toESM } from "./createLucideIcon-Cedqr6G7.js";
import { a as useBeaches, h as MapPin, i as useBeach, n as PageShell } from "./PageHeader-CGmbrCfX.js";
import { a as formatDayLabel, i as formatClock, l as assessSuitability, n as LastUpdated, o as upcomingHours, r as compassLabel, t as useConditions, u as gaugePosition } from "./use-conditions-B48t51xP.js";
import { t as Compass } from "./compass-CqAPFzSb.js";
import { a as Megaphone, r as usePublishedWarnings } from "./use-warnings-CmrCB3iI.js";
import { n as ConditionsError, r as ConditionsSkeleton } from "./ConditionsStates-SatpB9DR.js";
import { a as ChartTooltipContent, c as XAxis, d as WarningList, i as ChartTooltip, l as Area, n as UvAdvicePanel, o as AreaChart, r as ChartContainer, s as YAxis, t as BeachSwitcher, u as CartesianGrid } from "./BeachSwitcher-bZwzf8xX.js";
import { a as useParams, i as Link, r as ClipboardList, t as Waves } from "./index-DjkFBWJW.js";
import { t as StatusBadge } from "./StatusBadge-HUmeSnlj.js";
import { r as useReportsForBeach } from "./use-reports-B7p_Aman.js";
import { n as SuitabilityPanel, r as MetricTile, t as SuitabilityBadge } from "./SuitabilityPanel-Cb3NJHQa.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowLeft = createLucideIcon("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]);
//#endregion
//#region src/components/beach/BeachReports.tsx
var import_jsx_runtime = require_jsx_runtime();
var STATUS_TONE = {
	verified: "success",
	unverified: "warning",
	dismissed: "muted"
};
var STATUS_KEY = {
	verified: "common.verified",
	unverified: "common.unverified",
	dismissed: "common.dismissed"
};
var KIND_KEY = {
	strongCurrents: "reports.kind.strongCurrents",
	waterClarity: "reports.kind.waterClarity",
	unusualWaves: "reports.kind.unusualWaves",
	jellyfish: "reports.kind.jellyfish",
	calmWater: "reports.kind.calmWater",
	otherHazard: "reports.kind.otherHazard",
	roughWater: "reports.kind.roughWater"
};
/** Backend timestamps are nanosecond bigints. */
function formatSubmittedAt(timestamp, lang) {
	const date = new Date(Number(timestamp / 1000000n));
	if (Number.isNaN(date.getTime())) return null;
	return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-GB", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Asia/Tehran",
		hour12: false
	}).format(date);
}
function BeachReports({ reports, className }) {
	const { t, lang } = useI18n();
	const sorted = [...reports].sort((a, b) => a.submittedAt === b.submittedAt ? 0 : a.submittedAt < b.submittedAt ? 1 : -1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "beach.reports_section",
		"aria-labelledby": "beach-reports-title",
		className: cn("surface-glass rounded-2xl p-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id: "beach-reports-title",
				className: "flex items-center gap-2 font-display text-lg font-bold uppercase tracking-tight text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
					className: "size-4 text-accent",
					"aria-hidden": "true"
				}), t("section.reports")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-warning",
				children: t("reports.unverifiedLabel")
			})]
		}), sorted.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ocid": "beach.reports.empty_state",
			className: "mt-4 rounded-xl border border-dashed border-border bg-background/30 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-foreground",
				children: t("reports.empty")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: t("reports.emptyBody")
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-ocid": "beach.reports.list",
			className: "mt-3 space-y-2",
			children: sorted.map((report, index) => {
				const submitted = formatSubmittedAt(report.submittedAt, lang);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					"data-ocid": `beach.reports.item.${index + 1}`,
					className: "rounded-xl border border-border/70 bg-background/35 p-3 transition-smooth hover:border-accent/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm font-bold uppercase tracking-wide text-foreground",
								children: t(KIND_KEY[report.kind])
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
								tone: STATUS_TONE[report.status],
								"data-ocid": `beach.reports.status.${index + 1}`,
								children: t(STATUS_KEY[report.status])
							})]
						}),
						report.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm leading-relaxed text-foreground/90",
							children: report.note
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1.5 text-[0.65rem] text-muted-foreground",
							children: [
								t("reports.submittedAt"),
								":",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "numeric font-mono",
									children: submitted ?? t("common.noData")
								})
							]
						})
					]
				}, report.id.toString());
			})
		})]
	});
}
//#endregion
//#region src/components/beach/BeachWarnings.tsx
function formatIssuedAt(timestamp, lang) {
	const date = new Date(Number(timestamp / 1000000n));
	if (Number.isNaN(date.getTime())) return null;
	return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-GB", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Asia/Tehran",
		hour12: false
	}).format(date);
}
/** Published official warnings: this beach first, then island-wide. */
function BeachWarnings({ warnings, beachId, className }) {
	const { t, lang } = useI18n();
	const forBeach = warnings.filter((warning) => warning.beachId !== void 0 && warning.beachId === beachId);
	const islandWide = warnings.filter((warning) => warning.beachId === void 0);
	const groups = [{
		key: "beach",
		title: t("common.beach"),
		items: forBeach
	}, {
		key: "island",
		title: t("dashboard.heroTitle"),
		items: islandWide
	}].filter((group) => group.items.length > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "beach.warnings_section",
		"aria-labelledby": "beach-warnings-title",
		className: cn("surface-glass rounded-2xl p-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			id: "beach-warnings-title",
			className: "flex items-center gap-2 font-display text-lg font-bold uppercase tracking-tight text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {
				className: "size-4 text-warning",
				"aria-hidden": "true"
			}), t("section.warnings")]
		}), groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-ocid": "beach.warnings.empty_state",
			className: "mt-3 text-sm text-muted-foreground",
			children: t("common.empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-4",
			children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "label-caps mb-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: cn("size-1.5 rounded-full", group.key === "beach" ? "bg-accent shadow-[0_0_8px_oklch(0.68_0.24_345/0.9)]" : "bg-primary shadow-[0_0_8px_oklch(0.8_0.14_195/0.9)]")
					}), group.title]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningList, { warnings: group.items }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1.5 space-y-0.5",
					children: group.items.map((warning) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-[0.65rem] text-muted-foreground",
						children: [
							t("admin.issuedAt"),
							":",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "numeric font-mono",
								children: formatIssuedAt(warning.issuedAt, lang) ?? t("common.noData")
							})
						]
					}, `issued-${warning.id.toString()}`))
				})
			] }, group.key))
		})]
	});
}
//#endregion
//#region src/components/beach/CurrentConditions.tsx
/** Full current-conditions instrument cluster for one beach. */
function CurrentConditions({ current, sunrise, sunset, dailyUvMax, className }) {
	const { t, num } = useI18n();
	const forecast = t("common.forecast");
	const value = (n, digits = 1) => n === null ? null : num(n, digits);
	const dir = (degrees) => compassLabel(degrees);
	const tiles = [
		{
			key: "water",
			label: t("metric.waterTemp"),
			value: value(current?.waterTemp ?? null, 0),
			unit: t("common.celsius"),
			gauge: gaugePosition(current?.waterTemp ?? null, 18, 32)
		},
		{
			key: "wave",
			label: t("metric.waveHeight"),
			value: value(current?.waveHeight ?? null),
			unit: t("common.meters"),
			gauge: gaugePosition(current?.waveHeight ?? null, 0, 2.5)
		},
		{
			key: "waveDir",
			label: t("metric.waveDirection"),
			value: dir(current?.waveDirection ?? null),
			unit: t("common.degrees")
		},
		{
			key: "wavePeriod",
			label: t("metric.wavePeriod"),
			value: value(current?.wavePeriod ?? null, 0),
			unit: t("common.seconds")
		},
		{
			key: "swell",
			label: t("metric.swellHeight"),
			value: value(current?.swellHeight ?? null),
			unit: t("common.meters"),
			gauge: gaugePosition(current?.swellHeight ?? null, 0, 2.5)
		},
		{
			key: "swellDir",
			label: t("metric.swellDirection"),
			value: dir(current?.swellDirection ?? null),
			unit: t("common.degrees")
		},
		{
			key: "current",
			label: t("metric.currentSpeed"),
			value: value(current?.currentSpeed ?? null, 2),
			unit: t("common.ms"),
			gauge: gaugePosition(current?.currentSpeed ?? null, 0, 1)
		},
		{
			key: "currentDir",
			label: t("metric.currentDirection"),
			value: dir(current?.currentDirection ?? null),
			unit: t("common.degrees")
		},
		{
			key: "wind",
			label: t("metric.windSpeed"),
			value: value(current?.windSpeed ?? null, 0),
			unit: t("common.kmh"),
			detail: dir(current?.windDirection ?? null),
			gauge: gaugePosition(current?.windSpeed ?? null, 0, 45)
		},
		{
			key: "gusts",
			label: t("metric.windGusts"),
			value: value(current?.windGusts ?? null, 0),
			unit: t("common.kmh")
		},
		{
			key: "air",
			label: t("metric.airTemp"),
			value: value(current?.airTemp ?? null, 0),
			unit: t("common.celsius"),
			gauge: gaugePosition(current?.airTemp ?? null, 12, 40)
		},
		{
			key: "rain",
			label: t("metric.precipitation"),
			value: value(current?.precipitation ?? null, 1),
			unit: t("common.mm")
		},
		{
			key: "cloud",
			label: t("metric.cloudCover"),
			value: value(current?.cloudCover ?? null, 0),
			unit: t("common.percent"),
			gauge: gaugePosition(current?.cloudCover ?? null, 0, 100)
		},
		{
			key: "uv",
			label: t("metric.uvIndex"),
			value: value(current?.uvIndex ?? null, 0),
			unit: "",
			gauge: gaugePosition(current?.uvIndex ?? null, 0, 12)
		},
		{
			key: "uvMax",
			label: t("metric.uvMax"),
			value: value(dailyUvMax, 0),
			unit: "",
			gauge: gaugePosition(dailyUvMax, 0, 12)
		},
		{
			key: "sunrise",
			label: t("metric.sunrise"),
			value: formatClock(sunrise),
			unit: ""
		},
		{
			key: "sunset",
			label: t("metric.sunset"),
			value: formatClock(sunset),
			unit: ""
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "beach.current_panel",
		"aria-labelledby": "beach-current-title",
		className: cn("surface-neon-edge relative overflow-hidden p-5 md:p-6", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -end-12 -top-12 size-48 rounded-full bg-accent/20 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -start-16 bottom-0 size-40 rounded-full bg-primary/20 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					id: "beach-current-title",
					className: "flex items-center gap-2 font-display text-lg font-bold uppercase tracking-tight text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, {
						className: "size-4 text-primary",
						"aria-hidden": "true"
					}), t("section.current")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-accent",
					children: forecast
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4",
				children: tiles.map((tile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
					"data-ocid": `beach.metric.${tile.key}`,
					label: tile.label,
					value: tile.value,
					unit: tile.unit || void 0,
					detail: tile.detail ?? null,
					caption: forecast,
					gauge: tile.gauge
				}, tile.key))
			})
		]
	});
}
//#endregion
//#region src/components/beach/DailyForecast.tsx
/** Seven-day outlook table with a per-day swimming estimate. */
function DailyForecast({ daily, className }) {
	const { t, lang, num } = useI18n();
	const rows = daily.slice(0, 7);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "beach.daily_section",
		"aria-labelledby": "beach-daily-title",
		className: cn("surface-glass rounded-2xl p-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "beach-daily-title",
					className: "font-display text-xl font-extrabold uppercase tracking-tight text-foreground",
					children: t("section.daily")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground",
					children: t("beach.dailyOutlook")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-accent",
				children: t("common.forecast")
			})]
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted-foreground",
			children: t("common.noData")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 overflow-x-auto scrollbar-slim",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[30rem] border-collapse text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "py-2 pe-2 text-start font-semibold",
							children: t("common.today")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "px-2 py-2 text-end font-semibold",
							children: t("metric.waveHeight")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "px-2 py-2 text-end font-semibold",
							children: t("metric.windSpeed")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "px-2 py-2 text-end font-semibold",
							children: t("metric.airTemp")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							className: "ps-2 py-2 text-end font-semibold",
							children: t("section.suitability")
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((day, index) => {
					const estimate = assessSuitability({
						time: day.date,
						waterTemp: null,
						waveHeight: day.waveHeightMax,
						waveDirection: null,
						wavePeriod: null,
						swellHeight: null,
						swellDirection: null,
						currentSpeed: null,
						currentDirection: null,
						airTemp: day.tempMax,
						windSpeed: day.windSpeedMax,
						windDirection: null,
						windGusts: null,
						precipitation: null,
						cloudCover: null,
						uvIndex: day.uvMax
					}, { lang });
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						"data-ocid": `beach.daily_row.${index + 1}`,
						className: "border-b border-border/50 transition-smooth last:border-0 hover:bg-primary/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "row",
								className: "py-2.5 pe-2 text-start font-display text-sm font-bold uppercase tracking-wide text-foreground",
								children: formatDayLabel(day.date, lang)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "numeric px-2 py-2.5 text-end font-mono text-foreground",
								children: day.waveHeightMax === null ? t("common.noData") : `${num(day.waveHeightMax, 1)} ${t("common.meters")}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "numeric px-2 py-2.5 text-end font-mono text-foreground",
								children: day.windSpeedMax === null ? t("common.noData") : `${num(day.windSpeedMax, 0)} ${t("common.kmh")}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "numeric px-2 py-2.5 text-end font-mono text-foreground",
								children: day.tempMax === null ? t("common.noData") : `${num(day.tempMax, 0)} ${t("common.celsius")}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "ps-2 py-2.5 text-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitabilityBadge, {
									status: estimate.status,
									"data-ocid": `beach.daily_status.${index + 1}`
								})
							})
						]
					}, day.date);
				}) })]
			})
		})]
	});
}
//#endregion
//#region src/components/beach/ForecastChart.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Single-series forecast chart. Null values are dropped so a gap in the
* provider data renders as a gap, never as a fabricated zero.
*/
function ForecastChart({ title, unit, points, color = "var(--color-chart-1)", className, "data-ocid": dataOcid }) {
	const { t, num } = useI18n();
	const gradientId = `fill-${(0, import_react.useId)().replace(/:/g, "")}`;
	const data = points.filter((point) => point.value !== null);
	const config = { value: {
		label: title,
		color
	} };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		"data-ocid": dataOcid,
		className: cn("surface-glass flex flex-col rounded-2xl p-4 transition-smooth hover:border-primary/40", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "flex items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-sm font-bold uppercase tracking-wide text-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full border border-border/70 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
				children: unit
			})]
		}), data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 mb-2 text-sm text-muted-foreground",
			children: t("chart.noData")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
			config,
			className: "mt-2 aspect-auto h-32 w-full",
			"aria-label": `${title} (${unit})`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 6,
					right: 6,
					bottom: 0,
					left: -18
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: gradientId,
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: color,
							stopOpacity: .42
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: color,
							stopOpacity: .02
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						vertical: false,
						strokeDasharray: "3 3",
						stroke: "oklch(var(--border) / 0.6)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tickLine: false,
						axisLine: false,
						tickMargin: 6,
						minTickGap: 18,
						interval: "preserveStartEnd",
						tick: {
							fill: "oklch(var(--muted-foreground))",
							fontSize: 10
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tickLine: false,
						axisLine: false,
						width: 34,
						tickFormatter: (value) => num(value, 0),
						tick: {
							fill: "oklch(var(--muted-foreground))",
							fontSize: 10
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
						cursor: false,
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
							indicator: "line",
							formatter: (value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "numeric font-mono",
								children: [
									num(Number(value), 1),
									" ",
									unit
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "value",
						stroke: color,
						strokeWidth: 2.5,
						fill: `url(#${gradientId})`,
						dot: false,
						isAnimationActive: false,
						style: { filter: `drop-shadow(0 0 6px ${color})` }
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/beach/HourlyForecast.tsx
/** 24-hour forecast charts for wave height, wind, temperature and UV. */
function HourlyForecast({ hourly, className }) {
	const { t, num } = useI18n();
	const points = upcomingHours(hourly, 24);
	const series = (pick) => points.map((point) => ({
		label: formatClock(point.time) ?? "",
		value: pick(point)
	}));
	const charts = [
		{
			key: "wave",
			title: t("chart.waveHeight"),
			unit: t("common.meters"),
			points: series((p) => p.waveHeight),
			color: "var(--color-chart-1)"
		},
		{
			key: "wind",
			title: t("chart.windSpeed"),
			unit: t("common.kmh"),
			points: series((p) => p.windSpeed),
			color: "var(--color-chart-2)"
		},
		{
			key: "air",
			title: t("chart.airTemp"),
			unit: t("common.celsius"),
			points: series((p) => p.airTemp),
			color: "var(--color-chart-5)"
		},
		{
			key: "uv",
			title: t("chart.uvIndex"),
			unit: "",
			points: series((p) => p.uvIndex),
			color: "var(--color-chart-3)"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "beach.hourly_section",
		"aria-labelledby": "beach-hourly-title",
		className: cn("space-y-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "beach-hourly-title",
						className: "font-display text-xl font-extrabold uppercase tracking-tight text-foreground",
						children: t("section.hourly")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground",
						children: t("beach.hourlyOutlook")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-accent",
					children: t("common.forecast")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: charts.map((chart) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForecastChart, {
					"data-ocid": `beach.chart.${chart.key}`,
					title: chart.title,
					unit: chart.unit,
					points: chart.points,
					color: chart.color
				}, chart.key))
			}),
			points.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[0.65rem] text-muted-foreground",
				children: [
					t("chart.hour"),
					": ",
					formatClock(points[0]?.time),
					" –",
					" ",
					formatClock(points[points.length - 1]?.time),
					" ·",
					" ",
					t("common.timezone"),
					" · ",
					num(points.length, 0),
					" h"
				]
			}) : null
		]
	});
}
//#endregion
//#region src/pages/BeachDetailPage.tsx
function parseBeachId(raw) {
	if (!/^\d+$/.test(raw)) return null;
	try {
		return BigInt(raw);
	} catch {
		return null;
	}
}
function BeachNotFound() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "beach.not_found_state",
		className: "surface-glass flex flex-col items-start gap-3 rounded-2xl border-dashed p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
				className: "size-6 text-accent",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-bold uppercase tracking-tight text-foreground",
				children: t("beach.notFound")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("beach.notFoundBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				"data-ocid": "beach.back_link",
				className: "inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-3 py-1.5 text-sm font-semibold text-primary transition-smooth hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "size-4 rtl:rotate-180",
					"aria-hidden": "true"
				}), t("common.allBeaches")]
			})
		]
	}) });
}
/** Immersive tropical header: identity, coordinates and the headline status. */
function BeachHero({ beach, statusLabel, statusTone, updated }) {
	const { t, pick } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		"data-ocid": "beach.hero",
		className: "hero-vice relative overflow-hidden rounded-3xl border border-border/60 shadow-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex flex-col gap-5 p-5 md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						"data-ocid": "beach.back_link",
						className: "inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/25 bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur transition-smooth hover:border-primary/70 hover:bg-background/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							className: "size-3.5 rtl:rotate-180",
							"aria-hidden": "true"
						}), t("beach.backHome")]
					}), updated]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "label-caps text-primary-foreground/80",
							children: [
								t("dashboard.heroTitle"),
								" · ",
								t("beach.overview")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 break-words font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground drop-shadow-[0_2px_18px_oklch(0.1_0.06_275/0.7)] md:text-6xl",
							children: pick(beach.nameEn, beach.nameFa)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-sm leading-relaxed text-foreground/85",
							children: pick(beach.descriptionEn, beach.descriptionFa)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "numeric inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/25 bg-background/45 px-3 py-1 font-mono text-xs text-foreground backdrop-blur",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									className: "size-3.5 text-accent",
									"aria-hidden": "true"
								}),
								beach.latitude.toFixed(4),
								"° · ",
								beach.longitude.toFixed(4),
								"°"
							]
						}),
						statusLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-ocid": "beach.hero_status",
							className: cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] backdrop-blur", statusTone),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, {
								className: "size-3.5",
								"aria-hidden": "true"
							}), statusLabel]
						}) : null,
						!beach.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-warning/50 bg-warning/15 px-3 py-1 text-xs font-semibold text-warning-foreground backdrop-blur",
							children: t("beach.inactive")
						}) : null
					]
				})
			]
		})
	});
}
function BeachDetailBody({ beach }) {
	const { t, pick, lang, num } = useI18n();
	const conditions = useConditions(beach.latitude, beach.longitude);
	const reports = useReportsForBeach(beach.id);
	const warnings = usePublishedWarnings();
	const beaches = useBeaches();
	const snapshot = conditions.data ?? null;
	const current = snapshot?.current ?? null;
	const today = snapshot?.daily[0] ?? null;
	const suitability = assessSuitability(current, { lang });
	const statusLabel = suitability.status === "favorable" ? t("status.favorable") : suitability.status === "caution" ? t("status.caution") : suitability.status === "unfavorable" ? t("status.unfavorable") : t("status.insufficient");
	const statusTone = suitability.status === "favorable" ? "border-success/60 bg-success/20 text-success" : suitability.status === "caution" ? "border-warning/60 bg-warning/20 text-warning" : suitability.status === "unfavorable" ? "border-destructive/60 bg-destructive/20 text-destructive" : "border-primary-foreground/30 bg-background/40 text-muted-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		"data-ocid": "beach.page",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachHero, {
				beach,
				statusLabel,
				statusTone,
				updated: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LastUpdated, {
					fetchedAt: snapshot?.fetchedAt ?? null,
					onRefresh: () => void conditions.refetch(),
					isRefreshing: conditions.isFetching
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachSwitcher, {
				beaches: beaches.data ?? [],
				activeId: beach.id
			}),
			conditions.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsSkeleton, {}) : conditions.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsError, {
				onRetry: () => void conditions.refetch(),
				isRetrying: conditions.isFetching
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrentConditions, {
					current,
					sunrise: today?.sunrise ?? null,
					sunset: today?.sunset ?? null,
					dailyUvMax: today?.uvMax ?? null
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitabilityPanel, {
					result: suitability,
					beachName: pick(beach.nameEn, beach.nameFa)
				})]
			}),
			snapshot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HourlyForecast, { hourly: snapshot.hourly }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UvAdvicePanel, {
						uv: current?.uvIndex ?? null,
						dailyMax: today?.uvMax ?? null
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-ocid": "beach.safety_panel",
						"aria-labelledby": "beach-safety-title",
						className: "surface-glass rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "beach-safety-title",
								className: "label-caps text-primary",
								children: t("section.safety")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-foreground",
								children: t("common.disclaimer")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[0.68rem] text-muted-foreground",
								children: t("uv.seaSeparate")
							})
						]
					})]
				})]
			}) : null,
			snapshot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyForecast, { daily: snapshot.daily }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachWarnings, {
						warnings: warnings.data ?? [],
						beachId: beach.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachReports, { reports: reports.data ?? [] })]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-ocid": "beach.coverage",
				className: "flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.65rem] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("common.attribution") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("footer.timezone") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						t("beach.coverageLabel"),
						":",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "numeric font-mono font-semibold text-foreground",
							children: [num(suitability.coverage, 0), "%"]
						})
					] })
				]
			})
		]
	});
}
function BeachDetailPage() {
	const { beachId } = useParams({ from: "/beaches/$beachId" });
	const id = parseBeachId(beachId);
	const beach = useBeach(id);
	const { t } = useI18n();
	if (id === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachNotFound, {});
	if (beach.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsSkeleton, {}) });
	if (beach.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsError, {
		onRetry: () => void beach.refetch(),
		isRetrying: beach.isFetching
	}) });
	if (!beach.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachNotFound, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "motion-safe:animate-fade-in",
		"aria-label": t("beach.overview"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachDetailBody, { beach: beach.data })
	});
}
//#endregion
export { BeachDetailPage as default };
