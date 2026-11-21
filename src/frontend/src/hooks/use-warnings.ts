import { type Warning, type WarningSeverity, createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const WARNINGS_KEY = ["warnings"] as const;

export function usePublishedWarnings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Warning[]>({
    queryKey: [...WARNINGS_KEY, "published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPublishedWarnings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllWarnings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Warning[]>({
    queryKey: [...WARNINGS_KEY, "all"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.listAllWarnings();
      return result.__kind__ === "ok" ? result.ok : [];
    },
    enabled: !!actor && !isFetching,
  });
}

export interface CreateWarningInput {
  beachId: bigint | null;
  messageEn: string;
  messageFa: string;
  severity: WarningSeverity;
  published: boolean;
}

export function useCreateWarning() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateWarningInput) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.createWarning(
        input.beachId,
        input.messageEn,
        input.messageFa,
        input.severity,
        input.published,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WARNINGS_KEY });
    },
  });
}

export function useSetWarningPublished() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id: bigint; published: boolean }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.setWarningPublished(input.id, input.published);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WARNINGS_KEY });
    },
  });
}
