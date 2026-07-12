import React, { useState } from 'react';

export const AdBanner: React.FC = () => {
  const [adLoaded, setAdLoaded] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl overflow-hidden shadow-lg border-2 border-white/30"
        style={{ minHeight: '90px' }}
      >
        {!adLoaded && (
          <div className="flex items-center justify-center h-[90px] text-white/60 text-sm">
            广告加载中...
          </div>
        )}
        <iframe
          src="ad-banner.html"
          width="100%"
          height="90"
          style={{ border: 'none', display: adLoaded ? 'block' : 'none', borderRadius: '0.75rem' }}
          scrolling="no"
          allowTransparency={true}
          onLoad={() => setAdLoaded(true)}
        />
      </div>
    </div>
  );
};
