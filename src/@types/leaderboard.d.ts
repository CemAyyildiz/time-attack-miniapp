// Leaderboard-related global types

interface LeaderboardEntry {
  id: string;
  username: string;
  gameId: string;
  score: number;
  timestamp: number;
  rank: number;
  metadata?: {
    stoppedTime?: number;
    difference?: number;
    [key: string]: unknown;
  };
}
