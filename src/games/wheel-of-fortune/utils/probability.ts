// Prize probability calculations

export function selectPrizeByProbability(segments: WheelSegment[]): WheelSegment {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (const segment of segments) {
    cumulativeProbability += segment.probability;
    if (random <= cumulativeProbability) {
      return segment;
    }
  }

  return segments[segments.length - 1];
}

export function calculateSegmentAngles(segments: readonly WheelSegmentBase[]): WheelSegment[] {
  const segmentAngle = 360 / segments.length;
  
  return segments.map((segment, index) => ({
    ...segment,
    angle: index * segmentAngle,
  }));
}
