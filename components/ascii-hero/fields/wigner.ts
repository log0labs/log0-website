import type { FieldFn } from "../types";

/**
 * WIGNER function of a Schrödinger-cat state in phase space (x, p): two Gaussian
 * lobes (the classical alternatives) plus an interference band between them -
 * the oscillating, partly-negative fringes that mark genuine quantumness.
 */
export const wigner: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const x = ((cx / W) * 2 - 1) * 3;
  const p = ((cy / H) * 2 - 1) * 3;
  const a = 1.6 + 0.4 * Math.sin(t * 0.5 * speed); // cat separation breathing

  const g1 = Math.exp(-(((x - a) ** 2 + p * p)) / 0.8);
  const g2 = Math.exp(-(((x + a) ** 2 + p * p)) / 0.8);
  const interf =
    Math.exp(-((x * x + p * p)) / 0.8) * (0.5 + 0.5 * Math.cos(4 * a * p));
  return Math.min(1, (g1 + g2 + interf) * 0.9);
};
