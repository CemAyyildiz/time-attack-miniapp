import GameLayout from '@/components/layout/game-layout';
import WheelOfFortune from '@/games/wheel-of-fortune';

export default function WheelOfFortunePage() {
  return (
    <GameLayout
      data={{
        title: 'Wheel of Fortune',
        description: 'Spin the wheel and win your prize!',
        children: <WheelOfFortune />,
      }}
    />
  );
}
