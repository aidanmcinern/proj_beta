import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const useModelAnimation = (gltf) => {
  const mixer = useRef();

  useEffect(() => {
    if (gltf.animations.length) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        mixer.current.clipAction(clip).play();
      });
    }

    return () => {
      if (mixer.current) mixer.current.stopAllAction();
    };
  }, [gltf]);

  return mixer;
};
