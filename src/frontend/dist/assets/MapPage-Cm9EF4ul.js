import { a as useI18n, m as require_react, n as cn, p as require_jsx_runtime, tt as __toESM } from "./createLucideIcon-CQV5MV8G.js";
import { a as useBeaches, d as Button, h as MapPin, n as PageShell, t as PageHeader } from "./PageHeader-DrkWxCpG.js";
import { t as ArrowRight } from "./arrow-right-1aEHWTdY.js";
import { l as assessSuitability, n as LastUpdated, r as compassLabel, s as STATUS_TONE, t as useConditions } from "./use-conditions-BiRlBwxq.js";
import { r as RefreshCw, t as ConditionsError } from "./ConditionsStates-DS74Ce8n.js";
import { t as X } from "./x-CX8_lL59.js";
import { i as Link } from "./index-CcoF8Tur.js";
import { r as MetricTile, t as SuitabilityBadge } from "./SuitabilityPanel-Buxn2LAo.js";
//#region src/components/map/BeachMapCard.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Selected-beach card: name, current forecast conditions and detail link. */
function BeachMapCard({ beach, snapshot, isLoading, isError, onClose, className }) {
	const { lang, num, pick, t } = useI18n();
	const current = snapshot?.current ?? null;
	const suitability = assessSuitability(current, { lang });
	const forecast = t("common.forecast");
	const metric = (value, digits) => value === null ? t("common.noData") : num(value, digits);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "map.selected_card",
		"aria-labelledby": "map-selected-title",
		className: cn("surface-neon-edge flex flex-col p-4 shadow-elevated", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-caps text-primary",
							children: t("common.beach")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "map-selected-title",
							className: "mt-0.5 truncate font-display text-lg font-extrabold uppercase tracking-tight text-foreground",
							children: pick(beach.nameEn, beach.nameFa)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "numeric mt-1 flex items-center gap-1 font-mono text-[0.7rem] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									className: "size-3 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]",
									"aria-hidden": "true"
								}),
								beach.latitude.toFixed(4),
								"° · ",
								beach.longitude.toFixed(4),
								"°"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-ocid": "map.close_button",
					onClick: onClose,
					"aria-label": t("common.close"),
					className: "grid size-8 shrink-0 place-items-center rounded-full border border-border/60 text-muted-foreground transition-smooth hover:border-accent/50 hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-4",
						"aria-hidden": "true"
					})
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ocid": "map.selected_loading_state",
				"aria-busy": "true",
				className: "mt-3 grid grid-cols-2 gap-2",
				children: [
					"water",
					"wave",
					"wind",
					"uv"
				].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-xl border border-border/50 bg-secondary/50" }, id))
			}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "map.selected_error_state",
				role: "alert",
				className: "mt-3 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
				children: t("common.errorTitle")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitabilityBadge, {
					status: suitability.status,
					"data-ocid": "map.selected_status"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: t("metric.waterTemp"),
						value: metric(current?.waterTemp ?? null, 1),
						unit: t("common.celsius"),
						caption: forecast,
						"data-ocid": "map.selected_water_temp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: t("metric.waveHeight"),
						value: metric(current?.waveHeight ?? null, 1),
						unit: t("common.meters"),
						caption: forecast,
						"data-ocid": "map.selected_wave_height"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: t("metric.windSpeed"),
						value: metric(current?.windSpeed ?? null, 0),
						unit: t("common.kmh"),
						detail: compassLabel(current?.windDirection ?? null),
						caption: forecast,
						"data-ocid": "map.selected_wind"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: t("metric.uvIndex"),
						value: metric(current?.uvIndex ?? null, 1),
						caption: forecast,
						"data-ocid": "map.selected_uv"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4 w-full rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-neon transition-smooth hover:opacity-90",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/beaches/$beachId",
					params: { beachId: beach.id.toString() },
					"data-ocid": "map.view_beach_link",
					children: [t("common.viewBeach"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-4 rtl:rotate-180",
						"aria-hidden": "true"
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/components/map/BeachMarker.tsx
var TONE_DOT = {
	success: "bg-success shadow-[0_0_8px_oklch(0.8_0.16_172/0.95)]",
	warning: "bg-warning shadow-[0_0_8px_oklch(0.8_0.16_62/0.95)]",
	destructive: "bg-destructive shadow-[0_0_8px_oklch(0.63_0.24_12/0.95)]",
	muted: "bg-muted-foreground"
};
var TONE_RING = {
	success: "ring-success/40",
	warning: "ring-warning/45",
	destructive: "ring-destructive/40",
	muted: "ring-border"
};
/**
* A tappable beach marker positioned by percentage inside the map frame.
* The visible pin is small; the button keeps a 44px touch target.
*/
function BeachMarker({ name, x, y, tone, selected, onSelect, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"data-ocid": `map.marker.${index + 1}`,
		"aria-pressed": selected,
		"aria-label": name,
		onClick: onSelect,
		style: {
			left: `${x}%`,
			top: `${y}%`
		},
		className: cn("group absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background", selected ? "z-20" : "hover:z-20"),
		children: [
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "absolute size-11 rounded-full bg-accent/25 motion-safe:animate-ping"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				"aria-hidden": "true",
				className: cn("relative grid place-items-center rounded-full ring-4 transition-smooth", selected ? "size-8 bg-accent text-accent-foreground shadow-neon-pink ring-accent/35" : "size-6 bg-background/85 text-primary shadow-neon ring-2 group-hover:scale-110", !selected && TONE_RING[tone]),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
					className: cn(selected ? "size-4" : "size-3.5"),
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: cn("absolute -end-0.5 -top-0.5 size-2 rounded-full ring-2 ring-background", TONE_DOT[tone])
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: cn("pointer-events-none absolute top-full mt-1 max-w-[9rem] truncate rounded-full border border-accent/40 bg-background/90 px-2 py-0.5 text-[0.6rem] font-semibold text-foreground shadow-neon-pink backdrop-blur transition-opacity", selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"),
				children: name
			})
		]
	});
}
//#endregion
//#region src/components/map/island-geometry.ts
/**
* Kish Island outline in decimal degrees (WGS84).
*
* The outline is a schematic coastline trace used only to place the monitored
* beach markers in context. It is not a survey-grade boundary and must never be
* presented as an official map or used for navigation.
*/
var ISLAND_OUTLINE = [
	[26.5568, 53.9485],
	[26.5582, 53.9642],
	[26.5561, 53.9805],
	[26.5512, 53.9958],
	[26.5448, 54.0092],
	[26.5372, 54.0205],
	[26.5291, 54.0288],
	[26.5208, 54.0312],
	[26.5126, 54.0261],
	[26.5062, 54.0152],
	[26.5028, 54.0018],
	[26.5031, 53.9872],
	[26.5072, 53.9738],
	[26.5142, 53.9621],
	[26.5231, 53.9532],
	[26.5332, 53.9478],
	[26.5452, 53.9462]
];
/** Bounds of the island outline with a small margin so markers never clip. */
var ISLAND_BOUNDS = (() => {
	const lats = ISLAND_OUTLINE.map(([lat]) => lat);
	const lngs = ISLAND_OUTLINE.map(([, lng]) => lng);
	const padLat = .004;
	const padLng = .006;
	return {
		minLat: Math.min(...lats) - padLat,
		maxLat: Math.max(...lats) + padLat,
		minLng: Math.min(...lngs) - padLng,
		maxLng: Math.max(...lngs) + padLng
	};
})();
/** Project a coordinate to a 0–100 percentage inside the map frame. */
function projectPoint(latitude, longitude, bounds = ISLAND_BOUNDS) {
	const spanLng = bounds.maxLng - bounds.minLng || 1;
	const spanLat = bounds.maxLat - bounds.minLat || 1;
	const x = (longitude - bounds.minLng) / spanLng * 100;
	const y = (bounds.maxLat - latitude) / spanLat * 100;
	return {
		x: Math.min(100, Math.max(0, x)),
		y: Math.min(100, Math.max(0, y))
	};
}
/** SVG path for the island outline in a 0–100 viewBox. */
function outlinePath(bounds = ISLAND_BOUNDS) {
	return ISLAND_OUTLINE.map(([lat, lng], index) => {
		const { x, y } = projectPoint(lat, lng, bounds);
		return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
	}).join(" ");
}
//#endregion
//#region src/components/map/IslandMap.tsx
/** Beaches with usable coordinates, projected into the island frame. */
function useMapBeaches(beaches) {
	return beaches.filter((beach) => Number.isFinite(beach.latitude) && Number.isFinite(beach.longitude) && !(beach.latitude === 0 && beach.longitude === 0)).map((beach) => {
		const { x, y } = projectPoint(beach.latitude, beach.longitude);
		return {
			beach,
			x,
			y
		};
	});
}
/** The island frame: neon night chart with coastline, grid and markers. */
function IslandMap({ entries, selectedId, onSelect, className }) {
	const { pick, t } = useI18n();
	const path = outlinePath();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "map.canvas",
		className: cn("relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-primary/25 bg-gradient-ocean shadow-elevated sm:aspect-[16/10]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_118%,oklch(0.68_0.24_345/0.32),transparent_62%),radial-gradient(ellipse_60%_50%_at_18%_-10%,oklch(0.8_0.14_195/0.22),transparent_60%)]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 100 100",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				className: "absolute inset-0 size-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
							id: "map-grid",
							width: "10",
							height: "10",
							patternUnits: "userSpaceOnUse",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M10 0H0V10",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "0.15",
								className: "text-primary/25"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "map-land",
							x1: "0",
							y1: "0",
							x2: "1",
							y2: "1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "oklch(0.8 0.14 195)",
									stopOpacity: "0.3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "52%",
									stopColor: "oklch(0.68 0.22 292)",
									stopOpacity: "0.26"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "oklch(0.68 0.24 345)",
									stopOpacity: "0.3"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "map-coast",
							x1: "0",
							y1: "0",
							x2: "1",
							y2: "1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "oklch(0.86 0.14 195)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "55%",
									stopColor: "oklch(0.72 0.2 292)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "oklch(0.72 0.24 345)"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
							id: "map-glow",
							x: "-20%",
							y: "-20%",
							width: "140%",
							height: "140%",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
								stdDeviation: "1.1",
								result: "blur"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100",
						height: "100",
						fill: "url(#map-grid)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: `${path} Z`,
						fill: "url(#map-land)",
						stroke: "url(#map-coast)",
						strokeWidth: "1.6",
						strokeLinejoin: "round",
						strokeOpacity: "0.55",
						filter: "url(#map-glow)",
						vectorEffect: "non-scaling-stroke"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: `${path} Z`,
						fill: "none",
						stroke: "url(#map-coast)",
						strokeWidth: "0.6",
						strokeLinejoin: "round",
						vectorEffect: "non-scaling-stroke"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute start-3 top-3 rounded-full border border-primary/30 bg-background/70 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur",
				children: t("dashboard.heroTitle")
			}),
			entries.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkerWithStatus, {
				entry,
				index,
				selected: entry.beach.id === selectedId,
				onSelect: () => onSelect(entry.beach.id),
				name: pick(entry.beach.nameEn, entry.beach.nameFa)
			}, entry.beach.id.toString())),
			entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "map.empty_state",
				className: "absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted-foreground",
				children: t("map.empty")
			}) : null
		]
	});
}
function MarkerWithStatus({ entry, index, selected, onSelect, name }) {
	const { lang } = useI18n();
	const { data } = useConditions(entry.beach.latitude, entry.beach.longitude);
	const tone = STATUS_TONE[assessSuitability(data?.current ?? null, { lang }).status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachMarker, {
		name,
		x: entry.x,
		y: entry.y,
		tone,
		selected,
		onSelect,
		index
	});
}
//#endregion
//#region src/pages/MapPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function MapPage() {
	const { pick, t } = useI18n();
	const beachesQuery = useBeaches();
	const entries = useMapBeaches(beachesQuery.data ?? []);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const selected = entries.find((entry) => entry.beach.id === selectedId)?.beach ?? null;
	const conditions = useConditions(selected?.latitude ?? null, selected?.longitude ?? null);
	const isRefreshing = beachesQuery.isFetching || conditions.isFetching;
	const refresh = () => {
		beachesQuery.refetch();
		if (selected) conditions.refetch();
	};
	const fetchedAt = conditions.data?.fetchedAt ?? (beachesQuery.dataUpdatedAt ? new Date(beachesQuery.dataUpdatedAt).toISOString() : null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: t("app.tagline"),
		title: t("map.title"),
		subtitle: t("map.subtitle"),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LastUpdated, {
			fetchedAt,
			onRefresh: refresh,
			isRefreshing
		})
	}), beachesQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsError, {
		className: "mt-6",
		onRetry: () => void beachesQuery.refetch(),
		isRetrying: beachesQuery.isFetching
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [beachesQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ocid": "map.loading_state",
				"aria-busy": "true",
				className: "aspect-[4/3] w-full animate-pulse rounded-2xl border border-primary/20 bg-secondary/50 sm:aspect-[16/10]"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IslandMap, {
				entries,
				selectedId,
				onSelect: setSelectedId
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ocid": "map.legend",
				className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-full border border-border/60 bg-card/60 px-3 py-2 text-[0.7rem] text-muted-foreground backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-caps text-primary",
						children: t("map.legendHeading")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
						tone: "success",
						label: t("status.favorable")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
						tone: "warning",
						label: t("status.caution")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
						tone: "destructive",
						label: t("status.unfavorable")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
						tone: "muted",
						label: t("status.insufficient")
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachMapCard, {
					beach: selected,
					snapshot: conditions.data,
					isLoading: conditions.isLoading,
					isError: conditions.isError,
					onClose: () => setSelectedId(null)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-ocid": "map.hint_panel",
					className: "surface-glass rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 place-items-center rounded-full bg-accent/15 text-accent shadow-neon-pink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								className: "size-4",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-sm font-bold uppercase tracking-wide text-foreground",
							children: t("map.openBeach")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-relaxed text-muted-foreground",
							children: t("map.selectHint")
						})
					]
				}),
				selected && conditions.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					"data-ocid": "map.retry_button",
					onClick: () => void conditions.refetch(),
					disabled: conditions.isFetching,
					className: "mt-3 w-full rounded-full border-accent/40 text-accent-foreground hover:bg-accent/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: conditions.isFetching ? "size-4 animate-spin" : "size-4",
						"aria-hidden": "true"
					}), t("common.retry")]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps mb-2 text-primary",
						children: t("map.beachListLabel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-ocid": "map.beach_list",
						className: "divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur",
						children: entries.map((entry, index) => {
							const active = entry.beach.id === selectedId;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-ocid": `map.beach_item.${index + 1}`,
								"aria-pressed": active,
								onClick: () => setSelectedId(entry.beach.id),
								className: cn("flex w-full items-center justify-between gap-2 px-3 py-2.5 text-start transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent", active ? "bg-accent/10 shadow-[inset_3px_0_0_oklch(0.68_0.24_345)]" : "hover:bg-primary/10"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex min-w-0 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										className: cn("size-1.5 shrink-0 rounded-full", active ? "bg-accent shadow-[0_0_8px_oklch(0.68_0.24_345/0.95)]" : "bg-primary/70")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("min-w-0 truncate text-sm font-medium", active ? "text-foreground" : "text-foreground/90"),
										children: pick(entry.beach.nameEn, entry.beach.nameFa)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "numeric shrink-0 font-mono text-[0.65rem] text-muted-foreground",
									children: [
										entry.beach.latitude.toFixed(3),
										"°,",
										" ",
										entry.beach.longitude.toFixed(3),
										"°"
									]
								})]
							}) }, entry.beach.id.toString());
						})
					})]
				})
			]
		})]
	})] });
}
var LEGEND_TONE = {
	success: "bg-success shadow-[0_0_8px_oklch(0.8_0.16_172/0.9)]",
	warning: "bg-warning shadow-[0_0_8px_oklch(0.8_0.16_62/0.9)]",
	destructive: "bg-destructive shadow-[0_0_8px_oklch(0.63_0.24_12/0.9)]",
	muted: "bg-muted-foreground"
};
function LegendItem({ tone, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: cn("size-2 rounded-full", LEGEND_TONE[tone])
		}), label]
	});
}
//#endregion
export { MapPage as default };
