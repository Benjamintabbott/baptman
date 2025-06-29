import React, { useEffect, useState } from 'react';

export default function Chart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1000);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const outerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '105%',
  };

  const iframeWrapperStyle = {
    width: isMobile ? '100%' : '100%',
    aspectRatio: '1 / 1.25',
    position: 'relative',
  };

  const iframeStyle = {
    position: 'absolute',
    width: '100%',
    border: '0',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.8)',
    height: '100%',
  };

  return (
    <div style={outerContainerStyle}>
      <style>{`
        @media (min-width: 1400px) {
          #dexscreener-embed {
            aspect-ratio: 1 / 0.65 !important;
          }
        }
      `}</style>

      <div id="dexscreener-embed" style={iframeWrapperStyle}>
        <iframe
          src="https://dexscreener.com/aptos/0x8650b7bfa4bf9c887de0422a1c1633c1956c5e14e76a9d8300a8bcac2c598676?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
          style={iframeStyle}
          title="Baptman Chart"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
