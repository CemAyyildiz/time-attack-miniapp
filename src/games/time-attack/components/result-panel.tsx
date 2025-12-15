import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAccuracyLevel } from '../utils/time-calculation';
import { formatTime } from '@/lib/utils/format';
import { useWallet, useSubmitScore, useRemainingFreeGames } from '@/lib/blockchain/hooks';
import { Upload, Trophy, Loader2 } from 'lucide-react';
import { parseEther } from 'viem';

interface ResultPanelProps {
  data: {
    result: TimeAttackResult | null;
  };
}

export default function ResultPanel({ data }: ResultPanelProps) {
  const { result } = data;
  const { address, isConnected } = useWallet();
  const { submitScore, isPending, isConfirming, isSuccess, reset } = useSubmitScore();
  const remainingFreeGames = useRemainingFreeGames(address);

  // Reset mutation state when result changes
  if (!result && isSuccess) {
    reset();
  }

  if (!result) return null;

  const accuracyLevel = getAccuracyLevel(result.difference);
  const isPerfect = result.score === 100;
  const needsPayment = remainingFreeGames === 0;
  const gameFee = parseEther('0.000003'); // ~$0.01
  const badgeFee = parseEther('0.00003'); // ~$0.10
  const totalFee = isPerfect ? badgeFee : (needsPayment ? gameFee : BigInt(0));

  const handleSubmit = () => {
    if (result) {
      submitScore(result.score, result.stoppedTime, totalFee);
    }
  };

  return (
    <Card className="border-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xs uppercase tracking-widest">
          <span>◆ LAST RESULT ◆</span>
          <Badge 
            variant={result.isSuccess ? 'default' : 'secondary'}
            style={{ backgroundColor: accuracyLevel.color }}
            className="text-white uppercase tracking-wider"
          >
            {accuracyLevel.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="pixel-corners border-2 border-primary p-3 bg-primary/5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">YOUR TIME</p>
            <p className="text-xl font-bold">{formatTime(result.stoppedTime)}</p>
          </div>
          <div className="pixel-corners border-2 border-secondary p-3 bg-secondary/5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">DIFFERENCE</p>
            <p className="text-xl font-bold">{(result.difference / 1000).toFixed(2)}s</p>
          </div>
          <div className="pixel-corners border-2 border-accent p-3 bg-accent/5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">SCORE</p>
            <p className="text-xl font-bold text-primary">{result.score}</p>
          </div>
        </div>

        {isConnected && result.score > 0 && (
          <div className="space-y-3">
            {/* Fee Badge - always show */}
            <div className="text-center">
              <Badge 
                variant={totalFee > 0 ? "default" : "secondary"}
                className="text-xs uppercase tracking-wider"
              >
                {isPerfect 
                  ? '💎 Perfect Badge: $0.10' 
                  : (needsPayment ? '💰 Fee: $0.01' : '🆓 FREE')}
              </Badge>
            </div>

            {/* Submit Button - always same text */}
            <div className="flex justify-center">
              {isSuccess ? (
                <div className="text-center space-y-2 animate-bounce">
                  <Trophy className="h-8 w-8 text-primary mx-auto" />
                  <p className="text-xs text-primary uppercase tracking-widest">
                    ✅ Saved Onchain!
                  </p>
                </div>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isPending || isConfirming}
                  className="min-w-[200px] text-xs uppercase tracking-widest"
                >
                  {isPending || isConfirming ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isPending ? 'Confirm in wallet...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit to Blockchain
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        {!isConnected && result.score > 0 && (
          <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest">
            Connect wallet to save score onchain
          </p>
        )}
      </CardContent>
    </Card>
  );
}
