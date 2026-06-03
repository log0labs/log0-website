import type { FieldFn } from "../types";

/**
 * CHLADNI (mechanics / acoustics): a vibrating square plate.
 * Sand grains gather at the NODAL lines of the standing wave
 *   s = cos(nπx)cos(mπy) − cos(mπx)cos(nπy),
 * so cells light up where |s| ≈ 0. The mode numbers (n, m) drift slowly, so the
 * figure continuously morphs, and the whole plate "rings" via |cos(ωt)|.
 */
export const chladni: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const x = cx / W;
  const y = cy / H;
  const PI = Math.PI;
  // slowly morphing mode numbers
  const n = 3 + (Math.sin(t * 0.15 * speed) * 0.5 + 0.5) * 4; // 3 → 7
  const m = 2 + (Math.cos(t * 0.11 * speed) * 0.5 + 0.5) * 5; // 2 → 7
  const s =
    Math.cos(n * PI * x) * Math.cos(m * PI * y) -
    Math.cos(m * PI * x) * Math.cos(n * PI * y);
  // grains accumulate at nodes: bright where |s| is small
  let bri = Math.pow(1 - Math.min(1, Math.abs(s)), 6);
  bri *= 0.6 + 0.4 * Math.abs(Math.cos(t * 1.1 * speed)); // standing-wave ring
  return bri;
};
