// Shared types for the ASCII hero field system.

export type AsciiVariant =
  // wave / astro
  | "galaxy"
  | "blackhole"
  | "waves"
  | "ripples"
  | "gravitationalwave"
  | "lensing"
  | "pulsar"
  | "nbody"
  // quantum mechanics
  | "interference"
  | "orbital"
  | "superposition"
  | "tunneling"
  | "qho"
  | "quantumwalk"
  | "wigner"
  | "aharonovbohm"
  | "rabi"
  | "decoherence"
  // quantum information / qubits
  | "entanglement"
  | "correlationgrid"
  | "grover"
  | "blochsphere"
  | "transmon"
  | "trappedion"
  | "topological"
  // condensed matter
  | "vortexlattice"
  | "hofstadter"
  | "bandstructure"
  | "fermisurface"
  | "quasicrystal"
  // statistical / nonlinear / complex
  | "chladni"
  | "ising"
  | "flowfield"
  | "turing"
  | "soliton"
  | "doublependulum"
  | "lorenz"
  | "bz"
  | "percolation"
  | "phasespace"
  | "lissajous"
  // field theory / EM
  | "dipole"
  | "feynman"
  | "latticegauge"
  // image-driven
  | "image";

/** Live canvas dimensions + tuning, passed to every field fn each frame. */
export interface FieldEnv {
  /** css px width of the canvas */
  W: number;
  /** css px height of the canvas */
  H: number;
  /** rotation / flow speed multiplier */
  speed: number;
}

/**
 * A procedural field: given a cell's px center (cx, cy), the elapsed time t
 * (seconds), and the canvas env, return that cell's brightness in 0..1.
 */
export type FieldFn = (
  cx: number,
  cy: number,
  t: number,
  env: FieldEnv
) => number;
