import { useState, useCallback } from 'react';
import { selectPrizeByProbability } from '../utils/probability';
import { calculateFinalAngle, calculateSpinDuration } from '../utils/physics';

interface UseWheelSpinProps {
  segments: WheelSegment[];
  onSpinComplete: (result: WheelSpinResult) => void;
}

export function useWheelSpin({ segments, onSpinComplete }: UseWheelSpinProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState<WheelSegment | null>(null);

  const spin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedSegment(null);

    const winningSegment = selectPrizeByProbability(segments);
    const segmentIndex = segments.findIndex((s) => s.id === winningSegment.id);
    const finalAngle = calculateFinalAngle(segmentIndex, segments.length);
    const duration = calculateSpinDuration();

    const startTime = Date.now();
    const startAngle = currentAngle;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const angle = startAngle + finalAngle * easeProgress;
      
      setCurrentAngle(angle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setSelectedSegment(winningSegment);
        
        onSpinComplete({
          segment: winningSegment,
          finalAngle: angle,
          spinDuration: duration,
          timestamp: Date.now(),
        });
      }
    };

    requestAnimationFrame(animate);
  }, [isSpinning, segments, currentAngle, onSpinComplete]);

  return {
    isSpinning,
    currentAngle,
    selectedSegment,
    spin,
  };
}
