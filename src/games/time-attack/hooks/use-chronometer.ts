import { useState, useEffect, useCallback, useRef } from 'react';

export function useChronometer() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  const start = useCallback(() => {
    setIsRunning(true);
    startTimeRef.current = performance.now();
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return currentTime;
  }, [currentTime]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentTime(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const update = () => {
      const elapsed = performance.now() - startTimeRef.current;
      setCurrentTime(elapsed);
      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning]);

  return {
    isRunning,
    currentTime,
    start,
    stop,
    reset,
  };
}
