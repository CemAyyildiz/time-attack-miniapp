import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award } from 'lucide-react';
import { getGameLeaderboard } from '@/lib/utils/storage';
import { formatScore, formatTime } from '@/lib/utils/format';
import { useEffect, useState } from 'react';
import { GAME_IDS } from '@/lib/constants/game-constants';

interface GameLeaderboardProps {
  gameId: string;
  currentScore?: number;
}

const RANK_ICONS = {
  1: <Trophy className="h-5 w-5 text-yellow-500" />,
  2: <Medal className="h-5 w-5 text-gray-400" />,
  3: <Award className="h-5 w-5 text-amber-600" />,
};

export default function GameLeaderboard({ gameId, currentScore }: GameLeaderboardProps) {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    setScores(getGameLeaderboard(gameId, 5));
  }, [gameId, currentScore, updateTrigger]);

  useEffect(() => {
    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes('leaderboard')) {
        setUpdateTrigger(prev => prev + 1);
      }
    };

    // Also update when this component mounts or when visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setUpdateTrigger(prev => prev + 1);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Poll for updates every 2 seconds
    const interval = setInterval(() => {
      setUpdateTrigger(prev => prev + 1);
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  if (scores.length === 0) {
    return (
      <Card className="border-4 border-muted">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-widest text-center">
            ★ TOP 5 SCORES ★
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-[10px] text-muted-foreground uppercase tracking-wider">
            NO SCORES YET
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-primary">
      <CardHeader>
        <CardTitle className="text-xs uppercase tracking-widest text-center">
          ★ TOP 5 SCORES ★
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {scores.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-3 pixel-corners border-2 border-muted bg-background hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 flex justify-center">
                  {RANK_ICONS[entry.rank as keyof typeof RANK_ICONS] || (
                    <span className="text-xs font-bold text-muted-foreground">
                      #{entry.rank}
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {entry.username}
                </span>
              </div>
              <div className="text-right">
                {gameId === GAME_IDS.TIME_ATTACK ? (
                  <>
                    <div className="text-sm font-bold text-primary">
                      {formatTime(entry.metadata?.stoppedTime || 0)}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      Δ {((entry.metadata?.difference || 0) / 1000).toFixed(2)}s
                    </div>
                  </>
                ) : (
                  <span className="text-sm font-bold text-primary">
                    {formatScore(entry.score)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
