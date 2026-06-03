import type { FieldFn } from "../types";

/**
 * DOUBLEPENDULUM: the chaotic path swept by the lower bob. Stylized - two
 * coupled incommensurate rotations produce the sensitive, never-repeating trace,
 * with a bright bob at the live end.
 */
export const doublependulum: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const cxC = W * 0.5;
  const cyC = H * 0.42;
  const L1 = Math.min(W, H) * 0.18;
  const L2 = Math.min(W, H) * 0.16;
  const tt = t * speed;
  let best = 1e9;
  let bobx = 0;
  let boby = 0;
  for (let s = 0; s < 70; s++) {
    const u = tt - s * 0.05;
    const a1 = 1.4 * Math.sin(0.9 * u) + 0.6 * Math.sin(2.3 * u);
    const a2 = 1.8 * Math.sin(1.7 * u + 1) + 0.9 * Math.cos(3.1 * u);
    const x = cxC + Math.sin(a1) * L1 + Math.sin(a2) * L2;
    const y = cyC + Math.cos(a1) * L1 + Math.cos(a2) * L2;
    if (s === 0) {
      bobx = x;
      boby = y;
    }
    const d = (cx - x) ** 2 + (cy - y) ** 2;
    if (d < best) best = d;
  }
  let bri = Math.exp(-best / 40) * 0.7; // fading trace
  bri += Math.exp(-(((cx - bobx) ** 2 + (cy - boby) ** 2)) / 50) * 1.4; // bob
  return Math.min(1, bri);
};
