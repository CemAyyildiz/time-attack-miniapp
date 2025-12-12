// Game-related constants

export const GAME_IDS = {
  WHEEL_OF_FORTUNE: 'wheel-of-fortune',
  TIME_ATTACK: 'time-attack',
  MAKE_TEN: 'make-ten',
} as const;

export const GAME_STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  FINISHED: 'finished',
  ERROR: 'error',
} as const;

export const GAME_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

// Wheel of Fortune constants
export const WHEEL_CONFIG = {
  MIN_SPIN_DURATION: 3000,
  MAX_SPIN_DURATION: 5000,
  MIN_ROTATIONS: 3,
  MAX_ROTATIONS: 6,
  FRICTION: 0.995,
  INITIAL_VELOCITY: 0.5,
} as const;

export const WHEEL_SEGMENTS: readonly WheelSegmentBase[] = [
  { id: '1', label: '100', color: '#FF6B6B', probability: 0.3, prizeValue: 100 },
  { id: '2', label: '200', color: '#4ECDC4', probability: 0.25, prizeValue: 200 },
  { id: '3', label: '500', color: '#45B7D1', probability: 0.2, prizeValue: 500 },
  { id: '4', label: '1000', color: '#FFA07A', probability: 0.15, prizeValue: 1000 },
  { id: '5', label: '2000', color: '#98D8C8', probability: 0.07, prizeValue: 2000 },
  { id: '6', label: '5000', color: '#FFD93D', probability: 0.03, prizeValue: 5000 },
];

// Time Attack constants
export const TIME_ATTACK_CONFIG = {
  TARGET_TIME: 10000, // 10.00 seconds in milliseconds
  TOLERANCE: 50, // 50ms tolerance
  MAX_ATTEMPTS: 5,
  PRECISION: 10, // Update interval in milliseconds
} as const;

export const TIME_ATTACK_ACCURACY_LEVELS = {
  PERFECT: { threshold: 10, label: 'Perfect!', color: '#10B981' },
  EXCELLENT: { threshold: 50, label: 'Excellent!', color: '#3B82F6' },
  GOOD: { threshold: 100, label: 'Good!', color: '#8B5CF6' },
  FAIR: { threshold: 200, label: 'Fair', color: '#F59E0B' },
  POOR: { threshold: Infinity, label: 'Try Again', color: '#EF4444' },
} as const;

// Make-Ten constants
export const MAKE_TEN_CONFIG = {
  GRID_SIZE: 10,
  TIMER_DURATION: 60000, // 60 seconds
  POINTS_PER_MATCH: 10,
  COMBO_MULTIPLIER: 1.5,
  MIN_NUMBER: 0,
  MAX_NUMBER: 9,
} as const;
