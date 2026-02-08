/**
 * Breathing Exercise Configurations
 * 
 * Defines breathing patterns for different mood states.
 * Each exercise specifies timing for inhale, hold, and exhale phases,
 * along with descriptive information for users.
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
    inhale: 4,
    holdAfterInhale: 2,
    exhale: 6,
    holdAfterExhale: 2,
    cycles: Infinity,
    label: {
      inhale: 'Inhale',
      hold: 'Hold',
      exhale: 'Exhale',
    },
    title: 'Stress Relief',
    description: 'Pattern: 4–2–6–2\nSlow exhale longer than inhale.\n\nDescription:\nEven breathing with an extended exhale helps the body transition from "tension" mode to "recovery" mode.\n\nWhy it works for stress:\n\t\t~Long exhale activates the\n\t\t   parasympathetic nervous system\n\t\t~Reduces cortisol levels\n\t\t~Stabilizes heart rate\n\t\t~Creates a sense of control and\n\t\tgrounding\n\n➡️ Ideal for work pressure, overload, and burnout.'
  },
  
  // For depression - energizing with deeper holds
  anti_depression: {
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
    title: 'Support for Depression',
    description: 'Pattern: 4–4–8–4\nDeep inhale + prolonged hold + very long exhale.\n\nDescription:\nDeep, conscious breathing with holds promotes blood oxygenation and a bodily sense of "presence".\n\nWhy it works for depression:\n\t\t~Holding after inhale enhances brain\n\t\t   oxygenation\n\t\t~Long exhale reduces internal tension\n\t\t~Helps overcome apathy and\n\t\t   disconnection\n\t\t~Creates a sense of depth and stability\n\n➡️ Suitable for fatigue, apathy, and emotional emptiness.'
  },
  
  // For anxiety - quick cycles with extended exhale
  anti_anxiety: {
    inhale: 3,
    holdAfterInhale: 3,
    exhale: 6,
    holdAfterExhale: 3,
    cycles: Infinity,
    label: {
      inhale: 'Inhale',
      hold: 'Hold',
      exhale: 'Exhale',
    },
    title: 'Reducing Anxiety and Panic',
    description: 'Pattern: 3–3–6–3\nShort cycles, exhale twice as long as inhale.\n\nDescription:\nQuick but controlled breathing with emphasis on exhale helps interrupt the anxiety cycle.\n\nWhy it works for anxiety:\n\t\t~Prevents hyperventilation\n\t\t~Extended exhale reduces sympathetic\n\t\t\t\tnervous system activity\n\t\t~Quick cycles keep attention "here\n\t\t\t\tand now"\n\t\t~Helps with feeling of breathlessness\n\n➡️ Effective for panic attacks, internal tension, and fear.'
  },
  
  // For anger - very slow breathing to calm down
  anti_anger: {
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
    title: 'Managing Anger and Irritation',
    description: 'Pattern: 5–5–10–5\nVery slow, deep breathing.\n\nDescription:\nMaximally slowed breathing reduces the physiological activation associated with anger.\n\nWhy it works for anger:\n\t\t~Anger = sudden nervous system\n\t\t\t\tactivation\n\t\t~Long exhale "dampens" impulsive\n\t\t\t\treactions\n\t\t~Holds restore body control\n\t\t~Reduces muscle tension\n\n➡️ Helpful for irritation, aggression, and anger outbursts.'
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
    title: 'Energy Boost',
    description: 'Pattern: 4–4–8–4\nBalance between depth and rhythm.\n\nDescription:\nDeep breathing with holds helps gently activate the body without stress.\n\nWhy it works for low energy:\n\t\t~Improves tissue oxygen supply\n\t\t~Stimulates alertness without\n\t\t\t\toverstimulation\n\t\t~Supports mental clarity\n\t\t~Doesn\'t deplete, unlike fast\n\t\t\t\ttechniques\n\n➡️ Suitable for fatigue, drowsiness, and reduced concentration.'
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
    title: 'Overall Balance',
    description: 'Pattern: 5–5–10–5\nHarmonious, symmetrical rhythm.\n\nDescription:\nEven breathing with equal phases creates a sense of stability and wholeness.\n\nWhy it works for balance:\n\t\t~Synchronizes breathing and heart rate\n\t\t~Suitable for any state\n\t\t~Supports emotional balance\n\t\t~Excellent for daily practice\n\n➡️ Universal mode for stress prevention and self-regulation.'
  },
};