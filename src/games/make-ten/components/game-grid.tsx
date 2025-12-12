import { cn } from '@/lib/utils/cn';

interface GameGridProps {
  grid: number[][];
  selectedCells: { row: number; col: number }[];
  onCellEnter: (row: number, col: number) => void;
  onMouseDown: (row: number, col: number) => void;
  onMouseUp: () => void;
  isPlaying: boolean;
  isDragging: boolean;
}

export default function GameGrid({ 
  grid, 
  selectedCells, 
  onCellEnter, 
  onMouseDown, 
  onMouseUp, 
  isPlaying,
  isDragging 
}: GameGridProps) {
  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some((cell) => cell.row === row && cell.col === col);
  };

  // Get selection bounds for border rendering
  const getSelectionBounds = () => {
    if (selectedCells.length === 0) return null;
    
    const rows = selectedCells.map(c => c.row);
    const cols = selectedCells.map(c => c.col);
    
    return {
      minRow: Math.min(...rows),
      maxRow: Math.max(...rows),
      minCol: Math.min(...cols),
      maxCol: Math.max(...cols),
    };
  };

  const bounds = getSelectionBounds();

  const isTopBorder = (row: number, col: number) => {
    return bounds && row === bounds.minRow && isCellSelected(row, col);
  };

  const isBottomBorder = (row: number, col: number) => {
    return bounds && row === bounds.maxRow && isCellSelected(row, col);
  };

  const isLeftBorder = (row: number, col: number) => {
    return bounds && col === bounds.minCol && isCellSelected(row, col);
  };

  const isRightBorder = (row: number, col: number) => {
    return bounds && col === bounds.maxCol && isCellSelected(row, col);
  };

  return (
    <div className="flex justify-center">
      <div 
        className="inline-grid grid-cols-10 gap-1 p-4 bg-card border-4 border-primary pixel-corners select-none"
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const isEmpty = value === -1;
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onMouseEnter={() => !isEmpty && isDragging && onCellEnter(rowIndex, colIndex)}
                onMouseDown={() => {
                  if (isEmpty) return;
                  onMouseDown(rowIndex, colIndex);
                }}
                className={cn(
                  'w-12 h-12 text-lg font-bold uppercase tracking-widest transition-all flex items-center justify-center relative',
                  isEmpty
                    ? 'bg-muted/20 border-2 border-muted/50 pixel-corners'
                    : 'bg-background text-foreground border-2 border-muted pixel-corners',
                  !isPlaying && 'opacity-50',
                  isPlaying && !isEmpty && 'cursor-pointer'
                )}
                style={{
                  borderTopWidth: isTopBorder(rowIndex, colIndex) ? '4px' : '2px',
                  borderBottomWidth: isBottomBorder(rowIndex, colIndex) ? '4px' : '2px',
                  borderLeftWidth: isLeftBorder(rowIndex, colIndex) ? '4px' : '2px',
                  borderRightWidth: isRightBorder(rowIndex, colIndex) ? '4px' : '2px',
                  borderTopColor: isTopBorder(rowIndex, colIndex) ? 'hsl(142.1 76.2% 36.3%)' : undefined,
                  borderBottomColor: isBottomBorder(rowIndex, colIndex) ? 'hsl(142.1 76.2% 36.3%)' : undefined,
                  borderLeftColor: isLeftBorder(rowIndex, colIndex) ? 'hsl(142.1 76.2% 36.3%)' : undefined,
                  borderRightColor: isRightBorder(rowIndex, colIndex) ? 'hsl(142.1 76.2% 36.3%)' : undefined,
                }}
              >
                {isEmpty ? '' : value}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
