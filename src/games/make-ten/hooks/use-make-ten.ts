import { useState, useCallback, useEffect } from 'react';
import { generateGrid, removeNumbers } from '../utils/grid-generator';
import { MAKE_TEN_CONFIG } from '@/lib/constants/game-constants';

export function useMakeTen() {
  const [grid, setGrid] = useState<number[][]>(() => generateGrid());
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(MAKE_TEN_CONFIG.TIMER_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ row: number; col: number } | null>(null);

  // Timer
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 100) {
          setGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver]);

  const selectCell = useCallback(
    (row: number, col: number) => {
      if (!isPlaying || gameOver || !isDragging || !dragStart) return;

      // Calculate rectangle bounds from dragStart to current cell
      const minRow = Math.min(dragStart.row, row);
      const maxRow = Math.max(dragStart.row, row);
      const minCol = Math.min(dragStart.col, col);
      const maxCol = Math.max(dragStart.col, col);

      // Create all cells in the rectangle
      const rectangleCells: { row: number; col: number }[] = [];
      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          if (grid[r][c] !== -1) { // Skip empty cells
            rectangleCells.push({ row: r, col: c });
          }
        }
      }

      setSelectedCells(rectangleCells);
    },
    [dragStart, isPlaying, gameOver, isDragging, grid]
  );

  const startDrag = useCallback((row: number, col: number) => {
    if (!isPlaying || gameOver) return;
    setIsDragging(true);
    setDragStart({ row, col });
    setSelectedCells([{ row, col }]);
  }, [isPlaying, gameOver]);

  const endDrag = useCallback(() => {
    if (!isPlaying || gameOver || !isDragging) return;
    
    setIsDragging(false);
    setDragStart(null);

    // Calculate sum
    const currentSum = selectedCells.reduce(
      (sum, cell) => sum + grid[cell.row][cell.col],
      0
    );

    if (currentSum === 10 && selectedCells.length > 0) {
      // Success! Remove all selected cells
      const newCombo = combo + 1;
      const points = Math.floor(
        MAKE_TEN_CONFIG.POINTS_PER_MATCH * Math.pow(MAKE_TEN_CONFIG.COMBO_MULTIPLIER, newCombo - 1)
      );

      setScore((prev) => prev + points);
      setCombo(newCombo);
      setGrid((prevGrid) => removeNumbers(prevGrid, selectedCells));
    } else {
      // Failed - reset combo
      setCombo(0);
    }
    
    setSelectedCells([]);
  }, [selectedCells, grid, isPlaying, gameOver, combo, isDragging]);

  const startGame = useCallback(() => {
    setGrid(generateGrid());
    setScore(0);
    setCombo(0);
    setTimeLeft(MAKE_TEN_CONFIG.TIMER_DURATION);
    setIsPlaying(true);
    setGameOver(false);
    setSelectedCells([]);
  }, []);

  const resetGame = useCallback(() => {
    setGrid(generateGrid());
    setScore(0);
    setCombo(0);
    setTimeLeft(MAKE_TEN_CONFIG.TIMER_DURATION);
    setIsPlaying(false);
    setGameOver(false);
    setSelectedCells([]);
  }, []);

  return {
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
  };
}
