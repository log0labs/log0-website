import type { FieldFn } from "../types";

// physicists' Hermite polynomial Hₙ(x) via recurrence
const hermite = (n: number, x: number) => {
  if (n === 0) return 1;
  if (n === 1) return 2 * x;
  let h0 = 1;
  let h1 = 2 * x;
  for (let k = 2; k <= n; k++) {
    const h2 = 2 * x * h1 - 2 * (k - 1) * h0;
    h0 = h1;
    h1 = h2;
  }
  return h1;
};
const NORM = [1, 2, 8, 48, 384];

/**
 * QHO: quantum harmonic-oscillator eigenstates |ψₙ(x)|² = (Hₙ(x)e^(−x²/2))².
 * The level n climbs the ladder over time - higher n shows more nodes - inside
 * a faint parabolic potential.
 */
export const qho: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const x = ((cx / W) * 2 - 1) * 4;
  const n = Math.floor((t * 0.3 * speed) % 5);
  const psi = hermite(n, x) * Math.exp(-(x * x) / 2);
  const dens = ((psi * psi) / (NORM[n] || 1)) * 2;

  const ny = (cy / H) * 2 - 1;
  const env = Math.max(0, 1 - ny * ny * 0.8);
  let bri = dens * env;
  bri += Math.exp(-((cy - (H * 0.5 + x * x * H * 0.02)) ** 2) / 200) * 0.12; // potential
  return Math.min(1, bri);
};
