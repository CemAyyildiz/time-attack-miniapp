import GameLayout from '@/components/layout/game-layout';
import MakeTen from '@/games/make-ten';

export default function MakeTenPage() {
  return (
    <GameLayout
      data={{
        title: 'Make Ten',
        description: 'Match adjacent numbers that add up to 10!',
        children: <MakeTen />,
      }}
    />
  );
}
