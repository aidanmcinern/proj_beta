import React from 'react';
import BarButton from './../navigation/barButton';
import { Speech, Beer } from 'lucide-react';

const BarOptions = ({ setShowBarOptions, setShowIframe, setShowChatbot }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        alignItems: 'center'
      }}>
        <BarButton 
          onClick={() => {
            setShowBarOptions(false);
            setShowIframe(true);
          }}
          icon={<Beer size={34} />}
        >
          Quench your data thirst
        </BarButton>
        
        <BarButton 
          onClick={() => {
            setShowBarOptions(false);
            setShowChatbot(true);
          }}
          icon={<Speech size={34} />}
        >
          Speak to the Barkeep
        </BarButton>
      </div>
    </div>
  );
};

export default BarOptions;