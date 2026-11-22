import { f as useQueryClient, s as useActor, t as createLucideIcon, u as useQuery } from "./createLucideIcon-Cedqr6G7.js";
import { u as createActor, v as useMutation } from "./PageHeader-CGmbrCfX.js";
/**
* @license lucide-react v0.511.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Megaphone = createLucideIcon("megaphone", [["path", {
	d: "m3 11 18-5v12L3 14v-3z",
	key: "n962bs"
}], ["path", {
	d: "M11.6 16.8a3 3 0 1 1-5.8-1.6",
	key: "1yl0tm"
}]]);
//#endregion
//#region src/hooks/use-warnings.ts
var WARNINGS_KEY = ["warnings"];
function usePublishedWarnings() {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: [...WARNINGS_KEY, "published"],
		queryFn: async () => {
			if (!actor) return [];
			return actor.listPublishedWarnings();
		},
		enabled: !!actor && !isFetching
	});
}
function useAllWarnings() {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: [...WARNINGS_KEY, "all"],
		queryFn: async () => {
			if (!actor) return [];
			const result = await actor.listAllWarnings();
			return result.__kind__ === "ok" ? result.ok : [];
		},
		enabled: !!actor && !isFetching
	});
}
function useCreateWarning() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.createWarning(input.beachId, input.messageEn, input.messageFa, input.severity, input.published);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: WARNINGS_KEY });
		}
	});
}
function useSetWarningPublished() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.setWarningPublished(input.id, input.published);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: WARNINGS_KEY });
		}
	});
}
//#endregion
export { Megaphone as a, useSetWarningPublished as i, useCreateWarning as n, usePublishedWarnings as r, useAllWarnings as t };
