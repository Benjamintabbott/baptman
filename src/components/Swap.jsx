import React, { useEffect, useState } from 'react';

export default function Swap() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1000);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const outerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    width: '70%',
    padding: '60px 20px',
    textAlign: isMobile ? 'center' : 'center',
    marginTop: '100px',
  };

  const textContainerStyle = {
    flex: 1,
    maxWidth: '50%',
    color: 'white',
    fontFamily: 'Impact, sans-serif',
  };

  const titleStyle = {
    fontSize: '3.5rem',
    marginBottom: '20px',
    color: 'white',
    textShadow: '0 0 20px rgba(0,0,0,0.8)',
    
  };

  const subtitleStyle = {
    fontSize: '1.4rem',
    color: '#ddd',
    lineHeight: '1.5',
    textShadow: '0 0 20px rgba(0,0,0,0.8)',
    fontFamily: '"Trebuchet MS", sans-serif',
    width: '75%',
    margin: '0 auto', // centers it
    textAlign: 'center',
  };

  const iframeWrapperStyle = {
    flex: 1,
    width: isMobile ? '100%' : '100%',
    maxWidth: '700px',
    aspectRatio: '1 / 1.25',
    position: 'relative',
  };

  const iframeStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: '0',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.8)',
  };

  return (
    <div style={outerStyle}>
      <div style={textContainerStyle}>
        <h2 style={titleStyle}>Get sum Baptman Tokens!</h2>
        <p style={subtitleStyle}>
          Swap APT for <strong>$BAPTMAN</strong> tokens instantly. Secure your spot in the Gotham ecosystem and power up your wallet!
        </p>
        <img
          src="/jump.png"
          alt="Baptman Jump"
          style={{
            marginTop: '10px',
            maxWidth: '80%',
          }}
        />
      </div>

      <div style={iframeWrapperStyle}>
        <iframe
          src="https://app.panora.exchange/swap/aptos?pair=APT-BAPTMAN"
          style={iframeStyle}
          title="Panora Aptos-Baptman Swap"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
