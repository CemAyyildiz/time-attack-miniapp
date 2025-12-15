import OnchainLeaderboard from '@/components/common/onchain-leaderboard';
import PlayerStats from '@/components/common/player-stats';

export default function Leaderboard() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest animate-pulse text-primary">
          ★★ ONCHAIN LEADERBOARD ★★
        </h1>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          [ BASE SEPOLIA TESTNET ]
        </p>
      </div>

      {/* Player Stats Section */}
      <PlayerStats />

      {/* Global Leaderboard */}
      <OnchainLeaderboard />
    </div>
  );
}
