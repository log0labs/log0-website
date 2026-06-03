import type { FieldFn } from "../types";

/**
 * ISING (statistical mechanics): a 2D spin lattice near its critical
 * temperature. Up-spin domains read bright, down-spin dim, and the domain
 * walls glow as they fluctuate - the hallmark of a phase transition. Pure
 * stateless approximation: layered sines act as a drifting random field whose
 * sign sets the local spin. Reads as clustered 1/0 binary noise.
 */
export const ising: FieldFn = (cx, cy, t, { speed }) => {
  const x = cx * 0.05;
  const y = cy * 0.05;
  const tt = t * 0.5 * speed;
  const n =
    Math.sin(x + Math.sin(y * 0.7 + tt)) +
    Math.sin(y * 1.3 - tt * 0.8 + Math.cos(x * 0.6)) +
    Math.sin((x + y) * 0.5 + tt * 0.5);
  const spin = n / 3; // -1 .. 1
  const wall = Math.exp(-(spin * spin) / 0.02); // thin glowing domain walls
  const bri = (spin > 0 ? 0.5 : 0.1) + wall * 0.5;
  return Math.min(1, bri);
};
