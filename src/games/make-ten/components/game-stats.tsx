import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatScore } from '@/lib/utils/format';
import { MAKE_TEN_CONFIG } from '@/lib/constants/game-constants';

interface GameStatsProps {
  score: number;
  combo: number;
  timeLeft: number;
}

export default function GameStats({ score, combo, timeLeft }: GameStatsProps) {
  const timeInSeconds = (timeLeft / 1000).toFixed(1);
  const progress = (timeLeft / MAKE_TEN_CONFIG.TIMER_DURATION) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-4 border-primary">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-widest">◆ SCORE ◆</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-primary animate-pulse">
            {formatScore(score)}
          </p>
        </CardContent>
      </Card>

      <Card className="border-4 border-secondary">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-widest flex items-center justify-between">
            <span>◆ COMBO ◆</span>
            {combo > 0 && (
              <Badge className="uppercase tracking-wider animate-bounce">
                x{combo}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-primary">
            {combo}
          </p>
        </CardContent>
      </Card>

      <Card className="border-4 border-accent">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-widest">◆ TIME LEFT ◆</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className={`text-3xl font-bold ${timeLeft < 10000 ? 'text-destructive animate-pulse' : 'text-primary'}`}>
            {timeInSeconds}s
          </p>
          <div className="w-full bg-muted h-2 pixel-corners border-2 border-muted-foreground">
            <div
              className="h-full bg-primary transition-all pixel-corners"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
