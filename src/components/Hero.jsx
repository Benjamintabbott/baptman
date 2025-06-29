import { useEffect, useState } from 'react';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  const baseButtonStyle = {
    backgroundColor: '#00fff2',
    color: 'black',
    fontFamily: '"Trebuchet MS", sans-serif',
    fontWeight: 'bold',
    fontSize: '18px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 0 10px #00fff2',
    textShadow: '0 0 10px rgb(0, 0, 0)',
    textAlign: 'center',
    width: isMobile ? '300px' : '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    margin: '20px',
    textDecoration: 'none',
    lineHeight: 'normal',
  };


  const hoverStyle = {
    backgroundColor: '#000',
    color: '#fff',
    boxShadow: '0 0 12px white',
    transform: 'scale(1.15)',
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: isMobile ? '100vh' : '80vh',
        overflow: 'hidden',
        backgroundColor: '#111',
        top: 0,
        borderBottom: '2mm ridge white',
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
          top: 0,
          left: 0,
          width: '100%',
          height: isMobile ? '130%' : '100%',
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
        {buttons.map((btn, index) => {
          const isHovered = hoveredIndex === index;
          const style = {
            ...baseButtonStyle,
            ...(isHovered ? hoverStyle : {}),
          };

          return btn.type === 'link' ? (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              style={style}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {btn.label}
            </a>
          ) : (
            <button
              key={btn.label}
              onClick={btn.onClick}
              style={style}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
