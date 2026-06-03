import type { FieldFn } from "../types";

/**
 * TURING patterns (reaction–diffusion): an activator–inhibitor system settles
 * into spots / labyrinthine stripes. Stateless approximation - a band-passed,
 * slowly drifting noise field reproduces the maze-like morphology.
 */
export const turing: FieldFn = (cx, cy, t, { speed }) => {
  const tt = t * 0.15 * speed;
  const x = cx * 0.06;
  const y = cy * 0.06;
  const n1 =
    Math.sin(x + Math.cos(y + tt)) + Math.sin(y * 1.2 - tt) + Math.sin((x + y) * 0.7);
  const n2 = Math.sin(x * 0.5 - tt * 0.5) + Math.sin(y * 0.6 + tt * 0.3);
  const v = n1 - 0.5 * n2;
  return Math.min(1, Math.pow(Math.abs(Math.sin(v * 1.6)), 0.4));
};
