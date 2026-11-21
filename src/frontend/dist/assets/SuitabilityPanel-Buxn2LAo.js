import { a as useI18n, n as cn, p as require_jsx_runtime } from "./createLucideIcon-CQV5MV8G.js";
import { g as CircleCheck } from "./PageHeader-DrkWxCpG.js";
import { m as CircleHelp, p as TriangleAlert, s as STATUS_TONE } from "./use-conditions-BiRlBwxq.js";
import { t as ShieldAlert } from "./shield-alert-DJjrJ4c-.js";
import { t as StatusBadge } from "./StatusBadge-DMXEopju.js";
//#region src/components/conditions/MetricTile.tsx
var import_jsx_runtime = require_jsx_runtime();
function MetricTile({ label, value, unit, detail, caption, gauge, tone = "default", className, "data-ocid": dataOcid }) {
	const inverse = tone === "inverse";
	const missing = value === null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": dataOcid,
		className: cn("relative flex min-w-0 flex-col gap-1 overflow-hidden rounded-xl border px-3 py-3", inverse ? "border-primary/20 bg-background/40" : "border-border/60 bg-secondary/40", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-[0.66rem] font-semibold uppercase tracking-[0.16em]", inverse ? "text-primary/80" : "text-muted-foreground"),
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-baseline gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("numeric font-display text-2xl font-extrabold leading-none tracking-tight md:text-[1.75rem]", missing && "text-base font-medium", inverse ? "text-foreground" : "text-foreground", missing && "text-muted-foreground"),
						children: value ?? "—"
					}),
					!missing && unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-xs font-semibold", inverse ? "text-primary/80" : "text-muted-foreground"),
						children: unit
					}) : null,
					detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ms-1 text-xs font-bold uppercase text-accent",
						children: detail
					}) : null
				]
			}),
			caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("truncate text-[0.62rem] uppercase tracking-[0.08em]", inverse ? "text-muted-foreground" : "text-muted-foreground/80"),
				children: caption
			}) : null,
			typeof gauge === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: cn("mt-1 block h-0.5 w-full overflow-hidden rounded-full", inverse ? "bg-primary/15" : "bg-border"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block h-0.5 rounded-full bg-gradient-primary shadow-neon",
					style: { width: `${Math.round(Math.min(1, Math.max(0, gauge)) * 100)}%` }
				})
			}) : null
		]
	});
}
//#endregion
//#region src/components/conditions/SuitabilityPanel.tsx
var STATUS_KEY = {
	favorable: "status.favorable",
	caution: "status.caution",
	unfavorable: "status.unfavorable",
	insufficient: "status.insufficient"
};
var STATUS_DESC_KEY = {
	favorable: "status.favorable.desc",
	caution: "status.caution.desc",
	unfavorable: "status.unfavorable.desc",
	insufficient: "status.insufficient.desc"
};
var STATUS_ICON = {
	favorable: CircleCheck,
	caution: TriangleAlert,
	unfavorable: ShieldAlert,
	insufficient: CircleHelp
};
/** Accent rule colour per status, used for the panel's signature top edge. */
var STATUS_EDGE = {
	favorable: "from-success via-success/40 to-transparent",
	caution: "from-warning via-warning/40 to-transparent",
	unfavorable: "from-destructive via-destructive/40 to-transparent",
	insufficient: "from-muted-foreground via-muted-foreground/30 to-transparent"
};
function SuitabilityBadge({ status, className, "data-ocid": dataOcid }) {
	const { t } = useI18n();
	const Icon = STATUS_ICON[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
		tone: STATUS_TONE[status],
		className: cn("uppercase", className),
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-3.5",
			"aria-hidden": "true"
		}),
		"data-ocid": dataOcid,
		children: t(STATUS_KEY[status])
	});
}
function SuitabilityPanel({ result, beachName, className }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "suitability.panel",
		"aria-labelledby": "suitability-title",
		className: cn("surface-glass relative flex flex-col overflow-hidden rounded-2xl p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: cn("absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r", STATUS_EDGE[result.status])
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "suitability-title",
				className: "label-caps text-primary",
				children: t("section.suitability")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitabilityBadge, {
					status: result.status,
					"data-ocid": "suitability.badge"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm leading-relaxed text-foreground",
				children: [t(STATUS_DESC_KEY[result.status]), beachName ? ` ${beachName}.` : ""]
			}),
			result.reasons.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1.5 border-t border-border/60 pt-3",
				children: result.reasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1.5 size-1 shrink-0 rounded-full bg-accent shadow-[0_0_6px_oklch(0.68_0.24_345/0.8)]",
						"aria-hidden": "true"
					}), reason]
				}, reason))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-auto pt-3 text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground",
				children: [
					t("common.forecast"),
					" · ",
					t("section.dataQuality"),
					": ",
					result.coverage,
					"%"
				]
			})
		]
	});
}
//#endregion
export { SuitabilityPanel as n, MetricTile as r, SuitabilityBadge as t };
