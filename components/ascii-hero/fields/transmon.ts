import type { FieldFn } from "../types";

/**
 * TRANSMON (superconducting qubit): the Josephson cosine potential
 * U(φ) = −cos φ drawn across the panel, with its anharmonic energy ladder
 * |0⟩,|1⟩,|2⟩ as glowing levels inside the well. The |1⟩ level pulses - that's
 * the computational transition being driven. A probability cloud sits at the
 * bottom of the well.
 */
export const transmon: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const PI = Math.PI;
  const phi = (cx / W) * 4 * PI - 2 * PI; // Josephson phase
  const U = -Math.cos(phi); // potential, −1..1
  const midY = H * 0.5;
  const scale = H * 0.28;
  const uy = midY - U * scale; // potential-curve y (screen y grows down)

  let bri = Math.exp(-((cy - uy) * (cy - uy)) / 90) * 0.7; // the well curve

  // anharmonic energy ladder (energies measured from the well bottom at −1)
  const levels = [-0.78, -0.5, -0.28];
  for (let i = 0; i < levels.length; i++) {
    const E = levels[i];
    const ly = midY - E * scale;
    const halfw = Math.acos(Math.max(-1, Math.min(1, -E))); // classical turning point
    const allowed = Math.abs(phi) < halfw ? 1 : 0;
    const amp =
      i === 1 ? 0.5 + 0.5 * Math.abs(Math.sin(t * 1.5 * speed)) : 0.6;
    bri += Math.exp(-((cy - ly) * (cy - ly)) / 45) * allowed * amp * 0.8;
  }

  // ground-state probability cloud at the bottom of the well (φ≈0)
  const cloudY = midY + scale; // U=−1 → uy = midY + scale
  bri +=
    Math.exp(-(phi * phi) / 1.2) *
    Math.exp(-((cy - cloudY) ** 2) / 400) *
    0.4;

  return Math.min(1, bri);
};
