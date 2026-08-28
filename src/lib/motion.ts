// Snappy, low-overshoot spring for press feedback (a la Emil Kowalski's
// interaction guidelines: react instantly on press, settle quickly on release).
export const pressTransition = {
  type: "spring",
  stiffness: 700,
  damping: 35,
  mass: 0.5,
} as const;

export const pressScale = { scale: 0.95 } as const;
