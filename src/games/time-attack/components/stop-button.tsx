import { Button } from '@/components/ui/button';
import { Play, Square, RotateCcw } from 'lucide-react';

interface StopButtonProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  canReset: boolean;
}

export default function StopButton({ 
  isRunning, 
  onStart, 
  onStop, 
  onReset,
  canReset 
}: StopButtonProps) {
  return (
    <div className="flex gap-4 justify-center">
      {!isRunning && !canReset && (
        <Button
          onClick={onStart}
          size="lg"
          className="min-w-[180px] text-xs uppercase tracking-widest"
        >
          <Play className="mr-2 h-5 w-5" />
          ▶ START
        </Button>
      )}

      {isRunning && (
        <Button
          onClick={onStop}
          size="lg"
          variant="destructive"
          className="min-w-[180px] text-xs uppercase tracking-widest"
        >
          <Square className="mr-2 h-5 w-5" />
          ■ STOP
        </Button>
      )}

      {canReset && !isRunning && (
        <Button
          onClick={onReset}
          size="lg"
          variant="outline"
          className="text-xs uppercase tracking-widest"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          ↻ NEW GAME
        </Button>
      )}
    </div>
  );
}
