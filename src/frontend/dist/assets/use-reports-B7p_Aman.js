import { f as useQueryClient, s as useActor, u as useQuery } from "./createLucideIcon-Cedqr6G7.js";
import { u as createActor, v as useMutation } from "./PageHeader-CGmbrCfX.js";
//#region src/hooks/use-reports.ts
var REPORTS_KEY = ["reports"];
function useReports() {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: REPORTS_KEY,
		queryFn: async () => {
			if (!actor) return [];
			return actor.listReports();
		},
		enabled: !!actor && !isFetching
	});
}
function useReportsForBeach(beachId) {
	const { actor, isFetching } = useActor(createActor);
	return useQuery({
		queryKey: [
			"reports",
			"beach",
			beachId?.toString() ?? "none"
		],
		queryFn: async () => {
			if (!actor || beachId === null) return [];
			return actor.listReportsForBeach(beachId);
		},
		enabled: !!actor && !isFetching && beachId !== null
	});
}
function useSubmitReport() {
	const { actor } = useActor(createActor);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			if (!actor) throw new Error("Backend is not ready");
			return actor.submitReport(input.beachId, input.kind, input.note);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: REPORTS_KEY });
		}
	});
}
//#endregion
export { useSubmitReport as i, useReports as n, useReportsForBeach as r, REPORTS_KEY as t };
