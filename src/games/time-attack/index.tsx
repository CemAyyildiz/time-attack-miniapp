import { useState } from 'react';
import ChronometerDisplay from './components/chronometer-display';
import StopButton from './components/stop-button';
import ResultPanel from './components/result-panel';
import { useChronometer } from './hooks/use-chronometer';
import { useAccuracyCheck } from './hooks/use-accuracy-check';

export default function TimeAttack() {
  const [lastResult, setLastResult] = useState<TimeAttackResult | null>(null);
  
  const { isRunning, currentTime, start, stop, reset } = useChronometer();
  const { results, checkAccuracy, resetResults } = useAccuracyCheck();

  const handleStart = () => {
    setLastResult(null);
    start();
  };

  const handleStop = () => {
    const stoppedTime = stop();
    const result = checkAccuracy(stoppedTime);
    setLastResult(result);
  };

  const handleReset = () => {
    reset();
    resetResults();
    setLastResult(null);
  };

  return (
    <div className="space-y-8">
      <ChronometerDisplay currentTime={currentTime} isRunning={isRunning} />

      <StopButton
        isRunning={isRunning}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        canReset={results.length > 0}
      />

      <ResultPanel result={lastResult} />
    </div>
  );
}
