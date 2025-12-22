import { useState, useEffect, useRef } from 'react';
import ChronometerDisplay from './components/chronometer-display';
import StopButton from './components/stop-button';
import ResultPanel from './components/result-panel';
import { useChronometer } from './hooks/use-chronometer';
import { useAccuracyCheck } from './hooks/use-accuracy-check';

export default function TimeAttack() {
  const [lastResult, setLastResult] = useState<TimeAttackResult | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  
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

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Space bar - Start/Stop game
      if (e.code === 'Space') {
        e.preventDefault();
        if (!isRunning && results.length === 0) {
          handleStart();
        } else if (isRunning) {
          handleStop();
        }
      }

      // Enter - Submit to blockchain
      if (e.code === 'Enter' && lastResult && !isRunning) {
        e.preventDefault();
        // Find and click the submit button
        const submitButton = document.querySelector('[data-submit-button]') as HTMLButtonElement;
        if (submitButton && !submitButton.disabled) {
          submitButton.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, results.length, lastResult, handleStart, handleStop]);

  return (
    <div className="space-y-8">
      <ChronometerDisplay data={{ currentTime, isRunning }} />

      <StopButton
        data={{
          isRunning,
          onStart: handleStart,
          onStop: handleStop,
          onReset: handleReset,
          canReset: results.length > 0,
        }}
      />

      <ResultPanel data={{ result: lastResult }} />
    </div>
  );
}
