import { Card, CardContent } from '@/components/ui/card';
import { formatScore } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface ScoreDisplayProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
};

export default function ScoreDisplay({
  score,
  label = 'Skor',
  size = 'md',
  className,
}: ScoreDisplayProps) {
  return (
    <Card className={cn('text-center border-4 border-primary', className)}>
      <CardContent className="pt-6">
        <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-widest">{label}</p>
        <p className={cn('font-bold text-primary tabular-nums animate-pulse pixel-corners border-2 border-primary inline-block px-4 py-2', SIZE_CLASSES[size])}>
          {formatScore(score)}
        </p>
      </CardContent>
    </Card>
  );
}
