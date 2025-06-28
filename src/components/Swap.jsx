import React from 'react';
import { useEffect, useState } from 'react';


export default function Swap() {
  const [isMobile, setIsMobile] = useState(false);
  const containerStyle = {
    position: 'relative',
    width: '100%',
    paddingBottom: '125%', // aspect ratio for mobile
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1000);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const iframeStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: isMobile ? '80%' : '60%',
    height: '100%',
    top: 0,
    left: 0,
    border: '0',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.8)',
  };

  return (
    <div style={containerStyle}>
      <iframe
        src="https://app.panora.exchange/swap/aptos?pair=APT-BAPTMAN"
        style={iframeStyle}
        title="Panora Aptos-Baptman Swap"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
