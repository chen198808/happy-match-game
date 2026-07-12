import { CandyType, CellPosition, BOARD_SIZE } from '../types/game';

export function createRandomBoard(): CandyType[][] {
  const board: CandyType[][] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    board[row] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      board[row][col] = getRandomCandy();
    }
  }
  while (hasMatches(board)) {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (isPartOfMatch(board, row, col)) {
          board[row][col] = getRandomCandy();
        }
      }
    }
  }
  return board;
}

export function getRandomCandy(): CandyType {
  return Math.floor(Math.random() * 6) as CandyType;
}

export function findMatches(board: CandyType[][]): Set<string> {
  const matches = new Set<string>();

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE - 2; col++) {
      const candy = board[row][col];
      if (candy === board[row][col + 1] && candy === board[row][col + 2]) {
        matches.add(`${row}-${col}`);
        matches.add(`${row}-${col + 1}`);
        matches.add(`${row}-${col + 2}`);
        let k = col + 3;
        while (k < BOARD_SIZE && board[row][k] === candy) {
          matches.add(`${row}-${k}`);
          k++;
        }
      }
    }
  }

  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = 0; row < BOARD_SIZE - 2; row++) {
      const candy = board[row][col];
      if (candy === board[row + 1][col] && candy === board[row + 2][col]) {
        matches.add(`${row}-${col}`);
        matches.add(`${row + 1}-${col}`);
        matches.add(`${row + 2}-${col}`);
        let k = row + 3;
        while (k < BOARD_SIZE && board[k][col] === candy) {
          matches.add(`${k}-${col}`);
          k++;
        }
      }
    }
  }

  return matches;
}

export function hasMatches(board: CandyType[][]): boolean {
  return findMatches(board).size > 0;
}

function isPartOfMatch(board: CandyType[][], row: number, col: number): boolean {
  const matches = findMatches(board);
  return matches.has(`${row}-${col}`);
}

export function swapCandies(
  board: CandyType[][],
  pos1: CellPosition,
  pos2: CellPosition
): CandyType[][] {
  const newBoard = board.map(row => [...row]);
  const temp = newBoard[pos1.row][pos1.col];
  newBoard[pos1.row][pos1.col] = newBoard[pos2.row][pos2.col];
  newBoard[pos2.row][pos2.col] = temp;
  return newBoard;
}

export function areAdjacent(pos1: CellPosition, pos2: CellPosition): boolean {
  const rowDiff = Math.abs(pos1.row - pos2.row);
  const colDiff = Math.abs(pos1.col - pos2.col);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

export function removeMatchesAndDrop(
  board: CandyType[][],
  matches: Set<string>
): { newBoard: CandyType[][]; removedCount: number } {
  const newBoard = board.map(row => [...row]);
  let removedCount = matches.size;

  for (let col = 0; col < BOARD_SIZE; col++) {
    let writeRow = BOARD_SIZE - 1;
    for (let row = BOARD_SIZE - 1; row >= 0; row--) {
      if (!matches.has(`${row}-${col}`)) {
        newBoard[writeRow][col] = board[row][col];
        if (writeRow !== row) {
        }
        writeRow--;
      }
    }
    while (writeRow >= 0) {
      newBoard[writeRow][col] = getRandomCandy();
      writeRow--;
    }
  }

  return { newBoard, removedCount };
}

export function calculateScore(matchCount: number, combo: number): number {
  const baseScore = matchCount * 10;
  const comboBonus = combo > 1 ? Math.floor(baseScore * (combo - 1) * 0.5) : 0;
  return baseScore + comboBonus;
}

export function getLevelConfig(level: number): { targetScore: number; moves: number } {
  return {
    targetScore: 1000 + (level - 1) * 500,
    moves: 20 + Math.floor((level - 1) * 2),
  };
}

export function refreshBoard(board: CandyType[][]): CandyType[][] {
  let newBoard = createRandomBoard();
  let attempts = 0;
  while (!hasPossibleMoves(newBoard) && attempts < 100) {
    newBoard = createRandomBoard();
    attempts++;
  }
  return newBoard;
}

export function hasPossibleMoves(board: CandyType[][]): boolean {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (col < BOARD_SIZE - 1) {
        const swapped = swapCandies(board, { row, col }, { row, col: col + 1 });
        if (hasMatches(swapped)) return true;
      }
      if (row < BOARD_SIZE - 1) {
        const swapped = swapCandies(board, { row, col }, { row: row + 1, col });
        if (hasMatches(swapped)) return true;
      }
    }
  }
  return false;
}
