import React, { useEffect, useRef, useState } from 'react';

interface AdBannerBottomProps {
  size?: '950x90' | '728x90' | '640x60';
}

export const AdBannerBottom: React.FC<AdBannerBottomProps> = ({ size = '950x90' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  const [width, height] = size.split('x').map(s => parseInt(s));

  useEffect(() => {
    if (adRef.current) {
      adRef.current.innerHTML = '';
      
      const frame = document.createElement('iframe');
      frame.src = `/ad-banner-bottom.html?size=${size}`;
      frame.width = '100%';
      frame.height = `${height}`;
      frame.style.border = 'none';
      frame.style.borderRadius = '0.75rem';
      frame.style.overflow = 'hidden';
      frame.scrolling = 'no';
      frame.setAttribute('allowtransparency', 'true');
      
      frame.onload = () => {
        setAdLoaded(true);
      };
      
      adRef.current.appendChild(frame);
    }
  }, [size, height]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-2">
      <div 
        ref={adRef}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl overflow-hidden shadow-lg border-2 border-white/30"
        style={{ minHeight: `${height}px` }}
      >
        {!adLoaded && (
          <div className="flex items-center justify-center text-white/60 text-sm" style={{ height: `${height}px` }}>
            广告加载中...
          </div>
        )}
      </div>
    </div>
  );
};
