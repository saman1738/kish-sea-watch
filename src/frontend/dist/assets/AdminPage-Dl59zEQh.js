import { a as useI18n, f as useQueryClient, l as useInternetIdentity, m as require_react, n as cn, p as require_jsx_runtime, s as useActor, t as createLucideIcon, tt as __toESM, u as useQuery } from "./createLucideIcon-CQV5MV8G.js";
import { _ as CircleAlert, a as useBeaches, c as ReviewStatus, d as Button, g as CircleCheck, h as MapPin, l as WarningSeverity, m as useComposedRefs, n as PageShell, o as useUpdateBeach, r as useAddBeach, t as PageHeader, u as createActor, v as useMutation } from "./PageHeader-DrkWxCpG.js";
import { _ as composeEventHandlers, a as SelectValue, b as Send, c as useDirection, d as Primitive, f as useSize, g as createContextScope, h as useLayoutEffect2, i as SelectTrigger, l as createCollection, m as useControllableState, n as SelectContent, o as useId, p as usePrevious, r as SelectItem, s as useCallbackRef, t as Select, u as Textarea, v as Label, x as Check, y as SignInButton } from "./select-VKnbc2B-.js";
import { a as Megaphone, i as useSetWarningPublished, n as useCreateWarning, t as useAllWarnings } from "./use-warnings-B8aYo76T.js";
import { t as ShieldAlert } from "./shield-alert-DJjrJ4c-.js";
import { t as X } from "./x-CX8_lL59.js";
import { i as Link, n as ShieldCheck, r as ClipboardList, t as Waves } from "./index-CcoF8Tur.js";
import { t as StatusBadge } from "./StatusBadge-DMXEopju.js";
import { n as useReports, t as REPORTS_KEY } from "./use-reports-iceC91Cq.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LoaderCircle = createLucideIcon("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Pencil = createLucideIcon("pencil", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}], ["path", {
	d: "m15 5 4 4",
	key: "1mk7zo"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Plus = createLucideIcon("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]);
//#endregion
//#region src/components/admin/AdminGate.tsx
var import_jsx_runtime = require_jsx_runtime();
function GatePanel({ icon, title, body, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "admin.gate.panel",
		className: "surface-neon-edge relative mx-auto flex w-full max-w-lg flex-col items-center gap-4 overflow-hidden p-6 text-center md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-sunset opacity-20 blur-2xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative grid size-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-neon",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-extrabold uppercase tracking-tight text-foreground",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: body
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex flex-col items-center gap-2",
				children
			})
		]
	});
}
/**
* Renders the admin console only for a signed-in administrator.
* Signed-out visitors get a working sign-in action; signed-in non-admins get a clear notice.
*/
function AdminGate({ isAdmin, isLoading, children }) {
	const { t } = useI18n();
	const { identity, isInitializing, isLoggingIn } = useInternetIdentity();
	if (!(!!identity && !identity.getPrincipal().isAnonymous() && !isInitializing)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GatePanel, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
			className: "size-6",
			"aria-hidden": "true"
		}),
		title: t("admin.signIn"),
		body: t("admin.signInBody"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, {}), isLoggingIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: t("common.loading")
		}) : null]
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", {
		"data-ocid": "admin.loading_state",
		"aria-busy": "true",
		className: "surface-glass mx-auto flex w-full max-w-lg items-center justify-center gap-2 rounded-2xl p-8 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-4 animate-spin text-primary",
			"aria-hidden": "true"
		}), t("common.loading")]
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GatePanel, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
			className: "size-6",
			"aria-hidden": "true"
		}),
		title: t("admin.notAdmin"),
		body: t("admin.signInBody"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			className: "min-h-11 rounded-full border-accent/50 bg-transparent px-5 font-bold uppercase tracking-[0.08em] text-accent hover:bg-accent/10 hover:text-accent",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				"data-ocid": "admin.gate.back_link",
				children: t("common.back")
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
//#region src/components/ui/input.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
		...props
	});
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-switch@1.2.6_@types+react-dom@19.1.11_@types+react@19.1.17__@types+reac_d28b9ab4436ff6508f78f61d6091c188/node_modules/@radix-ui/react-switch/dist/index.mjs
var SWITCH_NAME = "Switch";
var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, name, checked: checkedProp, defaultChecked, required, disabled, value = "on", onCheckedChange, form, ...switchProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: SWITCH_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwitchProvider, {
		scope: __scopeSwitch,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			"aria-required": required,
			"data-state": getState(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...switchProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				setChecked((prevChecked) => !prevChecked);
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchBubbleInput, {
			control: button,
			bubbles: !hasConsumerStoppedPropagationRef.current,
			name,
			value,
			checked,
			required,
			disabled,
			form,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSwitch, ...thumbProps } = props;
	const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-state": getState(context.checked),
		"data-disabled": context.disabled ? "" : void 0,
		...thumbProps,
		ref: forwardedRef
	});
});
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = import_react.forwardRef(({ __scopeSwitch, control, checked, bubbles = true, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(ref, forwardedRef);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			setChecked.call(input, checked);
			input.dispatchEvent(event);
		}
	}, [
		prevChecked,
		checked,
		bubbles
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: checked,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var Root$1 = Switch$1;
var Thumb = SwitchThumb;
//#endregion
//#region src/components/ui/switch.tsx
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
		"data-slot": "switch",
		className: cn("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			"data-slot": "switch-thumb",
			className: cn("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
		})
	});
}
//#endregion
//#region src/components/admin/admin-utils.ts
/** Motoko Time.now() values are nanosecond bigints. */
function timestampToDate(timestamp) {
	const date = new Date(Number(timestamp / 1000000n));
	return Number.isNaN(date.getTime()) ? null : date;
}
function formatTimestamp(timestamp, locale) {
	const date = timestampToDate(timestamp);
	if (!date) return null;
	return new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Asia/Tehran"
	}).format(date);
}
var REPORT_KIND_KEY = {
	strongCurrents: "reports.kind.strongCurrents",
	waterClarity: "reports.kind.waterClarity",
	unusualWaves: "reports.kind.unusualWaves",
	jellyfish: "reports.kind.jellyfish",
	calmWater: "reports.kind.calmWater",
	otherHazard: "reports.kind.otherHazard",
	roughWater: "reports.kind.roughWater"
};
var SEVERITY_KEY = {
	info: "admin.severity.info",
	advisory: "admin.severity.advisory",
	warning: "admin.severity.warning",
	danger: "admin.severity.danger"
};
var SEVERITY_ORDER = [
	WarningSeverity.info,
	WarningSeverity.advisory,
	WarningSeverity.warning,
	WarningSeverity.danger
];
/** Parse a decimal coordinate string; returns null when not a finite number. */
function parseCoordinate(value) {
	const trimmed = value.trim();
	if (trimmed === "") return null;
	const parsed = Number(trimmed);
	return Number.isFinite(parsed) ? parsed : null;
}
//#endregion
//#region src/components/admin/BeachForm.tsx
var EMPTY_DRAFT = {
	nameEn: "",
	nameFa: "",
	latitude: "",
	longitude: "",
	descriptionEn: "",
	descriptionFa: "",
	active: true
};
function draftFromBeach(beach) {
	return {
		nameEn: beach.nameEn,
		nameFa: beach.nameFa,
		latitude: String(beach.latitude),
		longitude: String(beach.longitude),
		descriptionEn: beach.descriptionEn,
		descriptionFa: beach.descriptionFa,
		active: beach.active
	};
}
var FIELD_CLASS = "min-h-11 rounded-xl border-input bg-background/60 text-sm focus-visible:ring-accent";
var LABEL_CLASS$1 = "text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground";
function BeachForm({ beach, onDone }) {
	const { t } = useI18n();
	const addBeach = useAddBeach();
	const updateBeach = useUpdateBeach();
	const [draft, setDraft] = (0, import_react.useState)(() => beach ? draftFromBeach(beach) : EMPTY_DRAFT);
	const [error, setError] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const pending = addBeach.isPending || updateBeach.isPending;
	function set(key, value) {
		setDraft((current) => ({
			...current,
			[key]: value
		}));
		setSaved(false);
	}
	function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setSaved(false);
		const latitude = parseCoordinate(draft.latitude);
		const longitude = parseCoordinate(draft.longitude);
		if (draft.nameEn.trim() === "" || draft.nameFa.trim() === "") {
			setError(t("admin.beach.error"));
			return;
		}
		if (latitude === null || longitude === null) {
			setError(t("admin.beach.error"));
			return;
		}
		const payload = {
			nameEn: draft.nameEn.trim(),
			nameFa: draft.nameFa.trim(),
			latitude,
			longitude,
			descriptionEn: draft.descriptionEn.trim(),
			descriptionFa: draft.descriptionFa.trim()
		};
		const onSuccess = () => {
			setSaved(true);
			if (!beach) setDraft(EMPTY_DRAFT);
		};
		const onError = () => setError(t("admin.beach.error"));
		if (beach) updateBeach.mutate({
			...payload,
			id: beach.id,
			active: draft.active
		}, {
			onSuccess,
			onError
		});
		else addBeach.mutate(payload, {
			onSuccess,
			onError
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		"data-ocid": "admin.beach.form",
		onSubmit: handleSubmit,
		className: "surface-neon-edge relative overflow-hidden p-4 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-extrabold uppercase tracking-tight text-foreground",
					children: beach ? t("admin.beach.edit") : t("admin.beach.add")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"data-ocid": "admin.beach.cancel_button",
					"aria-label": t("common.cancel"),
					onClick: onDone,
					className: "size-9 shrink-0 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-4",
						"aria-hidden": "true"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "beach-name-en",
							className: LABEL_CLASS$1,
							children: t("admin.beach.nameEn")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "beach-name-en",
							"data-ocid": "admin.beach.name_en_input",
							value: draft.nameEn,
							onChange: (e) => set("nameEn", e.target.value),
							className: FIELD_CLASS,
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "beach-name-fa",
							className: LABEL_CLASS$1,
							children: t("admin.beach.nameFa")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "beach-name-fa",
							"data-ocid": "admin.beach.name_fa_input",
							dir: "rtl",
							value: draft.nameFa,
							onChange: (e) => set("nameFa", e.target.value),
							className: FIELD_CLASS,
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "beach-lat",
							className: LABEL_CLASS$1,
							children: t("admin.beach.lat")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "beach-lat",
							"data-ocid": "admin.beach.lat_input",
							type: "number",
							inputMode: "decimal",
							step: "any",
							min: -90,
							max: 90,
							value: draft.latitude,
							onChange: (e) => set("latitude", e.target.value),
							className: cn(FIELD_CLASS, "numeric font-mono"),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "beach-lng",
							className: LABEL_CLASS$1,
							children: t("admin.beach.lng")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "beach-lng",
							"data-ocid": "admin.beach.lng_input",
							type: "number",
							inputMode: "decimal",
							step: "any",
							min: -180,
							max: 180,
							value: draft.longitude,
							onChange: (e) => set("longitude", e.target.value),
							className: cn(FIELD_CLASS, "numeric font-mono"),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "beach-desc-en",
							className: LABEL_CLASS$1,
							children: t("admin.beach.descEn")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "beach-desc-en",
							"data-ocid": "admin.beach.desc_en_input",
							value: draft.descriptionEn,
							onChange: (e) => set("descriptionEn", e.target.value),
							rows: 2,
							className: "rounded-xl border-input bg-background/60 text-sm focus-visible:ring-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "beach-desc-fa",
							className: LABEL_CLASS$1,
							children: t("admin.beach.descFa")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "beach-desc-fa",
							"data-ocid": "admin.beach.desc_fa_input",
							dir: "rtl",
							value: draft.descriptionFa,
							onChange: (e) => set("descriptionFa", e.target.value),
							rows: 2,
							className: "rounded-xl border-input bg-background/60 text-sm focus-visible:ring-accent"
						})]
					}),
					beach ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/40 px-3 py-2.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "beach-active",
							className: "text-xs font-bold uppercase tracking-[0.1em] text-foreground",
							children: t("admin.beach.active")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "beach-active",
							"data-ocid": "admin.beach.active_switch",
							checked: draft.active,
							onCheckedChange: (checked) => set("active", checked)
						})]
					}) : null
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				role: "alert",
				"data-ocid": "admin.beach.error_state",
				className: "mt-3 flex items-center gap-1.5 text-sm text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					className: "size-4 shrink-0",
					"aria-hidden": "true"
				}), error]
			}) : null,
			saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-ocid": "admin.beach.success_state",
				className: "mt-3 flex items-center gap-1.5 text-sm text-success",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "size-4 shrink-0",
					"aria-hidden": "true"
				}), t("admin.beach.saved")]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					"data-ocid": "admin.beach.submit_button",
					disabled: pending,
					className: "min-h-11 rounded-full bg-gradient-primary px-5 font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-neon hover:brightness-110",
					children: [pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-4 animate-spin",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "size-4",
						"aria-hidden": "true"
					}), t("common.save")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					"data-ocid": "admin.beach.cancel_button",
					onClick: onDone,
					className: "min-h-11 rounded-full px-4 font-bold uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground",
					children: t("common.cancel")
				})]
			})
		]
	});
}
//#endregion
//#region src/components/admin/BeachManager.tsx
function BeachRow({ beach, onEdit }) {
	const { t, pick } = useI18n();
	const updateBeach = useUpdateBeach();
	const [error, setError] = (0, import_react.useState)(null);
	function toggleActive() {
		setError(null);
		updateBeach.mutate({
			id: beach.id,
			nameEn: beach.nameEn,
			nameFa: beach.nameFa,
			latitude: beach.latitude,
			longitude: beach.longitude,
			descriptionEn: beach.descriptionEn,
			descriptionFa: beach.descriptionFa,
			active: !beach.active
		}, { onError: () => setError(t("admin.beach.error")) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-ocid": "admin.beach.item",
		className: "surface-glass flex flex-col gap-3 rounded-2xl p-3.5 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-display text-sm font-bold uppercase tracking-wide text-foreground",
						children: pick(beach.nameEn, beach.nameFa)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						tone: beach.active ? "success" : "muted",
						children: beach.active ? t("admin.beach.active") : t("beach.inactive")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "numeric mt-1.5 flex items-center gap-1.5 font-mono text-[0.7rem] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "size-3 shrink-0 text-accent drop-shadow-[0_0_6px_oklch(0.68_0.24_345/0.7)]",
							"aria-hidden": "true"
						}),
						beach.latitude.toFixed(4),
						"° · ",
						beach.longitude.toFixed(4),
						"°"
					]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-1 text-xs text-destructive",
					children: error
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				"data-ocid": "admin.beach.edit_button",
				onClick: onEdit,
				className: "min-h-10 rounded-full border-accent/50 bg-transparent px-3.5 font-bold uppercase tracking-[0.06em] text-accent hover:bg-accent/10 hover:text-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
					className: "size-3.5",
					"aria-hidden": "true"
				}), t("admin.beach.edit")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "ghost",
				"data-ocid": "admin.beach.toggle_button",
				onClick: toggleActive,
				disabled: updateBeach.isPending,
				className: cn("min-h-10 rounded-full px-3.5 font-bold uppercase tracking-[0.06em]", beach.active ? "text-destructive hover:bg-destructive/10 hover:text-destructive" : "text-success hover:bg-success/10 hover:text-success"),
				children: [updateBeach.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "size-3.5 animate-spin",
					"aria-hidden": "true"
				}) : null, beach.active ? t("admin.warning.unpublish") : t("admin.beach.active")]
			})]
		})]
	});
}
function BeachManager() {
	const { t } = useI18n();
	const beaches = useBeaches();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const showForm = creating || editing !== null;
	function closeForm() {
		setCreating(false);
		setEditing(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "admin.beaches.section",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-extrabold uppercase tracking-tight text-foreground",
					children: t("admin.tab.beaches")
				}), !showForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					"data-ocid": "admin.beach.add_button",
					onClick: () => {
						setEditing(null);
						setCreating(true);
					},
					className: "min-h-11 rounded-full bg-gradient-primary px-5 font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-neon hover:brightness-110",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "size-4",
						"aria-hidden": "true"
					}), t("admin.beach.add")]
				}) : null]
			}),
			showForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachForm, {
				beach: editing,
				onDone: closeForm
			}, editing ? `edit-${editing.id.toString()}` : "create") : null,
			beaches.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "admin.beaches.loading_state",
				className: "text-sm text-muted-foreground",
				children: t("common.loading")
			}) : beaches.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ocid": "admin.beaches.error_state",
				role: "alert",
				className: "flex flex-wrap items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive backdrop-blur",
				children: [t("admin.beach.error"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					"data-ocid": "admin.beaches.retry_button",
					onClick: () => void beaches.refetch(),
					className: "min-h-10 rounded-full border-destructive/50 bg-transparent text-destructive hover:bg-destructive/15 hover:text-destructive",
					children: t("common.retry")
				})]
			}) : beaches.data && beaches.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-ocid": "admin.beaches.list",
				className: "space-y-2.5",
				children: beaches.data.map((beach) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachRow, {
					beach,
					onEdit: () => {
						setCreating(false);
						setEditing(beach);
					}
				}, beach.id.toString()))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "admin.beaches.empty_state",
				className: "rounded-2xl border border-dashed border-border/80 bg-card/40 p-6 text-center text-sm text-muted-foreground",
				children: t("dashboard.noBeaches")
			})
		]
	});
}
//#endregion
//#region src/components/admin/ReportReview.tsx
var STATUS_TONE = {
	unverified: "warning",
	verified: "success",
	dismissed: "muted"
};
var STATUS_KEY = {
	unverified: "common.unverified",
	verified: "common.verified",
	dismissed: "common.dismissed"
};
function useReviewReport() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.reviewReport(input.id, input.status);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: REPORTS_KEY });
		}
	});
}
function ReportRow({ report, beachName, index }) {
	const { t, lang } = useI18n();
	const review = useReviewReport();
	const [error, setError] = (0, import_react.useState)(null);
	const locale = lang === "fa" ? "fa-IR" : "en-US";
	const submitted = formatTimestamp(report.submittedAt, locale);
	function setStatus(status) {
		setError(null);
		review.mutate({
			id: report.id,
			status
		}, { onError: () => setError(t("admin.beach.error")) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-ocid": `admin.report.item.${index + 1}`,
		className: "surface-glass rounded-2xl p-3.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-sm font-bold uppercase tracking-wide text-foreground",
						children: t(REPORT_KIND_KEY[report.kind])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						tone: STATUS_TONE[report.status],
						children: t(STATUS_KEY[report.status])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "numeric ms-auto font-mono text-[0.7rem] text-muted-foreground",
						children: submitted ?? t("common.noData")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary",
				children: beachName
			}),
			report.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 break-words text-sm leading-relaxed text-foreground",
				children: report.note
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-2 text-xs text-destructive",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					"data-ocid": `admin.report.verify_button.${index + 1}`,
					onClick: () => setStatus(ReviewStatus.verified),
					disabled: review.isPending || report.status === ReviewStatus.verified,
					className: "min-h-10 rounded-full border border-success/50 bg-success/15 px-3.5 font-bold uppercase tracking-[0.06em] text-success hover:bg-success/25 hover:text-success",
					children: [review.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-3.5 animate-spin",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), t("admin.report.verify")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					"data-ocid": `admin.report.dismiss_button.${index + 1}`,
					onClick: () => setStatus(ReviewStatus.dismissed),
					disabled: review.isPending || report.status === ReviewStatus.dismissed,
					className: "min-h-10 rounded-full border-border bg-transparent px-3.5 font-bold uppercase tracking-[0.06em] text-muted-foreground hover:bg-muted hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), t("admin.report.dismiss")]
				})]
			})
		]
	});
}
function ReportReview() {
	const { t, pick } = useI18n();
	const reports = useReports();
	const beaches = useBeaches();
	const beachName = (beachId) => {
		const beach = beaches.data?.find((b) => b.id === beachId);
		return beach ? pick(beach.nameEn, beach.nameFa) : t("common.noData");
	};
	const sorted = [...reports.data ?? []].sort((a, b) => a.submittedAt === b.submittedAt ? 0 : a.submittedAt > b.submittedAt ? -1 : 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "admin.reports.section",
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-extrabold uppercase tracking-tight text-foreground",
			children: t("admin.tab.reports")
		}), reports.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-ocid": "admin.reports.loading_state",
			className: "text-sm text-muted-foreground",
			children: t("common.loading")
		}) : reports.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ocid": "admin.reports.error_state",
			role: "alert",
			className: "flex flex-wrap items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive backdrop-blur",
			children: [t("reports.error"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				"data-ocid": "admin.reports.retry_button",
				onClick: () => void reports.refetch(),
				className: "min-h-10 rounded-full border-destructive/50 bg-transparent text-destructive hover:bg-destructive/15 hover:text-destructive",
				children: t("common.retry")
			})]
		}) : sorted.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-ocid": "admin.reports.list",
			className: "space-y-2.5",
			children: sorted.map((report, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportRow, {
				report,
				index,
				beachName: beachName(report.beachId)
			}, report.id.toString()))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-ocid": "admin.reports.empty_state",
			className: "rounded-2xl border border-dashed border-border/80 bg-card/40 p-6 text-center text-sm text-muted-foreground",
			children: t("admin.report.empty")
		})]
	});
}
//#endregion
//#region src/components/admin/WarningManager.tsx
var ALL_BEACHES = "all";
var SEVERITY_TONE = {
	info: "accent",
	advisory: "warning",
	warning: "warning",
	danger: "destructive"
};
var LABEL_CLASS = "text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground";
function WarningRow({ warning, index }) {
	const { t, lang, pick } = useI18n();
	const beaches = useBeaches();
	const setPublished = useSetWarningPublished();
	const [error, setError] = (0, import_react.useState)(null);
	const locale = lang === "fa" ? "fa-IR" : "en-US";
	const issued = formatTimestamp(warning.issuedAt, locale);
	const beach = warning.beachId !== null ? beaches.data?.find((b) => b.id === warning.beachId) : void 0;
	const scope = beach ? pick(beach.nameEn, beach.nameFa) : t("admin.warning.allBeaches");
	function toggle() {
		setError(null);
		setPublished.mutate({
			id: warning.id,
			published: !warning.published
		}, { onError: () => setError(t("admin.warning.error")) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-ocid": `admin.warning.item.${index + 1}`,
		className: "surface-glass rounded-2xl p-3.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						tone: SEVERITY_TONE[warning.severity],
						children: t(SEVERITY_KEY[warning.severity])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						tone: warning.published ? "success" : "muted",
						"data-ocid": `admin.warning.status.${index + 1}`,
						children: warning.published ? t("admin.warning.published") : t("admin.warning.unpublished")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "numeric ms-auto font-mono text-[0.7rem] text-muted-foreground",
						children: issued ?? t("common.noData")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 break-words text-sm leading-relaxed text-foreground",
				children: pick(warning.messageEn, warning.messageFa)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary",
				children: scope
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-2 text-xs text-destructive",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				"data-ocid": `admin.warning.toggle_button.${index + 1}`,
				onClick: toggle,
				disabled: setPublished.isPending,
				className: cn("mt-3 min-h-10 rounded-full bg-transparent px-3.5 font-bold uppercase tracking-[0.06em]", warning.published ? "border-border text-muted-foreground hover:bg-muted hover:text-foreground" : "border-accent/50 text-accent hover:bg-accent/10 hover:text-accent"),
				children: [setPublished.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "size-3.5 animate-spin",
					"aria-hidden": "true"
				}) : null, warning.published ? t("admin.warning.unpublish") : t("admin.warning.publish")]
			})
		]
	});
}
function WarningForm() {
	const { t, pick } = useI18n();
	const beaches = useBeaches();
	const createWarning = useCreateWarning();
	const [messageEn, setMessageEn] = (0, import_react.useState)("");
	const [messageFa, setMessageFa] = (0, import_react.useState)("");
	const [severity, setSeverity] = (0, import_react.useState)(WarningSeverity.advisory);
	const [beachId, setBeachId] = (0, import_react.useState)(ALL_BEACHES);
	const [published, setPublished] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(false);
	function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setSaved(false);
		if (messageEn.trim() === "" || messageFa.trim() === "") {
			setError(t("admin.warning.error"));
			return;
		}
		createWarning.mutate({
			beachId: beachId === ALL_BEACHES ? null : BigInt(beachId),
			messageEn: messageEn.trim(),
			messageFa: messageFa.trim(),
			severity,
			published
		}, {
			onSuccess: () => {
				setMessageEn("");
				setMessageFa("");
				setSaved(true);
			},
			onError: () => setError(t("admin.warning.error"))
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		"data-ocid": "admin.warning.form",
		onSubmit: handleSubmit,
		className: "surface-neon-edge relative overflow-hidden p-4 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "flex items-center gap-2 font-display text-base font-extrabold uppercase tracking-tight text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {
					className: "size-4 text-accent",
					"aria-hidden": "true"
				}), t("admin.warning.create")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "warning-severity",
							className: LABEL_CLASS,
							children: t("admin.warning.severity")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: severity,
							onValueChange: (value) => setSeverity(value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "warning-severity",
								"data-ocid": "admin.warning.severity_select",
								className: "min-h-11 w-full rounded-xl border-input bg-background/60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SEVERITY_ORDER.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value,
								children: t(SEVERITY_KEY[value])
							}, value)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "warning-beach",
							className: LABEL_CLASS,
							children: t("admin.warning.beach")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: beachId,
							onValueChange: setBeachId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "warning-beach",
								"data-ocid": "admin.warning.beach_select",
								className: "min-h-11 w-full rounded-xl border-input bg-background/60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: ALL_BEACHES,
								children: t("admin.warning.allBeaches")
							}), (beaches.data ?? []).map((beach) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: beach.id.toString(),
								children: pick(beach.nameEn, beach.nameFa)
							}, beach.id.toString()))] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "warning-message-en",
							className: LABEL_CLASS,
							children: t("admin.warning.messageEn")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "warning-message-en",
							"data-ocid": "admin.warning.message_en_input",
							value: messageEn,
							onChange: (e) => setMessageEn(e.target.value),
							rows: 2,
							className: "rounded-xl border-input bg-background/60 text-sm focus-visible:ring-accent",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "warning-message-fa",
							className: LABEL_CLASS,
							children: t("admin.warning.messageFa")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "warning-message-fa",
							"data-ocid": "admin.warning.message_fa_input",
							dir: "rtl",
							value: messageFa,
							onChange: (e) => setMessageFa(e.target.value),
							rows: 2,
							className: "rounded-xl border-input bg-background/60 text-sm focus-visible:ring-accent",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "warning-issued",
							className: LABEL_CLASS,
							children: t("admin.issuedAt")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							id: "warning-issued",
							"data-ocid": "admin.warning.issued_note",
							className: "rounded-xl border border-dashed border-border/80 bg-muted/30 px-3 py-2 text-xs text-muted-foreground",
							children: [
								t("admin.issuedAt"),
								": ",
								t("common.now"),
								" · ",
								t("common.timezone")
							]
						})]
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				role: "alert",
				"data-ocid": "admin.warning.error_state",
				className: "mt-3 flex items-center gap-1.5 text-sm text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					className: "size-4 shrink-0",
					"aria-hidden": "true"
				}), error]
			}) : null,
			saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-ocid": "admin.warning.success_state",
				className: "mt-3 flex items-center gap-1.5 text-sm text-success",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "size-4 shrink-0",
					"aria-hidden": "true"
				}), t("admin.warning.saved")]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					"data-ocid": "admin.warning.submit_button",
					disabled: createWarning.isPending,
					className: "min-h-11 rounded-full bg-gradient-primary px-5 font-bold uppercase tracking-[0.08em] text-primary-foreground shadow-neon hover:brightness-110",
					children: [createWarning.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-4 animate-spin",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
						className: "size-4",
						"aria-hidden": "true"
					}), t("admin.warning.create")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					"data-ocid": "admin.warning.publish_toggle",
					onClick: () => setPublished((current) => !current),
					"aria-pressed": published,
					className: cn("min-h-11 rounded-full px-4 font-bold uppercase tracking-[0.08em]", published ? "text-success hover:bg-success/10 hover:text-success" : "text-muted-foreground hover:text-foreground"),
					children: published ? t("admin.warning.published") : t("admin.warning.unpublished")
				})]
			})
		]
	});
}
function WarningManager() {
	const { t } = useI18n();
	const warnings = useAllWarnings();
	const sorted = [...warnings.data ?? []].sort((a, b) => a.issuedAt === b.issuedAt ? 0 : a.issuedAt > b.issuedAt ? -1 : 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ocid": "admin.warnings.section",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 font-display text-lg font-extrabold uppercase tracking-tight text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {
					className: "size-4 text-accent",
					"aria-hidden": "true"
				}), t("admin.tab.warnings")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningForm, {}),
			warnings.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "admin.warnings.loading_state",
				className: "text-sm text-muted-foreground",
				children: t("common.loading")
			}) : warnings.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ocid": "admin.warnings.error_state",
				role: "alert",
				className: "flex flex-wrap items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive backdrop-blur",
				children: [t("admin.warning.error"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					"data-ocid": "admin.warnings.retry_button",
					onClick: () => void warnings.refetch(),
					className: "min-h-10 rounded-full border-destructive/50 bg-transparent text-destructive hover:bg-destructive/15 hover:text-destructive",
					children: t("common.retry")
				})]
			}) : sorted.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-ocid": "admin.warnings.list",
				className: "space-y-2.5",
				children: sorted.map((warning, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningRow, {
					warning,
					index
				}, warning.id.toString()))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-ocid": "admin.warnings.empty_state",
				className: "rounded-2xl border border-dashed border-border/80 bg-card/40 p-6 text-center text-sm text-muted-foreground",
				children: t("admin.warning.empty")
			})
		]
	});
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-roving-focus@1.1.11_@types+react-dom@19.1.11_@types+react@19.1.17__@typ_36cadf73f63477a2272afac63e9bee96/node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(GROUP_NAME, [createCollectionScope]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: props.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusGroupImpl, {
				...props,
				ref: forwardedRef
			})
		})
	});
});
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const direction = useDirection(dir);
	const [currentTabStopId, setCurrentTabStopId] = useControllableState({
		prop: currentTabStopIdProp,
		defaultProp: defaultCurrentTabStopId ?? null,
		onChange: onCurrentTabStopIdChange,
		caller: GROUP_NAME
	});
	const [isTabbingBackOut, setIsTabbingBackOut] = import_react.useState(false);
	const handleEntryFocus = useCallbackRef(onEntryFocus);
	const getItems = useCollection(__scopeRovingFocusGroup);
	const isClickFocusRef = import_react.useRef(false);
	const [focusableItemsCount, setFocusableItemsCount] = import_react.useState(0);
	import_react.useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
			return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
		}
	}, [handleEntryFocus]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusProvider, {
		scope: __scopeRovingFocusGroup,
		orientation,
		dir: direction,
		loop,
		currentTabStopId,
		onItemFocus: import_react.useCallback((tabStopId) => setCurrentTabStopId(tabStopId), [setCurrentTabStopId]),
		onItemShiftTab: import_react.useCallback(() => setIsTabbingBackOut(true), []),
		onFocusableItemAdd: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount + 1), []),
		onFocusableItemRemove: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount - 1), []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
			"data-orientation": orientation,
			...groupProps,
			ref: composedRefs,
			style: {
				outline: "none",
				...props.style
			},
			onMouseDown: composeEventHandlers(props.onMouseDown, () => {
				isClickFocusRef.current = true;
			}),
			onFocus: composeEventHandlers(props.onFocus, (event) => {
				const isKeyboardFocus = !isClickFocusRef.current;
				if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
					const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
					event.currentTarget.dispatchEvent(entryFocusEvent);
					if (!entryFocusEvent.defaultPrevented) {
						const items = getItems().filter((item) => item.focusable);
						focusFirst([
							items.find((item) => item.active),
							items.find((item) => item.id === currentTabStopId),
							...items
						].filter(Boolean).map((item) => item.ref.current), preventScrollOnEntryFocus);
					}
				}
				isClickFocusRef.current = false;
			}),
			onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
		})
	});
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
	const autoId = useId();
	const id = tabStopId || autoId;
	const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
	const isCurrentTabStop = context.currentTabStopId === id;
	const getItems = useCollection(__scopeRovingFocusGroup);
	const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
	import_react.useEffect(() => {
		if (focusable) {
			onFocusableItemAdd();
			return () => onFocusableItemRemove();
		}
	}, [
		focusable,
		onFocusableItemAdd,
		onFocusableItemRemove
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeRovingFocusGroup,
		id,
		focusable,
		active,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			tabIndex: isCurrentTabStop ? 0 : -1,
			"data-orientation": context.orientation,
			...itemProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!focusable) event.preventDefault();
				else context.onItemFocus(id);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (event.key === "Tab" && event.shiftKey) {
					context.onItemShiftTab();
					return;
				}
				if (event.target !== event.currentTarget) return;
				const focusIntent = getFocusIntent(event, context.orientation, context.dir);
				if (focusIntent !== void 0) {
					if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
					event.preventDefault();
					let candidateNodes = getItems().filter((item) => item.focusable).map((item) => item.ref.current);
					if (focusIntent === "last") candidateNodes.reverse();
					else if (focusIntent === "prev" || focusIntent === "next") {
						if (focusIntent === "prev") candidateNodes.reverse();
						const currentIndex = candidateNodes.indexOf(event.currentTarget);
						candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
					}
					setTimeout(() => focusFirst(candidateNodes));
				}
			}),
			children: typeof children === "function" ? children({
				isCurrentTabStop,
				hasTabStop: currentTabStopId != null
			}) : children
		})
	});
});
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-presence@1.1.5_@types+react-dom@19.1.11_@types+react@19.1.17__@types+re_21e2bb85425f53f6c7108cfe0018fd7c/node_modules/@radix-ui/react-presence/dist/index.mjs
function useStateMachine(initialState, machine) {
	return import_react.useReducer((state, event) => {
		return machine[state][event] ?? state;
	}, initialState);
}
var Presence = (props) => {
	const { present, children } = props;
	const presence = usePresence(present);
	const child = typeof children === "function" ? children({ present: presence.isPresent }) : import_react.Children.only(children);
	const ref = useComposedRefs(presence.ref, getElementRef(child));
	return typeof children === "function" || presence.isPresent ? import_react.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
	const [node, setNode] = import_react.useState();
	const stylesRef = import_react.useRef(null);
	const prevPresentRef = import_react.useRef(present);
	const prevAnimationNameRef = import_react.useRef("none");
	const [state, send] = useStateMachine(present ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	import_react.useEffect(() => {
		const currentAnimationName = getAnimationName(stylesRef.current);
		prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
	}, [state]);
	useLayoutEffect2(() => {
		const styles = stylesRef.current;
		const wasPresent = prevPresentRef.current;
		if (wasPresent !== present) {
			const prevAnimationName = prevAnimationNameRef.current;
			const currentAnimationName = getAnimationName(styles);
			if (present) send("MOUNT");
			else if (currentAnimationName === "none" || styles?.display === "none") send("UNMOUNT");
			else if (wasPresent && prevAnimationName !== currentAnimationName) send("ANIMATION_OUT");
			else send("UNMOUNT");
			prevPresentRef.current = present;
		}
	}, [present, send]);
	useLayoutEffect2(() => {
		if (node) {
			let timeoutId;
			const ownerWindow = node.ownerDocument.defaultView ?? window;
			const handleAnimationEnd = (event) => {
				const isCurrentAnimation = getAnimationName(stylesRef.current).includes(CSS.escape(event.animationName));
				if (event.target === node && isCurrentAnimation) {
					send("ANIMATION_END");
					if (!prevPresentRef.current) {
						const currentFillMode = node.style.animationFillMode;
						node.style.animationFillMode = "forwards";
						timeoutId = ownerWindow.setTimeout(() => {
							if (node.style.animationFillMode === "forwards") node.style.animationFillMode = currentFillMode;
						});
					}
				}
			};
			const handleAnimationStart = (event) => {
				if (event.target === node) prevAnimationNameRef.current = getAnimationName(stylesRef.current);
			};
			node.addEventListener("animationstart", handleAnimationStart);
			node.addEventListener("animationcancel", handleAnimationEnd);
			node.addEventListener("animationend", handleAnimationEnd);
			return () => {
				ownerWindow.clearTimeout(timeoutId);
				node.removeEventListener("animationstart", handleAnimationStart);
				node.removeEventListener("animationcancel", handleAnimationEnd);
				node.removeEventListener("animationend", handleAnimationEnd);
			};
		} else send("ANIMATION_END");
	}, [node, send]);
	return {
		isPresent: ["mounted", "unmountSuspended"].includes(state),
		ref: import_react.useCallback((node2) => {
			stylesRef.current = node2 ? getComputedStyle(node2) : null;
			setNode(node2);
		}, [])
	};
}
function getAnimationName(styles) {
	return styles?.animationName || "none";
}
function getElementRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-tabs@1.1.13_@types+react-dom@19.1.11_@types+react@19.1.17__@types+react_f21cc4b4766ef55b6ce735b87630a35d/node_modules/@radix-ui/react-tabs/dist/index.mjs
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = "automatic", ...tabsProps } = props;
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		onChange: onValueChange,
		defaultProp: defaultValue ?? "",
		caller: TABS_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsProvider, {
		scope: __scopeTabs,
		baseId: useId(),
		value,
		onValueChange: setValue,
		orientation,
		dir: direction,
		activationMode,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			dir: direction,
			"data-orientation": orientation,
			...tabsProps,
			ref: forwardedRef
		})
	});
});
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, loop = true, ...listProps } = props;
	const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		asChild: true,
		...rovingFocusGroupScope,
		orientation: context.orientation,
		dir: context.dir,
		loop,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			role: "tablist",
			"aria-orientation": context.orientation,
			...listProps,
			ref: forwardedRef
		})
	});
});
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
	const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: isSelected,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "tab",
			"aria-selected": isSelected,
			"aria-controls": contentId,
			"data-state": isSelected ? "active" : "inactive",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			id: triggerId,
			...triggerProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) context.onValueChange(value);
				else event.preventDefault();
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => {
				const isAutomaticActivation = context.activationMode !== "manual";
				if (!isSelected && !disabled && isAutomaticActivation) context.onValueChange(value);
			})
		})
	});
});
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
	const context = useTabsContext(CONTENT_NAME, __scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	const isMountAnimationPreventedRef = import_react.useRef(isSelected);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isSelected,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": isSelected ? "active" : "inactive",
			"data-orientation": context.orientation,
			role: "tabpanel",
			"aria-labelledby": triggerId,
			hidden: !present,
			id: contentId,
			tabIndex: 0,
			...contentProps,
			ref: forwardedRef,
			style: {
				...props.style,
				animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
			},
			children: present && children
		})
	});
});
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
//#endregion
//#region src/components/ui/tabs.tsx
function Tabs({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "tabs",
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		"data-slot": "tabs-list",
		className: cn("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-slot": "tabs-trigger",
		className: cn("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		"data-slot": "tabs-content",
		className: cn("flex-1 outline-none", className),
		...props
	});
}
//#endregion
//#region src/hooks/use-admin.ts
function useIsAdmin() {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: ["admin", "isAdmin"],
		queryFn: async () => {
			if (!actor) return false;
			return actor.isCallerAdmin();
		},
		enabled: !!actor && !isFetching
	});
}
//#endregion
//#region src/pages/AdminPage.tsx
var TAB_TRIGGER_CLASS = "min-h-11 flex-1 gap-2 rounded-full px-4 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground transition-smooth hover:text-foreground data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-neon sm:flex-none";
function AdminPage() {
	const { t } = useI18n();
	const admin = useIsAdmin();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: t("app.name"),
		title: t("admin.title"),
		subtitle: t("admin.subtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminGate, {
			isAdmin: admin.data === true,
			isLoading: admin.isLoading,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "beaches",
				"data-ocid": "admin.tabs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-ocid": "admin.tabs.list",
						className: "h-auto w-full justify-start gap-1.5 rounded-full border border-border/70 bg-card/70 p-1.5 backdrop-blur sm:w-fit",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "beaches",
								"data-ocid": "admin.tab.beaches",
								className: TAB_TRIGGER_CLASS,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, {
									className: "size-4",
									"aria-hidden": "true"
								}), t("admin.tab.beaches")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "reports",
								"data-ocid": "admin.tab.reports",
								className: TAB_TRIGGER_CLASS,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
									className: "size-4",
									"aria-hidden": "true"
								}), t("admin.tab.reports")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "warnings",
								"data-ocid": "admin.tab.warnings",
								className: TAB_TRIGGER_CLASS,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {
									className: "size-4",
									"aria-hidden": "true"
								}), t("admin.tab.warnings")]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "beaches",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeachManager, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "reports",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportReview, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "warnings",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningManager, {})
					})
				]
			})
		})
	})] });
}
//#endregion
export { AdminPage as default };
