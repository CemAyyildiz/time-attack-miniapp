// Time Attack specific type definitions

declare interface TimeAttackConfig {
  targetTime: number; // in milliseconds (10000 for 10.00 seconds)
  tolerance: number; // acceptable deviation in milliseconds
  maxAttempts: number;
}

declare interface TimeAttackResult {
  stoppedTime: number;
  difference: number;
  accuracy: number; // percentage
  isSuccess: boolean;
  timestamp: number;
}

declare interface TimeAttackState {
  isRunning: boolean;
  currentTime: number;
  attempts: number;
  bestAccuracy: number;
  results: TimeAttackResult[];
}

declare type TimeAttackStatus = 'ready' | 'running' | 'stopped' | 'success' | 'failed';
