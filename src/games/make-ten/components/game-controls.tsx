import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  isPlaying: boolean;
  gameOver: boolean;
  onStart: () => void;
  onReset: () => void;
}

export default function GameControls({ isPlaying, gameOver, onStart, onReset }: GameControlsProps) {
  return (
    <div className="flex gap-4 justify-center">
      {!isPlaying && !gameOver && (
        <Button
          onClick={onStart}
          size="lg"
          className="min-w-[200px] text-xs uppercase tracking-widest animate-pulse"
        >
          <Play className="mr-2 h-5 w-5" />
          ▶ START GAME
        </Button>
      )}

      {gameOver && (
        <Button
          onClick={onReset}
          size="lg"
          className="min-w-[200px] text-xs uppercase tracking-widest"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          ↻ PLAY AGAIN
        </Button>
      )}
    </div>
  );
}
