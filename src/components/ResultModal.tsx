import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Star } from 'lucide-react';

export const ResultModal: React.FC = () => {
  const { gameStatus, score, targetScore, level, nextLevel, initLevel, coins } = useGameStore();

  if (gameStatus === 'playing') return null;

  const isWin = gameStatus === 'won';
  const stars = isWin ? Math.min(3, Math.floor((score / targetScore) * 3) + 1) : 0;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className={`
          relative max-w-sm w-full rounded-3xl p-6 shadow-2xl border-4 border-white/30
          ${isWin 
            ? 'bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500' 
            : 'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700'
          }
        `}
      >
        <div className="text-center">
          <div className="text-6xl mb-2">
            {isWin ? '🎉' : '😢'}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            {isWin ? '恭喜过关！' : '游戏结束'}
          </h2>

          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map(i => (
              <Star
                key={i}
                className={`w-10 h-10 transition-all duration-500 ${
                  i <= stars 
                    ? 'text-yellow-300 fill-yellow-300 scale-110' 
                    : 'text-white/30'
                }`}
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80">本关得分</span>
              <span className="text-xl font-bold text-white">{score}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80">目标分数</span>
              <span className="text-xl font-bold text-white">{targetScore}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80">当前金币</span>
              <span className="text-xl font-bold text-yellow-300">💰 {coins}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => initLevel(level)}
              className="
                flex-1 py-3 px-4 rounded-full font-bold
                bg-white/30 backdrop-blur-sm text-white
                hover:bg-white/40 transition-colors
                border-2 border-white/30
              "
            >
              再玩一次
            </button>
            
            {isWin && (
              <button
                onClick={nextLevel}
                className="
                  flex-1 py-3 px-4 rounded-full font-bold
                  bg-white text-purple-600
                  hover:bg-yellow-100 transition-colors
                  shadow-lg
                "
              >
                下一关 →
              </button>
            )}
          </div>
        </div>

        {isWin && (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  backgroundColor: ['#fbbf24', '#f472b6', '#34d399', '#60a5fa', '#a78bfa'][i % 5],
                  animation: `confetti ${2 + Math.random() * 2}s ease-out ${Math.random() * 0.5}s infinite`,
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
