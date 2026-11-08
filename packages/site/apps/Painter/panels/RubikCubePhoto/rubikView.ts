export interface RubikView {
  azimuth: number
  elevation: number
}

export const DEFAULT_VIEW: RubikView = {
  azimuth: 45,
  elevation: (Math.atan(1 / Math.sqrt(2)) * 180) / Math.PI,
}

// Keep the camera beyond all three visible face planes (x/y/z = 15),
// not just inside the positive octant, so opposite faces never become visible.
export const VIEW_LIMITS = {
  azimuth: { min: 30, max: 60 },
  elevation: { min: 25, max: 50 },
}
const CAMERA_DISTANCE = Math.sqrt(3) * 35

export const clampView = (view: RubikView): RubikView => ({
  azimuth: Math.max(
    VIEW_LIMITS.azimuth.min,
    Math.min(VIEW_LIMITS.azimuth.max, view.azimuth),
  ),
  elevation: Math.max(
    VIEW_LIMITS.elevation.min,
    Math.min(VIEW_LIMITS.elevation.max, view.elevation),
  ),
})

export const getCameraPosition = (
  view: RubikView,
): [number, number, number] => {
  const azimuth = (view.azimuth * Math.PI) / 180
  const elevation = (view.elevation * Math.PI) / 180
  const horizontal = CAMERA_DISTANCE * Math.cos(elevation)
  return [
    horizontal * Math.sin(azimuth),
    CAMERA_DISTANCE * Math.sin(elevation),
    horizontal * Math.cos(azimuth),
  ]
}
