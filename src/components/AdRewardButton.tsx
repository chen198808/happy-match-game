import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Play, Coins } from 'lucide-react';

export const AdRewardButton: React.FC = () => {
  const { addCoins } = useGameStore();
  const [watching, setWatching] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleClick = () => {
    if (watching || cooldown) return;
    setWatching(true);
    
    setTimeout(() => {
      addCoins(50);
      setWatching(false);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 30000);
    }, 3000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={watching || cooldown}
      className={`
        relative flex items-center gap-3 px-6 py-3 rounded-full font-bold
        bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500
        text-amber-900
        shadow-lg
        transition-all duration-200
        ${!watching && !cooldown ? 'hover:scale-105 hover:shadow-xl active:scale-95' : ''}
        ${watching || cooldown ? 'opacity-70' : ''}
        border-2 border-yellow-200/50
      `}
    >
      <div className="relative">
        {watching ? (
          <div className="w-6 h-6 border-2 border-amber-900/30 border-t-amber-900 rounded-full animate-spin" />
        ) : (
          <Play className="w-6 h-6" />
        )}
      </div>
      <div className="text-left">
        <div className="text-sm font-bold">
          {watching ? '广告播放中...' : cooldown ? '冷却中 30s' : '看广告得金币'}
        </div>
        <div className="text-xs opacity-70 flex items-center gap-1">
          <Coins className="w-3 h-3" />
          +50 金币
        </div>
      </div>
      {!watching && !cooldown && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
          HOT
        </span>
      )}
    </button>
  );
};
