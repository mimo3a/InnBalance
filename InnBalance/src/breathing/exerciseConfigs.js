/**
 * Breathing Exercise Configurations
 * 
 * Defines breathing patterns for different mood states.
 * Each exercise specifies timing for inhale, hold, and exhale phases.
 * 
 * Timing patterns are based on therapeutic breathing techniques:
 * - Anti-stress: Balanced breathing with longer exhale for relaxation
 * - Anti-depression: Deep breathing with holds to increase oxygen and energy
 * - Anti-anxiety: Shorter cycles to reduce panic, focus on extended exhale
 * - Anti-anger: Very slow breathing to calm nervous system
 * - Anti-low_energy: Energizing breath with balanced holds
 * - Balance: Harmonious pattern for general wellbeing
 * 
 * All timings are in seconds.
 */

/**
 * BREATHING_EXERCISES
 * Collection of breathing exercise configurations mapped by mood state
 */
export const BREATHING_EXERCISES = {
  // For stress relief - balanced with calming exhale
  anti_stress: {
    inhale: 4,              // 4 seconds to breathe in
    holdAfterInhale: 2,     // 2 seconds hold
    exhale: 6,              // 6 seconds to breathe out (longer for relaxation)
    holdAfterExhale: 2,     // 2 seconds hold
    cycles: Infinity,       // Repeat indefinitely
    label: {
      inhale: 'Inhale',
      hold: 'Hold',
      exhale: 'Exhale',
    },
  },
  
  // For depression - energizing with deeper holds
  anti_depression: {
    inhale: 4,
    holdAfterInhale: 4,     // Longer hold to increase oxygen
    exhale: 8,              // Very long exhale for deep relaxation
    holdAfterExhale: 4,
    cycles: Infinity,
    label: {
      inhale: 'Inhale',
      hold: 'Hold',
      exhale: 'Exhale',
    },
  },
  
  // For anxiety - quick cycles with extended exhale
  anti_anxiety: {
    inhale: 3,              // Shorter inhale for anxious states
    holdAfterInhale: 3,
    exhale: 6,              // Double the exhale to calm nervous system
    holdAfterExhale: 3,
    cycles: Infinity,
    label: {
      inhale: 'Inhale',
      hold: 'Hold',
      exhale: 'Exhale',
    },
  },
  
  // For anger - very slow breathing to calm down
  anti_anger: {
    inhale: 5,
    holdAfterInhale: 5,
    exhale: 10,             // Very long exhale to release tension
    holdAfterExhale: 5,
    cycles: Infinity,
    label: {
      inhale: 'Inhale',
      hold: 'Hold',
      exhale: 'Exhale',
    },
  },
  
  // For low energy - balanced energizing pattern
  anti_low_energy: {
    inhale: 4,
    holdAfterInhale: 4,
    exhale: 8,
    holdAfterExhale: 4,
    cycles: Infinity,
    label: {
      inhale: 'Inhale',
      hold: 'Hold',
      exhale: 'Exhale',
    },
  },
  
  // For balance - harmonious pattern
  balance: {
    inhale: 5,
    holdAfterInhale: 5,
    exhale: 10,
    holdAfterExhale: 5,
    cycles: Infinity,
    label: {
      inhale: 'Inhale',
      hold: 'Hold',
      exhale: 'Exhale',
    },
  },
};