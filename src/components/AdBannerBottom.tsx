import React, { useState } from 'react';

interface AdBannerBottomProps {
  size?: '950x90' | '728x90' | '640x60';
}

export const AdBannerBottom: React.FC<AdBannerBottomProps> = ({ size = '950x90' }) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [width, height] = size.split('x').map(s => parseInt(s));

  return (
    <div className="w-full max-w-4xl mx-auto mt-2">
      <div 
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl overflow-hidden shadow-lg border-2 border-white/30"
        style={{ minHeight: `${height}px` }}
      >
        {!adLoaded && (
          <div className="flex items-center justify-center text-white/60 text-sm" style={{ height: `${height}px` }}>
            广告加载中...
          </div>
        )}
        <iframe
          src="ad-banner-bottom.html"
          width="100%"
          height={height}
          style={{ border: 'none', display: adLoaded ? 'block' : 'none', borderRadius: '0.75rem' }}
          scrolling="no"
          allowTransparency={true}
          onLoad={() => setAdLoaded(true)}
        />
      </div>
    </div>
  );
};
