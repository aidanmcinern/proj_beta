import React, { useEffect, useState, useRef, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, Github, Mail, Linkedin, Database, Globe2, TreePine, Wind, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import './styles/loader.css';



// Run the script
//const climateData = main().catch(console.error);

// Sample data for charts

const easeInOut = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

function Model({ position = [0, -1.5, 0], onLoaded }) {
  const gltf = useGLTF('/pub_model.glb');
  const mixer = useRef();

  useEffect(() => {
    if (gltf.animations.length) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        mixer.current.clipAction(clip).play();
      });
    }
    onLoaded(); // Notify that model is loaded
    return () => {
      if (mixer.current) mixer.current.stopAllAction();
    };
  }, [gltf, onLoaded]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta / 2);
  });

  return (
    <primitive object={gltf.scene} scale={[1, 1, 1]} position={position} />
  );
}

const Smoke = ({ position }) => {
  const particleCount = 7;
  const particlesRef = useRef();
  const [particles] = useState(() => {
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = Math.random() * 0.1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      scales[i] = Math.random() * 0.2 + 0.1;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    return particles;
  });

  const texture = new THREE.TextureLoader().load('/smoke.png');

  const material = new THREE.PointsMaterial({
    size: 1,
    sizeAttenuation: true,
    map: texture,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
  });

  useFrame(() => {
    const positions = particles.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += 0.005;
      if (positions[i * 3 + 1] > 1) {
        positions[i * 3 + 1] = 0;
        positions[i * 3] = (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      }
    }

    particles.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={particles} material={material} position={position} />
  );
};

const ModelController = ({ activeSection, onModelLoaded }) => {
  return (
    <group>
      <Model onLoaded={onModelLoaded} />
      <Smoke position={[-0.25, 5.25, -3]} />
    </group>
  );
};

export default function App() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [showIframe, setShowIframe] = useState(false);
  const [showLinktree, setShowLinktree] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCameraTransitionComplete, setIsCameraTransitionComplete] = useState(false);
  const scrollRef = useRef(null);
  const controlsRef = useRef();
  const scrollAccumulator = useRef(0);
  const scrollThreshold = 100;

  const handleModelLoaded = () => {
    setIsModelLoaded(true);
  };



  const [datasets, setDatasets] = useState({
    climate: [],
    migration: []
  });
  
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const climateResponse = await fetch('/api/collection?collection=demo');
        const migrationResponse = await fetch('/api/collection?collection=demo2');
        
        console.log('Climate Response:', climateResponse);
        console.log('Migration Response:', migrationResponse);
        
        const climateData = await climateResponse.json();
        const migrationData = await migrationResponse.json();
        
        console.log('Climate Data:', climateData);
        console.log('Migration Data:', migrationData);
        
        setDatasets({
          climate: climateData.demo || [],
          migration: migrationData.demo2 || []
        });
      } catch (error) {
        console.error('Detailed Error fetching data:', error);
        if (error instanceof TypeError) {
          console.error('Network or CORS issue');
        }
        setDatasets({
          climate: [],
          migration: []
        });
      } finally {
        setIsModelLoaded(true);
      }
    };
  
    fetchAllData();
  }, []);


  const loaderStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#1e1e1e',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

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
  
  const handleScroll = useCallback(
    (event) => {
      event.preventDefault();
      if (isTransitioning) return;

      scrollAccumulator.current += event.deltaY;
      
      if (Math.abs(scrollAccumulator.current) > scrollThreshold) {
        const delta = Math.sign(scrollAccumulator.current);
        const newSection = (activeSection ?? -1) + delta;
        
        if (newSection >= 0 && newSection <= 2) {
          navigateToSection(newSection);
        }
        
        scrollAccumulator.current = 0;
      }
    },
    [activeSection, isTransitioning]
  );

  const navigateToSection = (newSection) => {
    setIsTransitioning(true);
    setShowIframe(false);
    setShowLinktree(false);
    setIsCameraTransitionComplete(false);

    setTimeout(() => {
      setActiveSection(newSection);
      
      // Wait for camera transition to complete before showing new content
      setTimeout(() => {
        setIsCameraTransitionComplete(true);
        if (newSection === 0 || newSection === 1) {
          setShowIframe(true);
        } else if (newSection === 2) {
          setShowLinktree(true);
        }
        setIsTransitioning(false);
      }, 3000); // Match this with camera transition duration
    }, 500); // Delay before starting new transition
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    currentRef.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      currentRef.removeEventListener('wheel', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const duration = 3000;
      let startTime;
      let startPos = camera.position.clone();
      let startZoom = camera.zoom;
      
      let targetPos = new THREE.Vector3();
      let targetZoom = 1;

      switch (activeSection) {
        case 0:
          targetPos.set(6, -.5, 6);
          targetZoom = 1;
          break;
        case 1:
          targetPos.set(4, -.5, -1);
          targetZoom = 2;
          break;
        case 2:
          targetPos.set(-3, .5, 8);
          targetZoom = 1;
          break;
        default:
          targetPos.set(9, 3, 9);
          targetZoom = 1;
      }

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = easeInOut(progress);

        camera.position.lerpVectors(startPos, targetPos, eased);
        camera.zoom = startZoom + (targetZoom - startZoom) * eased;
        camera.updateProjectionMatrix();

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [activeSection]);

  const NavigationArrows = () => (
    <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '20px' }}>
      {activeSection > 0 && (
        <ChevronLeft
          size={24}
          onClick={() => navigateToSection(activeSection - 1)}
          style={{ cursor: 'pointer', color: '#f0a500' }}
        />
      )}
      {activeSection < 2 && (
        <ChevronRight
          size={24}
          onClick={() => navigateToSection(activeSection + 1)}
          style={{ cursor: 'pointer', color: '#f0a500' }}
        />
      )}
    </div>
  );

  const AboutContent = () => (
    <div style={{ color: '#ffffff', fontFamily: 'Arial', padding: '20px', height: '100%', overflow: 'auto' }}>
      <h2 style={{ color: '#f0a500', marginBottom: '20px' }}>Data Scientist</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 2 }}>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Passionate data scientist with expertise in climate analysis and socioeconomic development.
            Specialized in creating impactful data visualizations and predictive models.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
          <Github size={24} />
          <Mail size={24} />
          <Linkedin size={24} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <h3 style={{ color: '#f0a500', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={20} /> Skills
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Python, R, SQL</li>
            <li>Machine Learning</li>
            <li>Data Visualization</li>
          </ul>
        </div>
        <div>
          <h3 style={{ color: '#f0a500', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe2 size={20} /> Expertise
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Climate Analysis</li>
            <li>Migration Patterns</li>
            <li>Development Economics</li>
          </ul>
        </div>
      </div>
      <NavigationArrows />
    </div>
  );

  const ProjectsContent = ({ datasets }) => {
    const [activeTab, setActiveTab] = useState('Climate Analysis');
  
    return (
      <div style={{ color: '#ffffff', fontFamily: 'Arial', padding: '20px', height: '100%', overflow: 'auto' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div
            onClick={() => setActiveTab('Climate Analysis')}
            style={{
              padding: '10px',
              cursor: 'pointer',
              borderBottom: activeTab === 'Climate Analysis' ? '2px solid #f0a500' : 'none',
            }}
          >
            <TreePine size={20} /> Climate Analysis
          </div>
          <div
            onClick={() => setActiveTab('Migration & Development')}
            style={{
              padding: '10px',
              cursor: 'pointer',
              borderBottom: activeTab === 'Migration & Development' ? '2px solid #f0a500' : 'none',
            }}
          >
            <Users size={20} /> Migration & Development
          </div>
        </div>
  
        {activeTab === 'Climate Analysis' ? (
          <div>
            <h3 style={{ color: '#f0a500', marginBottom: '20px' }}>Climate Trends</h3>
            <LineChart width={500} height={300} data={datasets.climate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temperature" stroke="#f0a500" />
              <Line type="monotone" dataKey="rainfall" stroke="#82ca9d" />
            </LineChart>
          </div>
        ) : (
          <div>
            <h3 style={{ color: '#f0a500', marginBottom: '20px' }}>Migration & GDP Correlation</h3>
            <BarChart width={500} height={300} data={datasets.migration}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="migration" fill="#f0a500" />
              <Bar dataKey="gdp" fill="#82ca9d" />
            </BarChart>
          </div>
        )}
        <NavigationArrows />
      </div>
    );
  };

 const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      setShowIframe(false);
    }
  };

  const zoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.object.zoom *= 1.2;
      controlsRef.current.object.updateProjectionMatrix();
    }
  };

  const zoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.object.zoom /= 1.2;
      controlsRef.current.object.updateProjectionMatrix();
    }
  };

  const resetView = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.position.set(9, 3, 9);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
      setActiveSection(null);
      setShowIframe(false);
      setShowLinktree(false);
      setIsCameraTransitionComplete(false);
    }
  };
  const sidebarStyle = {
    width: '375px',
    position: 'relative',
    backgroundColor: '#2b2b2b',
    color: '#f5f5f5',
    padding: '60px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Georgia, serif',
    // Removed borderRadius
  };

  return (
  

    <div style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div style={sidebarStyle}>
        <div
          style={{
            backgroundImage: 'url(/floral-border.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            height: '50px',
            marginBottom: '20px',
            padding: '10px 0',
          }}
        />

        <h1 style={{ fontSize: '22px', margin: '10px 10px 20px', color: '#f0a500' }}>
          Welcome in weary traveller, to the Outlier's Rest.
        </h1>
        <p style={{ margin: '10px 10px 20px' }}>
          Stranger, you are welcome. We will have occasion to remember you, for you have given us a
          story to tell.
        </p>

        {['- About', '- Projects', '- Contact'].map((section, index) => (
          <div
            key={section}
            onClick={() => !isTransitioning && navigateToSection(index)}
            style={{
              color: activeSection === index ? '#f0a500' : 'white',
              padding: '10px',
              borderRadius: '5px',
              background: activeSection === index ? '#444' : 'transparent',
              transition: 'background 0.3s, color 0.3s',
              cursor: isTransitioning ? 'default' : 'pointer',
              marginBottom: index < 2 ? '10px' : 0,
              boxShadow: activeSection === index ? 'inset 0 0 5px rgba(255, 255, 255, 0.3)' : 'none',
              opacity: isTransitioning ? 0.5 : 1,
            }}
          >
            {section}
          </div>
        ))}

        <div
          style={{
            backgroundImage: 'url(/floral-border.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom center',
            height: '50px',
            marginTop: '20px',
            padding: '10px 0',
            transform: 'rotate(180deg)',
          }}
        />
      </div>

        <div style={{ flex: 1, backgroundColor: '#1e1e1e', position: 'relative' }} ref={scrollRef}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 1000 }}>
          {!isModelLoaded && <CanvasLoader />}
        </div>
          <Canvas
            shadows
            camera={{
              position: [9, 3, 9],
              fov: 50,
            }}
          >
            <ambientLight intensity={1.3} color={new THREE.Color(0xffffff)} />
            <pointLight position={[3.9, 1.3, -0.8]} intensity={45} color={new THREE.Color(0xffffff)} castShadow={true} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
            <Suspense fallback={null}>
              <ModelController activeSection={activeSection} onModelLoaded={handleModelLoaded} />
            </Suspense>
            <OrbitControls
              ref={controlsRef}
              enableZoom={false}
              enablePan={false}
              onStart={() => setActiveSection(null)}
            />
          </Canvas>


        <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={zoomIn}
            style={{
              padding: '8px',
              borderRadius: '5px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Zoom In
          </button>
          <button
            onClick={zoomOut}
            style={{
              padding: '8px',
              borderRadius: '5px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Zoom Out
          </button>
          <button
            onClick={resetView}
            style={{
              padding: '8px',
              borderRadius: '5px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Home
          </button>
        </div>
   
        {showIframe && (activeSection === 0 || activeSection === 1) && (
          <div
            className="overlay"
            onClick={handleOverlayClick}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '60%',
                height: '60%',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: '#1e1e1e',
                color: '#ffffff',
                animation: activeSection === 0 
                  ? 'fadeInFromCenter 1.5s ease-out'
                  : 'fadeInFromTop 1.5s ease-out',
                position: 'relative',
              }}
            >
              {activeSection === 0 ? <AboutContent /> : <ProjectsContent datasets={datasets} />}
            </div>
          </div>
        )}

        {showLinktree && activeSection === 2 && (
          <div
            style={{
              position: 'absolute',
              top: '75%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              animation: 'fadeIn 2.0s ease-out',
            }}
          >
            <a
              href="https://linktr.ee/aidanmcinern"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#ffffff' }}
            >
              <img
                src="https://img.utdstc.com/icon/0d4/e93/0d4e9331c3b8346858e1e5c4f77e9dfd92dccf8c38db0b280dba00076e5d5dc0:200"
                alt="Linktree"
                style={{
                  width: '100px',
                  height: '100px',
                  //marginBottom: '200px',
                }}
              />
              
              <img
              src='/arrow.png'
              alt="arrow"
              style={{
                width: '300px',
                height: '300px',
                marginBottom: '50px',
                //marginLeft: '10px',
              }}
            />

          </a>
          </div>
        )}
      </div>
    </div>
  );
}