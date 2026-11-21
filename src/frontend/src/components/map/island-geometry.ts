/**
 * Kish Island outline in decimal degrees (WGS84).
 *
 * The outline is a schematic coastline trace used only to place the monitored
 * beach markers in context. It is not a survey-grade boundary and must never be
 * presented as an official map or used for navigation.
 */
export const ISLAND_OUTLINE: ReadonlyArray<readonly [number, number]> = [
  [26.5568, 53.9485],
  [26.5582, 53.9642],
  [26.5561, 53.9805],
  [26.5512, 53.9958],
  [26.5448, 54.0092],
  [26.5372, 54.0205],
  [26.5291, 54.0288],
  [26.5208, 54.0312],
  [26.5126, 54.0261],
  [26.5062, 54.0152],
  [26.5028, 54.0018],
  [26.5031, 53.9872],
  [26.5072, 53.9738],
  [26.5142, 53.9621],
  [26.5231, 53.9532],
  [26.5332, 53.9478],
  [26.5452, 53.9462],
];

export interface GeoBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

/** Bounds of the island outline with a small margin so markers never clip. */
export const ISLAND_BOUNDS: GeoBounds = (() => {
  const lats = ISLAND_OUTLINE.map(([lat]) => lat);
  const lngs = ISLAND_OUTLINE.map(([, lng]) => lng);
  const padLat = 0.004;
  const padLng = 0.006;
  return {
    minLat: Math.min(...lats) - padLat,
    maxLat: Math.max(...lats) + padLat,
    minLng: Math.min(...lngs) - padLng,
    maxLng: Math.max(...lngs) + padLng,
  };
})();

/** Project a coordinate to a 0–100 percentage inside the map frame. */
export function projectPoint(
  latitude: number,
  longitude: number,
  bounds: GeoBounds = ISLAND_BOUNDS,
): { x: number; y: number } {
  const spanLng = bounds.maxLng - bounds.minLng || 1;
  const spanLat = bounds.maxLat - bounds.minLat || 1;
  const x = ((longitude - bounds.minLng) / spanLng) * 100;
  const y = ((bounds.maxLat - latitude) / spanLat) * 100;
  return {
    x: Math.min(100, Math.max(0, x)),
    y: Math.min(100, Math.max(0, y)),
  };
}

/** SVG path for the island outline in a 0–100 viewBox. */
export function outlinePath(bounds: GeoBounds = ISLAND_BOUNDS): string {
  return ISLAND_OUTLINE.map(([lat, lng], index) => {
    const { x, y } = projectPoint(lat, lng, bounds);
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
}
