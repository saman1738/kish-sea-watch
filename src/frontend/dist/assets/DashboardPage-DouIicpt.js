import { a as useI18n, m as require_react, n as cn, p as require_jsx_runtime, t as createLucideIcon, tt as __toESM } from "./createLucideIcon-CQV5MV8G.js";
import { a as useBeaches, h as MapPin, n as PageShell } from "./PageHeader-DrkWxCpG.js";
import { t as ArrowRight } from "./arrow-right-1aEHWTdY.js";
import { a as formatDayLabel, f as uvCategory, i as formatClock, l as assessSuitability, n as LastUpdated, o as upcomingHours, r as compassLabel, t as useConditions, u as gaugePosition } from "./use-conditions-BiRlBwxq.js";
import { a as Megaphone, r as usePublishedWarnings } from "./use-warnings-B8aYo76T.js";
import { n as ConditionsSkeleton, t as ConditionsError } from "./ConditionsStates-DS74Ce8n.js";
import { a as ChartTooltipContent, c as XAxis, d as WarningList, f as Sun, i as ChartTooltip, l as Area, n as UvAdvicePanel, o as AreaChart, r as ChartContainer, s as YAxis, t as BeachSwitcher, u as CartesianGrid } from "./BeachSwitcher-B7GtYyiZ.js";
import { i as Link, n as ShieldCheck, t as Waves } from "./index-CcoF8Tur.js";
import { t as StatusBadge } from "./StatusBadge-DMXEopju.js";
import { n as SuitabilityPanel, r as MetricTile, t as SuitabilityBadge } from "./SuitabilityPanel-Buxn2LAo.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CloudRain = createLucideIcon("cloud-rain", [
	["path", {
		d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
		key: "1pljnt"
	}],
	["path", {
		d: "M16 14v6",
		key: "1j4efv"
	}],
	["path", {
		d: "M8 14v6",
		key: "17c4r9"
	}],
	["path", {
		d: "M12 16v6",
		key: "c8a4gj"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Droplets = createLucideIcon("droplets", [["path", {
	d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
	key: "1ptgy4"
}], ["path", {
	d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
	key: "1sl1rz"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Sunrise = createLucideIcon("sunrise", [
	["path", {
		d: "M12 2v8",
		key: "1q4o3n"
	}],
	["path", {
		d: "m4.93 10.93 1.41 1.41",
		key: "2a7f42"
	}],
	["path", {
		d: "M2 18h2",
		key: "j10viu"
	}],
	["path", {
		d: "M20 18h2",
		key: "wocana"
	}],
	["path", {
		d: "m19.07 10.93-1.41 1.41",
		key: "15zs5n"
	}],
	["path", {
		d: "M22 22H2",
		key: "19qnx5"
	}],
	["path", {
		d: "m8 6 4-4 4 4",
		key: "ybng9g"
	}],
	["path", {
		d: "M16 18a4 4 0 0 0-8 0",
		key: "1lzouq"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Sunset = createLucideIcon("sunset", [
	["path", {
		d: "M12 10V2",
		key: "16sf7g"
	}],
	["path", {
		d: "m4.93 10.93 1.41 1.41",
		key: "2a7f42"
	}],
	["path", {
		d: "M2 18h2",
		key: "j10viu"
	}],
	["path", {
		d: "M20 18h2",
		key: "wocana"
	}],
	["path", {
		d: "m19.07 10.93-1.41 1.41",
		key: "15zs5n"
	}],
	["path", {
		d: "M22 22H2",
		key: "19qnx5"
	}],
	["path", {
		d: "m16 6-4 4-4-4",
		key: "6wukr"
	}],
	["path", {
		d: "M16 18a4 4 0 0 0-8 0",
		key: "1lzouq"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Wind = createLucideIcon("wind", [
	["path", {
		d: "M12.8 19.6A2 2 0 1 0 14 16H2",
		key: "148xed"
	}],
	["path", {
		d: "M17.5 8a2.5 2.5 0 1 1 2 4H2",
		key: "1u4tom"
	}],
	["path", {
		d: "M9.8 4.4A2 2 0 1 1 11 8H2",
		key: "75valh"
	}]
]);
//#endregion
//#region src/components/dashboard/CurrentConditions.tsx
var import_jsx_runtime = require_jsx_runtime();
function fmt$1(value, digits, num) {
	return value === null ? null : num(value, digits);
}
function CurrentConditions({ snapshot, suitability, className }) {
	const { t, num } = useI18n();
	const current = snapshot.current;
	const today = snapshot.daily[0] ?? null;
	const sunrise = formatClock(today?.sunrise);
	const sunset = formatClock(today?.sunset);
	const windDir = compassLabel(current?.windDirection ?? null);
	const currentDir = compassLabel(current?.currentDirection ?? null);
	const waveDir = compassLabel(current?.waveDirection ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "dashboard.current_panel",
		"aria-labelledby": "current-title",
		className: cn("surface-neon-edge overflow-hidden rounded-2xl", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "current-title",
						className: "font-display text-base font-extrabold uppercase tracking-wide text-foreground",
						children: t("section.current")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground",
						children: [
							t("common.forecast"),
							" · ",
							t("common.timezone")
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitabilityBadge, {
						status: suitability.status,
						"data-ocid": "dashboard.suitability_badge"
					}), snapshot.marineMissing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						tone: "muted",
						"data-ocid": "dashboard.marine_missing_badge",
						children: t("common.noData")
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						"data-ocid": "dashboard.metric.water_temp",
						label: t("metric.waterTemp"),
						value: fmt$1(current?.waterTemp ?? null, 1, num),
						unit: t("common.celsius"),
						gauge: gaugePosition(current?.waterTemp ?? null, 18, 34)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						"data-ocid": "dashboard.metric.wave_height",
						label: t("metric.waveHeight"),
						value: fmt$1(current?.waveHeight ?? null, 1, num),
						unit: t("common.meters"),
						detail: waveDir,
						gauge: gaugePosition(current?.waveHeight ?? null, 0, 2.5)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						"data-ocid": "dashboard.metric.wind",
						label: t("metric.windSpeed"),
						value: fmt$1(current?.windSpeed ?? null, 0, num),
						unit: t("common.kmh"),
						detail: windDir,
						gauge: gaugePosition(current?.windSpeed ?? null, 0, 50)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						"data-ocid": "dashboard.metric.currents",
						label: t("metric.currentSpeed"),
						value: fmt$1(current?.currentSpeed ?? null, 2, num),
						unit: t("common.ms"),
						detail: currentDir,
						gauge: gaugePosition(current?.currentSpeed ?? null, 0, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						"data-ocid": "dashboard.metric.uv",
						label: t("metric.uvIndex"),
						value: fmt$1(current?.uvIndex ?? null, 1, num),
						gauge: gaugePosition(current?.uvIndex ?? null, 0, 12)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						"data-ocid": "dashboard.metric.air_temp",
						label: t("metric.airTemp"),
						value: fmt$1(current?.airTemp ?? null, 1, num),
						unit: t("common.celsius")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						"data-ocid": "dashboard.metric.sunrise",
						label: t("metric.sunrise"),
						value: sunrise,
						caption: t("common.forecast")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						"data-ocid": "dashboard.metric.sunset",
						label: t("metric.sunset"),
						value: sunset,
						caption: t("common.forecast")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border/60 px-5 py-3 text-[0.7rem] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, {
								className: "size-3.5 text-accent",
								"aria-hidden": "true"
							}),
							t("metric.wavePeriod"),
							":",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "numeric font-mono text-foreground",
								children: current?.wavePeriod !== null && current?.wavePeriod !== void 0 ? `${num(current.wavePeriod, 1)} ${t("common.seconds")}` : t("common.noData")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, {
								className: "size-3.5 text-accent",
								"aria-hidden": "true"
							}),
							t("metric.windGusts"),
							":",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "numeric font-mono text-foreground",
								children: current?.windGusts !== null && current?.windGusts !== void 0 ? `${num(current.windGusts, 0)} ${t("common.kmh")}` : t("common.noData")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, {
								className: "size-3.5 text-accent",
								"aria-hidden": "true"
							}),
							t("metric.precipitation"),
							":",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "numeric font-mono text-foreground",
								children: current?.precipitation !== null && current?.precipitation !== void 0 ? `${num(current.precipitation, 1)} ${t("common.mm")}` : t("common.noData")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sunrise, {
								className: "size-3.5 text-accent",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sunset, {
								className: "size-3.5 text-accent",
								"aria-hidden": "true"
							}),
							t("common.forecast")
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/dashboard/DailyForecast.tsx
function dash(value, digits, num) {
	return value === null ? "—" : num(value, digits);
}
function DailyForecast({ days, className }) {
	const { t, num, lang } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "dashboard.daily_panel",
		"aria-labelledby": "daily-title",
		className: cn("surface-neon-edge overflow-hidden rounded-2xl", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "daily-title",
					className: "font-display text-base font-extrabold uppercase tracking-wide text-foreground",
					children: t("section.daily")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground",
					children: t("common.forecast")
				})]
			}),
			days.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "dashboard.daily_empty_state",
				className: "px-5 py-6 text-sm text-muted-foreground",
				children: t("common.noData")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border/50",
				children: days.map((day, index) => {
					const uv = uvCategory(day.uvMax);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						"data-ocid": `dashboard.daily_item.${index + 1}`,
						className: "flex flex-col gap-2 px-5 py-3 transition-smooth hover:bg-primary/10 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-24 shrink-0 font-display text-sm font-bold uppercase tracking-wide text-foreground",
								children: index === 0 ? t("common.today") : index === 1 ? t("common.tomorrow") : formatDayLabel(day.date, lang)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "numeric font-mono text-xs text-muted-foreground",
								children: [
									dash(day.tempMin, 0, num),
									"° / ",
									dash(day.tempMax, 0, num),
									"°"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, {
											className: "size-3.5 text-accent",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "numeric font-mono text-foreground",
											children: dash(day.waveHeightMax, 1, num)
										}),
										t("common.meters")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, {
											className: "size-3.5 text-accent",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "numeric font-mono text-foreground",
											children: dash(day.windSpeedMax, 0, num)
										}),
										t("common.kmh")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
											className: "size-3.5 text-warning",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "numeric font-mono text-foreground",
											children: dash(day.uvMax, 1, num)
										}),
										uv ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", t(`uv.${uv}`)] }) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sunrise, {
										className: "size-3.5 text-accent",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "numeric font-mono text-foreground",
										children: formatClock(day.sunrise) ?? "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sunset, {
										className: "size-3.5 text-accent",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "numeric font-mono text-foreground",
										children: formatClock(day.sunset) ?? "—"
									})]
								})
							]
						})]
					}, day.date);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-1.5 border-t border-border/60 px-5 py-2.5 text-[0.65rem] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, {
					className: "size-3.5",
					"aria-hidden": "true"
				}), t("common.disclaimer")]
			})
		]
	});
}
//#endregion
//#region src/components/dashboard/DashboardEmpty.tsx
function DashboardEmpty({ className }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "dashboard.empty_state",
		className: cn("surface-glass flex flex-col items-center gap-3 rounded-2xl border-dashed px-6 py-14 text-center", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-12 place-items-center rounded-full bg-accent/15 ring-1 ring-accent/30 shadow-neon-pink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, {
					className: "size-6 text-accent",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-extrabold uppercase tracking-wide text-foreground",
				children: t("dashboard.noBeaches")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-muted-foreground",
				children: t("dashboard.noBeachesBody")
			})
		]
	});
}
//#endregion
//#region src/components/dashboard/ForecastCharts.tsx
var METRICS = [
	{
		key: "waveHeight",
		labelKey: "chart.waveHeight",
		unitKey: "common.meters",
		color: "var(--chart-1)",
		digits: 1
	},
	{
		key: "windSpeed",
		labelKey: "chart.windSpeed",
		unitKey: "common.kmh",
		color: "var(--chart-2)",
		digits: 0
	},
	{
		key: "airTemp",
		labelKey: "chart.airTemp",
		unitKey: "common.celsius",
		color: "var(--chart-5)",
		digits: 0
	},
	{
		key: "uvIndex",
		labelKey: "chart.uvIndex",
		unitKey: null,
		color: "var(--chart-3)",
		digits: 1
	}
];
function buildRows(hours, key) {
	return hours.map((hour) => ({
		time: hour.time,
		label: formatClock(hour.time) ?? hour.time,
		value: hour[key]
	}));
}
function MetricChart({ spec, hours }) {
	const { t } = useI18n();
	const rows = buildRows(hours, spec.key);
	const hasData = rows.some((row) => row.value !== null);
	const config = { value: {
		label: t(spec.labelKey),
		color: spec.color
	} };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		"data-ocid": `dashboard.chart.${spec.key}`,
		className: "rounded-xl border border-border/50 bg-background/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "mb-2 flex items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-sm font-bold uppercase tracking-wide text-foreground",
				children: t(spec.labelKey)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[0.65rem] uppercase tracking-wide text-muted-foreground",
				children: spec.unitKey ? t(spec.unitKey) : ""
			})]
		}), hasData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
			config,
			className: "aspect-[16/7] w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data: rows,
				margin: {
					top: 4,
					right: 6,
					left: -18,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: `fill-${spec.key}`,
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: spec.color,
							stopOpacity: .28
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: spec.color,
							stopOpacity: .02
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						vertical: false,
						strokeDasharray: "3 3",
						stroke: "oklch(0.36 0.06 272 / 0.55)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tickLine: false,
						axisLine: false,
						interval: Math.max(0, Math.floor(rows.length / 5) - 1),
						tickMargin: 6,
						fontSize: 10,
						stroke: "oklch(0.76 0.03 255)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tickLine: false,
						axisLine: false,
						width: 34,
						fontSize: 10,
						domain: ["auto", "auto"],
						stroke: "oklch(0.76 0.03 255)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
						cursor: false,
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
							indicator: "line",
							labelFormatter: (_, payload) => payload?.[0]?.payload?.label ?? ""
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "value",
						stroke: spec.color,
						strokeWidth: 2,
						fill: `url(#fill-${spec.key})`,
						connectNulls: false,
						dot: false,
						isAnimationActive: false
					})
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-8 text-center text-xs text-muted-foreground",
			children: t("common.noData")
		})]
	});
}
function ForecastCharts({ hours, className }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "dashboard.charts_panel",
		"aria-labelledby": "charts-title",
		className: cn("surface-neon-edge overflow-hidden rounded-2xl p-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "charts-title",
				className: "font-display text-base font-extrabold uppercase tracking-wide text-foreground",
				children: t("section.hourly")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground",
				children: t("common.forecast")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: METRICS.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricChart, {
				spec,
				hours
			}, spec.key))
		})]
	});
}
//#endregion
//#region src/components/dashboard/HeroSection.tsx
function fmt(value, digits, num) {
	return value === null ? null : num(value, digits);
}
function HeroSection({ beaches, activeBeach, onSelect, snapshot, suitability, fetchedAt, onRefresh, isRefreshing, className }) {
	const { t, num, pick } = useI18n();
	const current = snapshot?.current ?? null;
	const metrics = [
		{
			key: "waterTemp",
			label: t("metric.waterTemp"),
			value: fmt(current?.waterTemp ?? null, 1, num),
			unit: t("common.celsius"),
			gauge: gaugePosition(current?.waterTemp ?? null, 18, 34)
		},
		{
			key: "waveHeight",
			label: t("metric.waveHeight"),
			value: fmt(current?.waveHeight ?? null, 1, num),
			unit: t("common.meters"),
			detail: compassLabel(current?.waveDirection ?? null),
			gauge: gaugePosition(current?.waveHeight ?? null, 0, 2.5)
		},
		{
			key: "windSpeed",
			label: t("metric.windSpeed"),
			value: fmt(current?.windSpeed ?? null, 0, num),
			unit: t("common.kmh"),
			detail: compassLabel(current?.windDirection ?? null),
			gauge: gaugePosition(current?.windSpeed ?? null, 0, 50)
		},
		{
			key: "uvIndex",
			label: t("metric.uvIndex"),
			value: fmt(current?.uvIndex ?? null, 1, num),
			gauge: gaugePosition(current?.uvIndex ?? null, 0, 12)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"data-ocid": "dashboard.hero",
		"aria-labelledby": "hero-headline",
		className: cn("hero-vice relative overflow-hidden rounded-3xl border border-border/60 shadow-elevated", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex flex-col gap-6 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-caps text-primary drop-shadow-[0_0_10px_oklch(0.8_0.14_195/0.6)]",
								children: t("hero.eyebrow")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								id: "hero-headline",
								className: "mt-2 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground drop-shadow-[0_2px_18px_oklch(0.1_0.05_275/0.7)] sm:text-5xl lg:text-6xl",
								children: t("hero.headline")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-xl text-sm leading-relaxed text-foreground/85 sm:text-base",
								children: t("hero.subline")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 flex-col items-start gap-3 lg:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LastUpdated, {
							fetchedAt,
							onRefresh,
							isRefreshing,
							className: "rounded-full border border-border/60 bg-background/40 px-3 py-1.5 backdrop-blur"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/map",
							"data-ocid": "dashboard.hero_map_link",
							className: "inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-neon transition-smooth hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
							children: [t("hero.cta"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "size-4 rtl:rotate-180",
								"aria-hidden": "true"
							})]
						})]
					})]
				}),
				activeBeach ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex min-w-0 items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								className: "size-4 shrink-0 text-accent drop-shadow-[0_0_8px_oklch(0.68_0.24_345/0.8)]",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-display text-lg font-extrabold uppercase tracking-wide text-foreground",
								children: pick(activeBeach.nameEn, activeBeach.nameFa)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "numeric rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[0.7rem] text-foreground/80 backdrop-blur",
							children: [
								activeBeach.latitude.toFixed(4),
								"° ·",
								" ",
								activeBeach.longitude.toFixed(4),
								"°"
							]
						}),
						suitability ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitabilityBadge, {
							status: suitability.status,
							"data-ocid": "dashboard.hero_suitability_badge"
						}) : null
					]
				}) : null,
				beaches.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachSwitcher, {
					beaches,
					activeId: activeBeach?.id ?? null,
					onSelect,
					className: "max-w-3xl"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/50 bg-background/45 p-3 backdrop-blur-md sm:p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-caps text-primary",
							children: t("hero.conditionsLabel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
							children: metrics.map((metric) => {
								const missing = metric.value === null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-ocid": `dashboard.hero_metric.${metric.key}`,
									className: "relative flex min-w-0 flex-col gap-1 overflow-hidden rounded-xl border border-border/50 bg-card/60 px-3 py-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "truncate text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
											children: metric.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
											className: "flex min-w-0 items-baseline gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("numeric font-display text-2xl font-extrabold leading-none tracking-tight", missing ? "text-sm font-medium text-muted-foreground" : "text-foreground"),
													children: metric.value ?? t("common.noData")
												}),
												!missing && metric.unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-muted-foreground",
													children: metric.unit
												}) : null,
												metric.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "ms-1 inline-flex items-center gap-0.5 text-[0.65rem] font-bold uppercase text-accent",
													children: [metric.key === "windSpeed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, {
														className: "size-3",
														"aria-hidden": "true"
													}) : metric.key === "waveHeight" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, {
														className: "size-3",
														"aria-hidden": "true"
													}) : null, metric.detail]
												}) : null
											]
										}),
										typeof metric.gauge === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											className: "mt-1 block h-0.5 w-full overflow-hidden rounded-full bg-border/70",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block h-0.5 rounded-full bg-gradient-primary shadow-neon",
												style: { width: `${Math.round(Math.min(1, Math.max(0, metric.gauge)) * 100)}%` }
											})
										}) : null
									]
								}, metric.key);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[0.62rem] uppercase tracking-[0.08em] text-foreground/60",
							children: [
								t("common.forecast"),
								" · ",
								t("common.timezone")
							]
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/components/dashboard/HourlyStrip.tsx
function valueOrDash(value, digits, num) {
	return value === null ? "—" : num(value, digits);
}
function HourlyStrip({ hours, className }) {
	const { t, num } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "dashboard.hourly_panel",
		"aria-labelledby": "hourly-title",
		className: cn("surface-neon-edge overflow-hidden rounded-2xl", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "hourly-title",
				className: "font-display text-base font-extrabold uppercase tracking-wide text-foreground",
				children: t("section.hourly")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground",
				children: [
					t("common.forecast"),
					" · ",
					t("common.timezone")
				]
			})]
		}), hours.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-ocid": "dashboard.hourly_empty_state",
			className: "px-5 py-6 text-sm text-muted-foreground",
			children: t("chart.noData")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto scrollbar-slim",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[44rem] border-collapse text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
						className: "sr-only",
						children: t("section.hourly")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: "px-3 py-2 text-start font-semibold",
								children: t("chart.hour")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: "px-3 py-2 text-end font-semibold",
								children: t("metric.waveHeight")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: "px-3 py-2 text-end font-semibold",
								children: t("metric.windSpeed")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: "px-3 py-2 text-end font-semibold",
								children: t("metric.waterTemp")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								className: "px-3 py-2 text-end font-semibold",
								children: t("metric.uvIndex")
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: hours.map((hour, index) => {
						const uv = uvCategory(hour.uvIndex);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-ocid": `dashboard.hourly_row.${index + 1}`,
							className: "border-b border-border/40 last:border-0 hover:bg-primary/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "row",
									className: "whitespace-nowrap px-3 py-2 text-start font-mono text-xs font-medium text-foreground",
									children: formatClock(hour.time) ?? hour.time
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "numeric px-3 py-2 text-end font-mono text-xs text-foreground",
									children: [valueOrDash(hour.waveHeight, 1, num), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ms-1 text-[0.6rem] text-muted-foreground",
										children: t("common.meters")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "numeric px-3 py-2 text-end font-mono text-xs text-foreground",
									children: [valueOrDash(hour.windSpeed, 0, num), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ms-1 text-[0.6rem] text-muted-foreground",
										children: t("common.kmh")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "numeric px-3 py-2 text-end font-mono text-xs text-foreground",
									children: [valueOrDash(hour.waterTemp, 1, num), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ms-1 text-[0.6rem] text-muted-foreground",
										children: t("common.celsius")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "numeric px-3 py-2 text-end font-mono text-xs text-foreground",
									children: [valueOrDash(hour.uvIndex, 1, num), uv ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ms-1 text-[0.6rem] text-muted-foreground",
										children: t(`uv.${uv}`)
									}) : null]
								})
							]
						}, hour.time);
					}) })
				]
			})
		})]
	});
}
//#endregion
//#region src/components/dashboard/SafetyNote.tsx
var SAFETY_POINTS = [
	"Follow the lifeguard flags and only swim inside marked zones.",
	"Never swim alone, and keep children within arm's reach.",
	"If caught in a current, swim parallel to the shore, not against it."
];
var SAFETY_POINTS_FA = [
	"پرچم‌های نجات‌غریق را رعایت کنید و فقط در محدوده مشخص‌شده شنا کنید.",
	"هرگز تنها شنا نکنید و کودکان را در فاصله نزدیک نگه دارید.",
	"اگر گرفتار جریان شدید، موازی با ساحل شنا کنید، نه خلاف آن."
];
function SafetyNote({ className }) {
	const { t, lang } = useI18n();
	const points = lang === "fa" ? SAFETY_POINTS_FA : SAFETY_POINTS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "dashboard.safety_panel",
		"aria-labelledby": "safety-title",
		className: cn("surface-glass rounded-2xl p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id: "safety-title",
				className: "flex items-center gap-2 font-display text-base font-extrabold uppercase tracking-wide text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
					className: "size-4 text-accent",
					"aria-hidden": "true"
				}), t("section.safety")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2 text-sm leading-relaxed text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]"
					}), point]
				}, point))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 border-t border-border/60 pt-3 text-[0.68rem] leading-relaxed text-muted-foreground",
				children: t("common.disclaimer")
			})
		]
	});
}
//#endregion
//#region src/components/dashboard/WarningsPanel.tsx
function issuedClock(issuedAt) {
	const date = new Date(Number(issuedAt / 1000000n));
	if (Number.isNaN(date.getTime())) return null;
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Asia/Tehran",
		hour12: false
	}).format(date);
}
function WarningsPanel({ warnings, className }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "dashboard.warnings_panel",
		"aria-labelledby": "warnings-title",
		className: cn("relative overflow-hidden rounded-2xl border border-warning/40 bg-warning/10 p-5 backdrop-blur-md shadow-[0_18px_44px_-24px_oklch(0.8_0.16_62/0.5)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-warning via-warning/40 to-transparent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id: "warnings-title",
				className: "flex items-center gap-2 font-display text-base font-extrabold uppercase tracking-wide text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {
					className: "size-4 text-warning",
					"aria-hidden": "true"
				}), t("section.warnings")]
			}),
			warnings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "dashboard.warnings_empty_state",
				className: "mt-2 text-sm text-muted-foreground",
				children: t("common.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningList, { warnings }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1 border-t border-warning/30 pt-2",
					children: warnings.map((warning) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-baseline gap-x-2 text-[0.68rem] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold uppercase tracking-[0.1em]",
								children: t("admin.issuedAt")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "numeric font-mono text-foreground",
								children: issuedClock(warning.issuedAt) ?? t("common.noData")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"·",
								" ",
								warning.beachId === void 0 ? t("common.allBeaches") : t("common.beach")
							] })
						]
					}, warning.id.toString()))
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/DashboardPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function DashboardPage() {
	const { pick, lang } = useI18n();
	const beachesQuery = useBeaches();
	const warningsQuery = usePublishedWarnings();
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const beaches = beachesQuery.data ?? [];
	const activeBeach = beaches.find((beach) => beach.id === selectedId) ?? beaches[0] ?? null;
	const conditions = useConditions(activeBeach?.latitude ?? null, activeBeach?.longitude ?? null);
	const snapshot = conditions.data ?? null;
	const hours = (0, import_react.useMemo)(() => snapshot ? upcomingHours(snapshot.hourly, 24) : [], [snapshot]);
	const suitability = (0, import_react.useMemo)(() => assessSuitability(snapshot?.current ?? null, { lang }), [snapshot, lang]);
	const warnings = (0, import_react.useMemo)(() => {
		const all = warningsQuery.data ?? [];
		if (!activeBeach) return all.filter((w) => w.beachId === void 0);
		return all.filter((w) => w.beachId === void 0 || w.beachId === activeBeach.id);
	}, [warningsQuery.data, activeBeach]);
	const beachName = activeBeach ? pick(activeBeach.nameEn, activeBeach.nameFa) : void 0;
	const refresh = () => {
		conditions.refetch();
	};
	const isRefreshing = conditions.isFetching;
	const showError = conditions.isError && !snapshot;
	const showLoading = conditions.isPending && !snapshot;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		"data-ocid": "dashboard.page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {
			beaches,
			activeBeach,
			onSelect: setSelectedId,
			snapshot,
			suitability: snapshot ? suitability : null,
			fetchedAt: snapshot?.fetchedAt ?? null,
			onRefresh: refresh,
			isRefreshing
		}), beachesQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsSkeleton, { className: "mt-6" }) : beaches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardEmpty, { className: "mt-6" }) : showError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsError, {
			className: "mt-6",
			onRetry: refresh,
			isRetrying: isRefreshing
		}) : showLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsSkeleton, { className: "mt-6" }) : snapshot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrentConditions, {
						snapshot,
						suitability
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HourlyStrip, { hours }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForecastCharts, { hours }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyForecast, { days: snapshot.daily.slice(0, 7) })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex min-w-0 flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitabilityPanel, {
						result: suitability,
						beachName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UvAdvicePanel, {
						uv: snapshot.current?.uvIndex ?? null,
						dailyMax: snapshot.daily[0]?.uvMax ?? null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningsPanel, { warnings }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyNote, {})
				]
			})]
		}) : null]
	});
}
//#endregion
export { DashboardPage as default };
