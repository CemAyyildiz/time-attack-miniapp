import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import TimeAttack from './games/time-attack';
import WalletConnect from './components/common/wallet-connect';
import Leaderboard from './pages/leaderboard';
import { Button } from './components/ui/button';
import { Trophy, Timer } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'game' | 'leaderboard'>('game');

  useEffect(() => {
    // Notify Base app that mini-app is ready to display
    sdk.actions.ready();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="glow-orb"></div>
        <div className="glow-orb"></div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        <header className="text-center space-y-4 py-6">
          <h1 className="text-4xl font-bold uppercase tracking-widest retro-shadow">
            ⏱️ PERFECT10
          </h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Stop at exactly 10.00 seconds!
          </p>
          
          {/* Navigation */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant={currentPage === 'game' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('game')}
              className="text-xs uppercase tracking-widest"
            >
              <Timer className="mr-2 h-4 w-4" />
              Play Game
            </Button>
            <Button
              variant={currentPage === 'leaderboard' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('leaderboard')}
              className="text-xs uppercase tracking-widest"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Leaderboard
            </Button>
          </div>

          <div className="flex justify-center pt-2">
            <WalletConnect />
          </div>
        </header>

        {/* Page Content */}
        {currentPage === 'game' ? <TimeAttack /> : <Leaderboard />}
      </div>
    </div>
  );
}
