import React from 'react';

export default function Scroll() {
  return (
    <div style={outerStyle}>
      <div style={innerStyle}>
        <span style={textStyle}>
          {'BAPTMAN ON APTOS! \u00A0 \u00A0 '.repeat(20)}
        </span>
      </div>
    </div>
  );
}

// Full-width container
const outerStyle = {
  width: '100%',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  whiteSpace: 'nowrap',
  padding: '10px 0',
  borderBottom: '2mm ridge white'
};

// Animation wrapper
const innerStyle = {
  display: 'inline-block',
  animation: 'scroll-left 30s linear infinite',
};

// Text styling
const textStyle = {
  fontFamily: 'Impact, sans-serif',
  fontSize: '4rem',
  color: 'white',
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

// Inject keyframes globally
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes scroll-left {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
`;
document.head.appendChild(styleTag);
