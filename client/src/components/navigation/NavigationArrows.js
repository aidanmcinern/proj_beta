import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationArrows = ({ activeSection, navigateToSection, style = {} }) => (
  <div style={{ 
    position: 'absolute', 
    bottom: '20px', 
    left: '50%', 
    transform: 'translateX(-50%)', 
    display: 'flex', 
    gap: '40px',
    alignItems: 'center',
    ...style
  }}>
    {activeSection > 0 && (
      <div className="nav-arrow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ color: '#f0a500', marginBottom: '5px' }}>
          {activeSection === 1 ? 'About' : 'Go to the bar'}
        </span>
        <ChevronLeft
          size={24}
          onClick={() => navigateToSection(activeSection - 1)}
          style={{ cursor: 'pointer', color: '#f0a500' }}
        />
      </div>
    )}
    {activeSection < 2 && (
      <div className="nav-arrow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ color: '#f0a500', marginBottom: '5px' }}>
          {activeSection === 0 ? 'Go to the bar' : 'Contact'}
        </span>
        <ChevronRight
          size={24}
          onClick={() => navigateToSection(activeSection + 1)}
          style={{ cursor: 'pointer', color: '#f0a500' }}
        />
      </div>
    )}
  </div>
);

export default NavigationArrows;
