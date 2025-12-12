import { formatTime } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { TIME_ATTACK_CONFIG } from '@/lib/constants/game-constants';

interface ChronometerDisplayProps {
  currentTime: number;
  isRunning: boolean;
}

export default function ChronometerDisplay({ currentTime, isRunning }: ChronometerDisplayProps) {
  const targetSeconds = TIME_ATTACK_CONFIG.TARGET_TIME / 1000;

  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">[ TARGET TIME ]</p>
        <p className="text-xl font-semibold text-muted-foreground pixel-corners border-2 border-muted inline-block px-4 py-2">
          {targetSeconds.toFixed(2)}s
        </p>
      </div>

      <div className={cn(
        'text-7xl font-bold tabular-nums transition-all pixel-corners border-8 inline-block px-8 py-6',
        isRunning ? 'text-primary border-primary bg-primary/10' : 'text-foreground border-muted'
      )}>
        {formatTime(currentTime)}
      </div>

      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
        {isRunning ? '[ STOP AT 10.00 SECONDS ]' : '[ PRESS START ]'}
      </p>
    </div>
  );
}
