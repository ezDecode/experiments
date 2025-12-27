/**
 * Feature Flags - Centralized Experimental Feature Control
 * 
 * Gate all experimental behavior behind explicit flags.
 * Each flag must have an owner and expiry/rollout plan.
 */

export const FEATURE_FLAGS = {
  /**
   * Advanced error reporting with component stack traces
   * Owner: Engineering
   * Plan: Permanent (dev-only utility)
   */
  ERROR_REPORTER: process.env.NODE_ENV === "development",
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return FEATURE_FLAGS[flag] === true;
}

/**
 * Get all enabled features
 */
export function getEnabledFeatures(): FeatureFlag[] {
  return Object.entries(FEATURE_FLAGS)
    .filter(([, enabled]) => enabled)
    .map(([flag]) => flag as FeatureFlag);
}
