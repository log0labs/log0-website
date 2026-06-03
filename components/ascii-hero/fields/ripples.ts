import type { FieldFn } from "../types";

// Drop points (normalized 0..1), each re-firing on its own period/phase so
// the surface never goes flat.
const DROPS = [
  { x: 0.5, y: 0.45, period: 4.2, phase: 0 },
  { x: 0.32, y: 0.7, period: 5.1, phase: 1.7 },
  { x: 0.7, y: 0.62, period: 6.0, phase: 3.3 },
];

/** RIPPLES: concentric harmonic waves from drop points, like stones in water. */
export const ripples: FieldFn = (cx, cy, t, { W, H, speed }) => {
  let sum = 0;
  for (let i = 0; i < DROPS.length; i++) {
    const d = DROPS[i];
    const r = Math.hypot(cx - d.x * W, cy - d.y * H);
    // age of the current ring cycle for this drop
    const age = (t * speed + d.phase) % d.period;
    const front = age * 95; // expanding wavefront radius (px)
    // wave only exists behind the advancing front
    const trail = front - r;
    if (trail < 0 || trail > 220) continue;
    const wave = Math.sin(r * 0.16 - age * 5.5);
    // amplitude: rises at the front, decays with radius + trail age
    const amp =
      Math.exp(-trail / 120) * Math.exp(-r / 360) * (1 - age / d.period);
    sum += wave * amp;
  }
  return Math.min(1, Math.pow(Math.abs(sum) * 1.6, 0.8));
};
