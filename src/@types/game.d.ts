// Game-related global types

interface BaseGame {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  difficulty: GameDifficulty;
  isActive: boolean;
}

interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  category: GameCategory;
  difficulty: GameDifficulty;
}

type GameCategory = 'luck' | 'skill' | 'reflex' | 'puzzle';

type GameDifficulty = 'easy' | 'medium' | 'hard';

interface GameResult {
  gameId: string;
  score: number;
  timestamp: number;
  success: boolean;
  metadata?: Record<string, unknown>;
}

interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  isFinished: boolean;
  currentScore: number;
}
