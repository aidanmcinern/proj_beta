import './../../styles/loader.css';

const CanvasLoader = () => (
    <div style={{
      position: 'center',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#1e1e1e',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div className="wrapper">
        <div className="glass-wrapper">
          <div className="glass">
            <div className="beer">
              <div className="foam">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="foambubble"></span>
                ))}
              </div>
              <div className="bubbles">
                {[...Array(9)].map((_, i) => (
                  <span key={i} className="bubble"></span>
                ))}
              </div>
            </div>
          </div>
          <div className="foamtop">
            {[...Array(4)].map((_, i) => (
                <span key={i} className="ft-bubble"></span>
            ))}
          </div>
          <div className="coaster"></div>
        </div>
      </div>
    </div>
  );

  export default CanvasLoader;