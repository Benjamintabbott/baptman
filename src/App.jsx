import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Chat from './components/Chat';
import Chart from './components/Chart';
import Swap from './components/Swap';
import Scroll from './components/Scroll';
import Neuz from './components/Neuz';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/data')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('API fetch error:', err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1000);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const centerWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '20px 0',
  };

  const twoColumnSectionStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: '20px',
    width: '70%',
    minHeight: '50rem',
    marginTop: '50px',
  };

  const columnStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
  };

  const bottomChartStyle = {
    width: '70%',
    marginTop: '60px',
  };

  return (
      <>
        {/* Parallax background */}
        <div className="parallax-bg" />

        {/* Main content with z-index above background */}
        <div className="page-content">
          <Header />
          <main style={{ margin: 0, padding: 0 }}>
            <Hero />
            <Scroll />

            {/* Two-column layout (Chart + Chat) */}
            <div style={centerWrapperStyle}>
              <div style={twoColumnSectionStyle}>
                <div style={columnStyle}>
                  <Chart />
                </div>
                <div style={columnStyle}>
                  <Chat />
                </div>
              </div>
            </div>

            {/* Swap Section */}
            <div style={centerWrapperStyle}>
              <Swap />
            </div>
            <div style={centerWrapperStyle}>
              <Neuz />
            </div>
          </main>
        </div>
      </>
    );
  }

export default App;
