import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Star, Coins, Target, Footprints } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { score, targetScore, moves, maxMoves, level, coins } = useGameStore();
  const progress = Math.min((score / targetScore) * 100, 100);
  const movesProgress = (moves / maxMoves) * 100;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 bg-yellow-400/90 px-3 py-1.5 rounded-full shadow-lg">
          <Coins className="w-5 h-5 text-yellow-800" />
          <span className="font-bold text-yellow-900">{coins}</span>
        </div>

        <div className="flex items-center gap-2 bg-purple-500/90 px-4 py-1.5 rounded-full shadow-lg">
          <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
          <span className="font-bold text-white">第 {level} 关</span>
        </div>

        <div className="flex items-center gap-2 bg-blue-400/90 px-3 py-1.5 rounded-full shadow-lg">
          <Footprints className="w-5 h-5 text-blue-900" />
          <span className="font-bold text-blue-900">{moves}</span>
        </div>
      </div>

      <div className="bg-white/30 backdrop-blur-sm rounded-full h-6 overflow-hidden shadow-inner border-2 border-white/40">
        <div className="h-full flex items-center justify-between px-3">
          <span className="text-xs font-bold text-white/90 z-10">
            分数: {score}
          </span>
          <span className="text-xs font-bold text-white/90 z-10">
            目标: {targetScore}
          </span>
        </div>
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
