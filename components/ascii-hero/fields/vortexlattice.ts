import type { FieldFn } from "../types";

/**
 * VORTEXLATTICE (Abrikosov): a type-II superconductor / rotating BEC expels
 * field through a triangular array of quantized vortices. The order parameter
 * |ψ| dips to zero at each core (dark) and a bright ring rims it; the lattice
 * slowly drifts.
 */
export const vortexlattice: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const a = Math.min(W, H) * 0.16; // lattice constant
  const x = cx + t * 4 * speed;
  const y = cy;
  const v = y / (a * 0.866);
  const u = x / a - 0.5 * Math.floor(v); // shear odd rows → triangular
  const amp = Math.abs(Math.sin(Math.PI * u) * Math.sin(Math.PI * v)); // 0 at cores
  let bri = Math.pow(amp, 0.6) * 0.85;
  bri += Math.pow(1 - amp, 8) * 0.5; // core rings
  return Math.min(1, bri);
};
