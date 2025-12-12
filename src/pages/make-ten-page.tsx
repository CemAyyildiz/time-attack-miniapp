import GameLayout from '@/components/layout/game-layout';
import MakeTen from '@/games/make-ten';

export default function MakeTenPage() {
  return (
    <GameLayout
      title="Make Ten"
      description="Match adjacent numbers that add up to 10!"
    >
      <MakeTen />
    </GameLayout>
  );
}
