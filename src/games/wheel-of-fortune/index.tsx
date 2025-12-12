import { useState } from 'react';
import WheelCanvas from './components/wheel-canvas';
import SpinButton from './components/spin-button';
import PrizeSection from './components/prize-section';
import { useWheelSpin } from './hooks/use-wheel-spin';
import { calculateSegmentAngles } from './utils/probability';
import { WHEEL_SEGMENTS } from '@/lib/constants/game-constants';

export default function WheelOfFortune() {
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [spinCount, setSpinCount] = useState(0);

  const segments = calculateSegmentAngles(WHEEL_SEGMENTS);

  const handleSpinComplete = (result: WheelSpinResult) => {
    setTotalWinnings((prev) => prev + result.segment.prizeValue);
    setSpinCount((prev) => prev + 1);
  };

  const { isSpinning, currentAngle, selectedSegment, spin } = useWheelSpin({
    segments,
    onSpinComplete: handleSpinComplete,
  });

  return (
    <div className="space-y-8">
      <PrizeSection totalWinnings={totalWinnings} spinCount={spinCount} />

      <div className="flex flex-col items-center gap-6">
        <WheelCanvas segments={segments} currentAngle={currentAngle} />
        <SpinButton onSpin={spin} isSpinning={isSpinning} />
      </div>

      {selectedSegment && !isSpinning && (
        <div className="text-center space-y-2 animate-bounce">
          <p className="text-xl font-bold text-primary uppercase tracking-widest">
            ►► YOU WIN! ◄◄
          </p>
          <p className="text-sm uppercase tracking-wider">
            + {selectedSegment.prizeValue} ₺
          </p>
        </div>
      )}
    </div>
  );
}
