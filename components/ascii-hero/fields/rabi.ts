import type { FieldFn } from "../types";

/**
 * RABI oscillations: a driven two-level atom. The population sloshes between
 * the ground |g⟩ and excited |e⟩ bands as Pₑ = sin²(Ωt/2), Pg = cos²(Ωt/2),
 * with a drive wavefront washing across.
 */
export const rabi: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const Omega = 1.6 * speed;
  const Pe = Math.sin((Omega * t) / 2) ** 2;
  const Pg = 1 - Pe;
  const yE = H * 0.3;
  const yG = H * 0.7;

  let bri =
    Math.exp(-((cy - yE) ** 2) / 120) * Pe +
    Math.exp(-((cy - yG) ** 2) / 120) * Pg;
  // transfer glow between the levels
  bri += Math.exp(-((cy - (yE + yG) / 2) ** 2) / 2000) * 0.15 * Math.abs(Math.sin(Omega * t));
  bri *= 0.7 + 0.3 * Math.cos(cx * 0.05 - t * 3 * speed); // drive wavefront
  return Math.min(1, bri);
};
