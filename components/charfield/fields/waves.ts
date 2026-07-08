import type { FieldFn } from "../types";

/** WAVES: flowing horizontal river of characters, drifting + rippling. */
export const waves: FieldFn = (cx, cy, t, { H, speed }) => {
  const x = cx * 0.018;
  const y = cy * 0.05;
  const flow =
    Math.sin(x - t * 1.2 * speed + Math.sin(y + t * 0.4) * 1.6) * 0.5 +
    Math.sin(x * 0.6 + y - t * 0.7 * speed) * 0.5;
  let bri = Math.pow((flow / 1.4) * 0.5 + 0.5, 1.3);
  // vertical envelope: brightest mid-panel, fades top/bottom
  const ny = (cy / H) * 2 - 1;
  bri *= Math.max(0, 1 - ny * ny * 0.9);
  return bri;
};
