import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  usePlayerScores, 
  usePlayerBestScore, 
  usePlayerRank,
  useHasPerfectBadge,
  useWallet 
} from '@/lib/blockchain/hooks';
import { Trophy, Target, Clock, Award } from 'lucide-react';
import { formatTime } from '@/lib/utils/format';

export default function PlayerStats() {
  const { address, isConnected } = useWallet();
  const playerScores = usePlayerScores(address);
  const bestScore = usePlayerBestScore(address);
  const rank = usePlayerRank(address);
  const hasBadge = useHasPerfectBadge(address);

  if (!isConnected || !address) {
    return (
      <Card className="border-2">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground uppercase tracking-widest text-sm">
            Connect wallet to see your stats
          </p>
        </CardContent>
      </Card>
    );
  }

  const scores = playerScores as unknown as BlockchainScoreEntry[];
  const totalGames = scores.length;
  const averageScore = totalGames > 0 
    ? scores.reduce((sum, s) => sum + Number(s.score), 0) / totalGames 
    : 0;

  return (
    <div className="space-y-6">
      {/* Player Overview */}
      <Card className="border-4 border-primary">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-widest flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Your Stats
            </span>
            {hasBadge && (
              <Badge className="bg-yellow-500 text-white uppercase tracking-wider">
                ⭐ Perfect Badge Owner
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center pixel-corners border-2 border-primary p-4 bg-primary/5">
              <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{bestScore}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Best Score
              </p>
            </div>
            <div className="text-center pixel-corners border-2 border-primary p-4 bg-primary/5">
              <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{rank > 0 ? `#${rank}` : '-'}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Rank
              </p>
            </div>
            <div className="text-center pixel-corners border-2 border-primary p-4 bg-primary/5">
              <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{totalGames}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Games Played
              </p>
            </div>
            <div className="text-center pixel-corners border-2 border-primary p-4 bg-primary/5">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{averageScore.toFixed(0)}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Avg Score
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game History */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-widest">
            ◆ Your Game History ◆
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scores.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">
              No games played yet. Start playing to build your history!
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {scores.slice().reverse().map((entry, index) => (
                <div
                  key={index}
                  className="pixel-corners border-2 border-primary/30 p-3 flex items-center gap-4 bg-primary/5"
                >
                  {/* Date */}
                  <div className="text-xs text-muted-foreground min-w-[100px]">
                    {new Date(Number(entry.timestamp) * 1000).toLocaleString()}
                  </div>

                  {/* Time */}
                  <div className="flex-1 text-center">
                    <p className="text-sm font-bold">{formatTime(Number(entry.time))}</p>
                    <p className="text-xs text-muted-foreground">Time</p>
                  </div>

                  {/* Score */}
                  <div className="text-center min-w-[60px]">
                    <p className="text-xl font-bold text-primary">{Number(entry.score)}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>

                  {/* Perfect Badge */}
                  {entry.isPerfect && (
                    <Badge className="bg-yellow-500 text-white">
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
