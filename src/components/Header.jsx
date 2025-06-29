'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const navItems = ['ABOUT', 'NEUZ', 'NFTS', 'GAWTHIM LABZ', 'HOW TO BUY'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { wallets, connect, connected, account, disconnect } = useWallet();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1400);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const availableWallets = wallets.filter(
    (w) => w.readyState === 'Installed' || w.readyState === 'Loadable'
  );

  const handleClick = (id) => {
    const section = document.getElementById(id.toLowerCase().replace(/\s+/g, '-'));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const handleConnect = async () => {
    if (availableWallets.length > 0) {
      await connect(availableWallets[0].name);
    } else {
      alert('No Aptos wallets available to connect.');
    }
  };

  const copyToClipboard = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address.toString());
      alert('Address copied to clipboard!');
      setIsDropdownOpen(false);
    }
  };

  const openExplorer = () => {
    if (account?.address) {
      window.open(`https://aptoscan.com/account/${account.address.toString()}`, '_blank');
      setIsDropdownOpen(false);
    }
  };

  const truncate = (address) => {
    if (!address) return '';
    const str = address.toString();
    return str.slice(0, 6) + '...' + str.slice(-4);
  };

  const connectButtonHeight = isMobile ? '1.8rem' : '2.4rem';

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
      {/* Mobile: Connect wallet or address always centered top */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: connectButtonHeight,
            background: 'transparent',
            zIndex: 1001,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            onClick={connected ? () => setIsDropdownOpen(!isDropdownOpen) : handleConnect}
            style={{
              cursor: 'pointer',
              marginTop: '50px',
              padding: '0 10px',
              border: connected ? '1px solid #00fff2' : '1px solid white',
              borderRadius: 6,
              fontFamily: 'Impact, sans-serif',
              fontSize: '1.2rem',
              lineHeight: connectButtonHeight,
              pointerEvents: 'auto',
              color: connected ? '#00fff2' : 'white',
              textShadow: connected ? '0 0 6px #00fff2' : 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {connected ? truncate(account?.address) : 'Connect Wallet'}
          </div>

          {/* Dropdown for mobile */}
          {isDropdownOpen && connected && (
            <div
              style={{
                position: 'absolute',
                top: connectButtonHeight,
                background: '#111',
                color: 'white',
                borderRadius: 6,
                padding: '10px',
                marginTop: 4,
                fontSize: '14px',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                minWidth: 160,
                userSelect: 'auto',
              }}
            >
              <div
                onClick={copyToClipboard}
                style={{ padding: '8px', cursor: 'pointer' }}
              >
                Copy Address
              </div>
              <div
                onClick={openExplorer}
                style={{ padding: '8px', cursor: 'pointer' }}
              >
                View on Aptoscan
              </div>
              <div
                onClick={() => {
                  disconnect();
                  setIsDropdownOpen(false);
                }}
                style={{ padding: '8px', cursor: 'pointer', color: '#ff4d4d' }}
              >
                Disconnect
              </div>
            </div>
          )}
        </div>
      )}

      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          margin: isMobile ? '0 20px' : '0 200px',
          fontSize: isMobile ? '1.2rem' : '1.8rem',
          position: 'relative',
          height: '3rem',
        }}
      >
        <div style={{ fontSize: '20px' }}></div>

        {!isMobile ? (
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '40px',
          }}>
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

        {/* Desktop connect wallet button */}
        {!isMobile && (
          <div
            style={{
              marginLeft: 20,
            }}
          >
            {!connected ? (
              <div
                onClick={handleConnect}
                style={{
                  cursor: 'pointer',
                  padding: '0 15px',
                  height: connectButtonHeight,
                  border: '1px solid white',
                  borderRadius: 6,
                  fontFamily: 'Impact, sans-serif',
                  fontSize: '1.2rem',
                  lineHeight: connectButtonHeight,
                  display: 'flex',
                  alignItems: 'center',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s, border-color 0.3s, text-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#00fff2';
                  e.target.style.borderColor = '#00fff2';
                  e.target.style.textShadow = '0 0 6px #00fff2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.borderColor = 'white';
                  e.target.style.textShadow = 'none';
                }}
              >
                Connect Wallet
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    cursor: 'pointer',
                    padding: '0 15px',
                    height: connectButtonHeight,
                    border: '1px solid #00fff2',
                    borderRadius: 6,
                    color: '#00fff2',
                    textShadow: '0 0 6px #00fff2',
                    fontFamily: 'Impact, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {truncate(account?.address)}
                </div>

                {isDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '110%',
                      right: 0,
                      background: '#111',
                      color: 'white',
                      borderRadius: 6,
                      padding: '10px',
                      zIndex: 1001,
                      fontSize: '14px',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                      minWidth: 160,
                    }}
                  >
                    <div
                      onClick={copyToClipboard}
                      style={{ padding: '8px', cursor: 'pointer' }}
                    >
                      Copy Address
                    </div>
                    <div
                      onClick={openExplorer}
                      style={{ padding: '8px', cursor: 'pointer' }}
                    >
                      View on Aptoscan
                    </div>
                    <div
                      onClick={() => {
                        disconnect();
                        setIsDropdownOpen(false);
                      }}
                      style={{ padding: '8px', cursor: 'pointer', color: '#ff4d4d' }}
                    >
                      Disconnect
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

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
