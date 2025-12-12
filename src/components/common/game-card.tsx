import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';
import { DIFFICULTY_COLORS, DIFFICULTY_LABELS } from '@/lib/constants/ui-constants';

interface GameCardProps {
  data: {
    game: BaseGame;
    className?: string;
  };
}

export default function GameCard({ data }: GameCardProps) {
  const { game, className } = data;
  return (
    <Link to={game.path} className="block group">
      <Card
        className={cn(
          'hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all cursor-pointer h-full border-4',
          !game.isActive && 'opacity-60 cursor-not-allowed',
          className
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="text-5xl animate-bounce">{game.icon}</div>
            <Badge
              variant="secondary"
              className={cn('text-white border-2', DIFFICULTY_COLORS[game.difficulty])}
            >
              {DIFFICULTY_LABELS[game.difficulty]}
            </Badge>
          </div>
          <CardTitle className="mt-4 text-sm uppercase tracking-wider">{game.name}</CardTitle>
          <CardDescription className="text-[10px] uppercase">{game.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {!game.isActive && (
            <p className="text-[10px] text-muted-foreground italic uppercase tracking-widest">[ COMING SOON ]</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
