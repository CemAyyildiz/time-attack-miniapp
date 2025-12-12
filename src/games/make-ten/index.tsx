import { useState, useEffect } from 'react';
import GameGrid from './components/game-grid';
import GameStats from './components/game-stats';
import GameControls from './components/game-controls';
import GameOverPanel from './components/game-over-panel';
import UsernameDialog from '@/components/common/username-dialog';
import GameLeaderboard from '@/components/common/game-leaderboard';
import { useMakeTen } from './hooks/use-make-ten';
import { GAME_IDS } from '@/lib/constants/game-constants';
import { getUsername, saveScore } from '@/lib/utils/storage';

export default function MakeTen() {
  const [hasStarted, setHasStarted] = useState(false);
  const [lastSavedScore, setLastSavedScore] = useState(0);

  const {
    grid,
    selectedCells,
    score,
    combo,
    timeLeft,
    isPlaying,
    gameOver,
    isDragging,
    selectCell,
    startDrag,
    endDrag,
    startGame,
    resetGame,
  } = useMakeTen();

  // Save score when game ends
  useEffect(() => {
    if (gameOver && score > 0 && score !== lastSavedScore) {
      const username = getUsername();
      if (username) {
        saveScore(GAME_IDS.MAKE_TEN, score, username);
        setLastSavedScore(score);
      }
    }
  }, [gameOver, score, lastSavedScore]);

  const handleStart = () => {
    setHasStarted(true);
    startGame();
  };

  const handleReset = () => {
    resetGame();
    setHasStarted(false);
    setLastSavedScore(0);
  };

  if (!hasStarted) {
    return (
      <div className="space-y-8">
        <UsernameDialog onStart={handleStart} />
        <GameLeaderboard gameId={GAME_IDS.MAKE_TEN} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
          [ DRAG TO SELECT NUMBERS THAT SUM TO 10 ]
        </p>
      </div>

      <GameStats score={score} combo={combo} timeLeft={timeLeft} />

      <GameGrid
        grid={grid}
        selectedCells={selectedCells}
        onCellEnter={selectCell}
        onMouseDown={startDrag}
        onMouseUp={endDrag}
        isPlaying={isPlaying}
        isDragging={isDragging}
      />

      <GameControls
        isPlaying={isPlaying}
        gameOver={gameOver}
        onStart={startGame}
        onReset={handleReset}
      />

      <GameOverPanel score={score} gameOver={gameOver} />

      {gameOver && (
        <GameLeaderboard gameId={GAME_IDS.MAKE_TEN} currentScore={score} />
      )}
    </div>
  );
}
