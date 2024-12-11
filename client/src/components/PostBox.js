// src/components/PostBox.js
import React from 'react';
import { useFrame } from '@react-three/fiber';

const PostBox = () => {
  return (
    <mesh
      position={[2, 0, -2]}
      onClick={() => window.alert('Contact form appears here')}
    >
      <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default PostBox;
