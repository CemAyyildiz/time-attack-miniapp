import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { TIMEATTACK_CONTRACT_ADDRESS, GAME_CONTRACT_ABI } from './contract';

const BASE_MAINNET_CHAIN_ID = 8453;

export function useSubmitScore() {
  const { writeContract, data: hash, isPending, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { chain } = useAccount();

  const submitScore = (score: number, time: number, value?: bigint) => {
    // CRITICAL: Only allow transactions on Base mainnet
    if (chain?.id !== BASE_MAINNET_CHAIN_ID) {
      console.error('Wrong network! Must be on Base mainnet (8453). Current:', chain?.id);
      alert('Please switch to Base Mainnet!');
      return;
    }

    console.log('Submitting to Base mainnet (8453):', { score, time, value });
    
    writeContract({
      address: TIMEATTACK_CONTRACT_ADDRESS as `0x${string}`,
      abi: GAME_CONTRACT_ABI,
      functionName: 'submitScore',
      args: [BigInt(Math.floor(score)), BigInt(Math.floor(time))],
      value: value || BigInt(0), // Payment amount
      chainId: BASE_MAINNET_CHAIN_ID,
      gas: BigInt(300000), // Set reasonable gas limit for Base (~$0.10-0.30)
    });
  };

  return {
    submitScore,
    isPending,
    isConfirming,
    isSuccess,
    hash,
    reset,
  };
}

export function usePlayerBestScore(address?: string) {
  const { data: bestScore } = useReadContract({
    address: TIMEATTACK_CONTRACT_ADDRESS as `0x${string}`,
    abi: GAME_CONTRACT_ABI,
    functionName: 'playerBestScore',
    args: address ? [address as `0x${string}`] : undefined,
  });

  return bestScore ? Number(bestScore) : 0;
}

export function useHasPerfectBadge(address?: string) {
  const { data: hasBadge } = useReadContract({
    address: TIMEATTACK_CONTRACT_ADDRESS as `0x${string}`,
    abi: GAME_CONTRACT_ABI,
    functionName: 'hasPerfectBadge',
    args: address ? [address as `0x${string}`] : undefined,
  });

  return hasBadge || false;
}

export function useTopScores(count: number = 10) {
  const { data: scores } = useReadContract({
    address: TIMEATTACK_CONTRACT_ADDRESS as `0x${string}`,
    abi: GAME_CONTRACT_ABI,
    functionName: 'getTopScores',
    args: [BigInt(count)],
  });

  return scores || [];
}

export function useGameStats() {
  const { data: stats } = useReadContract({
    address: TIMEATTACK_CONTRACT_ADDRESS as `0x${string}`,
    abi: GAME_CONTRACT_ABI,
    functionName: 'getGameStats',
  });

  if (!stats) return { totalGames: 0, totalPerfectBadges: 0, leaderboardSize: 0 };

  return {
    totalGames: Number(stats[0]),
    totalPerfectBadges: Number(stats[1]),
    leaderboardSize: Number(stats[2]),
  };
}

export function useWallet() {
  const { address, isConnected } = useAccount();
  
  return {
    address,
    isConnected,
  };
}

export function usePlayerScores(address?: string) {
  const { data: scores } = useReadContract({
    address: TIMEATTACK_CONTRACT_ADDRESS as `0x${string}`,
    abi: GAME_CONTRACT_ABI,
    functionName: 'getPlayerScores',
    args: address ? [address as `0x${string}`] : undefined,
  });

  return scores || [];
}

export function usePlayerRank(address?: string) {
  const { data: rank } = useReadContract({
    address: TIMEATTACK_CONTRACT_ADDRESS as `0x${string}`,
    abi: GAME_CONTRACT_ABI,
    functionName: 'getPlayerRank',
    args: address ? [address as `0x${string}`] : undefined,
  });

  return rank ? Number(rank) : 0;
}
