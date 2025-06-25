import { useEffect, useState } from 'react';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const contractAddress =
    '0xe9c6ae7a056ba49901fcc19ab3fcff0938f882cfd7f2cc5a72eea362d29f5b8f';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1000);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    alert('Contract address copied to clipboard!');
  };

  const handleScroll = () => {
    const el = document.getElementById('community');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const buttonWidth = isMobile ? '300px' : '200px'; // fixed width helps centering

  const baseButtonStyle = {
    backgroundColor: '#00fff2',
    color: '#000',
    fontFamily: 'Impact, sans-serif',
    fontSize: '18px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 10px #00fff2',
    textAlign: 'center',
    width: buttonWidth,
    display: 'inline-block',
    boxSizing: 'border-box',
  };

  const hoverStyle = {
    backgroundColor: '#000',
    color: '#fff',
    boxShadow: '0 0 12px white',
    transform: 'scale(1.05)',
  };

  // buttons are generated uniformly
  const buttons = [
    {
      label: 'JOIN THE COMMUNITY',
      type: 'button',
      onClick: handleScroll,
    },
    {
      label: 'COPY CA',
      type: 'button',
      onClick: handleCopy,
    },
    {
      label: 'BUY NOW',
      type: 'link',
      href: 'https://app.panora.exchange/swap/aptos?pair=APT-BAPTMAN',
    },
  ];

  return (
    <section
      id="hero"
      style={{
        position: 'fixed',
        width: '100vw',
        height: isMobile ? '100vh' : '80vh',
        overflow: 'hidden',
        backgroundColor: '#111',
        top: 0,
      }}
    >
      <video
        src={isMobile ? '/hero-mobile.mp4' : '/hero.mp4'}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: '0px',
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? '10%' : '20%',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {buttons.map((btn) =>
          btn.type === 'link' ? (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...baseButtonStyle }}
              onMouseEnter={(e) =>
                Object.assign(e.target.style, hoverStyle)
              }
              onMouseLeave={(e) =>
                Object.assign(e.target.style, baseButtonStyle)
              }
            >
              {btn.label}
            </a>
          ) : (
            <button
              key={btn.label}
              onClick={btn.onClick}
              style={{ ...baseButtonStyle }}
              onMouseEnter={(e) =>
                Object.assign(e.target.style, hoverStyle)
              }
              onMouseLeave={(e) =>
                Object.assign(e.target.style, baseButtonStyle)
              }
            >
              {btn.label}
            </button>
          )
        )}
      </div>
    </section>
  );
}
