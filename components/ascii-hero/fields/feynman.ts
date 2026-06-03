import type { FieldFn } from "../types";

/**
 * FEYNMAN diagram: e⁻e⁺ → γ* → e⁻e⁺ (s-channel). Two incoming legs meet at a
 * vertex, a wavy photon propagator carries momentum across, then two outgoing
 * legs emerge. Vertices glow.
 */
export const feynman: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const v1x = W * 0.4;
  const v2x = W * 0.6;
  const vy = H * 0.5;
  const segDist = (x1: number, y1: number, x2: number, y2: number) => {
    const A = cx - x1;
    const B = cy - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const len = C * C + D * D;
    let u = len ? (A * C + B * D) / len : 0;
    u = Math.max(0, Math.min(1, u));
    return Math.hypot(cx - (x1 + u * C), cy - (y1 + u * D));
  };
  let bri =
    Math.exp(-(segDist(W * 0.12, H * 0.2, v1x, vy) ** 2) / 18) +
    Math.exp(-(segDist(W * 0.12, H * 0.8, v1x, vy) ** 2) / 18) +
    Math.exp(-(segDist(v2x, vy, W * 0.88, H * 0.2) ** 2) / 18) +
    Math.exp(-(segDist(v2x, vy, W * 0.88, H * 0.8) ** 2) / 18);
  const tx = (cx - v1x) / (v2x - v1x);
  if (tx > 0 && tx < 1) {
    const wy = vy + Math.sin(tx * Math.PI * 6 - t * 4 * speed) * 10; // photon
    bri += Math.exp(-((cy - wy) ** 2) / 20);
  }
  bri +=
    Math.exp(-(((cx - v1x) ** 2 + (cy - vy) ** 2)) / 40) * 0.9 +
    Math.exp(-(((cx - v2x) ** 2 + (cy - vy) ** 2)) / 40) * 0.9; // vertices
  return Math.min(1, bri);
};
