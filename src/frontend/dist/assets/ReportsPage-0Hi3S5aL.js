import { a as useI18n, l as useInternetIdentity, m as require_react, n as cn, p as require_jsx_runtime, t as createLucideIcon, tt as __toESM } from "./createLucideIcon-CQV5MV8G.js";
import { _ as CircleAlert, a as useBeaches, c as ReviewStatus, d as Button, g as CircleCheck, h as MapPin, n as PageShell, s as ReportKind, t as PageHeader } from "./PageHeader-DrkWxCpG.js";
import { a as SelectValue, b as Send, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select, u as Textarea, v as Label, y as SignInButton } from "./select-VKnbc2B-.js";
import { t as ConditionsError } from "./ConditionsStates-DS74Ce8n.js";
import { r as ClipboardList, t as Waves } from "./index-CcoF8Tur.js";
import { t as StatusBadge } from "./StatusBadge-DMXEopju.js";
import { i as useSubmitReport, n as useReports } from "./use-reports-iceC91Cq.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Clock = createLucideIcon("clock", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["polyline", {
	points: "12 6 12 12 16 14",
	key: "68esgv"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageSquarePlus = createLucideIcon("message-square-plus", [
	["path", {
		d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
		key: "1lielz"
	}],
	["path", {
		d: "M12 7v6",
		key: "lw1j43"
	}],
	["path", {
		d: "M9 10h6",
		key: "9gxzsh"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldQuestion = createLucideIcon("shield-question", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",
		key: "mhlwft"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
//#endregion
//#region src/components/reports/report-meta.ts
var REPORT_KIND_ORDER = [
	ReportKind.roughWater,
	ReportKind.calmWater,
	ReportKind.strongCurrents,
	ReportKind.waterClarity,
	ReportKind.jellyfish,
	ReportKind.unusualWaves,
	ReportKind.otherHazard
];
var REPORT_KIND_LABEL = {
	[ReportKind.roughWater]: "reports.kind.roughWater",
	[ReportKind.calmWater]: "reports.kind.calmWater",
	[ReportKind.strongCurrents]: "reports.kind.strongCurrents",
	[ReportKind.waterClarity]: "reports.kind.waterClarity",
	[ReportKind.jellyfish]: "reports.kind.jellyfish",
	[ReportKind.unusualWaves]: "reports.kind.unusualWaves",
	[ReportKind.otherHazard]: "reports.kind.otherHazard"
};
var REVIEW_STATUS_LABEL = {
	[ReviewStatus.unverified]: "common.unverified",
	[ReviewStatus.verified]: "common.verified",
	[ReviewStatus.dismissed]: "common.dismissed"
};
/** Motoko Time.now() is nanoseconds; convert before any Date operation. */
function timestampToDate(timestamp) {
	const date = new Date(Number(timestamp / 1000000n));
	return Number.isNaN(date.getTime()) ? null : date;
}
function formatReportTime(timestamp, lang) {
	const date = timestampToDate(timestamp);
	if (!date) return null;
	return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Asia/Tehran",
		hour12: false
	}).format(date);
}
//#endregion
//#region src/components/reports/ReportCard.tsx
var import_jsx_runtime = require_jsx_runtime();
var STATUS_TONE = {
	[ReviewStatus.unverified]: "warning",
	[ReviewStatus.verified]: "success",
	[ReviewStatus.dismissed]: "muted"
};
function ReportCard({ report, beach, index }) {
	const { t, pick, lang } = useI18n();
	const submitted = formatReportTime(report.submittedAt, lang);
	const beachName = beach ? pick(beach.nameEn, beach.nameFa) : null;
	const isUnverified = report.status === ReviewStatus.unverified;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-ocid": `reports.item.${index}`,
		className: cn("surface-glass group relative overflow-hidden rounded-2xl p-4 transition-smooth hover:-translate-y-0.5 hover:border-accent/50", isUnverified && "border-warning/40"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: cn("absolute inset-y-0 start-0 w-1", isUnverified ? "bg-warning/80" : "bg-gradient-primary")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-2 ps-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-base font-bold uppercase tracking-wide text-foreground",
						children: t(REPORT_KIND_LABEL[report.kind])
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1.5 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex min-w-0 items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								className: "size-3 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.7)]",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-semibold text-foreground/90",
								children: beachName ?? t("common.noData")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								className: "size-3 shrink-0",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "numeric font-mono",
								children: submitted ?? t("common.noData")
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
					tone: STATUS_TONE[report.status],
					"data-ocid": `reports.status.${index}`,
					children: t(REVIEW_STATUS_LABEL[report.status])
				})]
			}),
			report.note.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 break-words rounded-xl border border-border/60 bg-background/40 px-3 py-2.5 text-sm leading-relaxed text-foreground/90",
				children: report.note
			}) : null,
			isUnverified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2.5 flex items-center gap-1.5 ps-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-warning/90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldQuestion, {
					className: "size-3.5 shrink-0",
					"aria-hidden": "true"
				}), t("reports.unverifiedLabel")]
			}) : null
		]
	});
}
//#endregion
//#region src/components/reports/ReportForm.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var NOTE_LIMIT = 280;
function ReportForm({ className }) {
	const { t, pick } = useI18n();
	const { data: beaches } = useBeaches();
	const submit = useSubmitReport();
	const { identity, isInitializing } = useInternetIdentity();
	const signedIn = !!identity && !identity.getPrincipal().isAnonymous() && !isInitializing;
	const [beachId, setBeachId] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)(ReportKind.roughWater);
	const [note, setNote] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)(false);
	const canSubmit = signedIn && beachId !== "" && !submit.isPending;
	const remaining = NOTE_LIMIT - note.length;
	function handleSubmit(event) {
		event.preventDefault();
		if (!canSubmit) return;
		const captured = {
			beachId: BigInt(beachId),
			kind,
			note: note.trim()
		};
		setNote("");
		setSaved(false);
		submit.mutate(captured, {
			onSuccess: () => setSaved(true),
			onError: () => setNote((current) => current === "" ? captured.note : current)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		"data-ocid": "reports.form",
		className: cn("surface-neon-edge flex flex-col gap-4 p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-neon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, {
						className: "size-5",
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-extrabold uppercase tracking-wide text-foreground",
						children: t("reports.formTitle")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted-foreground",
						children: t("reports.formBody")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "report-beach",
					className: "label-caps",
					children: t("common.beach")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: beachId,
					onValueChange: setBeachId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						id: "report-beach",
						"data-ocid": "reports.beach_select",
						className: "min-h-11 w-full rounded-xl border-input bg-background/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: t("dashboard.selectBeach") })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (beaches ?? []).map((beach) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: beach.id.toString(),
						children: pick(beach.nameEn, beach.nameFa)
					}, beach.id.toString())) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "report-kind",
					className: "label-caps",
					children: t("reports.kind")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: kind,
					onValueChange: (value) => setKind(value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						id: "report-kind",
						"data-ocid": "reports.kind_select",
						className: "min-h-11 w-full rounded-xl border-input bg-background/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: REPORT_KIND_ORDER.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: option,
						children: t(REPORT_KIND_LABEL[option])
					}, option)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						htmlFor: "report-note",
						className: "label-caps",
						children: [
							t("reports.note"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-normal normal-case tracking-normal text-muted-foreground",
								children: [
									"(",
									t("common.optional"),
									")"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("numeric font-mono text-[0.7rem]", remaining <= 20 ? "text-warning" : "text-muted-foreground"),
						children: [
							note.length,
							"/",
							NOTE_LIMIT
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "report-note",
					"data-ocid": "reports.note_textarea",
					value: note,
					onChange: (event) => setNote(event.target.value.slice(0, NOTE_LIMIT)),
					placeholder: t("reports.notePlaceholder"),
					rows: 3,
					className: "resize-none rounded-xl border-input bg-background/60"
				})]
			}),
			!signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ocid": "reports.sign_in_prompt",
				className: "flex flex-col gap-2.5 rounded-xl border border-accent/40 bg-accent/10 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-foreground",
					children: t("reports.signInToSubmit")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, { className: "inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-neon transition-smooth hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60" })]
			}) : null,
			submit.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				role: "alert",
				"data-ocid": "reports.submit_error_state",
				className: "flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					className: "mt-0.5 size-4 shrink-0",
					"aria-hidden": "true"
				}), t("reports.error")]
			}) : null,
			saved && !submit.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-ocid": "reports.success_state",
				className: "flex items-center gap-2 rounded-xl border border-success/40 bg-success/10 p-3 text-sm text-success",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "size-4 shrink-0",
					"aria-hidden": "true"
				}), t("reports.success")]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				"data-ocid": "reports.submit_button",
				disabled: !canSubmit,
				className: "min-h-11 w-full rounded-full bg-gradient-primary font-bold uppercase tracking-wide text-primary-foreground shadow-neon transition-smooth hover:opacity-90 disabled:opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
					className: "size-4 rtl:-scale-x-100",
					"aria-hidden": "true"
				}), submit.isPending ? t("reports.submitting") : t("reports.submit")]
			})
		]
	});
}
//#endregion
//#region src/pages/ReportsPage.tsx
var SKELETON_IDS = Array.from({ length: 4 }, (_, i) => `report-skeleton-${i}`);
function ReportSkeleton() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "reports.loading_state",
		"aria-busy": "true",
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: t("common.loading")
		}), SKELETON_IDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 animate-pulse rounded-2xl border border-border/60 bg-secondary/40 motion-reduce:animate-none" }, id))]
	});
}
function ReportsPage() {
	const { t, pick } = useI18n();
	const reportsQuery = useReports();
	const beachesQuery = useBeaches();
	const [beachFilter, setBeachFilter] = (0, import_react.useState)("all");
	const beaches = beachesQuery.data ?? [];
	const beachById = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const beach of beaches) map.set(beach.id.toString(), beach);
		return map;
	}, [beaches]);
	const reports = (0, import_react.useMemo)(() => {
		const sorted = [...reportsQuery.data ?? []].sort((a, b) => a.submittedAt === b.submittedAt ? 0 : a.submittedAt > b.submittedAt ? -1 : 1);
		if (beachFilter === "all") return sorted;
		return sorted.filter((report) => report.beachId.toString() === beachFilter);
	}, [reportsQuery.data, beachFilter]);
	const filterOptions = [{
		id: "all",
		label: t("common.allBeaches")
	}, ...beaches.map((beach) => ({
		id: beach.id.toString(),
		label: pick(beach.nameEn, beach.nameFa)
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		"data-ocid": "reports.page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: t("app.name"),
			title: t("reports.title"),
			subtitle: t("reports.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "reports-feed-heading",
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-glass rounded-2xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: "reports-feed-heading",
							className: "flex items-center gap-2 font-display text-base font-extrabold uppercase tracking-wide text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
								className: "size-4 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.7)]",
								"aria-hidden": "true"
							}), t("reports.feedHeading")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "numeric rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary",
							children: reports.length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("fieldset", {
						"aria-label": t("reports.beachFilterLabel"),
						"data-ocid": "reports.filter.tabs",
						className: "scrollbar-slim -mx-1 mt-3 flex gap-2 overflow-x-auto border-0 px-1 pb-1",
						children: filterOptions.map((option, optionIndex) => {
							const active = beachFilter === option.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-ocid": `reports.filter.tab.${optionIndex}`,
								"aria-pressed": active,
								onClick: () => setBeachFilter(option.id),
								className: cn("min-h-11 shrink-0 rounded-full border px-4 text-xs font-bold uppercase tracking-wide transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "border-transparent bg-gradient-primary text-primary-foreground shadow-neon" : "border-border bg-background/50 text-muted-foreground hover:border-accent/60 hover:text-foreground"),
								children: option.label
							}, option.id);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: reportsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportSkeleton, {}) : reportsQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionsError, {
						onRetry: () => void reportsQuery.refetch(),
						isRetrying: reportsQuery.isFetching
					}) : reports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-ocid": "reports.empty_state",
						className: "surface-glass flex flex-col items-center gap-3 rounded-2xl border-dashed px-6 py-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-14 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-neon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, {
									className: "size-6",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-base font-bold uppercase tracking-wide text-foreground",
								children: beachFilter !== "all" ? t("reports.emptyFeed") : t("reports.empty")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: t("reports.emptyBody")
							})] }),
							beachFilter !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								"data-ocid": "reports.clear_filter_button",
								onClick: () => setBeachFilter("all"),
								className: "min-h-11 rounded-full border-accent/50 bg-transparent text-accent-foreground hover:bg-accent/10",
								children: t("common.allBeaches")
							}) : null
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-ocid": "reports.list",
						className: "flex flex-col gap-3",
						children: reports.map((report, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportCard, {
							report,
							beach: beachById.get(report.beachId.toString()),
							index: index + 1
						}, report.id.toString()))
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "min-w-0 lg:sticky lg:top-6 lg:self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportForm, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 flex items-start gap-2 px-1 text-xs leading-relaxed text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, {
						className: "mt-0.5 size-3.5 shrink-0 text-primary",
						"aria-hidden": "true"
					}), t("reports.subtitle")]
				})]
			})]
		})]
	});
}
//#endregion
export { ReportsPage as default };
