// Shared types for the charfield ASCII field system.

/** Live canvas dimensions + tuning, passed to every field fn each frame. */
export interface FieldEnv {
  /** css px width of the canvas */
  W: number;
  /** css px height of the canvas */
  H: number;
  /** rotation / flow speed multiplier */
  speed: number;
}

/**
 * A procedural field: given a cell's px center (cx, cy), the elapsed time t
 * (seconds), and the canvas env, return that cell's brightness in 0..1.
 */
export type FieldFn = (
  cx: number,
  cy: number,
  t: number,
  env: FieldEnv
) => number;
