import type { FieldFn } from "../types";

/**
 * NBODY: a few gravitating bodies on nested orbits with fading trails around a
 * central mass - a toy planetary / star-cluster system.
 */
export const nbody: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const cxC = W * 0.5;
  const cyC = H * 0.5;
  const R = Math.min(W, H);
  const tt = t * speed;
  const bodies = [
    { r: 0.1, w: 1.4, p: 0 },
    { r: 0.2, w: 0.9, p: 2 },
    { r: 0.31, w: 0.6, p: 4 },
    { r: 0.4, w: 0.4, p: 1 },
  ];
  let bri = Math.exp(-(((cx - cxC) ** 2 + (cy - cyC) ** 2)) / 200) * 0.8; // star
  for (const b of bodies) {
    for (let s = 0; s < 10; s++) {
      const ang = tt * b.w + b.p - s * 0.1;
      const x = cxC + Math.cos(ang) * R * b.r;
      const y = cyC + Math.sin(ang) * R * b.r * 0.7;
      const w = s === 0 ? 55 : 40;
      bri += Math.exp(-(((cx - x) ** 2 + (cy - y) ** 2)) / w) * (s === 0 ? 1 : 0.3 * (1 - s / 10));
    }
  }
  return Math.min(1, bri);
};
