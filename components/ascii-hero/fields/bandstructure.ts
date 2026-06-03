import type { FieldFn } from "../types";

/**
 * BANDSTRUCTURE: electronic E(k) in a periodic crystal. Two cosine bands split
 * by a gap at the zone boundary (where the periodic potential opens it), plus a
 * flat band. k along x, energy along y.
 */
export const bandstructure: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const k = (cx / W) * 2 * Math.PI - Math.PI;
  const E = (cy / H) * 4 - 2;
  const gap = 0.3;
  const lower = -gap - Math.cos(k);
  const upper = gap + Math.cos(k);
  let bri =
    Math.exp(-((E - lower) ** 2) / 0.01) +
    Math.exp(-((E - upper) ** 2) / 0.01) +
    Math.exp(-((E - 1.3) ** 2) / 0.01) * 0.6; // flat band
  bri *= 0.9 + 0.1 * Math.sin(t * 0.6 * speed);
  return Math.min(1, bri * 0.95);
};
