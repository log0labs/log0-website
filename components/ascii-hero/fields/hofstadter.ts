import type { FieldFn } from "../types";

/**
 * HOFSTADTER butterfly (approx): allowed electron energies vs magnetic flux
 * α=p/q on a lattice - a self-similar, gapped fractal. We overlay the subband
 * centers for small rationals q to sketch the recursive wings (x=flux, y=energy).
 */
export const hofstadter: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const alpha = cx / W; // flux 0..1
  const E = (cy / H) * 4 - 2; // energy -2..2
  let bri = 0;
  for (let q = 2; q <= 7; q++) {
    for (let p = 1; p < q; p++) {
      for (let j = 0; j < q; j++) {
        const Ec =
          2 *
          Math.cos((Math.PI * (j + 0.5)) / q) *
          (0.6 + 0.4 * Math.cos(2 * Math.PI * alpha * p));
        bri += Math.exp(-((E - Ec) ** 2) / 0.004) / (q * q);
      }
    }
  }
  bri *= 6 * (0.85 + 0.15 * Math.sin(t * 0.5 * speed));
  return Math.min(1, bri);
};
