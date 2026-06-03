import type { FieldFn } from "../types";

/**
 * TRAPPEDION (trapped-ion qubit): a chain of ions held in a linear harmonic
 * trap (faint parabolic bowl). The ions oscillate in a mix of normal modes -
 * center-of-mass, breathing, and a vertical zig-zag - the shared motional bus
 * used to entangle ion qubits.
 */
export const trappedion: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const N = 7;
  const midY = H * 0.5;
  const spread = W * 0.62;
  const x0 = W * 0.5 - spread / 2;
  const dxq = spread / (N - 1);

  let bri = 0;
  for (let i = 0; i < N; i++) {
    const eq = x0 + i * dxq;
    const com = Math.sin(t * 1.2 * speed) * 6; // center-of-mass mode
    const breath = Math.sin(t * 0.8 * speed) * (i - (N - 1) / 2) * 1.4; // breathing
    const zig = Math.sin(t * 2.0 * speed + i * Math.PI) * 4; // zig-zag
    const ix = eq + com + breath;
    const iy = midY + zig;
    bri += Math.exp(-((cx - ix) ** 2 + (cy - iy) ** 2) / 70);
  }

  // faint harmonic trap bowl
  const nx = (cx - W * 0.5) / (W * 0.5);
  const bowlY = midY + nx * nx * H * 0.18;
  bri += Math.exp(-((cy - bowlY) ** 2) / 120) * 0.18;

  return Math.min(1, bri);
};
