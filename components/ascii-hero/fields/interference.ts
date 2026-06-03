import type { FieldFn } from "../types";

/**
 * INTERFERENCE (QM double-slit): two coherent point sources on the left plane
 * emit circular waves; on-screen brightness is the intensity |Σ cos(kr − ωt)|².
 * Produces the classic radiating fringe pattern, shimmering in time.
 */
export const interference: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const k = 0.16; // wavenumber
  const w = 3.2 * speed; // angular frequency
  const sx = W * 0.14; // slit plane
  const s1y = H * 0.4;
  const s2y = H * 0.6;
  const r1 = Math.hypot(cx - sx, cy - s1y);
  const r2 = Math.hypot(cx - sx, cy - s2y);
  const a = Math.cos(k * r1 - w * t) + Math.cos(k * r2 - w * t);
  let bri = (a * a) / 4; // intensity, 0..1
  // ramp in past the slit plane, fade toward the far edge
  bri *= Math.min(1, Math.max(0, (cx - sx) / (W * 0.18)));
  bri *= Math.max(0, 1 - cx / (W * 1.15));
  return Math.min(1, bri * 0.95);
};
