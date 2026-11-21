import { type Report, type ReportKind, createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const REPORTS_KEY = ["reports"] as const;

export function useReports() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Report[]>({
    queryKey: REPORTS_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listReports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReportsForBeach(beachId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Report[]>({
    queryKey: ["reports", "beach", beachId?.toString() ?? "none"],
    queryFn: async () => {
      if (!actor || beachId === null) return [];
      return actor.listReportsForBeach(beachId);
    },
    enabled: !!actor && !isFetching && beachId !== null,
  });
}

export interface SubmitReportInput {
  beachId: bigint;
  kind: ReportKind;
  note: string;
}

export function useSubmitReport() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SubmitReportInput) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.submitReport(input.beachId, input.kind, input.note);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: REPORTS_KEY });
    },
  });
}
