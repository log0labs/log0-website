import type { FieldFn } from "../types";

/**
 * AHARONOV–BOHM: an electron encircling a confined magnetic flux picks up a
 * phase from the vector potential even where B=0. The enclosed flux winds the
 * interference fringes with angle θ, so the pattern spirals out from the core.
 */
export const aharonovbohm: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const dx = cx - W * 0.5;
  const dy = cy - H * 0.5;
  const r = Math.hypot(dx, dy);
  const ang = Math.atan2(dy, dx);
  const flux = 2 + Math.sin(t * 0.4 * speed) * 2; // enclosed flux quanta
  const wave = Math.cos(r * 0.12 - t * 2 * speed + flux * ang);
  let bri = (wave * 0.5 + 0.5) * Math.max(0, 1 - r / (Math.min(W, H) * 0.65));
  bri += Math.exp(-(r * r) / 200) * 0.6; // solenoid core
  return Math.min(1, bri);
};
