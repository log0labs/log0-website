"use client";

import AsciiHero from "@/components/ascii-hero";
import type { AsciiVariant } from "@/components/ascii-hero";

type Demo = {
  variant: AsciiVariant;
  src?: string;
  title: string;
  field: string;
  blurb: string;
};

const DEMOS: Demo[] = [
  {
    variant: "gravitationalwave",
    title: "Gravitational Wave",
    field: "Astrophysics",
    blurb: "Binary inspiral chirp - two masses spiral in, radiating a quadrupole wave.",
  },
  {
    variant: "interference",
    title: "Double Slit",
    field: "Quantum Mechanics",
    blurb: "Two coherent sources; intensity = |Σ cos(kr − ωt)|².",
  },
  {
    variant: "superposition",
    title: "Superposition",
    field: "Quantum Mechanics",
    blurb: "|ψ⟩ = Σ cₙ|φₙ⟩ - box eigenstates beat; |ψ|² sloshes.",
  },
  {
    variant: "entanglement",
    title: "Entanglement",
    field: "Quantum Information",
    blurb: "Bell pair - anti-correlated lobes, bridge, collapse pulses.",
  },
  {
    variant: "blochsphere",
    title: "Bloch Sphere",
    field: "Qubit · spin",
    blurb: "State vector precessing + nutating on the Bloch sphere.",
  },
  {
    variant: "transmon",
    title: "Transmon",
    field: "Qubit · superconducting",
    blurb: "Josephson −cos φ well with a pulsing anharmonic ladder.",
  },
  {
    variant: "trappedion",
    title: "Trapped Ion",
    field: "Qubit · trapped-ion",
    blurb: "Ion chain in a harmonic trap, normal-mode motion.",
  },
  {
    variant: "topological",
    title: "Topological",
    field: "Qubit · anyon",
    blurb: "Anyon world-lines braiding through space and time.",
  },
  {
    variant: "orbital",
    title: "d-Orbital",
    field: "Quantum Mechanics",
    blurb: "Hydrogen probability density |ψ|², precessing + breathing.",
  },
  {
    variant: "chladni",
    title: "Chladni Plate",
    field: "Acoustics / Mechanics",
    blurb: "Sand gathers on the nodal lines of a vibrating plate; modes morph.",
  },
  {
    variant: "ising",
    title: "Ising Model",
    field: "Statistical Mechanics",
    blurb: "Spin-lattice domains near criticality, walls glowing as they flip.",
  },
  {
    variant: "flowfield",
    title: "Turbulence",
    field: "Fluid Dynamics",
    blurb: "Domain-warped flow - advected vorticity / smoke.",
  },
  {
    variant: "blackhole",
    title: "Black Hole",
    field: "Astrophysics",
    blurb: "Event-horizon void, photon ring, Doppler-beamed accretion disk.",
  },
  {
    variant: "galaxy",
    title: "Galaxy",
    field: "Astrophysics",
    blurb: "5-arm logarithmic spiral with differential rotation.",
  },
  {
    variant: "ripples",
    title: "Ripples",
    field: "Wave Mechanics",
    blurb: "Concentric harmonic waves from staggered drop points.",
  },
  {
    variant: "waves",
    title: "Flow",
    field: "Wave Mechanics",
    blurb: "Drifting horizontal wave train.",
  },
  {
    variant: "lensing",
    title: "Gravitational Lensing",
    field: "Relativity",
    blurb: "A mass bends a background starfield into arcs + an Einstein ring.",
  },
  {
    variant: "pulsar",
    title: "Pulsar",
    field: "Astrophysics",
    blurb: "Tilted magnetic beams sweep like a lighthouse.",
  },
  {
    variant: "nbody",
    title: "N-Body",
    field: "Astrophysics",
    blurb: "Gravitating bodies on nested orbits with fading trails.",
  },
  {
    variant: "tunneling",
    title: "Tunneling",
    field: "Quantum Mechanics",
    blurb: "Wave packet partly reflects, partly tunnels through a barrier.",
  },
  {
    variant: "qho",
    title: "Harmonic Oscillator",
    field: "Quantum Mechanics",
    blurb: "QHO eigenstates |ψₙ|² climbing the ladder (Hermite × Gaussian).",
  },
  {
    variant: "quantumwalk",
    title: "Quantum Walk",
    field: "Quantum Information",
    blurb: "Ballistic two-horned spread vs a diffusive classical walk.",
  },
  {
    variant: "wigner",
    title: "Wigner Function",
    field: "Quantum Optics",
    blurb: "Cat-state phase space: two lobes + non-classical interference.",
  },
  {
    variant: "aharonovbohm",
    title: "Aharonov–Bohm",
    field: "Quantum Mechanics",
    blurb: "Confined flux winds the interference fringes with angle.",
  },
  {
    variant: "rabi",
    title: "Rabi Oscillations",
    field: "Quantum Optics",
    blurb: "Driven two-level atom: population sloshes |g⟩ ↔ |e⟩.",
  },
  {
    variant: "decoherence",
    title: "Decoherence",
    field: "Quantum Information",
    blurb: "Density matrix off-diagonals decay: pure → mixed.",
  },
  {
    variant: "correlationgrid",
    title: "Correlation Grid",
    field: "Quantum Information",
    blurb: "Lattice of entangled pairs flickering in lockstep.",
  },
  {
    variant: "grover",
    title: "Grover Search",
    field: "Quantum Computing",
    blurb: "Amplitude amplification grows the marked state's bar.",
  },
  {
    variant: "vortexlattice",
    title: "Vortex Lattice",
    field: "Condensed Matter",
    blurb: "Abrikosov triangular array of quantized vortices.",
  },
  {
    variant: "hofstadter",
    title: "Hofstadter Butterfly",
    field: "Condensed Matter",
    blurb: "Self-similar energy spectrum vs magnetic flux.",
  },
  {
    variant: "bandstructure",
    title: "Band Structure",
    field: "Condensed Matter",
    blurb: "E(k) bands with a gap at the zone boundary.",
  },
  {
    variant: "fermisurface",
    title: "Fermi Surface",
    field: "Condensed Matter",
    blurb: "cos kx + cos ky = μ contour, filling sweeping.",
  },
  {
    variant: "quasicrystal",
    title: "Quasicrystal",
    field: "Condensed Matter",
    blurb: "5-fold plane-wave sum - quasiperiodic, never repeats.",
  },
  {
    variant: "turing",
    title: "Turing Patterns",
    field: "Reaction-Diffusion",
    blurb: "Activator-inhibitor labyrinth, slowly morphing.",
  },
  {
    variant: "soliton",
    title: "Solitons",
    field: "Nonlinear Waves",
    blurb: "KdV sech² pulses collide and pass through intact.",
  },
  {
    variant: "doublependulum",
    title: "Double Pendulum",
    field: "Chaos",
    blurb: "Chaotic trace of the lower bob, sensitive to initial conditions.",
  },
  {
    variant: "lorenz",
    title: "Lorenz Attractor",
    field: "Chaos",
    blurb: "The butterfly - orbit switching between two wings.",
  },
  {
    variant: "bz",
    title: "Belousov–Zhabotinsky",
    field: "Nonlinear Chemistry",
    blurb: "Spiral waves in an excitable medium.",
  },
  {
    variant: "percolation",
    title: "Percolation",
    field: "Statistical Mechanics",
    blurb: "Sites occupy past p_c - a spanning cluster appears.",
  },
  {
    variant: "phasespace",
    title: "Phase Space",
    field: "Mechanics",
    blurb: "Pendulum energy contours; separatrix between libration & rotation.",
  },
  {
    variant: "lissajous",
    title: "Lissajous",
    field: "Mechanics",
    blurb: "Orthogonal oscillations; ratio sets the knot, phase drifts.",
  },
  {
    variant: "dipole",
    title: "Dipole Field",
    field: "Electromagnetism",
    blurb: "Field lines of two opposite charges.",
  },
  {
    variant: "feynman",
    title: "Feynman Diagram",
    field: "Field Theory",
    blurb: "e⁻e⁺ → γ* → e⁻e⁺ with a wavy photon propagator.",
  },
  {
    variant: "latticegauge",
    title: "Lattice Gauge",
    field: "Field Theory",
    blurb: "Grid links + flickering plaquette field strengths.",
  },
];

export default function AsciiLabPage() {
  return (
    <main className="min-h-screen bg-[#020617] px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold tracking-tight">ASCII Physics Lab</h1>
        <p className="mt-2 max-w-2xl text-neutral-400">
          Procedural physics fields for the hero / section backgrounds. Hover any
          tile - the cursor is a gravity well. Each tile is one{" "}
          <code className="text-emerald-400">variant</code>.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((d) => (
            <div
              key={d.variant + (d.src ?? "")}
              className="relative h-72 overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(60%_60%_at_50%_60%,#0c2230_0%,#020617_100%)]"
            >
              <AsciiHero
                variant={d.variant}
                src={d.src}
                cell={8}
                radius={90}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-300">
                    {d.field}
                  </span>
                  <code className="text-[11px] text-neutral-500">
                    {d.variant}
                  </code>
                </div>
                <h2 className="mt-1 text-lg font-medium">{d.title}</h2>
                <p className="text-xs leading-snug text-neutral-400">
                  {d.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
