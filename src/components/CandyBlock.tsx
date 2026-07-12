import React from 'react';
import { CandyType, CANDY_EMOJIS, CANDY_COLORS } from '../types/game';

interface CandyBlockProps {
  candy: CandyType;
  isSelected: boolean;
  isMatched?: boolean;
  onClick: () => void;
  delay?: number;
}

export const CandyBlock: React.FC<CandyBlockProps> = ({
  candy,
  isSelected,
  isMatched = false,
  onClick,
  delay = 0,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-12 h-12 sm:w-14 sm:h-14 rounded-xl 
        bg-gradient-to-br ${CANDY_COLORS[candy]}
        flex items-center justify-center
        text-2xl sm:text-3xl
        shadow-lg
        transition-all duration-200
        hover:scale-105 hover:shadow-xl
        active:scale-95
        cursor-pointer
        border-2 border-white/30
        ${isSelected ? 'ring-4 ring-yellow-300 ring-offset-2 scale-110 z-10' : ''}
        ${isMatched ? 'animate-pulse scale-0 opacity-0' : ''}
      `}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {CANDY_EMOJIS[candy]}
    </button>
  );
};
