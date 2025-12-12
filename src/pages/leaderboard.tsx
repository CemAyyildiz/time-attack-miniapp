import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: '1',
    username: 'Player1',
    gameId: 'wheel-of-fortune',
    score: 15000,
    timestamp: Date.now() - 3600000,
    rank: 1,
  },
  {
    id: '2',
    username: 'Player2',
    gameId: 'time-attack',
    score: 9800,
    timestamp: Date.now() - 7200000,
    rank: 2,
  },
  {
    id: '3',
    username: 'Player3',
    gameId: 'wheel-of-fortune',
    score: 12500,
    timestamp: Date.now() - 10800000,
    rank: 3,
  },
];

const RANK_ICONS = {
  1: <Trophy className="h-6 w-6 text-yellow-500" />,
  2: <Medal className="h-6 w-6 text-gray-400" />,
  3: <Award className="h-6 w-6 text-amber-600" />,
};

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest animate-pulse text-primary">
          ★★ HIGH SCORES ★★
        </h1>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          [ TOP PLAYERS ]
        </p>
      </div>

      <Card className="border-4">
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-widest text-center">◆ ALL TIME ◆</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_LEADERBOARD.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 border-2 bg-card hover:bg-accent transition-all pixel-corners hover:translate-x-1"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 pixel-corners border-2 border-primary p-2 bg-primary/10">
                    {entry.rank <= 3 ? (
                      RANK_ICONS[entry.rank as keyof typeof RANK_ICONS]
                    ) : (
                      <span className="text-sm font-bold text-muted-foreground">
                        #{entry.rank}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wider">{entry.username}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      {entry.gameId === 'wheel-of-fortune'
                        ? '► WHEEL'
                        : '► TIME ATTACK'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-sm font-bold px-4 py-1 pixel-corners border-2 border-primary bg-primary/20">
                    {entry.score.toLocaleString('tr-TR')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
