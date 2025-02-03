import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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

export default Smoke;