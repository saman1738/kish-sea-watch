import { createActor } from "@/backend";
import type { Beach } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const BEACHES_KEY = ["beaches"] as const;

export function useBeaches() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Beach[]>({
    queryKey: BEACHES_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBeaches();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBeach(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Beach | null>({
    queryKey: ["beach", id?.toString() ?? "none"],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getBeach(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export interface BeachInput {
  nameEn: string;
  nameFa: string;
  latitude: number;
  longitude: number;
  descriptionEn: string;
  descriptionFa: string;
}

export function useAddBeach() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: BeachInput) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.addBeach(
        input.nameEn,
        input.nameFa,
        input.latitude,
        input.longitude,
        input.descriptionEn,
        input.descriptionFa,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: BEACHES_KEY });
    },
  });
}

export function useUpdateBeach() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: BeachInput & { id: bigint; active: boolean }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.updateBeach(
        input.id,
        input.nameEn,
        input.nameFa,
        input.latitude,
        input.longitude,
        input.descriptionEn,
        input.descriptionFa,
        input.active,
      );
    },
    onSuccess: (_data, input) => {
      void queryClient.invalidateQueries({ queryKey: BEACHES_KEY });
      void queryClient.invalidateQueries({
        queryKey: ["beach", input.id.toString()],
      });
    },
  });
}
