import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTopScores, useGameStats } from '@/lib/blockchain/hooks';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { formatTime } from '@/lib/utils/format';
import { useMemo } from 'react';

interface PlayerStats {
  player: string;
  totalScore: number;
  gamesPlayed: number;
  bestScore: number;
  bestTime: number;
  hasPerfect: boolean;
  lastPlayed: number;
}

export default function OnchainLeaderboard() {
  const topScores = useTopScores(100); // Get all scores
  const stats = useGameStats();

  // Group scores by player
  const playerStats = useMemo(() => {
    const scores = topScores as unknown as BlockchainScoreEntry[];
    const playerMap = new Map<string, PlayerStats>();

    scores.forEach((entry) => {
      const existing = playerMap.get(entry.player);
      const score = Number(entry.score);
      const time = Number(entry.time);
      const timestamp = Number(entry.timestamp);

      if (existing) {
        existing.totalScore += score;
        existing.gamesPlayed += 1;
        if (score > existing.bestScore) {
          existing.bestScore = score;
          existing.bestTime = time;
        }
        if (entry.isPerfect) {
          existing.hasPerfect = true;
        }
        if (timestamp > existing.lastPlayed) {
          existing.lastPlayed = timestamp;
        }
      } else {
        playerMap.set(entry.player, {
          player: entry.player,
          totalScore: score,
          gamesPlayed: 1,
          bestScore: score,
          bestTime: time,
          hasPerfect: entry.isPerfect,
          lastPlayed: timestamp,
        });
      }
    });

    // Sort by total score
    return Array.from(playerMap.values())
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10);
  }, [topScores]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-600" />;
      default:
        return <span className="text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-2">
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{stats.totalGames}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Total Games
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="pt-6 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{stats.totalPerfectBadges}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Perfect Badges
            </p>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="pt-6 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{stats.leaderboardSize}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Players Ranked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="border-4">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-widest flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            ◆ Top 10 Players (Total Score) ◆
          </CardTitle>
        </CardHeader>
        <CardContent>
          {playerStats.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">
              No scores yet. Be the first to play!
            </p>
          ) : (
            <div className="space-y-2">
              {playerStats.map((player, index) => (
                <div
                  key={player.player}
                  className={`
                    pixel-corners border-2 p-4 flex items-center gap-4
                    ${index === 0 ? 'border-yellow-500 bg-yellow-500/10' : ''}
                    ${index === 1 ? 'border-gray-400 bg-gray-400/10' : ''}
                    ${index === 2 ? 'border-orange-600 bg-orange-600/10' : ''}
                    ${index > 2 ? 'border-primary/30 bg-primary/5' : ''}
                  `}
                >
                  {/* Rank */}
                  <div className="w-12 text-center font-bold">
                    {getRankIcon(index + 1)}
                  </div>

                  {/* Player Address */}
                  <div className="flex-1">
                    <p className="font-mono text-sm font-bold">
                      {player.player.slice(0, 6)}...{player.player.slice(-4)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {player.gamesPlayed} games played
                    </p>
                  </div>

                  {/* Best Time */}
                  <div className="text-center">
                    <p className="text-sm font-bold">{formatTime(player.bestTime)}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                      Best Time
                    </p>
                  </div>

                  {/* Total Score */}
                  <div className="text-center min-w-[100px]">
                    <p className="text-2xl font-bold text-primary">{player.totalScore}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                      Total Score
                    </p>
                  </div>

                  {/* Perfect Badge */}
                  {player.hasPerfect && (
                    <Badge className="bg-yellow-500 text-white uppercase tracking-wider">
                      ⭐ Perfect
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
