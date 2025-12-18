import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

const BASE_MAINNET_CHAIN_ID = 8453;

export default function WalletConnect() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // Otomatik olarak Base mainnet'e geç
  useEffect(() => {
    if (isConnected && chain?.id !== BASE_MAINNET_CHAIN_ID) {
      console.log('Wrong network detected:', chain?.id, 'Switching to Base mainnet:', BASE_MAINNET_CHAIN_ID);
      switchChain?.({ chainId: BASE_MAINNET_CHAIN_ID });
    }
  }, [isConnected, chain, switchChain]);

  if (isConnected && address) {
    const isWrongNetwork = chain?.id !== BASE_MAINNET_CHAIN_ID;
    
    return (
      <div className="flex items-center gap-2">
        {isWrongNetwork ? (
          <Button
            onClick={() => switchChain?.({ chainId: BASE_MAINNET_CHAIN_ID })}
            variant="destructive"
            size="sm"
            className="text-xs uppercase tracking-wider animate-pulse"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Switch to Base Mainnet
          </Button>
        ) : null}
        <div className="pixel-corners border-2 border-primary px-3 py-1 bg-primary/10">
          <p className="text-[10px] uppercase tracking-widest text-primary">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          size="sm"
          className="text-xs uppercase tracking-wider"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => connect({ connector: connectors[0] })}
      size="lg"
      className="min-w-[200px] text-xs uppercase tracking-widest animate-pulse"
    >
      <Wallet className="mr-2 h-5 w-5" />
      Connect Wallet
    </Button>
  );
}
