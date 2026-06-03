import type { FieldFn } from "../types";

/**
 * FERMISURFACE: a 2D tight-binding metal. The Fermi surface is the contour
 * −2(cos kx + cos ky) = μ in the Brillouin zone - the boundary between filled
 * and empty states. The chemical potential μ sweeps, morphing the surface.
 */
export const fermisurface: FieldFn = (cx, cy, t, { W, H, speed }) => {
  const kx = (cx / W) * 2 * Math.PI - Math.PI;
  const ky = (cy / H) * 2 * Math.PI - Math.PI;
  const disp = -2 * (Math.cos(kx) + Math.cos(ky));
  const mu = Math.sin(t * 0.3 * speed) * 1.5;
  const contour = Math.exp(-((disp - mu) ** 2) / 0.05);
  const filled = disp < mu ? 0.18 : 0.04;
  return Math.min(1, contour * 0.9 + filled);
};
