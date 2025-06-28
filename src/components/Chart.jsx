import React from 'react';

export default function Chart() {
  const containerStyle = {
    position: 'relative',
    width: '100%',
    paddingBottom: '125%',
  };

  const iframeStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    border: '0',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.8)',
  };

  return (
    <>
      <style>{`
        @media (min-width: 1400px) {
          #dexscreener-embed {
            padding-bottom: 65% !important;
          }
        }
      `}</style>

      <div id="dexscreener-embed" style={containerStyle}>
        <iframe
          src="https://dexscreener.com/aptos/0x8650b7bfa4bf9c887de0422a1c1633c1956c5e14e76a9d8300a8bcac2c598676?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
          style={iframeStyle}
          title="Dexscreener Aptos Chart"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </>
  );
}
