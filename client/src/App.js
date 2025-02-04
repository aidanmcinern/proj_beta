import React, { memo, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './styles/App.css';
import useModelController from './hooks/useModelController';
import useNavigation from './hooks/useNavigation';
import useDataFetch from './hooks/useDataFetch';
import useCamera from './hooks/useCamera';
import useInteractionTracking from './hooks/useInteractionTracking';
import useScroll from './hooks/useScroll';
import Overlay from './components/overlays/Overlay';
import NavigationArrows from './components/navigation/NavigationArrows';
import RegularButton from './components/navigation/regularButton';
import Sidebar from './components/sidebar/Sidebar';
import BackToBarButton from './components/navigation/backToBarButton';
import Model from './components/3D/Model';
import Smoke from './components/3D/Smoke'
import Chatbot from './components/chat/Chatbot'
import AboutContent from './components/overlays/AboutContent';
import ProjectsContent from './components/overlays/ProjectsContent';
import BarOptions from './components/overlays/BarOptions';
import CanvasLoader from './components/loaders/CanvasLoader'
import MouseIndicator from './components/loaders/MouseIndicator'

export default function App() {
  const controlsRef = useRef();
  const datasets = useDataFetch();
  const hasInteracted = useInteractionTracking();

  const {
    isModelLoaded,
    handleModelLoaded
  } = useModelController();

  const {
    activeSection,
    isTransitioning,
    showIframe,
    showLinktree,
    showBarOptions,
    showChatbot,
    navigateToSection,
    setShowIframe,
    setShowBarOptions,
    setShowChatbot,
    handleOverlayClick
  } = useNavigation({});

  useCamera({ activeSection, controlsRef });

  const scrollRef = useScroll({
    activeSection,
    isTransitioning,
    navigateToSection
  });

  const MemoizedSmoke = memo(Smoke);

  const ModelController = ({ onModelLoaded }) => (
    <group>
      <Model onLoaded={onModelLoaded} />
      <MemoizedSmoke position={[-0.25, 5.25, -3]} />
    </group>
  );



  useEffect(() => {
    const currentRef = scrollRef.current;
    currentRef.addEventListener('wheel', scrollRef, { passive: false });
    return () => {
      currentRef.removeEventListener('wheel', scrollRef);
    };
  }, [scrollRef]);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        activeSection={activeSection}
        isTransitioning={isTransitioning}
        hasInteracted={hasInteracted}
        navigateToSection={navigateToSection}
      />
      <div style={{ flex: 1, backgroundColor: '#1e1e1e', position: 'relative' }} ref={scrollRef}>
        {!isModelLoaded && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            <CanvasLoader />
          </div>
        )}
        <MouseIndicator
          isModelLoaded={isModelLoaded}
          hasInteracted={hasInteracted}
        />

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
            <ModelController onModelLoaded={handleModelLoaded} />
          </Suspense>
          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
          />
        </Canvas>

        <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <RegularButton
            Insruct={'Zoom In'}
            controlsRef={controlsRef}
          />
          <RegularButton
            Insruct={'Zoom Out'}
            controlsRef={controlsRef}
          />
          <RegularButton
            Insruct={'Reset View'}
            controlsRef={controlsRef}
          />
        </div>

        {/* About Section Overlay*/}
        {showIframe && activeSection === 0 && (
          <Overlay
            onClose={() => setShowIframe(false)}
            navigateToSection={navigateToSection}
            activeSection={activeSection}
          >
            <AboutContent
              navigateToSection={navigateToSection}
              activeSection={activeSection}
            />
          </Overlay>
        )}

        {/* Bar Options Overlay */}
        {showBarOptions && activeSection === 1 && (
          <Overlay
            disableAnimation={true}
            onClose={() => setShowBarOptions(false)}
            contentWidth="auto"
            contentHeight="auto"
            navigateToSection={navigateToSection}
            activeSection={activeSection}
          >
            <BarOptions
              setShowBarOptions={setShowBarOptions}
              setShowIframe={setShowIframe}
              setShowChatbot={setShowChatbot}
            />
          </Overlay>
        )}



        {/* Analysis View Overlay */}
        {showIframe && activeSection === 1 && (
          <Overlay
            onClose={() => setShowIframe(false)}
            animation="fadeInFromTop"
            navigateToSection={navigateToSection}
            activeSection={activeSection}
          >
            <BackToBarButton
              navigateToSection={navigateToSection}
              onBackToBar={() => {
                setShowIframe(false);
                setShowBarOptions(true);      // Show menu immediately
              }}
            />
            <ProjectsContent datasets={datasets} />
          </Overlay>
        )}

        {/* Chatbot View Overlay */}
        {showChatbot && activeSection === 1 && (
          <Overlay
            onClose={() => setShowChatbot(false)}
            navigateToSection={navigateToSection}
            activeSection={activeSection}
          >
            <BackToBarButton
              navigateToSection={navigateToSection}
              onBackToBar={() => {
                setShowChatbot(false);  // Hide chatbot
                setShowBarOptions(true);      // Show menu immediately
              }}
            />
            <Chatbot />
          </Overlay>
        )}



        {/* Contact Section */}
        {showLinktree && activeSection === 2 && (
          <div
            className="overlay"
            onClick={handleOverlayClick}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
            }}
          >
            <p style={{
              color: '#ffffff',
              fontSize: '48px',
              fontFamily: 'Peach_Cakes, sans-serif',
              marginBottom: '7%',
              marginLeft: '18%'
            }}>
              Reach me...
            </p>
            <img
              src='/arrow.png'
              alt="arrow"
              style={{
                width: '300px',
                height: '300px',
                marginBottom: '50px',
              }}
            />
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
                }}
              />
            </a>
            <NavigationArrows
              navigateToSection={navigateToSection}
              activeSection={activeSection}
              style={{
                position: 'absolute',
                bottom: '120px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}