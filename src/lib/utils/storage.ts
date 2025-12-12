// LocalStorage helper utilities

const STORAGE_PREFIX = 'mini-games';

export const StorageKeys = {
  USER_DATA: `${STORAGE_PREFIX}_user`,
  GAME_STATE: `${STORAGE_PREFIX}_game_state`,
  HIGH_SCORES: `${STORAGE_PREFIX}_high_scores`,
  SETTINGS: `${STORAGE_PREFIX}_settings`,
  USERNAME: `${STORAGE_PREFIX}_username`,
  LEADERBOARD: `${STORAGE_PREFIX}_leaderboard`,
} as const;

export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

export function clearAllStorage(): void {
  try {
    Object.values(StorageKeys).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

// Username management
export function getUsername(): string | null {
  return localStorage.getItem(StorageKeys.USERNAME);
}

export function setUsername(username: string): void {
  localStorage.setItem(StorageKeys.USERNAME, username);
}

// Leaderboard management
export function getLeaderboard(): LeaderboardEntry[] {
  const data = localStorage.getItem(StorageKeys.LEADERBOARD);
  return data ? JSON.parse(data) : [];
}

export function saveScore(gameId: string, score: number, username: string, metadata?: Record<string, unknown>): void {
  const leaderboard = getLeaderboard();
  
  const entry: LeaderboardEntry = {
    id: Date.now().toString(),
    username,
    gameId,
    score,
    timestamp: Date.now(),
    rank: 0,
    metadata,
  };

  leaderboard.push(entry);
  localStorage.setItem(StorageKeys.LEADERBOARD, JSON.stringify(leaderboard));
}

export function getGameLeaderboard(gameId: string, limit: number = 10): LeaderboardEntry[] {
  const allScores = getLeaderboard();
  
  return allScores
    .filter(entry => entry.gameId === gameId)
    .sort((a, b) => {
      // For TIME_ATTACK, lower score (difference) is better
      if (gameId === 'time-attack') {
        return a.score - b.score;
      }
      // For other games, higher score is better
      return b.score - a.score;
    })
    .slice(0, limit)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

export function clearLeaderboard(): void {
  localStorage.removeItem(StorageKeys.LEADERBOARD);
}
