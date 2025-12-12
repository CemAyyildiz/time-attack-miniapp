// Time calculation utilities

import { TIME_ATTACK_CONFIG, TIME_ATTACK_ACCURACY_LEVELS } from '@/lib/constants/game-constants';

export function calculateAccuracy(stoppedTime: number): number {
  const difference = Math.abs(stoppedTime - TIME_ATTACK_CONFIG.TARGET_TIME);
  const accuracy = Math.max(0, 100 - (difference * 10));
  return Number(accuracy.toFixed(2));
}

/**
 * Calculates score based on onchain scoring rules:
 * - 10.00s (exact ±5ms) = 100 points (perfect)
 * - 9.99s = 50 points
 * - 10.01s = 50 points
 * - 1-9s: linear (1s=1pt, 2s=2pt, ..., 9s=9pt)
 * - 9-9.99s: linear increase from 9 to 50
 * - 10.01-10.10s: linear decrease from 50 to 0
 * - 10.10s+: 0 points
 */
export function calculateScore(stoppedTime: number): number {
  const timeInSeconds = stoppedTime / 1000;
  const TARGET_SECONDS = 10;
  const MAX_TIME = 10.10;
  
  // No points after 10.10 seconds
  if (timeInSeconds > MAX_TIME) {
    return 0;
  }
  
  // Perfect score: exactly 10.00 seconds (within 5ms tolerance)
  if (Math.abs(stoppedTime - TIME_ATTACK_CONFIG.TARGET_TIME) <= 5) {
    return 100;
  }
  
  // Below 1 second: 1 point
  if (timeInSeconds < 1) {
    return 1;
  }
  
  // 1-9 seconds: linear scoring (seconds = points)
  if (timeInSeconds < 9) {
    return Math.floor(timeInSeconds);
  }
  
  // 9.00-9.99s: linear from 9 to 50 points
  if (timeInSeconds < 9.99) {
    const progress = (timeInSeconds - 9) / 0.99; // 0 to 1
    const score = 9 + (41 * progress); // 9 to 50
    return Math.floor(score);
  }
  
  // 9.99-10.00s: linear from 50 to 100 points
  if (timeInSeconds < TARGET_SECONDS) {
    const progress = (timeInSeconds - 9.99) / 0.01; // 0 to 1
    const score = 50 + (50 * progress); // 50 to 100
    return Math.floor(score);
  }
  
  // 10.00-10.01s: linear from 100 to 50 points
  if (timeInSeconds <= 10.01) {
    const excess = timeInSeconds - TARGET_SECONDS; // 0 to 0.01
    const progress = excess / 0.01; // 0 to 1
    const score = 100 - (50 * progress); // 100 to 50
    return Math.floor(score);
  }
  
  // 10.01-10.10s: linear from 50 to 0 points
  if (timeInSeconds <= MAX_TIME) {
    const excess = timeInSeconds - 10.01; // 0 to 0.09
    const progress = excess / 0.09; // 0 to 1
    const score = 50 - (50 * progress); // 50 to 0
    return Math.floor(score);
  }
  
  return 0;
}

export function calculateDifference(stoppedTime: number): number {
  return Math.abs(stoppedTime - TIME_ATTACK_CONFIG.TARGET_TIME);
}

export function isSuccess(stoppedTime: number): boolean {
  const difference = calculateDifference(stoppedTime);
  return difference <= TIME_ATTACK_CONFIG.TOLERANCE;
}

export function getAccuracyLevel(difference: number) {
  const absDifference = Math.abs(difference);
  
  for (const level of Object.values(TIME_ATTACK_ACCURACY_LEVELS)) {
    if (absDifference <= level.threshold) {
      return level;
    }
  }
  return TIME_ATTACK_ACCURACY_LEVELS.POOR;
}
