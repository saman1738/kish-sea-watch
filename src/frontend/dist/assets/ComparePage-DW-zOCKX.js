import { a as useI18n, m as require_react, n as cn, p as require_jsx_runtime, tt as __toESM } from "./createLucideIcon-CQV5MV8G.js";
import { a as useBeaches, g as CircleCheck, h as MapPin, n as PageShell, t as PageHeader } from "./PageHeader-DrkWxCpG.js";
import { t as ArrowRight } from "./arrow-right-1aEHWTdY.js";
import { d as rankActivities, m as CircleHelp, n as LastUpdated, p as TriangleAlert, t as useConditions } from "./use-conditions-BiRlBwxq.js";
import { t as Compass } from "./compass-CBn09uXt.js";
import { t as Info } from "./info-CEVbqWEZ.js";
import { t as ConditionsError } from "./ConditionsStates-DS74Ce8n.js";
import { t as ShieldAlert } from "./shield-alert-DJjrJ4c-.js";
import { i as Link } from "./index-CcoF8Tur.js";
//#region src/components/compare/CompareStatus.tsx
var import_jsx_runtime = require_jsx_runtime();
var STATUS_KEY = {
	favorable: "status.favorable",
	caution: "status.caution",
	unfavorable: "status.unfavorable",
	insufficient: "status.insufficient"
};
var STATUS_ICON = {
	favorable: CircleCheck,
	caution: TriangleAlert,
	unfavorable: ShieldAlert,
	insufficient: CircleHelp
};
/** Distinct neon treatment per status: colour, glow, icon and label. */
var STATUS_CLASSES = {
	favorable: "border-success/60 bg-success/15 text-success shadow-[0_0_16px_-6px_oklch(0.8_0.16_172/0.85)]",
	caution: "border-warning/70 bg-warning/15 text-warning shadow-[0_0_16px_-6px_oklch(0.8_0.16_62/0.85)]",
	unfavorable: "border-destructive/70 bg-destructive/15 text-destructive shadow-[0_0_16px_-6px_oklch(0.63_0.24_12/0.85)]",
	insufficient: "border-border bg-secondary/60 text-muted-foreground shadow-none"
};
function CompareStatus({ status, className, "data-ocid": dataOcid }) {
	const { t } = useI18n();
	const Icon = STATUS_ICON[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ocid": dataOcid,
		"data-status": status,
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em]", STATUS_CLASSES[status], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-3.5 shrink-0",
			"aria-hidden": "true"
		}), t(STATUS_KEY[status])]
	});
}
//#endregion
//#region src/components/compare/CompareBeachCard.tsx
var ACTIVITY_KEY$2 = {
	swimming: "activity.swimming",
	fishing: "activity.fishing",
	surfing: "activity.surfing",
	kayaking: "activity.kayaking"
};
/** One beach column: identity, then each activity's status and written reason. */
function CompareBeachCard({ beach, rankings, position, isBest, className }) {
	const { pick, t } = useI18n();
	const name = pick(beach.nameEn, beach.nameFa);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-ocid": `compare.beach_card.${position}`,
		className: cn("surface-neon-edge flex min-w-0 flex-col overflow-hidden", isBest && "ring-1 ring-accent/40", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative flex items-start justify-between gap-2 border-b border-border/70 px-4 py-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: "absolute inset-x-0 top-0 h-0.5 bg-gradient-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								className: "size-3.5 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "truncate font-display text-base font-extrabold uppercase tracking-tight text-foreground",
								children: name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "numeric mt-1 font-mono text-[0.65rem] text-muted-foreground",
							children: [
								beach.latitude.toFixed(4),
								"° · ",
								beach.longitude.toFixed(4),
								"°"
							]
						})]
					}),
					isBest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-ocid": `compare.best_badge.${position}`,
						className: "shrink-0 rounded-full bg-accent px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-accent-foreground shadow-neon-pink",
						children: t("activity.best")
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-1 flex-col divide-y divide-border/60",
				children: rankings.map(({ activity, result }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					"data-ocid": `compare.activity.${position}.${activity}`,
					className: "flex flex-col gap-1.5 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold text-foreground",
							children: t(ACTIVITY_KEY$2[activity])
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareStatus, {
							status: result.status,
							"data-ocid": `compare.status.${position}.${activity}`
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.7rem] leading-relaxed text-muted-foreground",
						children: result.reasons.length > 0 ? result.reasons.join(" · ") : t(result.status === "insufficient" ? "status.insufficient.desc" : "status.favorable.desc")
					})]
				}, activity))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/70 px-4 py-2.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/beaches/$beachId",
					params: { beachId: beach.id.toString() },
					"data-ocid": `compare.view_beach.${position}`,
					className: "inline-flex items-center gap-1 text-[0.7rem] font-semibold text-primary underline-offset-4 transition-smooth hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [t("common.viewBeach"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-3 rtl:rotate-180",
						"aria-hidden": "true"
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/components/compare/CompareDisclaimer.tsx
/** Persistent forecast-estimate disclaimer for the comparison rankings. */
function CompareDisclaimer({ className }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		"data-ocid": "compare.disclaimer",
		className: cn("relative flex items-start gap-3 overflow-hidden rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs leading-relaxed text-foreground backdrop-blur", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "absolute inset-y-0 start-0 w-1 bg-gradient-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
				className: "mt-0.5 size-4 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display font-bold uppercase tracking-[0.08em] text-accent",
						children: [t("common.forecast"), "."]
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: t("common.disclaimer")
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/compare/CompareMatrix.tsx
var ACTIVITY_KEY$1 = {
	swimming: "activity.swimming",
	fishing: "activity.fishing",
	surfing: "activity.surfing",
	kayaking: "activity.kayaking"
};
var ACTIVITIES$1 = [
	"swimming",
	"fishing",
	"surfing",
	"kayaking"
];
/**
* Compact per-beach card for narrow screens: identity header, then one row per
* activity with its status pill and written reason. No horizontal overflow.
*/
function CompareMatrix({ rows, className }) {
	const { pick, t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": "compare.matrix",
		className: cn("flex flex-col gap-3", className),
		children: rows.map(({ beach, rankings }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			"data-ocid": `compare.matrix_row.${index}`,
			className: "surface-glass min-w-0 overflow-hidden rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-2 border-b border-border/60 px-3.5 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						className: "size-3.5 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "truncate font-display text-sm font-extrabold uppercase tracking-tight text-foreground",
						children: pick(beach.nameEn, beach.nameFa)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/beaches/$beachId",
					params: { beachId: beach.id.toString() },
					"data-ocid": `compare.matrix_view_beach.${index}`,
					"aria-label": `${t("common.viewBeach")} — ${pick(beach.nameEn, beach.nameFa)}`,
					className: "inline-flex shrink-0 items-center gap-1 rounded-full border border-border/70 px-2 py-1 text-[0.65rem] font-semibold text-primary transition-smooth hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [t("common.viewBeach"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-3 rtl:rotate-180",
						"aria-hidden": "true"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border/50",
				children: ACTIVITIES$1.map((activity) => {
					const ranking = rankings.find((r) => r.activity === activity);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						"data-ocid": `compare.matrix_cell.${index}.${activity}`,
						className: "flex flex-col gap-1 px-3.5 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.72rem] font-semibold text-foreground",
								children: t(ACTIVITY_KEY$1[activity])
							}), ranking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareStatus, {
								status: ranking.result.status,
								className: "px-2 py-0.5 text-[0.6rem]",
								"data-ocid": `compare.matrix_status.${index}.${activity}`
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.65rem] text-muted-foreground",
								children: t("common.noData")
							})]
						}), ranking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.68rem] leading-snug text-muted-foreground",
							children: ranking.result.reasons.length > 0 ? ranking.result.reasons.join(" · ") : t(ranking.result.status === "insufficient" ? "status.insufficient.desc" : "status.favorable.desc")
						}) : null]
					}, activity);
				})
			})]
		}, beach.id.toString()))
	});
}
//#endregion
//#region src/pages/ComparePage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var ACTIVITY_KEY = {
	swimming: "activity.swimming",
	fishing: "activity.fishing",
	surfing: "activity.surfing",
	kayaking: "activity.kayaking"
};
var ACTIVITIES = [
	"swimming",
	"fishing",
	"surfing",
	"kayaking"
];
function BeachColumn({ beach, index, isBest }) {
	const { lang } = useI18n();
	const query = useConditions(beach.latitude, beach.longitude);
	const rankings = (0, import_react.useMemo)(() => rankActivities(query.data?.current ?? null, lang), [query.data, lang]);
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": `compare.loading_state.${index}`,
		"aria-busy": "true",
		className: "surface-glass flex flex-col gap-2 rounded-2xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-2/3 animate-pulse rounded bg-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/2 animate-pulse rounded bg-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 space-y-2",
				children: [
					"a",
					"b",
					"c",
					"d"
				].map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 animate-pulse rounded-lg bg-muted/70" }, slot))
			})
		]
	});
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsError, {
		onRetry: () => void query.refetch(),
		isRetrying: query.isFetching,
		className: "h-full"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareBeachCard, {
		beach,
		rankings,
		position: index,
		isBest
	});
}
/**
* Mobile per-beach card: owns the beach's conditions query so the compact view
* ranks all four activities with a status and written reason.
*/
function MatrixRow({ beach, index }) {
	const { lang } = useI18n();
	const query = useConditions(beach.latitude, beach.longitude);
	const rankings = (0, import_react.useMemo)(() => rankActivities(query.data?.current ?? null, lang), [query.data, lang]);
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": `compare.loading_state.${index}`,
		"aria-busy": "true",
		className: "surface-glass flex flex-col gap-2 rounded-2xl p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-2/3 animate-pulse rounded bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 space-y-2",
			children: [
				"a",
				"b",
				"c",
				"d"
			].map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 animate-pulse rounded-lg bg-muted/70" }, slot))
		})]
	});
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsError, {
		onRetry: () => void query.refetch(),
		isRetrying: query.isFetching
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareMatrix, { rows: [{
		beach,
		rankings
	}] });
}
/** Best beach per activity, derived from the same rankings shown in the cards. */
function BestPerActivity({ beaches }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "compare.best_section",
		className: "surface-glass rounded-2xl p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-sm font-extrabold uppercase tracking-[0.1em] text-foreground",
			children: t("compare.bestPerActivity")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
			children: ACTIVITIES.map((activity) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BestActivityItem, {
				activity,
				beaches
			}, activity))
		})]
	});
}
/** One activity summary: owns a query per beach so hooks stay at the top level. */
function BestActivityItem({ activity, beaches }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-ocid": `compare.best.${activity}`,
		className: "min-w-0 rounded-xl border border-border/60 bg-background/40 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label-caps truncate",
			children: t(ACTIVITY_KEY[activity])
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BestActivityWinner, {
			activity,
			beaches
		})]
	});
}
function BestActivityWinner({ activity, beaches }) {
	const { pick, t } = useI18n();
	const [statuses, setStatuses] = (0, import_react.useState)({});
	const report = (0, import_react.useCallback)((beachId, status) => {
		setStatuses((prev) => prev[beachId] === status ? prev : {
			...prev,
			[beachId]: status
		});
	}, []);
	const winner = (0, import_react.useMemo)(() => {
		let best = null;
		let bestStatus = "";
		for (const beach of beaches) {
			const status = statuses[beach.id.toString()];
			if (!status || status === "insufficient" || status === "unfavorable") continue;
			if (!best || bestStatus === "caution" && status === "favorable") {
				best = beach;
				bestStatus = status;
			}
		}
		return best;
	}, [beaches, statuses]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("mt-1 truncate font-display text-sm font-bold", winner ? "text-gradient-accent" : "text-muted-foreground"),
		children: winner ? pick(winner.nameEn, winner.nameFa) : t("common.noData")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden",
		children: beaches.map((beach) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BestActivityProbe, {
			beach,
			activity,
			onStatus: report
		}, beach.id.toString()))
	})] });
}
/** Reports one beach's status for an activity to its parent summary. */
function BestActivityProbe({ beach, activity, onStatus }) {
	const { lang } = useI18n();
	const query = useConditions(beach.latitude, beach.longitude);
	const status = (0, import_react.useMemo)(() => {
		return rankActivities(query.data?.current ?? null, lang).find((r) => r.activity === activity)?.result.status ?? "insufficient";
	}, [
		query.data,
		lang,
		activity
	]);
	(0, import_react.useEffect)(() => {
		onStatus(beach.id.toString(), status);
	}, [
		beach.id,
		status,
		onStatus
	]);
	return null;
}
function ComparePage() {
	const { t } = useI18n();
	const beachesQuery = useBeaches();
	const beaches = beachesQuery.data ?? [];
	const refreshAll = () => {
		beachesQuery.refetch();
	};
	const fetchedAt = beachesQuery.dataUpdatedAt ? new Date(beachesQuery.dataUpdatedAt).toISOString() : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: t("app.tagline"),
			title: t("compare.title"),
			subtitle: t("compare.subtitle"),
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LastUpdated, {
				fetchedAt,
				onRefresh: refreshAll,
				isRefreshing: beachesQuery.isFetching
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareDisclaimer, { className: "mt-5" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children: beachesQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
				children: [
					"s1",
					"s2",
					"s3",
					"s4"
				].map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-2xl border border-border bg-card" }, slot))
			}) : beachesQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsError, {
				onRetry: refreshAll,
				isRetrying: beachesQuery.isFetching
			}) : beaches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ocid": "compare.empty_state",
				className: "surface-glass flex flex-col items-start gap-3 rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {
						className: "size-6 text-accent",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: t("compare.empty")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-sm font-semibold text-primary underline underline-offset-4 hover:text-accent",
						children: t("nav.dashboard")
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BestPerActivity, { beaches }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 font-display text-lg font-extrabold uppercase tracking-tight text-foreground",
					children: t("compare.heading")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-col gap-3 md:hidden",
					children: beaches.map((beach, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixRow, {
						beach,
						index
					}, beach.id.toString()))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4",
					children: beaches.map((beach, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachColumn, {
						beach,
						index,
						isBest: false
					}, beach.id.toString()))
				})
			] })
		})
	] });
}
//#endregion
export { ComparePage as default };
