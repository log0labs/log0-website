import type { FieldFn } from "../types";

/**
 * ORBITAL (QM): hydrogen-like d-orbital probability density |ψ|².
 * Radial part (r/a)² e^(−r/a) × angular cloverleaf sin²(2θ), slowly precessing,
 * with the whole cloud "breathing" like an oscillating probability amplitude.
 */
export const orbital: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const dx = cx - W * 0.5;
  const dy = cy - H * 0.5;
  const r = Math.hypot(dx, dy);
  const a = Math.min(W, H) * 0.15; // Bohr-radius scale
  const ang = Math.atan2(dy, dx) - t * 0.25 * speed; // slow precession
  const lobes = Math.pow(Math.sin(2 * ang), 2); // 4-lobe d_xy angular part
  const radial = Math.pow(r / a, 2) * Math.exp(-r / a); // |R(r)|²
  let bri = radial * lobes * 3.4;
  bri *= 0.72 + 0.28 * Math.sin(t * 1.4 * speed); // amplitude breathing
  return Math.min(1, bri);
};
