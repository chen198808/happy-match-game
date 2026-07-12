export type CandyType = 0 | 1 | 2 | 3 | 4 | 5;

export type GameStatus = 'playing' | 'won' | 'lost';

export type ToolType = 'hammer' | 'refresh';

export interface CellPosition {
  row: number;
  col: number;
}

export interface GameState {
  board: CandyType[][];
  score: number;
  targetScore: number;
  moves: number;
  maxMoves: number;
  level: number;
  coins: number;
  selectedCell: CellPosition | null;
  isAnimating: boolean;
  gameStatus: GameStatus;
  hammerCount: number;
  refreshCount: number;
  activeTool: ToolType | null;
  combo: number;
  showScorePopups: ScorePopup[];
}

export interface ScorePopup {
  id: number;
  x: number;
  y: number;
  score: number;
}

export const CANDY_EMOJIS: Record<CandyType, string> = {
  0: '🍬',
  1: '🍭',
  2: '🍪',
  3: '🍩',
  4: '🧁',
  5: '🍫',
};

export const CANDY_COLORS: Record<CandyType, string> = {
  0: 'from-pink-400 to-pink-600',
  1: 'from-purple-400 to-purple-600',
  2: 'from-yellow-400 to-yellow-600',
  3: 'from-blue-400 to-blue-600',
  4: 'from-green-400 to-green-600',
  5: 'from-red-400 to-red-600',
};

export const BOARD_SIZE = 8;
export const BASE_SCORE = 10;
export const COMBO_MULTIPLIER = 1.5;
