import { B as Float64, G as Null, H as Int, I as Subscribable, J as Record, K as Opt, L as Actor, M as shallowEqualObjects, N as shouldThrowError, Q as Vec, R as HttpAgent, T as hashKey, U as Nat, V as Func, W as Nat8, X as Text, Y as Service, Z as Variant, f as useQueryClient, g as getDefaultState, k as noop, m as require_react, n as cn, p as require_jsx_runtime, q as Principal, r as clsx, s as useActor, t as createLucideIcon, tt as __toESM, u as useQuery, y as notifyManager, z as Bool } from "./createLucideIcon-Cedqr6G7.js";
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+query-core@5.95.2/node_modules/@tanstack/query-core/build/modern/mutationObserver.js
var MutationObserver = class extends Subscribable {
	#client;
	#currentResult = void 0;
	#currentMutation;
	#mutateOptions;
	constructor(client, options) {
		super();
		this.#client = client;
		this.setOptions(options);
		this.bindMethods();
		this.#updateResult();
	}
	bindMethods() {
		this.mutate = this.mutate.bind(this);
		this.reset = this.reset.bind(this);
	}
	setOptions(options) {
		const prevOptions = this.options;
		this.options = this.#client.defaultMutationOptions(options);
		if (!shallowEqualObjects(this.options, prevOptions)) this.#client.getMutationCache().notify({
			type: "observerOptionsUpdated",
			mutation: this.#currentMutation,
			observer: this
		});
		if (prevOptions?.mutationKey && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) this.reset();
		else if (this.#currentMutation?.state.status === "pending") this.#currentMutation.setOptions(this.options);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) this.#currentMutation?.removeObserver(this);
	}
	onMutationUpdate(action) {
		this.#updateResult();
		this.#notify(action);
	}
	getCurrentResult() {
		return this.#currentResult;
	}
	reset() {
		this.#currentMutation?.removeObserver(this);
		this.#currentMutation = void 0;
		this.#updateResult();
		this.#notify();
	}
	mutate(variables, options) {
		this.#mutateOptions = options;
		this.#currentMutation?.removeObserver(this);
		this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
		this.#currentMutation.addObserver(this);
		return this.#currentMutation.execute(variables);
	}
	#updateResult() {
		const state = this.#currentMutation?.state ?? getDefaultState();
		this.#currentResult = {
			...state,
			isPending: state.status === "pending",
			isSuccess: state.status === "success",
			isError: state.status === "error",
			isIdle: state.status === "idle",
			mutate: this.mutate,
			reset: this.reset
		};
	}
	#notify(action) {
		notifyManager.batch(() => {
			if (this.#mutateOptions && this.hasListeners()) {
				const variables = this.#currentResult.variables;
				const onMutateResult = this.#currentResult.context;
				const context = {
					client: this.#client,
					meta: this.options.meta,
					mutationKey: this.options.mutationKey
				};
				if (action?.type === "success") {
					try {
						this.#mutateOptions.onSuccess?.(action.data, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#mutateOptions.onSettled?.(action.data, null, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
				} else if (action?.type === "error") {
					try {
						this.#mutateOptions.onError?.(action.error, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#mutateOptions.onSettled?.(void 0, action.error, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
				}
			}
			this.listeners.forEach((listener) => {
				listener(this.#currentResult);
			});
		});
	}
};
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@tanstack+react-query@5.95.2_react@19.1.5/node_modules/@tanstack/react-query/build/modern/useMutation.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useMutation(options, queryClient) {
	const client = useQueryClient(queryClient);
	const [observer] = import_react.useState(() => new MutationObserver(client, options));
	import_react.useEffect(() => {
		observer.setOptions(options);
	}, [observer, options]);
	const result = import_react.useSyncExternalStore(import_react.useCallback((onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)), [observer]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
	const mutate = import_react.useCallback((variables, mutateOptions) => {
		observer.mutate(variables, mutateOptions).catch(noop);
	}, [observer]);
	if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) throw result.error;
	return {
		...result,
		mutate,
		mutateAsync: result.mutate
	};
}
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleAlert = createLucideIcon("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MapPin = createLucideIcon("map-pin", [["path", {
	d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	key: "1r0f0z"
}], ["circle", {
	cx: "12",
	cy: "10",
	r: "3",
	key: "ilqhr7"
}]]);
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.2_@types+react@19.1.17_react@19.1.5/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef(refs[i], null);
			}
		};
	};
}
function useComposedRefs(...refs) {
	return import_react.useCallback(composeRefs(...refs), refs);
}
//#endregion
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/@radix-ui+react-slot@1.2.4_@types+react@19.1.17_react@19.1.5/node_modules/@radix-ui/react-slot/dist/index.mjs
var import_jsx_runtime = require_jsx_runtime();
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = import_react[" use ".trim().toString()];
function isPromiseLike(value) {
	return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
	return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
	const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
	const Slot2 = import_react.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props;
		if (isLazyComponent(children) && typeof use === "function") children = use(children._payload);
		const childrenArray = import_react.Children.toArray(children);
		const slottable = childrenArray.find(isSlottable);
		if (slottable) {
			const newElement = slottable.props.children;
			const newChildren = childrenArray.map((child) => {
				if (child === slottable) {
					if (import_react.Children.count(newElement) > 1) return import_react.Children.only(null);
					return import_react.isValidElement(newElement) ? newElement.props.children : null;
				} else return child;
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
				...slotProps,
				ref: forwardedRef,
				children: import_react.isValidElement(newElement) ? import_react.cloneElement(newElement, void 0, newChildren) : null
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotClone, {
			...slotProps,
			ref: forwardedRef,
			children
		});
	});
	Slot2.displayName = `${ownerName}.Slot`;
	return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
	const SlotClone = import_react.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props;
		if (isLazyComponent(children) && typeof use === "function") children = use(children._payload);
		if (import_react.isValidElement(children)) {
			const childrenRef = getElementRef(children);
			const props2 = mergeProps(slotProps, children.props);
			if (children.type !== import_react.Fragment) props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
			return import_react.cloneElement(children, props2);
		}
		return import_react.Children.count(children) > 1 ? import_react.Children.only(null) : null;
	});
	SlotClone.displayName = `${ownerName}.SlotClone`;
	return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
	return import_react.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
	const overrideProps = { ...childProps };
	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];
		if (/^on[A-Z]/.test(propName)) {
			if (slotPropValue && childPropValue) overrideProps[propName] = (...args) => {
				const result = childPropValue(...args);
				slotPropValue(...args);
				return result;
			};
			else if (slotPropValue) overrideProps[propName] = slotPropValue;
		} else if (propName === "style") overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		};
		else if (propName === "className") overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
	}
	return {
		...slotProps,
		...overrideProps
	};
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
//#region ../../../../../../opt/pnpm-templates/build_template/node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
/**
* Copyright 2022 Joe Bell. All rights reserved.
*
* This file is licensed to you under the Apache License, Version 2.0
* (the "License"); you may not use this file except in compliance with the
* License. You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations under
* the License.
*/ var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
	var _config_compoundVariants;
	if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
	const { variants, defaultVariants } = config;
	const getVariantClassNames = Object.keys(variants).map((variant) => {
		const variantProp = props === null || props === void 0 ? void 0 : props[variant];
		const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
		if (variantProp === null) return null;
		const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
		return variants[variant][variantKey];
	});
	const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
		let [key, value] = param;
		if (value === void 0) return acc;
		acc[key] = value;
		return acc;
	}, {});
	return cx(base, getVariantClassNames, config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
		let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
		return Object.entries(compoundVariantOptions).every((param) => {
			let [key, value] = param;
			return Array.isArray(value) ? value.includes({
				...defaultVariants,
				...propsWithoutUndefined
			}[key]) : {
				...defaultVariants,
				...propsWithoutUndefined
			}[key] === value;
		}) ? [
			...acc,
			cvClass,
			cvClassName
		] : acc;
	}, []), props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
			outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			icon: "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region src/declarations/backend.did.js
