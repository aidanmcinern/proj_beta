const BarButton = ({ onClick, children, icon, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '15px 30px',
        fontSize: '18px',
        backgroundColor: '#f0a500',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
      onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
      onMouseOut={e => e.target.style.transform = 'scale(1)'}
    >
      {icon}
      {children}
      </button>
  );
  
  export default BarButton;