// Wheel of Fortune physics utilities

export function calculateFinalAngle(
  targetSegmentIndex: number,
  totalSegments: number
): number {
  const segmentAngle = 360 / totalSegments;
  const baseAngle = targetSegmentIndex * segmentAngle;
  const randomOffset = Math.random() * segmentAngle;
  const extraRotations = 3 + Math.floor(Math.random() * 3);
  
  return 360 * extraRotations + baseAngle + randomOffset;
}

export function calculateSpinDuration(): number {
  const MIN_DURATION = 3000;
  const MAX_DURATION = 5000;
  return MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
