import type { FieldFn } from "../types";

/** BLACKHOLE: hard void, thin bright Einstein ring, Doppler-beamed disk. */
export const blackhole: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const dx = cx - W * 0.5;
  const dy = cy - H * 0.5;
  const r = Math.hypot(dx, dy);
  const horizon = 70;
  if (r < horizon * 0.92) return 0; // sharp event horizon (the void)
  const ang = Math.atan2(dy, dx);
  const rot = t * 1.4 * speed + 150 / (r * 0.12 + 12);
  // 2 tight arms forming the accretion disk
  const spiral = Math.sin(ang * 2 + Math.log(r + 8) * 4.4 - rot);
  const disk = Math.pow(spiral * 0.5 + 0.5, 1.4) * 0.45;
  // thin, very bright photon/Einstein ring hugging the horizon
  const ring = Math.exp(-((r - horizon) * (r - horizon)) / 650);
  let bri = disk + ring * 1.8;
  // Doppler beaming: one side of the disk much brighter
  bri *= 0.55 + 0.55 * (Math.cos(ang) * 0.5 + 0.5);
  bri *= Math.max(0, 1 - r / (Math.hypot(W, H) * 0.4));
  return Math.min(1, bri);
};
