/*
  Single source for the landing brand accent.

  classNames reference CSS vars (--accent / --accent-hover), set on the
  page wrapper from ACCENT below. Canvas/gradient code (which can't read a CSS
  var) imports the JS constants. Switch the whole palette by changing ACTIVE.
*/
export const PALETTES = {
  green: { accent: "#0BA06B", hover: "#09885A", dim: "rgba(11,160,107,0.16)" },
  orange: { accent: "#F2542D", hover: "#D8431F", dim: "rgba(242,84,45,0.16)" },
  blue: { accent: "#2E6BFF", hover: "#2357D8", dim: "rgba(46,107,255,0.16)" },
  // zero-overlap option: outside the alarm/severity spectrum entirely
  indigo: { accent: "#6E56CF", hover: "#5B46B0", dim: "rgba(110,86,207,0.16)" },
} as const;

export const ACTIVE: keyof typeof PALETTES = "green";

export const ACCENT = PALETTES[ACTIVE].accent;
export const ACCENT_HOVER = PALETTES[ACTIVE].hover;
export const ACCENT_DIM = PALETTES[ACTIVE].dim;
