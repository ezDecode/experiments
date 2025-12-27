/**
 * Unified Motion Configuration
 * 
 * Central source of truth for all animation constants.
 * Import these presets instead of hardcoding values in components.
 */

import type { Transition } from "framer-motion";

// Spring presets
export const SPRING_CONFIGS = {
  /** Smooth, gentle spring - for subtle UI feedback */
  gentle: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  },

  /** Bouncy spring - for attention-grabbing animations */
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 10,
  },

  /** Tight spring - for crisp, precise movements */
  tight: {
    type: "spring" as const,
    stiffness: 420,
    damping: 30,
    mass: 0.6,
  },

  /** Dock spring - for dock/navigation animations */
  dock: {
    type: "spring" as const,
    stiffness: 240,
    damping: 26,
    mass: 0.9,
  },

  /** Surface spring - for shared layout animations */
  surface: {
    type: "spring" as const,
    stiffness: 300,
    damping: 28,
  },

  /** Tooltip spring - for fast, responsive tooltips */
  tooltip: {
    type: "spring" as const,
    stiffness: 560,
    damping: 36,
    mass: 0.35,
  },
} as const satisfies Record<string, Transition>;

// Duration-based presets
export const TWEEN_CONFIGS = {
  /** Quick tween - for micro-interactions */
  quick: {
    duration: 0.12,
    ease: "easeOut" as const,
  },

  /** Fast tween - for standard UI transitions */
  fast: {
    duration: 0.2,
    ease: "easeOut" as const,
  },

  /** Normal tween - for content transitions */
  normal: {
    duration: 0.3,
    ease: "easeInOut" as const,
  },

  /** Slow tween - for deliberate, emphasized transitions */
  slow: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1] as const,
  },
} as const satisfies Record<string, Transition>;

// Stagger configurations
export const STAGGER_CONFIGS = {
  /** Minimal stagger - for tight lists */
  minimal: 0.03,

  /** Default stagger - for general use */
  default: 0.05,

  /** Relaxed stagger - for spacious layouts */
  relaxed: 0.1,

  /** Dramatic stagger - for hero sections */
  dramatic: 0.15,
} as const;

// Common animation variants
export const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

export const FADE_IN_DOWN = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
} as const;

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;

export const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
} as const;

// Helper to create container variants with stagger
export function createStaggerContainer(stagger: number = STAGGER_CONFIGS.default) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
      },
    },
  };
}
