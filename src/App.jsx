import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Chat from './components/Chat';
import Chart from './components/Chart';
import Swap from './components/Swap';


function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/data')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('API fetch error:', err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main style={{ margin: 0, padding: 0 }}>
        <Hero />
        <div style={{ marginTop: '80px' }}>
          <Chart />
          <div
            style={{
              marginTop: '80px',
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '0 20px',
              maxWidth: '1200px',
              marginLeft: 'auto',
              marginRight: 'auto',
              alignItems: 'stretch',
            }}
          >
            <div style={{ flex: '1 1 600px', minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flexGrow: 1 }}>
                <Swap />
              </div>
            </div>

            <div style={{ flex: '1 1 400px', minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flexGrow: 1 }}>
                <Chat />
              </div>
            </div>
          </div>


        </div>
      </main>

    </>
  );
}

export default App;
