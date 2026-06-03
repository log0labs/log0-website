import type { FieldFn } from "../types";

/**
 * LENSING: a foreground point mass bends light from a background starfield.
 * Each line of sight is deflected ∝ 1/r toward the mass, smearing stars into
 * arcs and blooming an Einstein ring around the dark lens.
 */
export const lensing: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const mx = W * 0.5 + Math.sin(t * 0.2 * speed) * W * 0.1;
  const my = H * 0.5;
  const dx = cx - mx;
  const dy = cy - my;
  const r = Math.hypot(dx, dy) + 1;
  const defl = 5000 / r; // deflection
  const sx = cx + (dx / r) * defl;
  const sy = cy + (dy / r) * defl;
  const star = Math.pow(Math.max(0, Math.sin(sx * 0.21) * Math.sin(sy * 0.23)), 18);
  let bri = star + Math.exp(-((r - 70) ** 2) / 200) * 0.5; // + Einstein ring
  if (r < 18) bri = 0; // the lens
  return Math.min(1, bri);
};
