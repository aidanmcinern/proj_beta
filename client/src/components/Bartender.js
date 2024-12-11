// src/components/Bartender.js
import React from 'react';
import { useGLTF } from '@react-three/drei';

const Bartender = () => {
  const { scene, animations } = useGLTF('/models/bartender.glb'); // Replace with your actual model path
  // Using animation mixer for the bartender animation
  return <primitive object={scene} scale={1} position={[0, 0, -1]} />;
};

export default Bartender;
