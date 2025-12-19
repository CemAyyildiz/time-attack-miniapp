import CONTRACT_JSON from '@/contracts/TimeAttackGame.json';

export const TIMEATTACK_CONTRACT_ADDRESS = import.meta.env.VITE_TIMEATTACK_CONTRACT_ADDRESS || '';

export const GAME_CONTRACT_ABI = CONTRACT_JSON.abi;
