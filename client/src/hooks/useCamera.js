import { useEffect, useCallback } from 'react';
import * as THREE from 'three';

const easeInOut = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const useCamera = ({ activeSection, controlsRef }) => {
  const animateCamera = useCallback((startPos, targetPos, startZoom, targetZoom) => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const duration = 2000; // Shorter duration for zoom actions
      let startTime;

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
  }, [controlsRef]);

  useEffect(() => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const startPos = camera.position.clone();
      const startZoom = camera.zoom;

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

      animateCamera(startPos, targetPos, startZoom, targetZoom);
    }
  }, [activeSection, animateCamera, controlsRef]);

  const zoomIn = useCallback(() => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const startPos = camera.position.clone();
      const targetPos = startPos.clone().multiplyScalar(0.8); // Move camera closer
      const startZoom = camera.zoom;
      const targetZoom = startZoom * 1.5; // Increase zoom by 50%

      animateCamera(startPos, targetPos, startZoom, targetZoom);
    }
  }, [controlsRef, animateCamera]);

  const zoomOut = useCallback(() => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const startPos = camera.position.clone();
      const targetPos = startPos.clone().multiplyScalar(1.2); // Move camera farther
      const startZoom = camera.zoom;
      const targetZoom = startZoom * 0.75; // Decrease zoom by 25%

      animateCamera(startPos, targetPos, startZoom, targetZoom);
    }
  }, [controlsRef, animateCamera]);

  const resetView = useCallback(() => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const startPos = camera.position.clone();
      const targetPos = new THREE.Vector3(9, 3, 9); // Default camera position
      const startZoom = camera.zoom;
      const targetZoom = 1; // Default zoom level

      animateCamera(startPos, targetPos, startZoom, targetZoom);
    }
  }, [controlsRef, animateCamera]);

  return { zoomIn, zoomOut, resetView };
};

export default useCamera;