var Error__1 = Variant({
	"FrontendOriginsNotConfigured": Null,
	"MixedSsoSources": Record({
		"otherKeys": Vec(Text),
		"ssoKeys": Vec(Text)
	}),
	"Stale": Record({ "ageNs": Nat }),
	"MalformedCandid": Null,
	"AmbiguousAttribute": Record({
		"field": Text,
		"sources": Vec(Text)
	}),
	"NoAttributes": Null,
	"UnknownNonce": Null,
	"UntrustedSsoSource": Record({ "domain": Text }),
	"MissingField": Text,
	"FrontendOriginMismatch": Record({
		"got": Text,
		"expected": Vec(Text)
	})
});
var Result__2 = Variant({
	"ok": Null,
	"err": Error__1
});
var BeachId = Nat;
var Beach = Record({
	"id": BeachId,
	"latitude": Float64,
	"active": Bool,
	"nameEn": Text,
	"nameFa": Text,
	"descriptionEn": Text,
	"descriptionFa": Text,
	"longitude": Float64
});
var Error$1 = Variant({
	"notAuthorized": Null,
	"invalidInput": Text,
	"notFound": Null
});
var Result = Variant({
	"ok": Beach,
	"err": Error$1
});
var UserRole = Variant({
	"admin": Null,
	"user": Null,
	"guest": Null
});
var WarningSeverity$1 = Variant({
	"warning": Null,
	"danger": Null,
	"info": Null,
	"advisory": Null
});
var WarningId = Nat;
var Timestamp = Int;
var Warning = Record({
	"id": WarningId,
	"messageEn": Text,
	"messageFa": Text,
	"published": Bool,
	"beachId": Opt(BeachId),
	"severity": WarningSeverity$1,
	"issuedAt": Timestamp
});
var Result_2 = Variant({
	"ok": Warning,
	"err": Error$1
});
var Value = Variant({
	"int": Int,
	"nat": Nat,
	"float": Float64,
	"bool": Bool,
	"null": Null,
	"text": Text
});
var Cell = Record({
	"value": Value,
	"name": Text
});
var Result__1 = Record({
	"hasMore": Bool,
	"rows": Vec(Vec(Cell))
});
var Result_3 = Variant({
	"ok": Vec(Warning),
	"err": Error$1
});
var ReportId = Nat;
var ReviewStatus$1 = Variant({
	"verified": Null,
	"unverified": Null,
	"dismissed": Null
});
var ReportKind$1 = Variant({
	"strongCurrents": Null,
	"waterClarity": Null,
	"unusualWaves": Null,
	"jellyfish": Null,
	"calmWater": Null,
	"otherHazard": Null,
	"roughWater": Null
});
var Report = Record({
	"id": ReportId,
	"status": ReviewStatus$1,
	"kind": ReportKind$1,
	"note": Text,
	"submittedAt": Timestamp,
	"beachId": BeachId,
	"reviewedAt": Opt(Timestamp)
});
var Result_1 = Variant({
	"ok": Report,
	"err": Error$1
});
Service({
	"_initialize_access_control": Func([], [], []),
	"_internet_identity_sign_in_finish": Func([], [Result__2], []),
	"_internet_identity_sign_in_start": Func([], [Vec(Nat8)], []),
	"addBeach": Func([
		Text,
		Text,
		Float64,
		Float64,
		Text,
		Text
	], [Result], []),
	"assignCallerUserRole": Func([Principal, UserRole], [], []),
	"createWarning": Func([
		Opt(Nat),
		Text,
		Text,
		WarningSeverity$1,
		Bool
	], [Result_2], []),
	"ensureBeachesSeeded": Func([], [], []),
	"execute": Func([Text], [Result__1], ["query"]),
	"getApiDoc": Func([], [Text], ["query"]),
	"getBeach": Func([BeachId], [Opt(Beach)], ["query"]),
	"getCallerUserRole": Func([], [UserRole], ["query"]),
	"isCallerAdmin": Func([], [Bool], ["query"]),
	"listAllWarnings": Func([], [Result_3], ["query"]),
	"listBeaches": Func([], [Vec(Beach)], ["query"]),
	"listPublishedWarnings": Func([], [Vec(Warning)], ["query"]),
	"listReports": Func([], [Vec(Report)], ["query"]),
	"listReportsForBeach": Func([Nat], [Vec(Report)], ["query"]),
	"reviewReport": Func([ReportId, ReviewStatus$1], [Result_1], []),
	"schema": Func([], [Text], ["query"]),
	"setWarningPublished": Func([WarningId, Bool], [Result_2], []),
	"submitReport": Func([
		Nat,
		ReportKind$1,
		Text
	], [Result_1], []),
	"updateBeach": Func([
		BeachId,
		Text,
		Text,
		Float64,
		Float64,
		Text,
		Text,
		Bool
	], [Result], [])
});
var idlFactory = ({ IDL }) => {
	const Error__1 = IDL.Variant({
		"FrontendOriginsNotConfigured": IDL.Null,
		"MixedSsoSources": IDL.Record({
			"otherKeys": IDL.Vec(IDL.Text),
			"ssoKeys": IDL.Vec(IDL.Text)
		}),
		"Stale": IDL.Record({ "ageNs": IDL.Nat }),
		"MalformedCandid": IDL.Null,
		"AmbiguousAttribute": IDL.Record({
			"field": IDL.Text,
			"sources": IDL.Vec(IDL.Text)
		}),
		"NoAttributes": IDL.Null,
		"UnknownNonce": IDL.Null,
		"UntrustedSsoSource": IDL.Record({ "domain": IDL.Text }),
		"MissingField": IDL.Text,
		"FrontendOriginMismatch": IDL.Record({
			"got": IDL.Text,
			"expected": IDL.Vec(IDL.Text)
		})
	});
	const Result__2 = IDL.Variant({
		"ok": IDL.Null,
		"err": Error__1
	});
	const BeachId = IDL.Nat;
	const Beach = IDL.Record({
		"id": BeachId,
		"latitude": IDL.Float64,
		"active": IDL.Bool,
		"nameEn": IDL.Text,
		"nameFa": IDL.Text,
		"descriptionEn": IDL.Text,
		"descriptionFa": IDL.Text,
		"longitude": IDL.Float64
	});
	const Error = IDL.Variant({
		"notAuthorized": IDL.Null,
		"invalidInput": IDL.Text,
		"notFound": IDL.Null
	});
	const Result = IDL.Variant({
		"ok": Beach,
		"err": Error
	});
	const UserRole = IDL.Variant({
		"admin": IDL.Null,
		"user": IDL.Null,
		"guest": IDL.Null
	});
	const WarningSeverity = IDL.Variant({
		"warning": IDL.Null,
		"danger": IDL.Null,
		"info": IDL.Null,
		"advisory": IDL.Null
	});
	const WarningId = IDL.Nat;
	const Timestamp = IDL.Int;
	const Warning = IDL.Record({
		"id": WarningId,
		"messageEn": IDL.Text,
		"messageFa": IDL.Text,
		"published": IDL.Bool,
		"beachId": IDL.Opt(BeachId),
		"severity": WarningSeverity,
		"issuedAt": Timestamp
	});
	const Result_2 = IDL.Variant({
		"ok": Warning,
		"err": Error
	});
	const Value = IDL.Variant({
		"int": IDL.Int,
		"nat": IDL.Nat,
		"float": IDL.Float64,
		"bool": IDL.Bool,
		"null": IDL.Null,
		"text": IDL.Text
	});
	const Cell = IDL.Record({
		"value": Value,
		"name": IDL.Text
	});
	const Result__1 = IDL.Record({
		"hasMore": IDL.Bool,
		"rows": IDL.Vec(IDL.Vec(Cell))
	});
	const Result_3 = IDL.Variant({
		"ok": IDL.Vec(Warning),
		"err": Error
	});
	const ReportId = IDL.Nat;
	const ReviewStatus = IDL.Variant({
		"verified": IDL.Null,
		"unverified": IDL.Null,
		"dismissed": IDL.Null
	});
	const ReportKind = IDL.Variant({
		"strongCurrents": IDL.Null,
		"waterClarity": IDL.Null,
		"unusualWaves": IDL.Null,
		"jellyfish": IDL.Null,
		"calmWater": IDL.Null,
		"otherHazard": IDL.Null,
		"roughWater": IDL.Null
	});
	const Report = IDL.Record({
		"id": ReportId,
		"status": ReviewStatus,
		"kind": ReportKind,
		"note": IDL.Text,
		"submittedAt": Timestamp,
		"beachId": BeachId,
		"reviewedAt": IDL.Opt(Timestamp)
	});
	const Result_1 = IDL.Variant({
		"ok": Report,
		"err": Error
	});
	return IDL.Service({
		"_initialize_access_control": IDL.Func([], [], []),
		"_internet_identity_sign_in_finish": IDL.Func([], [Result__2], []),
		"_internet_identity_sign_in_start": IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
		"addBeach": IDL.Func([
			IDL.Text,
			IDL.Text,
			IDL.Float64,
			IDL.Float64,
			IDL.Text,
			IDL.Text
		], [Result], []),
		"assignCallerUserRole": IDL.Func([IDL.Principal, UserRole], [], []),
		"createWarning": IDL.Func([
			IDL.Opt(IDL.Nat),
			IDL.Text,
			IDL.Text,
			WarningSeverity,
			IDL.Bool
		], [Result_2], []),
		"ensureBeachesSeeded": IDL.Func([], [], []),
		"execute": IDL.Func([IDL.Text], [Result__1], ["query"]),
		"getApiDoc": IDL.Func([], [IDL.Text], ["query"]),
		"getBeach": IDL.Func([BeachId], [IDL.Opt(Beach)], ["query"]),
		"getCallerUserRole": IDL.Func([], [UserRole], ["query"]),
		"isCallerAdmin": IDL.Func([], [IDL.Bool], ["query"]),
		"listAllWarnings": IDL.Func([], [Result_3], ["query"]),
		"listBeaches": IDL.Func([], [IDL.Vec(Beach)], ["query"]),
		"listPublishedWarnings": IDL.Func([], [IDL.Vec(Warning)], ["query"]),
		"listReports": IDL.Func([], [IDL.Vec(Report)], ["query"]),
		"listReportsForBeach": IDL.Func([IDL.Nat], [IDL.Vec(Report)], ["query"]),
		"reviewReport": IDL.Func([ReportId, ReviewStatus], [Result_1], []),
		"schema": IDL.Func([], [IDL.Text], ["query"]),
		"setWarningPublished": IDL.Func([WarningId, IDL.Bool], [Result_2], []),
		"submitReport": IDL.Func([
			IDL.Nat,
			ReportKind,
			IDL.Text
		], [Result_1], []),
		"updateBeach": IDL.Func([
			BeachId,
			IDL.Text,
			IDL.Text,
			IDL.Float64,
			IDL.Float64,
			IDL.Text,
			IDL.Text,
			IDL.Bool
		], [Result], [])
	});
};
//#endregion
//#region src/backend.ts
function candid_some(value) {
	return [value];
}
function candid_none() {
	return [];
}
function record_opt_to_undefined(arg) {
	return arg == null ? void 0 : arg;
}
var ReportKind = /* @__PURE__ */ function(ReportKind) {
	ReportKind["strongCurrents"] = "strongCurrents";
	ReportKind["waterClarity"] = "waterClarity";
	ReportKind["unusualWaves"] = "unusualWaves";
	ReportKind["jellyfish"] = "jellyfish";
	ReportKind["calmWater"] = "calmWater";
	ReportKind["otherHazard"] = "otherHazard";
	ReportKind["roughWater"] = "roughWater";
	return ReportKind;
}({});
var ReviewStatus = /* @__PURE__ */ function(ReviewStatus) {
	ReviewStatus["verified"] = "verified";
	ReviewStatus["unverified"] = "unverified";
	ReviewStatus["dismissed"] = "dismissed";
	return ReviewStatus;
}({});
var WarningSeverity = /* @__PURE__ */ function(WarningSeverity) {
	WarningSeverity["warning"] = "warning";
	WarningSeverity["danger"] = "danger";
	WarningSeverity["info"] = "info";
	WarningSeverity["advisory"] = "advisory";
	return WarningSeverity;
}({});
var Backend = class {
	actor;
	_uploadFile;
	_downloadFile;
	processError;
	constructor(actor, _uploadFile, _downloadFile, processError) {
		this.actor = actor;
		this._uploadFile = _uploadFile;
		this._downloadFile = _downloadFile;
		this.processError = processError;
	}
	async _initialize_access_control() {
		if (this.processError) try {
			return await this.actor._initialize_access_control();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor._initialize_access_control();
	}
	async _internet_identity_sign_in_finish() {
		if (this.processError) try {
			const result = await this.actor._internet_identity_sign_in_finish();
			return from_candid_Result__2_n1(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor._internet_identity_sign_in_finish();
			return from_candid_Result__2_n1(this._uploadFile, this._downloadFile, result);
		}
	}
	async _internet_identity_sign_in_start() {
		if (this.processError) try {
			return await this.actor._internet_identity_sign_in_start();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor._internet_identity_sign_in_start();
	}
	async addBeach(arg0, arg1, arg2, arg3, arg4, arg5) {
		if (this.processError) try {
			const result = await this.actor.addBeach(arg0, arg1, arg2, arg3, arg4, arg5);
			return from_candid_Result_n5(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.addBeach(arg0, arg1, arg2, arg3, arg4, arg5);
			return from_candid_Result_n5(this._uploadFile, this._downloadFile, result);
		}
	}
	async assignCallerUserRole(arg0, arg1) {
		if (this.processError) try {
			return await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n9(this._uploadFile, this._downloadFile, arg1));
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n9(this._uploadFile, this._downloadFile, arg1));
	}
	async createWarning(arg0, arg1, arg2, arg3, arg4) {
		if (this.processError) try {
			const result = await this.actor.createWarning(to_candid_opt_n10(this._uploadFile, this._downloadFile, arg0), arg1, arg2, to_candid_WarningSeverity_n11(this._uploadFile, this._downloadFile, arg3), arg4);
			return from_candid_Result_2_n12(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.createWarning(to_candid_opt_n10(this._uploadFile, this._downloadFile, arg0), arg1, arg2, to_candid_WarningSeverity_n11(this._uploadFile, this._downloadFile, arg3), arg4);
			return from_candid_Result_2_n12(this._uploadFile, this._downloadFile, result);
		}
	}
	async ensureBeachesSeeded() {
		if (this.processError) try {
			return await this.actor.ensureBeachesSeeded();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.ensureBeachesSeeded();
	}
	async execute(arg0) {
		if (this.processError) try {
			const result = await this.actor.execute(arg0);
			return from_candid_Result__1_n18(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.execute(arg0);
			return from_candid_Result__1_n18(this._uploadFile, this._downloadFile, result);
		}
	}
	async getApiDoc() {
		if (this.processError) try {
			return await this.actor.getApiDoc();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.getApiDoc();
	}
	async getBeach(arg0) {
		if (this.processError) try {
			const result = await this.actor.getBeach(arg0);
			return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.getBeach(arg0);
			return from_candid_opt_n26(this._uploadFile, this._downloadFile, result);
		}
	}
	async getCallerUserRole() {
		if (this.processError) try {
			const result = await this.actor.getCallerUserRole();
			return from_candid_UserRole_n27(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.getCallerUserRole();
			return from_candid_UserRole_n27(this._uploadFile, this._downloadFile, result);
		}
	}
	async isCallerAdmin() {
		if (this.processError) try {
			return await this.actor.isCallerAdmin();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.isCallerAdmin();
	}
	async listAllWarnings() {
		if (this.processError) try {
			const result = await this.actor.listAllWarnings();
			return from_candid_Result_3_n28(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listAllWarnings();
			return from_candid_Result_3_n28(this._uploadFile, this._downloadFile, result);
		}
	}
	async listBeaches() {
		if (this.processError) try {
			return await this.actor.listBeaches();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.listBeaches();
	}
	async listPublishedWarnings() {
		if (this.processError) try {
			const result = await this.actor.listPublishedWarnings();
			return from_candid_vec_n30(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listPublishedWarnings();
			return from_candid_vec_n30(this._uploadFile, this._downloadFile, result);
		}
	}
	async listReports() {
		if (this.processError) try {
			const result = await this.actor.listReports();
			return from_candid_vec_n31(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listReports();
			return from_candid_vec_n31(this._uploadFile, this._downloadFile, result);
		}
	}
	async listReportsForBeach(arg0) {
		if (this.processError) try {
			const result = await this.actor.listReportsForBeach(arg0);
			return from_candid_vec_n31(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.listReportsForBeach(arg0);
			return from_candid_vec_n31(this._uploadFile, this._downloadFile, result);
		}
	}
	async reviewReport(arg0, arg1) {
		if (this.processError) try {
			const result = await this.actor.reviewReport(arg0, to_candid_ReviewStatus_n37(this._uploadFile, this._downloadFile, arg1));
			return from_candid_Result_1_n38(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.reviewReport(arg0, to_candid_ReviewStatus_n37(this._uploadFile, this._downloadFile, arg1));
			return from_candid_Result_1_n38(this._uploadFile, this._downloadFile, result);
		}
	}
	async schema() {
		if (this.processError) try {
			return await this.actor.schema();
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else return await this.actor.schema();
	}
	async setWarningPublished(arg0, arg1) {
		if (this.processError) try {
			const result = await this.actor.setWarningPublished(arg0, arg1);
			return from_candid_Result_2_n12(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.setWarningPublished(arg0, arg1);
			return from_candid_Result_2_n12(this._uploadFile, this._downloadFile, result);
		}
	}
	async submitReport(arg0, arg1, arg2) {
		if (this.processError) try {
			const result = await this.actor.submitReport(arg0, to_candid_ReportKind_n40(this._uploadFile, this._downloadFile, arg1), arg2);
			return from_candid_Result_1_n38(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.submitReport(arg0, to_candid_ReportKind_n40(this._uploadFile, this._downloadFile, arg1), arg2);
			return from_candid_Result_1_n38(this._uploadFile, this._downloadFile, result);
		}
	}
	async updateBeach(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
		if (this.processError) try {
			const result = await this.actor.updateBeach(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
			return from_candid_Result_n5(this._uploadFile, this._downloadFile, result);
		} catch (e) {
			this.processError(e);
			throw new Error("unreachable");
		}
		else {
			const result = await this.actor.updateBeach(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
			return from_candid_Result_n5(this._uploadFile, this._downloadFile, result);
		}
	}
};
function from_candid_Cell_n22(_uploadFile, _downloadFile, value) {
	return from_candid_record_n23(_uploadFile, _downloadFile, value);
}
function from_candid_Error__1_n3(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n4(_uploadFile, _downloadFile, value);
}
function from_candid_Error_n7(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n8(_uploadFile, _downloadFile, value);
}
function from_candid_ReportKind_n35(_uploadFile, _downloadFile, value) {
	return "strongCurrents" in value ? "strongCurrents" : "waterClarity" in value ? "waterClarity" : "unusualWaves" in value ? "unusualWaves" : "jellyfish" in value ? "jellyfish" : "calmWater" in value ? "calmWater" : "otherHazard" in value ? "otherHazard" : "roughWater" in value ? "roughWater" : value;
}
function from_candid_Report_n32(_uploadFile, _downloadFile, value) {
	return from_candid_record_n33(_uploadFile, _downloadFile, value);
}
function from_candid_Result_1_n38(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n39(_uploadFile, _downloadFile, value);
}
function from_candid_Result_2_n12(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n13(_uploadFile, _downloadFile, value);
}
function from_candid_Result_3_n28(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n29(_uploadFile, _downloadFile, value);
}
function from_candid_Result__1_n18(_uploadFile, _downloadFile, value) {
	return from_candid_record_n19(_uploadFile, _downloadFile, value);
}
function from_candid_Result__2_n1(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n2(_uploadFile, _downloadFile, value);
}
function from_candid_Result_n5(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n6(_uploadFile, _downloadFile, value);
}
function from_candid_ReviewStatus_n34(_uploadFile, _downloadFile, value) {
	return "verified" in value ? "verified" : "unverified" in value ? "unverified" : "dismissed" in value ? "dismissed" : value;
}
function from_candid_UserRole_n27(_uploadFile, _downloadFile, value) {
	return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
function from_candid_Value_n24(_uploadFile, _downloadFile, value) {
	return from_candid_variant_n25(_uploadFile, _downloadFile, value);
}
function from_candid_WarningSeverity_n17(_uploadFile, _downloadFile, value) {
	return "warning" in value ? "warning" : "danger" in value ? "danger" : "info" in value ? "info" : "advisory" in value ? "advisory" : value;
}
function from_candid_Warning_n14(_uploadFile, _downloadFile, value) {
	return from_candid_record_n15(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n16(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : value[0];
}
function from_candid_opt_n26(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : value[0];
}
function from_candid_opt_n36(_uploadFile, _downloadFile, value) {
	return value.length === 0 ? null : value[0];
}
function from_candid_record_n15(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		messageEn: value.messageEn,
		messageFa: value.messageFa,
		published: value.published,
		beachId: record_opt_to_undefined(from_candid_opt_n16(_uploadFile, _downloadFile, value.beachId)),
		severity: from_candid_WarningSeverity_n17(_uploadFile, _downloadFile, value.severity),
		issuedAt: value.issuedAt
	};
}
function from_candid_record_n19(_uploadFile, _downloadFile, value) {
	return {
		hasMore: value.hasMore,
		rows: from_candid_vec_n20(_uploadFile, _downloadFile, value.rows)
	};
}
function from_candid_record_n23(_uploadFile, _downloadFile, value) {
	return {
		value: from_candid_Value_n24(_uploadFile, _downloadFile, value.value),
		name: value.name
	};
}
function from_candid_record_n33(_uploadFile, _downloadFile, value) {
	return {
		id: value.id,
		status: from_candid_ReviewStatus_n34(_uploadFile, _downloadFile, value.status),
		kind: from_candid_ReportKind_n35(_uploadFile, _downloadFile, value.kind),
		note: value.note,
		submittedAt: value.submittedAt,
		beachId: value.beachId,
		reviewedAt: record_opt_to_undefined(from_candid_opt_n36(_uploadFile, _downloadFile, value.reviewedAt))
	};
}
function from_candid_variant_n13(_uploadFile, _downloadFile, value) {
	return "ok" in value ? {
		__kind__: "ok",
		ok: from_candid_Warning_n14(_uploadFile, _downloadFile, value.ok)
	} : "err" in value ? {
		__kind__: "err",
		err: from_candid_Error_n7(_uploadFile, _downloadFile, value.err)
	} : value;
}
function from_candid_variant_n2(_uploadFile, _downloadFile, value) {
	return "ok" in value ? {
		__kind__: "ok",
		ok: value.ok
	} : "err" in value ? {
		__kind__: "err",
		err: from_candid_Error__1_n3(_uploadFile, _downloadFile, value.err)
	} : value;
}
function from_candid_variant_n25(_uploadFile, _downloadFile, value) {
	return "int" in value ? {
		__kind__: "int",
		int: value.int
	} : "nat" in value ? {
		__kind__: "nat",
		nat: value.nat
	} : "float" in value ? {
		__kind__: "float",
		float: value.float
	} : "bool" in value ? {
		__kind__: "bool",
		bool: value.bool
	} : "null" in value ? {
		__kind__: "null",
		null: value.null
	} : "text" in value ? {
		__kind__: "text",
		text: value.text
	} : value;
}
function from_candid_variant_n29(_uploadFile, _downloadFile, value) {
	return "ok" in value ? {
		__kind__: "ok",
		ok: from_candid_vec_n30(_uploadFile, _downloadFile, value.ok)
	} : "err" in value ? {
		__kind__: "err",
		err: from_candid_Error_n7(_uploadFile, _downloadFile, value.err)
	} : value;
}
function from_candid_variant_n39(_uploadFile, _downloadFile, value) {
	return "ok" in value ? {
		__kind__: "ok",
		ok: from_candid_Report_n32(_uploadFile, _downloadFile, value.ok)
	} : "err" in value ? {
		__kind__: "err",
		err: from_candid_Error_n7(_uploadFile, _downloadFile, value.err)
	} : value;
}
function from_candid_variant_n4(_uploadFile, _downloadFile, value) {
	return "FrontendOriginsNotConfigured" in value ? {
		__kind__: "FrontendOriginsNotConfigured",
		FrontendOriginsNotConfigured: value.FrontendOriginsNotConfigured
	} : "MixedSsoSources" in value ? {
		__kind__: "MixedSsoSources",
		MixedSsoSources: value.MixedSsoSources
	} : "Stale" in value ? {
		__kind__: "Stale",
		Stale: value.Stale
	} : "MalformedCandid" in value ? {
		__kind__: "MalformedCandid",
		MalformedCandid: value.MalformedCandid
	} : "AmbiguousAttribute" in value ? {
		__kind__: "AmbiguousAttribute",
		AmbiguousAttribute: value.AmbiguousAttribute
	} : "NoAttributes" in value ? {
		__kind__: "NoAttributes",
		NoAttributes: value.NoAttributes
	} : "UnknownNonce" in value ? {
		__kind__: "UnknownNonce",
		UnknownNonce: value.UnknownNonce
	} : "UntrustedSsoSource" in value ? {
		__kind__: "UntrustedSsoSource",
		UntrustedSsoSource: value.UntrustedSsoSource
	} : "MissingField" in value ? {
		__kind__: "MissingField",
		MissingField: value.MissingField
	} : "FrontendOriginMismatch" in value ? {
		__kind__: "FrontendOriginMismatch",
		FrontendOriginMismatch: value.FrontendOriginMismatch
	} : value;
}
function from_candid_variant_n6(_uploadFile, _downloadFile, value) {
	return "ok" in value ? {
		__kind__: "ok",
		ok: value.ok
	} : "err" in value ? {
		__kind__: "err",
		err: from_candid_Error_n7(_uploadFile, _downloadFile, value.err)
	} : value;
}
function from_candid_variant_n8(_uploadFile, _downloadFile, value) {
	return "notAuthorized" in value ? {
		__kind__: "notAuthorized",
		notAuthorized: value.notAuthorized
	} : "invalidInput" in value ? {
		__kind__: "invalidInput",
		invalidInput: value.invalidInput
	} : "notFound" in value ? {
		__kind__: "notFound",
		notFound: value.notFound
	} : value;
}
function from_candid_vec_n20(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_vec_n21(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n21(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_Cell_n22(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n30(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_Warning_n14(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n31(_uploadFile, _downloadFile, value) {
	return value.map((x) => from_candid_Report_n32(_uploadFile, _downloadFile, x));
}
function to_candid_ReportKind_n40(_uploadFile, _downloadFile, value) {
	return value == "strongCurrents" ? { strongCurrents: null } : value == "waterClarity" ? { waterClarity: null } : value == "unusualWaves" ? { unusualWaves: null } : value == "jellyfish" ? { jellyfish: null } : value == "calmWater" ? { calmWater: null } : value == "otherHazard" ? { otherHazard: null } : value == "roughWater" ? { roughWater: null } : value;
}
function to_candid_ReviewStatus_n37(_uploadFile, _downloadFile, value) {
	return value == "verified" ? { verified: null } : value == "unverified" ? { unverified: null } : value == "dismissed" ? { dismissed: null } : value;
}
function to_candid_UserRole_n9(_uploadFile, _downloadFile, value) {
	return value == "admin" ? { admin: null } : value == "user" ? { user: null } : value == "guest" ? { guest: null } : value;
}
function to_candid_WarningSeverity_n11(_uploadFile, _downloadFile, value) {
	return value == "warning" ? { warning: null } : value == "danger" ? { danger: null } : value == "info" ? { info: null } : value == "advisory" ? { advisory: null } : value;
}
function to_candid_opt_n10(_uploadFile, _downloadFile, value) {
	return value === null ? candid_none() : candid_some(value);
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
	const agent = options.agent || HttpAgent.createSync({ ...options.agentOptions });
	if (options.agent && options.agentOptions) console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
	return new Backend(Actor.createActor(idlFactory, {
		agent,
		canisterId,
		...options.actorOptions
	}), _uploadFile, _downloadFile, options.processError);
}
//#endregion
//#region src/hooks/use-beaches.ts
var BEACHES_KEY = ["beaches"];
/**
* Monitored beaches from the backend canister.
*
* The actor is created asynchronously from the deployed canister id, so the
* query stays disabled until it exists and then runs on its own — no manual
* refetch is needed once the actor becomes ready. A missing actor throws
* instead of resolving to `[]`, so an unreachable backend surfaces as an
* error state rather than a misleading empty beach list.
*/
function useBeaches() {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: BEACHES_KEY,
		queryFn: async () => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.listBeaches();
		},
		enabled: !!actor && !isFetching,
		staleTime: 6e4,
		retry: 2
	});
}
function useBeach(id) {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: ["beach", id?.toString() ?? "none"],
		queryFn: async () => {
			if (!actor) throw new Error("Backend is not ready");
			if (id === null) return null;
			return actor.getBeach(id);
		},
		enabled: !!actor && !isFetching && id !== null,
		retry: 2
	});
}
function useAddBeach() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.addBeach(input.nameEn, input.nameFa, input.latitude, input.longitude, input.descriptionEn, input.descriptionFa);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: BEACHES_KEY });
		}
	});
}
function useUpdateBeach() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.updateBeach(input.id, input.nameEn, input.nameFa, input.latitude, input.longitude, input.descriptionEn, input.descriptionFa, input.active);
		},
		onSuccess: (_data, input) => {
			queryClient.invalidateQueries({ queryKey: BEACHES_KEY });
			queryClient.invalidateQueries({ queryKey: ["beach", input.id.toString()] });
		}
	});
}
//#endregion
//#region src/components/layout/PageHeader.tsx
/** Shared page header: eyebrow, title, subtitle and optional trailing slot. */
function PageHeader({ eyebrow, title, subtitle, actions, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("relative flex flex-col gap-3 pb-5 md:flex-row md:items-end md:justify-between", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps text-primary",
						children: eyebrow
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl",
						children: title
					}),
					subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground",
						children: subtitle
					}) : null
				]
			}),
			actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 flex-wrap items-center gap-2",
				children: actions
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "absolute inset-x-0 bottom-0 h-px bg-gradient-primary opacity-80"
			})
		]
	});
}
/** Standard page container with the shared vertical rhythm. */
function PageShell({ children, className, "data-ocid": dataOcid }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ocid": dataOcid,
		className: cn("mx-auto w-full max-w-6xl px-4 py-6 md:py-10", className),
		children
	});
}
//#endregion
export { CircleAlert as _, useBeaches as a, ReviewStatus as c, Button as d, createSlot as f, CircleCheck as g, MapPin as h, useBeach as i, WarningSeverity as l, useComposedRefs as m, PageShell as n, useUpdateBeach as o, composeRefs as p, useAddBeach as r, ReportKind as s, PageHeader as t, createActor as u, useMutation as v };
