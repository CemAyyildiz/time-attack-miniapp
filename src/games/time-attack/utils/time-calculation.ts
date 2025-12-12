// Time calculation utilities

import { TIME_ATTACK_CONFIG, TIME_ATTACK_ACCURACY_LEVELS } from '@/lib/constants/game-constants';

export function calculateAccuracy(stoppedTime: number): number {
  const difference = Math.abs(stoppedTime - TIME_ATTACK_CONFIG.TARGET_TIME);
  const accuracy = Math.max(0, 100 - (difference * 10));
  return Number(accuracy.toFixed(2));
}

export function calculateScore(stoppedTime: number): number {
  return calculateAccuracy(stoppedTime);
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
