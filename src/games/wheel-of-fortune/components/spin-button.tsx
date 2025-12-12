import { Button } from '@/components/ui/button';

interface SpinButtonProps {
  data: {
    onSpin: () => void;
    isSpinning: boolean;
  };
}

export default function SpinButton({ data }: SpinButtonProps) {
  const { onSpin, isSpinning } = data;
  return (
    <div className="flex justify-center">
      <Button
        onClick={onSpin}
        disabled={isSpinning}
        size="lg"
        className="min-w-[250px] text-xs uppercase tracking-widest animate-pulse"
      >
        {isSpinning ? '►► SPINNING... ◄◄' : '▶ SPIN THE WHEEL!'}
      </Button>
    </div>
  );
}
