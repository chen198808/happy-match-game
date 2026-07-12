import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Hammer, RefreshCw, ShoppingCart, X } from 'lucide-react';

export const ToolBar: React.FC = () => {
  const { hammerCount, refreshCount, activeTool, useTool, setActiveTool, coins, buyTool } = useGameStore();
  const [showShop, setShowShop] = useState(false);

  const handleHammerClick = () => {
    if (hammerCount > 0) {
      if (activeTool === 'hammer') {
        setActiveTool(null);
      } else {
        useTool('hammer');
      }
    }
  };

  const handleRefreshClick = () => {
    if (refreshCount > 0) {
      useGameStore.getState().useRefresh();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleHammerClick}
          disabled={hammerCount <= 0}
          className={`
            relative flex flex-col items-center justify-center
            w-16 h-16 rounded-xl
            bg-gradient-to-br from-orange-400 to-red-500
            shadow-lg
            transition-all duration-200
            hover:scale-105 hover:shadow-xl
            active:scale-95
            border-2 border-white/30
            ${hammerCount <= 0 ? 'opacity-50 cursor-not-allowed' : ''}
            ${activeTool === 'hammer' ? 'ring-4 ring-yellow-300 ring-offset-2 scale-110' : ''}
          `}
        >
          <Hammer className="w-7 h-7 text-white" />
          <span className="text-xs font-bold text-white">{hammerCount}</span>
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold px-1.5 rounded-full">
            {hammerCount}
          </span>
        </button>

        <button
          onClick={handleRefreshClick}
          disabled={refreshCount <= 0}
          className={`
            relative flex flex-col items-center justify-center
            w-16 h-16 rounded-xl
            bg-gradient-to-br from-cyan-400 to-blue-500
            shadow-lg
            transition-all duration-200
            hover:scale-105 hover:shadow-xl
            active:scale-95
            border-2 border-white/30
            ${refreshCount <= 0 ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <RefreshCw className="w-7 h-7 text-white" />
          <span className="text-xs font-bold text-white">{refreshCount}</span>
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold px-1.5 rounded-full">
            {refreshCount}
          </span>
        </button>

        <button
          onClick={() => setShowShop(true)}
          className="
            flex flex-col items-center justify-center
            w-16 h-16 rounded-xl
            bg-gradient-to-br from-pink-400 to-purple-500
            shadow-lg
            transition-all duration-200
            hover:scale-105 hover:shadow-xl
            active:scale-95
            border-2 border-white/30
          "
        >
          <ShoppingCart className="w-7 h-7 text-white" />
          <span className="text-xs font-bold text-white">商店</span>
        </button>
      </div>

      {showShop && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-white/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">🛒 道具商店</h2>
              <button
                onClick={() => setShowShop(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 bg-yellow-400/90 px-4 py-2 rounded-full mb-4 w-fit mx-auto">
              <span className="text-yellow-900 font-bold">💰 {coins} 金币</span>
            </div>

            <div className="space-y-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                    <Hammer className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">锤子道具</h3>
                    <p className="text-xs text-white/70">消除任意一个方块</p>
                  </div>
                </div>
                <button
                  onClick={() => buyTool('hammer', 30)}
                  disabled={coins < 30}
                  className={`
                    px-4 py-2 rounded-full font-bold text-sm
                    bg-yellow-400 text-yellow-900
                    hover:bg-yellow-300 transition-colors
                    ${coins < 30 ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  30 💰
                </button>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <RefreshCw className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">刷新道具</h3>
                    <p className="text-xs text-white/70">重新排列所有方块</p>
                  </div>
                </div>
                <button
                  onClick={() => buyTool('refresh', 50)}
                  disabled={coins < 50}
                  className={`
                    px-4 py-2 rounded-full font-bold text-sm
                    bg-yellow-400 text-yellow-900
                    hover:bg-yellow-300 transition-colors
                    ${coins < 50 ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  50 💰
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
