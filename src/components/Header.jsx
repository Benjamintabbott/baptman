import { useState, useEffect } from 'react';

const navItems = ['ABOUT', 'NEUZ', 'NFTS', 'GAWTHIM LABZ', 'HOW TO BUY'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1000);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = (id) => {
    const section = document.getElementById(id.toLowerCase().replace(/\s+/g, '-'));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: 'transparent',
        zIndex: 999,
        fontFamily: 'Impact, sans-serif',
        color: 'white',
      }}
    >
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          margin: isMobile ? '0 20px' : '0 200px',
          fontSize: isMobile ? '1.2rem' : '1.8rem',
        }}
      >
        <div style={{ fontSize: '20px' }}></div> {/* Optional: brand/logo placeholder */}

        {!isMobile ? (
          <div style={{ display: 'flex', gap: '40px', width: '100%', justifyContent: 'center' }}>
            {navItems.map((item) => (
              <div
                key={item}
                onClick={() => handleClick(item)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#00fff2';
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.textShadow = '0 0 10px #00fff2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.textShadow = 'none';
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: 'flex', flexDirection: 'column', gap: 4, cursor: 'pointer' }}
            >
              <span style={{ width: 25, height: 3, background: 'white', borderRadius: 2 }} />
              <span style={{ width: 25, height: 3, background: 'white', borderRadius: 2 }} />
              <span style={{ width: 25, height: 3, background: 'white', borderRadius: 2 }} />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Dropdown */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            background: 'rgba(0, 0, 0, 0.95)',
            padding: '40px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            fontFamily: 'Impact, sans-serif',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {navItems.map((item) => (
            <div
              key={item}
              onClick={() => handleClick(item)}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => {
                e.target.style.color = '#00fff2';
                e.target.style.transform = 'scale(1.1)';
                e.target.style.textShadow = '0 0 10px #00fff2';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'white';
                e.target.style.transform = 'scale(1)';
                e.target.style.textShadow = 'none';
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
