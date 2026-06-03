import type { FieldFn } from "../types";

/**
 * DIPOLE: the field lines of two opposite charges. Cells light up along
 * contours of the 2D dipole stream function (the angle difference seen from the
 * two charges), with the charges glowing.
 */
export const dipole: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const q1x = W * 0.42;
  const q2x = W * 0.58;
  const qy = H * 0.5;
  const r1 = Math.hypot(cx - q1x, cy - qy) + 1;
  const r2 = Math.hypot(cx - q2x, cy - qy) + 1;
  const psi = Math.atan2(cy - qy, cx - q1x) - Math.atan2(cy - qy, cx - q2x);
  let bri = Math.pow(Math.abs(Math.cos(psi * 4)), 30) * 0.7; // field-line contours
  bri += Math.exp(-(r1 * r1) / 120) * 0.9 + Math.exp(-(r2 * r2) / 120) * 0.9; // charges
  bri *= 0.9 + 0.1 * Math.sin(t * 1.5 * speed);
  return Math.min(1, bri);
};
