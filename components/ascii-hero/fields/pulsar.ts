import type { FieldFn } from "../types";

/**
 * PULSAR: a spinning neutron star. Its magnetic axis is tilted from the spin
 * axis, so two opposite beams sweep around like a lighthouse, flashing past the
 * line of sight once per rotation.
 */
export const pulsar: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const dx = cx - W * 0.5;
  const dy = cy - H * 0.5;
  const r = Math.hypot(dx, dy);
  const a = Math.atan2(dy, dx);
  const beam = t * 2 * speed;
  const cone = Math.max(Math.cos(a - beam), Math.cos(a - beam - Math.PI));
  let bri =
    Math.pow(Math.max(0, cone), 40) * Math.max(0, 1 - r / (Math.min(W, H) * 0.6));
  bri += Math.exp(-(r * r) / 300) * 0.9; // star
  bri += Math.exp(-((r - Math.min(W, H) * 0.3) ** 2) / 4000) * 0.08; // field ring
  return Math.min(1, bri);
};
