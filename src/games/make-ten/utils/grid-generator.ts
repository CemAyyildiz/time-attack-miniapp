import { MAKE_TEN_CONFIG } from '@/lib/constants/game-constants';

export function generateGrid(): number[][] {
  const grid: number[][] = [];
  const { GRID_SIZE, MIN_NUMBER, MAX_NUMBER } = MAKE_TEN_CONFIG;

  for (let row = 0; row < GRID_SIZE; row++) {
    const rowNumbers: number[] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      rowNumbers.push(Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER);
    }
    grid.push(rowNumbers);
  }

  return grid;
}

export function checkForMatches(grid: number[][]): boolean {
  const { GRID_SIZE } = MAKE_TEN_CONFIG;

  // Check horizontal pairs
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE - 1; col++) {
      if (grid[row][col] + grid[row][col + 1] === 10) {
        return true;
      }
    }
  }

  // Check vertical pairs
  for (let row = 0; row < GRID_SIZE - 1; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] + grid[row + 1][col] === 10) {
        return true;
      }
    }
  }

  return false;
}

export function removeNumbers(
  grid: number[][],
  positions: { row: number; col: number }[]
): number[][] {
  const newGrid = grid.map((row) => [...row]);

  // Mark positions to remove as -1 (empty)
  positions.forEach(({ row, col }) => {
    newGrid[row][col] = -1;
  });

  return newGrid;
}
