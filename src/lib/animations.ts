import type { Variants } from "framer-motion";

/** Standard ease curve — matches CSS cubic-bezier(0.16, 1, 0.3, 1) */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/** Fade up — used for most content entrances */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_EXPO },
  },
};

/** Fade in — used for overlays, images */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Scale in — used for cards and buttons */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
};

/** Stagger container — wraps groups of animated children */
export const staggerContainer = (
  staggerAmount = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerAmount,
      delayChildren,
    },
  },
});

/** Slide in from left — used for section labels */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
};
