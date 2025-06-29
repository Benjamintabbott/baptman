'use client'

import { useEffect, useState } from 'react';

export default function Neuz() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('/api/neuz');
      const data = await res.json();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <section
      id="neuz"
      style={{
        padding: '60px 20px',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Impact, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>APTOS NEUZ!</h1>
      <p
        style={{
          fontFamily: '"Trebuchet MS", sans-serif',
          fontSize: '1.2rem',
          marginBottom: '40px',
          width: '80%',
          marginInline: 'auto',
        }}
      >
        Stay up to date with Aptos Blockchain news with a few laughs!
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center',
        }}
      >
        {videos.map((video) => (
          <div key={video.id} style={{ width: '350px', maxWidth: '100%' }}>
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '12px' }}
            />
            <p
              style={{
                marginTop: '10px',
                fontSize: '0.9rem',
                fontFamily: '"Trebuchet MS", sans-serif',
              }}
            >
              {video.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
