import type { FieldFn } from "../types";

// A few 2D infinite-square-well eigenstates; their coherent sum is the
// superposition state. Energies E ∝ nx²+ny² make the components beat.
const MODES = [
  { nx: 1, ny: 1 },
  { nx: 2, ny: 1 },
  { nx: 1, ny: 2 },
  { nx: 3, ny: 2 },
];

/**
 * SUPERPOSITION (QM): |ψ⟩ = Σ cₙ|φₙ⟩. We sum a handful of box eigenstates with
 * time-evolving phases e^(−iEₙt) and render the probability density |ψ|². The
 * components beat against each other, so the probability cloud sloshes around
 * the box - the signature of a genuine quantum superposition.
 */
export const superposition: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const PI = Math.PI;
  const x = cx / W;
  const y = cy / H;
  let re = 0;
  let im = 0;
  for (const { nx, ny } of MODES) {
    const phi = Math.sin(nx * PI * x) * Math.sin(ny * PI * y);
    const E = (nx * nx + ny * ny) * 0.6 * speed;
    re += phi * Math.cos(E * t);
    im += phi * Math.sin(E * t);
  }
  const p = (re * re + im * im) / MODES.length; // |ψ|²
  return Math.min(1, Math.pow(p, 0.8) * 1.3);
};
