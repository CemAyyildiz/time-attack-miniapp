/**
 * Blockchain-related constants
 * All contract addresses, fees, and network-specific values
 */

// Contract Fees (in ether string format)
export const CONTRACT_FEES = {
  PERFECT_BADGE: '0.00003', // ~$0.10 in ETH
} as const;

// Leaderboard Configuration
export const LEADERBOARD_CONFIG = {
  MAX_SIZE: 100,
  DEFAULT_DISPLAY_COUNT: 5,
} as const;

// Payment Recipient Address
export const PAYMENT_RECIPIENT = '0xcf87bf72d82a60A6b700130cA05188bDD89dA501' as const;

// Network Chain IDs
export const CHAIN_IDS = {
  BASE_MAINNET: 8453,
  BASE_SEPOLIA: 84532,
} as const;

// Score Limits
export const SCORE_LIMITS = {
  MIN: 0,
  MAX: 100,
  PERFECT: 100,
} as const;
