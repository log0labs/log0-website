import type { FieldFn } from "../types";

/**
 * PHASESPACE portrait of a pendulum: trajectories are level sets of the energy
 * E = ½ω² − cos θ in the (θ, ω) plane. Closed loops inside the separatrix are
 * librations; open curves above/below are full rotations.
 */
export const phasespace: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const theta = (cx / W) * 4 * Math.PI - 2 * Math.PI;
  const omega = ((cy / H) * 2 - 1) * 3.2;
  const E = 0.5 * omega * omega - Math.cos(theta);
  let bri = Math.pow(Math.abs(Math.sin(E * 4)), 24) * 0.6; // energy contours
  bri += Math.exp(-((E - 1) ** 2) / 0.01) * 0.5; // separatrix
  bri *= 0.9 + 0.1 * Math.sin(t * 1.0 * speed);
  return Math.min(1, bri);
};
