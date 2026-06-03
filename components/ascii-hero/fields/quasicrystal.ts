import type { FieldFn } from "../types";

/**
 * QUASICRYSTAL: the sum of plane waves in N symmetric directions. For N=5 the
 * result has 5-fold symmetry but never repeats - quasiperiodic order, the
 * Penrose-tiling / electron-diffraction pattern.
 */
export const quasicrystal: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const N = 5;
  const k = 0.08;
  const x = cx - W * 0.5;
  const y = cy - H * 0.5;
  const ph = t * 0.6 * speed;
  let s = 0;
  for (let i = 0; i < N; i++) {
    const a = (Math.PI * i) / N;
    s += Math.cos(k * (x * Math.cos(a) + y * Math.sin(a)) + ph);
  }
  return Math.min(1, Math.pow((s / N) * 0.5 + 0.5, 1.4));
};
