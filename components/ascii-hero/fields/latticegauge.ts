import type { FieldFn } from "../types";

/**
 * LATTICEGAUGE: a gauge theory discretized on a grid. The links form the
 * lattice; each plaquette (cell center) carries a fluctuating field strength
 * that flickers - Wilson-loop excitations on the lattice.
 */
export const latticegauge: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const a = Math.min(W, H) * 0.12;
  const gx = cx / a;
  const gy = cy / a;
  const fx = Math.abs(Math.sin(Math.PI * gx));
  const fy = Math.abs(Math.sin(Math.PI * gy));
  const grid = Math.pow(Math.max(1 - fx, 1 - fy), 18); // links near integer lines
  const pi = Math.floor(gx);
  const pj = Math.floor(gy);
  const flick = 0.5 + 0.5 * Math.sin(pi * 1.7 + pj * 2.3 + t * 2 * speed);
  const center = Math.exp(-((((gx % 1) - 0.5) ** 2 + ((gy % 1) - 0.5) ** 2)) / 0.03);
  return Math.min(1, grid * 0.6 + center * flick * 0.6);
};
