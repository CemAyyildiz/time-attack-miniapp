import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAccuracyLevel } from '../utils/time-calculation';
import { formatTime } from '@/lib/utils/format';

interface ResultPanelProps {
  result: TimeAttackResult | null;
}

export default function ResultPanel({ result }: ResultPanelProps) {
  if (!result) return null;

  const accuracyLevel = getAccuracyLevel(result.difference);

  return (
    <Card className="border-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xs uppercase tracking-widest">
          <span>◆ LAST RESULT ◆</span>
          <Badge 
            variant={result.isSuccess ? 'default' : 'secondary'}
            style={{ backgroundColor: accuracyLevel.color }}
            className="text-white uppercase tracking-wider"
          >
            {accuracyLevel.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="pixel-corners border-2 border-primary p-3 bg-primary/5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">YOUR TIME</p>
            <p className="text-xl font-bold">{formatTime(result.stoppedTime)}</p>
          </div>
          <div className="pixel-corners border-2 border-secondary p-3 bg-secondary/5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">DIFFERENCE</p>
            <p className="text-xl font-bold">{(result.difference / 1000).toFixed(2)}s</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
