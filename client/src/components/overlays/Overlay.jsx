import React from 'react';
import NavigationArrows from '../navigation/NavigationArrows';

const Overlay = ({
  children,
  onClose,
  navigateToSection,
  activeSection,
  showNavigation = true,
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
  contentWidth = '60%',
  contentHeight = '60%',
  animation = 'fadeInFromCenter',
  disableAnimation = false,  // New prop
  className = ''
}) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`overlay ${className}`}
      onClick={handleOverlayClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          width: contentWidth,
          height: contentHeight,
          border: 'none',
          borderRadius: '10px',
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          animation: disableAnimation ? 'none' : `${animation} 1.5s ease-out`,
          position: 'relative',
          overflow: 'auto'
        }}
      >
        {children}
      </div>
      {showNavigation && (
        <NavigationArrows
          navigateToSection={navigateToSection}
          activeSection={activeSection}
          style={{ position: 'absolute', bottom: '80px' }}
        />
      )}
    </div>
  );
};

export default Overlay;