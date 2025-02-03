import { ArrowLeft } from 'lucide-react';

const BackToBarButton = ({ navigateToSection, onBackToBar }) => {
  const handleClick = () => {
    // Call the menu display function first
    if (onBackToBar) {
      onBackToBar();
    }
    // Navigate to section 1 (bar) immediately without delay
    navigateToSection(1, { immediate: true });
  };

  return (
    <button
      onClick={handleClick}
      className="back-to-bar"
      style={{
        position: 'absolute',
        top: '0%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        backgroundColor: '#f0a500',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 1000
      }}
    >
      <ArrowLeft size={20} />
      Back to Bar
    </button>
  );
};

export default BackToBarButton;