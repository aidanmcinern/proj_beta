import { useState, useCallback } from 'react';

const Overlay = ({ 
  children, 
  onClose, 
  contentWidth = '80%', 
  contentHeight = '80%',
  animation = 'fadeInFromCenter',
  disableAnimation = false,
  navigateToSection,
  activeSection
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className="overlay" 
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{
          position: 'relative',
          width: isMobile ? '90%' : contentWidth,
          height: isMobile ? 'auto' : contentHeight,
          maxHeight: isMobile ? '85vh' : '90vh',
          backgroundColor: '#1e1e1e',
          borderRadius: '8px',
          padding: isMobile ? '10px' : '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          animation: disableAnimation ? 'none' : `${animation} 0.3s ease-out forwards`,
          overflowY: 'auto'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;