import type { FieldFn } from "../types";

/**
 * QUANTUMWALK: a discrete-time quantum walk. Unlike a classical random walk
 * (diffusive, √t), interference pushes probability into two horns that spread
 * ballistically (∝ t), with fine fringes between them.
 */
export const quantumwalk: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const period = 7;
  const tt = ((t * speed) % period) / period; // 0..1
  const x = (cx / W) * 2 - 1; // position -1..1
  const spread = 0.15 + tt * 0.8; // ballistic front

  const horn = Math.exp(-((Math.abs(x) - spread) ** 2) / 0.01);
  const body = Math.exp(-(x * x) / (spread * spread)) * 0.25;
  const fringes = 0.6 + 0.4 * Math.cos(x * 40);
  const P = horn * fringes + body;

  const ny = (cy / H) * 2 - 1;
  const env = Math.max(0, 1 - ny * ny * 0.8);
  return Math.min(1, P * env * 0.95);
};
