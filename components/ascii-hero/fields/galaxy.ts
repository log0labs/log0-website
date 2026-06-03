import type { FieldFn } from "../types";

/** GALAXY: soft 5-arm spiral disk, faint center, broad glow ring. */
export const galaxy: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const dx = cx - W * 0.5;
  const dy = cy - H * 0.5;
  const r = Math.hypot(dx, dy);
  const horizon = 62;
  if (r < horizon * 0.7) return 0;
  const ang = Math.atan2(dy, dx);
  // differential rotation: inner spins faster
  const rot = t * 1.1 * speed + 120 / (r * 0.14 + 14);
  const spiral = Math.sin(ang * 5 + Math.log(r + 10) * 3.1 - rot);
  let bri = Math.pow(spiral * 0.5 + 0.5, 0.65) * 0.85;
  const ring = Math.exp(-((r - horizon) * (r - horizon)) / 3200);
  bri = bri + ring * 1.25;
  bri *= Math.max(0, 1 - r / (Math.hypot(W, H) * 0.42));
  return Math.min(1, bri);
};
