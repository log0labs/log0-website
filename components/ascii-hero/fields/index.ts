import type { AsciiVariant, FieldFn } from "../types";
import { galaxy } from "./galaxy";
import { blackhole } from "./blackhole";
import { waves } from "./waves";
import { ripples } from "./ripples";
import { gravitationalwave } from "./gravitationalwave";
import { lensing } from "./lensing";
import { pulsar } from "./pulsar";
import { nbody } from "./nbody";
import { interference } from "./interference";
import { orbital } from "./orbital";
import { superposition } from "./superposition";
import { tunneling } from "./tunneling";
import { qho } from "./qho";
import { quantumwalk } from "./quantumwalk";
import { wigner } from "./wigner";
import { aharonovbohm } from "./aharonovbohm";
import { rabi } from "./rabi";
import { decoherence } from "./decoherence";
import { entanglement } from "./entanglement";
import { correlationgrid } from "./correlationgrid";
import { grover } from "./grover";
import { blochsphere } from "./blochsphere";
import { transmon } from "./transmon";
import { trappedion } from "./trappedion";
import { topological } from "./topological";
import { vortexlattice } from "./vortexlattice";
import { hofstadter } from "./hofstadter";
import { bandstructure } from "./bandstructure";
import { fermisurface } from "./fermisurface";
import { quasicrystal } from "./quasicrystal";
import { chladni } from "./chladni";
import { ising } from "./ising";
import { flowfield } from "./flowfield";
import { turing } from "./turing";
import { soliton } from "./soliton";
import { doublependulum } from "./doublependulum";
import { lorenz } from "./lorenz";
import { bz } from "./bz";
import { percolation } from "./percolation";
import { phasespace } from "./phasespace";
import { lissajous } from "./lissajous";
import { dipole } from "./dipole";
import { feynman } from "./feynman";
import { latticegauge } from "./latticegauge";

/**
 * Registry of procedural fields. "image" is not here - it's pixel-sampled
 * inside the component, not generated from a field fn.
 *
 * Add a new variant: create fields/<name>.ts exporting a FieldFn, register it
 * here, and add its name to AsciiVariant in types.ts.
 */
export const FIELDS: Record<Exclude<AsciiVariant, "image">, FieldFn> = {
  galaxy,
  blackhole,
  waves,
  ripples,
  gravitationalwave,
  lensing,
  pulsar,
  nbody,
  interference,
  orbital,
  superposition,
  tunneling,
  qho,
  quantumwalk,
  wigner,
  aharonovbohm,
  rabi,
  decoherence,
  entanglement,
  correlationgrid,
  grover,
  blochsphere,
  transmon,
  trappedion,
  topological,
  vortexlattice,
  hofstadter,
  bandstructure,
  fermisurface,
  quasicrystal,
  chladni,
  ising,
  flowfield,
  turing,
  soliton,
  doublependulum,
  lorenz,
  bz,
  percolation,
  phasespace,
  lissajous,
  dipole,
  feynman,
  latticegauge,
};
