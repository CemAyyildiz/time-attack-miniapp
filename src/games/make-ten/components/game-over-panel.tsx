import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatScore } from '@/lib/utils/format';

interface GameOverPanelProps {
  score: number;
  gameOver: boolean;
}

export default function GameOverPanel({ score, gameOver }: GameOverPanelProps) {
  if (!gameOver) return null;

  return (
    <Card className="border-4 border-destructive animate-bounce">
      <CardHeader>
        <CardTitle className="text-center text-xl uppercase tracking-widest text-destructive">
          ►► GAME OVER ◄◄
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-2">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
          FINAL SCORE
        </p>
        <p className="text-4xl font-bold text-primary">
          {formatScore(score)}
        </p>
      </CardContent>
    </Card>
  );
}
