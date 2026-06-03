import type { FieldFn } from "../types";

/**
 * TOPOLOGICAL (topological qubit): anyon world-lines braiding through
 * space (x) and time (vertical axis). The strands weave over and under each
 * other; it's the braid itself - its topology - that stores the quantum
 * information, immune to local noise.
 */
export const topological: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const N = 4; // anyon strands
  const PI = Math.PI;
  const y = cy / H; // time axis
  const phase = t * 0.6 * speed;
  const spread = W * 0.5;
  const x0 = W * 0.5 - spread / 2;
  const dxs = spread / (N - 1);

  let bri = 0;
  for (let i = 0; i < N; i++) {
    const base = x0 + i * dxs;
    const weave = Math.sin(y * PI * 3 + phase + i * PI * 0.5) * dxs * 0.6;
    const sx = base + weave;
    bri += Math.exp(-((cx - sx) ** 2) / 26);
  }
  return Math.min(1, bri * 0.9);
};
