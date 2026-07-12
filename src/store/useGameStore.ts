import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, CellPosition, ToolType, CandyType, ScorePopup } from '../types/game';
import {
  createRandomBoard,
  findMatches,
  swapCandies,
  areAdjacent,
  removeMatchesAndDrop,
  calculateScore,
  getLevelConfig,
  refreshBoard,
  hasMatches,
} from '../utils/gameUtils';

let popupIdCounter = 0;

interface GameActions {
  initLevel: (level?: number) => void;
  selectCell: (pos: CellPosition) => void;
  handleCellClick: (pos: CellPosition) => void;
  processMatches: () => Promise<void>;
  addCoins: (amount: number) => void;
  buyTool: (tool: ToolType, cost: number) => boolean;
  useTool: (tool: ToolType) => void;
  setActiveTool: (tool: ToolType | null) => void;
  useHammer: (pos: CellPosition) => void;
  useRefresh: () => void;
  resetGame: () => void;
  nextLevel: () => void;
  addScorePopup: (x: number, y: number, score: number) => void;
  removeScorePopup: (id: number) => void;
}

const initialBoard = createRandomBoard();
const levelConfig = getLevelConfig(1);

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      board: initialBoard,
      score: 0,
      targetScore: levelConfig.targetScore,
      moves: levelConfig.moves,
      maxMoves: levelConfig.moves,
      level: 1,
      coins: 100,
      selectedCell: null,
      isAnimating: false,
      gameStatus: 'playing',
      hammerCount: 2,
      refreshCount: 1,
      activeTool: null,
      combo: 0,
      showScorePopups: [],

      initLevel: (level = 1) => {
        const config = getLevelConfig(level);
        let board = createRandomBoard();
        set({
          board,
          score: 0,
          targetScore: config.targetScore,
          moves: config.moves,
          maxMoves: config.moves,
          level,
          selectedCell: null,
          isAnimating: false,
          gameStatus: 'playing',
          combo: 0,
          showScorePopups: [],
          activeTool: null,
        });
      },

      selectCell: (pos) => {
        const { selectedCell, isAnimating, gameStatus } = get();
        if (isAnimating || gameStatus !== 'playing') return;
        set({ selectedCell: pos });
      },

      handleCellClick: async (pos) => {
        const { selectedCell, isAnimating, gameStatus, activeTool, useHammer } = get();
        if (isAnimating || gameStatus !== 'playing') return;

        if (activeTool === 'hammer') {
          useHammer(pos);
          return;
        }

        if (!selectedCell) {
          set({ selectedCell: pos });
          return;
        }

        if (selectedCell.row === pos.row && selectedCell.col === pos.col) {
          set({ selectedCell: null });
          return;
        }

        if (!areAdjacent(selectedCell, pos)) {
          set({ selectedCell: pos });
          return;
        }

        set({ isAnimating: true, selectedCell: null });
        const currentBoard = get().board;
        const swappedBoard = swapCandies(currentBoard, selectedCell, pos);

        if (!hasMatches(swappedBoard)) {
          set({ board: swappedBoard });
          await new Promise(resolve => setTimeout(resolve, 300));
          set({ board: currentBoard, isAnimating: false });
          return;
        }

        set({ board: swappedBoard, moves: get().moves - 1 });
        await new Promise(resolve => setTimeout(resolve, 200));
        await get().processMatches();
      },

      processMatches: async () => {
        let combo = 0;
        let totalScore = 0;
        let currentBoard = get().board;

        while (hasMatches(currentBoard)) {
          combo++;
          const matches = findMatches(currentBoard);
          const matchCount = matches.size;
          const scoreGain = calculateScore(matchCount, combo);
          totalScore += scoreGain;

          const matchArray = Array.from(matches);
          if (matchArray.length > 0) {
            const firstMatch = matchArray[0].split('-').map(Number);
            get().addScorePopup(firstMatch[1] * 60 + 30, firstMatch[0] * 60 + 30, scoreGain);
          }

          set({ combo });

          await new Promise(resolve => setTimeout(resolve, 300));
          const { newBoard } = removeMatchesAndDrop(currentBoard, matches);
          currentBoard = newBoard;
          set({ board: currentBoard });
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        const newScore = get().score + totalScore;
        const { moves, targetScore } = get();
        
        let newStatus: GameState['gameStatus'] = 'playing';
        if (newScore >= targetScore) {
          newStatus = 'won';
        } else if (moves <= 0) {
          newStatus = 'lost';
        }

        set({
          score: newScore,
          isAnimating: false,
          gameStatus: newStatus,
          combo: 0,
        });

        if (newStatus === 'won') {
          const bonusCoins = 50 + get().level * 20;
          get().addCoins(bonusCoins);
        }
      },

      addCoins: (amount) => {
        set(state => ({ coins: state.coins + amount }));
      },

      buyTool: (tool, cost) => {
        const { coins } = get();
        if (coins < cost) return false;
        set(state => ({
          coins: state.coins - cost,
          [tool === 'hammer' ? 'hammerCount' : 'refreshCount']: 
            (tool === 'hammer' ? state.hammerCount : state.refreshCount) + 1,
        }));
        return true;
      },

      useTool: (tool) => {
        const key = tool === 'hammer' ? 'hammerCount' : 'refreshCount';
        if (get()[key] <= 0) return;
        set(state => ({
          [key]: state[key] - 1,
          activeTool: tool,
        }));
      },

      setActiveTool: (tool) => {
        set({ activeTool: tool });
      },

      useHammer: async (pos) => {
        const { isAnimating, gameStatus, board } = get();
        if (isAnimating || gameStatus !== 'playing') return;

        set({ isAnimating: true, activeTool: null });
        const matches = new Set<string>();
        matches.add(`${pos.row}-${pos.col}`);
        
        get().addScorePopup(pos.col * 60 + 30, pos.row * 60 + 30, 20);
        
        await new Promise(resolve => setTimeout(resolve, 200));
        const { newBoard } = removeMatchesAndDrop(board, matches);
        set({ board: newBoard, score: get().score + 20 });
        await new Promise(resolve => setTimeout(resolve, 300));
        await get().processMatches();
      },

      useRefresh: () => {
        const { isAnimating, gameStatus, refreshCount } = get();
        if (isAnimating || gameStatus !== 'playing' || refreshCount <= 0) return;
        
        set(state => ({
          board: refreshBoard(state.board),
          refreshCount: state.refreshCount - 1,
          activeTool: null,
        }));
      },

      resetGame: () => {
        get().initLevel(1);
      },

      nextLevel: () => {
        const nextLvl = get().level + 1;
        get().initLevel(nextLvl);
      },

      addScorePopup: (x, y, score) => {
        const id = popupIdCounter++;
        set(state => ({
          showScorePopups: [...state.showScorePopups, { id, x, y, score }],
        }));
        setTimeout(() => {
          get().removeScorePopup(id);
        }, 1000);
      },

      removeScorePopup: (id) => {
        set(state => ({
          showScorePopups: state.showScorePopups.filter(p => p.id !== id),
        }));
      },
    }),
    {
      name: 'happy-match-game',
      partialize: (state) => ({
        coins: state.coins,
        level: state.level,
        hammerCount: state.hammerCount,
        refreshCount: state.refreshCount,
      }),
    }
  )
);
