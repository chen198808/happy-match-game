import { useEffect } from 'react';
import { TopBar } from '../components/TopBar';
import { GameBoard } from '../components/GameBoard';
import { ToolBar } from '../components/ToolBar';
import { AdBanner } from '../components/AdBanner';
import { AdBannerBottom } from '../components/AdBannerBottom';
import { ResultModal } from '../components/ResultModal';
import { useGameStore } from '../store/useGameStore';

function Home() {
  const { initLevel, level } = useGameStore();

  useEffect(() => {
    initLevel(level);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex flex-col items-center py-4 px-2 overflow-x-hidden">
      <div className="w-full max-w-xl flex flex-col items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg tracking-wide">
          🍬 开心消消乐 🍬
        </h1>

        <div className="w-full">
          <AdBanner />
        </div>

        <TopBar />

        <div className="relative">
          <GameBoard />
        </div>

        <div className="flex flex-col items-center gap-3">
          <ToolBar />
        </div>

        <div className="w-full">
          <AdBannerBottom size="950x90" />
        </div>
      </div>

      <ResultModal />

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out ${Math.random() * 5}s infinite`,
            }}
          >
            {['🍬', '🍭', '🍪', '🍩', '🧁', '🍫'][i % 6]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
