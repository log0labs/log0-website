import type { FieldFn } from "../types";

/**
 * PERCOLATION: lattice sites are occupied with probability p, swept across the
 * critical threshold p_c≈0.59. Below it only small islands; near p_c a spanning
 * cluster snaps into existence - a geometric phase transition.
 */
export const percolation: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const a = Math.min(W, H) * 0.045;
  const gi = Math.floor(cx / a);
  const gj = Math.floor(cy / a);
  const h = Math.sin(gi * 127.1 + gj * 311.7) * 43758.5453;
  const rnd = h - Math.floor(h); // deterministic per-site "random"
  const p = 0.45 + 0.25 * Math.sin(t * 0.4 * speed); // sweep through p_c
  const occ = rnd < p ? 1 : 0;
  const inx = (cx / a) % 1;
  const iny = (cy / a) % 1;
  const cell = Math.exp(-((((inx - 0.5) ** 2) + ((iny - 0.5) ** 2))) / 0.05);
  return Math.min(1, cell * occ * (0.4 + 0.6 * p));
};
