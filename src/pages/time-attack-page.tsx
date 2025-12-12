import GameLayout from '@/components/layout/game-layout';
import TimeAttack from '@/games/time-attack';

export default function TimeAttackPage() {
  return (
    <GameLayout
      title="Time Attack"
      description="Stop the chronometer at exactly 10.00 seconds!"
    >
      <TimeAttack />
    </GameLayout>
  );
}
