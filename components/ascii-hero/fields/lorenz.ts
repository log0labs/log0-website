import type { FieldFn } from "../types";

/**
 * LORENZ attractor: the butterfly. A stylized two-lobe orbit (the system slowly
 * switches wings) traced in the x–z projection, with a bright head at the
 * current state - sensitive dependence made visible.
 */
export const lorenz: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const cxC = W * 0.5;
  const cyC = H * 0.5;
  const S = Math.min(W, H) * 0.012;
  const tt = t * speed;
  let best = 1e9;
  let hx = 0;
  let hy = 0;
  for (let s = 0; s < 90; s++) {
    const u = tt * 0.6 - s * 0.045;
    const lobe = Math.sign(Math.sin(u * 0.7)); // which wing
    const rad = 18 + 8 * Math.sin(u * 3);
    const ang = u * 3;
    const X = lobe * 14 + Math.cos(ang) * rad;
    const Z = Math.sin(ang) * rad;
    const x = cxC + X * S * 2;
    const y = cyC - Z * S * 2;
    if (s === 0) {
      hx = x;
      hy = y;
    }
    const d = (cx - x) ** 2 + (cy - y) ** 2;
    if (d < best) best = d;
  }
  return Math.min(
    1,
    Math.exp(-best / 45) * 0.7 + Math.exp(-(((cx - hx) ** 2 + (cy - hy) ** 2)) / 40) * 1.3
  );
};
