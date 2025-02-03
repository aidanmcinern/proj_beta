import useCamera from './../../hooks/useCamera';
import './../../styles/App.css';

const RegularButton = ({ Insruct, controlsRef }) => {
  const { zoomIn, zoomOut, resetView } = useCamera({ activeSection: 0, controlsRef });
  
  const handleClick = () => {
    switch (Insruct) {
      case 'Zoom In':
        zoomIn();
        break;
      case 'Zoom Out':
        zoomOut();
        break;
      case 'Reset View':
        resetView();
        break;
      default:
        console.warn('Invalid instruction');
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '8px',
        borderRadius: '5px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {Insruct}
    </button>
  );
};

export default RegularButton;
