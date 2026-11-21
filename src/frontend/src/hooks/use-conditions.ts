import { type MarineSnapshot, fetchMarineSnapshot } from "@/lib/marine";
import { useQuery } from "@tanstack/react-query";

/** Cache window for provider responses: 10 minutes. */
const STALE_MS = 10 * 60 * 1000;

export function conditionsQueryKey(latitude: number, longitude: number) {
  return ["conditions", latitude.toFixed(4), longitude.toFixed(4)] as const;
}

/**
 * Live Open-Meteo conditions for a coordinate pair.
 * `refetch()` is the manual refresh action; the visible "last updated" time
 * comes from `data.fetchedAt`.
 */
export function useConditions(
  latitude: number | null,
  longitude: number | null,
) {
  return useQuery<MarineSnapshot>({
    queryKey:
      latitude !== null && longitude !== null
        ? conditionsQueryKey(latitude, longitude)
        : ["conditions", "none"],
    queryFn: async ({ signal }) => {
      if (latitude === null || longitude === null) {
        throw new Error("Missing coordinates");
      }
      return fetchMarineSnapshot(latitude, longitude, signal);
    },
    enabled: latitude !== null && longitude !== null,
    staleTime: STALE_MS,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
