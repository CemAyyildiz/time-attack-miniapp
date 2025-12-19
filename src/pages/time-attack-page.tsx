import GameLayout from '@/components/layout/game-layout';
import TimeAttack from '@/games/time-attack';

export default function TimeAttackPage() {
  return (
    <GameLayout
      data={{
        title: 'Perfect10',
        description: 'Stop the chronometer at exactly 10.00 seconds!',
        children: <TimeAttack />,
      }}
    />
  );
}
