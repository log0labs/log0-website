import type { FieldFn } from "../types";

/**
 * DECOHERENCE: a qubit density matrix ρ shown as a 2×2 grid. The off-diagonal
 * coherences (the quantum part) decay e^(−t/T₂), leaving only the classical
 * diagonal populations - pure state → mixed state, looping.
 */
export const decoherence: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const period = 6;
  const tt = ((t * speed) % period) / period;
  const coh = Math.exp(-tt * 3); // off-diagonal decay

  const gx = (cx / W) * 2;
  const gy = (cy / H) * 2;
  const bi = Math.floor(gx);
  const bj = Math.floor(gy);
  const inBlock = Math.exp(-((((gx % 1) - 0.5) ** 2 + ((gy % 1) - 0.5) ** 2)) / 0.06);
  const diag = bi === bj;
  let val = diag ? 0.7 : coh * 0.9;
  if (!diag) val *= 0.6 + 0.4 * Math.cos(t * 4 * speed);
  return Math.min(1, inBlock * val);
};
