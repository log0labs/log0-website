import type { FieldFn } from "../types";

/**
 * TUNNELING (QM): a Gaussian wave packet sweeps right and hits a barrier. Part
 * reflects, part tunnels through with reduced amplitude - |ψ|² with a carrier.
 */
export const tunneling: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const barrierX = W * 0.5;
  const barrierW = W * 0.035;
  const period = 6;
  const tt = (t * speed) % period;
  const xc = (tt / period) * W * 1.1 - W * 0.05; // packet center
  const sig = W * 0.06;

  let amp = Math.exp(-((cx - xc) ** 2) / (2 * sig * sig));
  if (cx > barrierX + barrierW) amp *= 0.35; // transmitted
  if (xc > barrierX) {
    const xr = 2 * barrierX - xc; // reflected packet
    if (cx < barrierX - barrierW)
      amp += 0.45 * Math.exp(-((cx - xr) ** 2) / (2 * sig * sig));
  }
  const wave = 0.5 + 0.5 * Math.cos(0.25 * cx - 6 * tt);
  const ny = (cy / H) * 2 - 1;
  let bri = amp * (0.4 + 0.6 * wave) * Math.max(0, 1 - ny * ny * 0.8);
  if (Math.abs(cx - barrierX) < barrierW) bri += 0.22; // barrier wall
  return Math.min(1, bri);
};
