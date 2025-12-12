// User and session type definitions

declare interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: number;
  stats: UserStats;
}

declare interface UserStats {
  totalGamesPlayed: number;
  totalScore: number;
  favoriteGame: string | null;
  achievements: Achievement[];
}

declare interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
  isUnlocked: boolean;
}

declare interface UserSession {
  user: User | null;
  isAuthenticated: boolean;
  sessionStart: number;
}
