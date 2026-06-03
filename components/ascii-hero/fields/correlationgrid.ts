import type { FieldFn } from "../types";

/**
 * CORRELATIONGRID: a lattice of entangled qubit pairs. Each pair's two cells
 * always read the same value (perfect correlation), so they light up and dim
 * together - measure one, know the other, everywhere on the grid.
 */
export const correlationgrid: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const cols = 10;
  const rows = 6;
  const gi = Math.floor((cx / W) * cols);
  const gj = Math.floor((cy / H) * rows);
  const pair = Math.floor(gi / 2) + gj * cols; // two adjacent cells share a pair
  const v = Math.sin(pair * 2.4 + t * 1.2 * speed) * 0.5 + 0.5;
  const on = v > 0.5 ? 1 : 0;

  const inx = ((cx / W) * cols) % 1;
  const iny = ((cy / H) * rows) % 1;
  const cell = Math.exp(-((((inx - 0.5) ** 2) + ((iny - 0.5) ** 2))) / 0.05);
  return Math.min(1, cell * (on ? 0.85 : 0.12));
};
