import { a as useI18n, n as cn, p as require_jsx_runtime, t as createLucideIcon } from "./createLucideIcon-Cedqr6G7.js";
import { _ as CircleAlert, d as Button } from "./PageHeader-CGmbrCfX.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RefreshCw = createLucideIcon("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ServerCrash = createLucideIcon("server-crash", [
	["path", {
		d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",
		key: "4b9dqc"
	}],
	["path", {
		d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",
		key: "22nnkd"
	}],
	["path", {
		d: "M6 6h.01",
		key: "1utrut"
	}],
	["path", {
		d: "M6 18h.01",
		key: "uhywen"
	}],
	["path", {
		d: "m13 6-4 6h6l-4 6",
		key: "14hqih"
	}]
]);
//#endregion
//#region src/components/conditions/ConditionsStates.tsx
var import_jsx_runtime = require_jsx_runtime();
function ConditionsError({ onRetry, isRetrying, className }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "conditions.error_state",
		role: "alert",
		className: cn("flex flex-col items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-5 backdrop-blur", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					className: "size-5",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-bold uppercase tracking-wide",
					children: t("common.errorTitle")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("common.errorBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				"data-ocid": "conditions.retry_button",
				onClick: onRetry,
				disabled: isRetrying,
				className: "rounded-full border-destructive/50 bg-transparent text-destructive hover:bg-destructive/15 hover:text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
					className: cn("size-4", isRetrying && "animate-spin"),
					"aria-hidden": "true"
				}), t("common.retry")]
			})
		]
	});
}
/** Shown when the backend canister itself cannot be reached. */
function BackendError({ onRetry, isRetrying, className }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "backend.error_state",
		role: "alert",
		className: cn("flex flex-col items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-5 backdrop-blur", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServerCrash, {
					className: "size-5",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-bold uppercase tracking-wide",
					children: t("common.backendErrorTitle")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("common.backendErrorBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				"data-ocid": "backend.retry_button",
				onClick: onRetry,
				disabled: isRetrying,
				className: "rounded-full border-destructive/50 bg-transparent text-destructive hover:bg-destructive/15 hover:text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
					className: cn("size-4", isRetrying && "animate-spin"),
					"aria-hidden": "true"
				}), t("common.retry")]
			})
		]
	});
}
function ConditionsSkeleton({ className }) {
	const { t } = useI18n();
	const ids = Array.from({ length: 6 }, (_, i) => `metric-skeleton-${i}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ocid": "conditions.loading_state",
		"aria-busy": "true",
		className: cn("surface-glass rounded-2xl p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("common.loading")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-2 md:grid-cols-3",
				children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 animate-pulse rounded-xl border border-border/50 bg-secondary/50" }, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: t("common.loading")
			})
		]
	});
}
//#endregion
export { RefreshCw as i, ConditionsError as n, ConditionsSkeleton as r, BackendError as t };
