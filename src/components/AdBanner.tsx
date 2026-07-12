import React, { useEffect, useRef } from 'react';

export const AdBanner: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current) {
      const adHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>body { margin: 0; padding: 0; overflow: hidden; }</style>
        </head>
        <body>
          <script src="http://wm.lrswl.com/page/s.php?s=295046&w=950&h=90"></script>
        </body>
        </html>
      `;
      
      const frame = document.createElement('iframe');
      frame.srcdoc = adHtml;
      frame.width = '100%';
      frame.height = '90';
      frame.style.border = 'none';
      frame.style.borderRadius = '0.75rem';
      frame.style.overflow = 'hidden';
      frame.scrolling = 'no';
      
      adRef.current.innerHTML = '';
      adRef.current.appendChild(frame);
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        ref={adRef}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl overflow-hidden shadow-lg border-2 border-white/30"
        style={{ minHeight: '90px' }}
      >
        <div className="flex items-center justify-center h-[90px] text-white/60 text-sm">
          广告加载中...
        </div>
      </div>
    </div>
  );
};
