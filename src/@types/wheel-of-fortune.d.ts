// Wheel of Fortune specific type definitions

declare interface WheelSegmentBase {
  id: string;
  label: string;
  color: string;
  probability: number;
  prizeValue: number;
}

declare interface WheelSegment extends WheelSegmentBase {
  angle: number;
}

declare interface WheelConfig {
  segments: WheelSegment[];
  spinDuration: number;
  minSpins: number;
  maxSpins: number;
}

declare interface WheelSpinResult {
  segment: WheelSegment;
  finalAngle: number;
  spinDuration: number;
  timestamp: number;
}

declare interface WheelState {
  isSpinning: boolean;
  currentAngle: number;
  selectedSegment: WheelSegment | null;
  spinCount: number;
  totalWinnings: number;
}
