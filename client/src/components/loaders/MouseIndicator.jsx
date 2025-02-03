import { memo } from 'react';
import { Move } from 'lucide-react';

const MouseIndicator = memo(({isModelLoaded, hasInteracted}) => {

    if (!isModelLoaded || hasInteracted) return null; 
    return (
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '40%',
        color: '#f0a500',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 999
      }}>
        <Move size={24} />
        <span>Click and drag to explore</span>
      </div>
    );
  });

export default MouseIndicator;