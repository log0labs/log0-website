import type { FieldFn } from "../types";

/**
 * BLOCHSPHERE (spin qubit): a single qubit drawn on its Bloch sphere. We
 * inverse-project each front-hemisphere pixel back to (longitude, latitude) to
 * light up the meridian/parallel grid, spin it about the vertical axis, and
 * track the state vector tip as it precesses (Larmor) and nutates (Rabi) -
 * the equator is the equal |0⟩+|1⟩ superposition.
 */
export const blochsphere: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const PI = Math.PI;
  const cxC = W * 0.5;
  const cyC = H * 0.5;
  const R = Math.min(W, H) * 0.34;
  const dx = cx - cxC;
  const dy = cy - cyC;
  const rr = dx * dx + dy * dy;

  let bri = 0;
  // rim of the sphere
  const r = Math.sqrt(rr);
  bri += Math.exp(-((r - R) * (r - R)) / 10) * 0.5;

  if (rr < R * R) {
    // front hemisphere: inverse-project to spherical coords
    const Z = Math.sqrt(R * R - rr);
    const X = dx;
    const Y = -dy;
    const lon = Math.atan2(Z, X) + t * 0.6 * speed; // spin about Y
    const lat = Math.asin(Math.max(-1, Math.min(1, Y / R)));
    const mer = Math.pow(Math.abs(Math.cos(lon * 4)), 40); // 8 meridians
    const par = Math.pow(Math.abs(Math.cos(lat * 6)), 40); // parallels
    bri += Math.max(mer, par) * 0.55;
  }

  // state-vector tip precessing + nutating on the sphere
  const th = PI * 0.5 + 0.55 * Math.sin(t * 0.7 * speed);
  const ph = t * 1.3 * speed;
  const sx = cxC + R * Math.sin(th) * Math.cos(ph);
  const sy = cyC - R * Math.cos(th);
  bri += Math.exp(-((cx - sx) ** 2 + (cy - sy) ** 2) / 70) * 1.6;

  return Math.min(1, bri);
};
