import type { FieldFn } from "../types";

/**
 * ENTANGLEMENT (quantum info): a Bell pair. Two qubit lobes share one hidden
 * phase, so qubit B's pattern is locked anti-correlated to qubit A's - measure
 * one and you instantly know the other. A glowing correlation bridge links
 * them, and periodic "measurement" pulses flash both lobes together.
 */
export const entanglement: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const ax = W * 0.32;
  const bx = W * 0.68;
  const my = H * 0.5;
  const R = Math.min(W, H) * 0.16;
  const phi = t * 0.8 * speed; // shared entangled phase
  const meas = Math.pow(Math.max(0, Math.sin(t * 0.5 * speed)), 8); // collapse flash

  const lobe = (px: number, sign: number) => {
    const dx = cx - px;
    const dy = cy - my;
    const r = Math.hypot(dx, dy);
    const ang = Math.atan2(dy, dx);
    const env = Math.exp(-(r * r) / (2 * R * R));
    const pat = 0.5 + 0.5 * Math.cos(2 * ang - sign * 2 * phi);
    return env * pat;
  };

  let bri = lobe(ax, 1) + lobe(bx, -1);

  // correlation bridge along the midline between the qubits
  const onLine = Math.exp(-((cy - my) * (cy - my)) / 200);
  const between = cx > ax && cx < bx ? 1 : 0;
  bri += onLine * between * (0.25 + 0.5 * Math.abs(Math.cos(2 * phi))) * 0.6;

  // measurement collapse: both lobes brighten in lockstep
  bri += meas * (lobe(ax, 1) + lobe(bx, -1)) * 1.5;
  return Math.min(1, bri);
};
