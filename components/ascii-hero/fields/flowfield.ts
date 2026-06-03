import type { FieldFn } from "../types";

/**
 * FLOWFIELD (fluid dynamics): domain-warped turbulence. Coordinates are warped
 * by their own sinusoids before sampling - cheap "turbulence" that gives the
 * roiling, vortical look of an advected scalar field (smoke / vorticity).
 */
export const flowfield: FieldFn = (cx, cy, t, { speed }) => {
  const tt = t * 0.3 * speed;
  let x = cx * 0.012;
  let y = cy * 0.012;
  // domain warping
  const wx = Math.sin(y * 1.7 + tt) + 0.5 * Math.sin(y * 3.1 - tt * 1.3);
  const wy = Math.sin(x * 1.5 - tt * 0.9) + 0.5 * Math.sin(x * 2.7 + tt);
  x += wx;
  y += wy;
  const v =
    Math.sin(x * 1.3) * Math.cos(y * 1.1) +
    0.5 * Math.sin(x * 2.6 + y * 1.7) +
    0.25 * Math.cos(x * 4.1 - y * 3.3);
  let bri = (v / 1.75) * 0.5 + 0.5;
  return Math.pow(Math.max(0, bri), 1.4);
};
