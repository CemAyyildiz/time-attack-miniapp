import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import TimeAttack from './games/time-attack';

export default function App() {
  useEffect(() => {
    // Notify Base app that mini-app is ready to display
    sdk.actions.ready();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-2 py-6">
          <h1 className="text-4xl font-bold uppercase tracking-widest retro-shadow">
            ⏱️ TIME ATTACK
          </h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Stop at exactly 10.00 seconds!
          </p>
        </header>
        <TimeAttack />
      </div>
    </div>
  );
}
