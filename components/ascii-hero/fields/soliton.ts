import type { FieldFn } from "../types";

/**
 * SOLITON (KdV): sech² pulses whose speed ∝ amplitude, so the taller one
 * overtakes and passes through the shorter - colliding solitons emerge with
 * shapes intact. Rendered as a traveling surface profile.
 */
export const soliton: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const tt = t * speed;
  const pulses = [
    { a: 1.0, v: 40, x0: -0.1 },
    { a: 0.6, v: 24, x0: -0.4 },
  ];
  let h = 0;
  for (const p of pulses) {
    const span = W * 1.3;
    const c = (((p.x0 * W + p.v * tt) % span) + span) % span;
    const w = Math.sqrt(p.a) * 0.04 * W;
    h += p.a / Math.cosh((cx - c) / w) ** 2;
  }
  const surfY = H * 0.5 - h * H * 0.22;
  let bri = Math.exp(-((cy - surfY) ** 2) / 120) * 1.2;
  if (cy > surfY) bri += 0.06; // fill below the surface
  return Math.min(1, bri);
};
