import type { FieldFn } from "../types";

/**
 * GRAVITATIONALWAVE (astrophysics): a compact binary inspiral.
 *
 * Two masses orbit a common center; over each loop the separation shrinks and
 * the orbital frequency "chirps" up toward merger (just like a LIGO event).
 * They radiate a quadrupole (m=2) spiral wave outward with retarded phase
 * cos(2θ − kr + 2φ), whose amplitude grows toward merger and rings down.
 */
export const gravitationalwave: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const cxC = W * 0.5;
  const cyC = H * 0.5;
  const dx = cx - cxC;
  const dy = cy - cyC;
  const r = Math.hypot(dx, dy);
  const ang = Math.atan2(dy, dx);
  const minDim = Math.min(W, H);

  const T = 9; // inspiral loop length (s)
  const tau = ((t * speed) % T) / T; // 0 → 1 across the inspiral
  const omega = 0.6 + tau * tau * 3.4; // orbital frequency chirps up
  const phase = t * speed * omega;

  // two orbiting masses, separation collapsing toward merger
  const sep = (1 - tau) * minDim * 0.16 + 12;
  const m1x = cxC + Math.cos(phase) * sep;
  const m1y = cyC + Math.sin(phase) * sep;
  const m2x = cxC - Math.cos(phase) * sep;
  const m2y = cyC - Math.sin(phase) * sep;

  // outgoing quadrupole spiral wave with retarded phase
  const k = 0.05 + tau * 0.05;
  const grow = 0.2 + tau * 1.1; // amplitude swells toward merger
  const env = Math.exp(-r / (minDim * 0.6));
  let bri = (Math.cos(2 * ang - k * r + 2 * phase) * 0.5 + 0.5) * grow * env;

  // bright orbiting cores
  const c1 = Math.exp(-((cx - m1x) ** 2 + (cy - m1y) ** 2) / 320);
  const c2 = Math.exp(-((cx - m2x) ** 2 + (cy - m2y) ** 2) / 320);
  bri += (c1 + c2) * 1.4;

  // merger flash near the end of the loop
  if (tau > 0.9) {
    bri += (tau - 0.9) * 10 * Math.exp(-r / (minDim * 0.25));
  }
  return Math.min(1, bri);
};
