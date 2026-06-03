import type { FieldFn } from "../types";

/**
 * BZ (Belousov–Zhabotinsky): an excitable chemical medium. Spiral-wave cores
 * emit rotating involute waves of oxidation that annihilate where they meet.
 */
export const bz: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const cores = [
    { x: 0.35, y: 0.45, s: 1 },
    { x: 0.7, y: 0.6, s: -1 },
  ];
  let v = -1;
  for (const c of cores) {
    const dx = cx - c.x * W;
    const dy = cy - c.y * H;
    const r = Math.hypot(dx, dy);
    const a = Math.atan2(dy, dx);
    v = Math.max(v, Math.sin(r * 0.12 - t * 3 * speed + c.s * a));
  }
  return Math.min(1, Math.pow(v * 0.5 + 0.5, 1.3));
};
