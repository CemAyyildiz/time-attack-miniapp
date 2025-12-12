import { useState, useCallback } from 'react';
import { calculateAccuracy, calculateDifference, isSuccess } from '../utils/time-calculation';

export function useAccuracyCheck() {
  const [results, setResults] = useState<TimeAttackResult[]>([]);
  const [bestAccuracy, setBestAccuracy] = useState(0);

  const checkAccuracy = useCallback((stoppedTime: number): TimeAttackResult => {
    const difference = calculateDifference(stoppedTime);
    const accuracy = calculateAccuracy(stoppedTime);
    const success = isSuccess(stoppedTime);

    const result: TimeAttackResult = {
      stoppedTime,
      difference,
      accuracy,
      isSuccess: success,
      timestamp: Date.now(),
    };

    setResults((prev) => [...prev, result]);
    
    if (accuracy > bestAccuracy) {
      setBestAccuracy(accuracy);
    }

    return result;
  }, [bestAccuracy]);

  const resetResults = useCallback(() => {
    setResults([]);
    setBestAccuracy(0);
  }, []);

  return {
    results,
    bestAccuracy,
    checkAccuracy,
    resetResults,
  };
}
