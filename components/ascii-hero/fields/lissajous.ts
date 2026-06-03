import type { FieldFn } from "../types";

/**
 * LISSAJOUS: orthogonal harmonic oscillations x=sin(aθ+δ), y=sin(bθ). The
 * frequency ratio a:b sets the knot; the phase δ drifts so the figure slowly
 * morphs. A bright head traces the live point.
 */
export const lissajous: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const cxC = W * 0.5;
  const cyC = H * 0.5;
  const A = Math.min(W, H) * 0.36;
  const a = 3;
  const b = 4;
  const delta = t * 0.3 * speed;
  let best = 1e9;
  for (let s = 0; s < 120; s++) {
    const th = (s / 120) * Math.PI * 2;
    const x = cxC + Math.sin(a * th + delta) * A;
    const y = cyC + Math.sin(b * th) * A;
    const d = (cx - x) ** 2 + (cy - y) ** 2;
    if (d < best) best = d;
  }
  const hth = (t * 1.5 * speed) % (Math.PI * 2);
  const hx = cxC + Math.sin(a * hth + delta) * A;
  const hy = cyC + Math.sin(b * hth) * A;
  return Math.min(
    1,
    Math.exp(-best / 30) * 0.7 + Math.exp(-(((cx - hx) ** 2 + (cy - hy) ** 2)) / 60) * 1.3
  );
};
