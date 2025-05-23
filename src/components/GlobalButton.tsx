import React, { useState } from 'react';

function GlobalButton({ children, tooltipText, onClick }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    if (tooltipText) {
      const message = new SpeechSynthesisUtterance(tooltipText);
      window.speechSynthesis.speak(message);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    window.speechSynthesis.cancel(); // stops any ongoing speech
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
      <button
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={"bg-blue-600 text-white px-4 py-2 rounded"}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        {children}
      </button>

      {showTooltip && tooltipText && (
        <div style={tooltipStyle}>{tooltipText}</div>
      )}
    </div>
  );
}

const tooltipStyle: React.CSSProperties = {
  position: 'relative',
  top: '110%', // slightly below the button
  left: '60%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  color: 'rgba(0, 0, 0, 1)',
  padding: '6px 10px',
  borderRadius: '5px',
  fontSize: '13px',
  whiteSpace: 'nowrap',
  zIndex: 999,
};

export default GlobalButton;
