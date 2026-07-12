import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { CandyBlock } from './CandyBlock';
import { BOARD_SIZE } from '../types/game';

export const GameBoard: React.FC = () => {
  const { board, selectedCell, handleCellClick, showScorePopups, activeTool } = useGameStore();

  return (
    <div className="relative">
      <div 
        className={`
          grid gap-1 p-3 sm:p-4 
          bg-white/20 backdrop-blur-md 
          rounded-2xl shadow-2xl
          border-2 border-white/30
          ${activeTool === 'hammer' ? 'ring-4 ring-red-400 ring-opacity-50' : ''}
        `}
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))` }}
      >
        {board.map((row, rowIndex) =>
          row.map((candy, colIndex) => (
            <CandyBlock
              key={`${rowIndex}-${colIndex}`}
              candy={candy}
              isSelected={
                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
              }
              onClick={() => handleCellClick({ row: rowIndex, col: colIndex })}
              delay={(rowIndex + colIndex) * 20}
            />
          ))
        )}
      </div>

      {showScorePopups.map(popup => (
        <div
          key={popup.id}
          className="absolute pointer-events-none text-yellow-300 font-bold text-xl animate-bounce"
          style={{
            left: popup.x + 12,
            top: popup.y + 12,
            animation: 'floatUp 1s ease-out forwards',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          +{popup.score}
        </div>
      ))}

      {activeTool === 'hammer' && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
          🔨 点击方块使用锤子
        </div>
      )}
    </div>
  );
};
