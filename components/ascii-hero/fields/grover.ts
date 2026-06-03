import type { FieldFn } from "../types";

/**
 * GROVER (quantum search): amplitude bars over N basis states. Each iteration
 * the oracle + diffusion amplify the marked state's amplitude while the rest
 * shrink - then it resets and runs again.
 */
export const grover: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const N = 16;
  const marked = 6;
  const i = Math.floor((cx / W) * N);
  const period = 5;
  const tt = ((t * speed) % period) / period; // iteration progress 0..1

  const a = i === marked ? 0.2 + tt * 0.8 : (1 - tt) * 0.5 + 0.06;
  const barTop = H * (1 - a * 0.8);
  const xin = ((cx / W) * N) % 1;
  const gap = xin > 0.15 && xin < 0.85 ? 1 : 0;

  let bri = (cy > barTop ? 1 : 0) * gap * (i === marked ? 1 : 0.45);
  bri += Math.exp(-((cy - barTop) ** 2) / 30) * gap * (i === marked ? 1 : 0.55);
  return Math.min(1, bri);
};
