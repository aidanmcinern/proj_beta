// src/components/Carousel.js
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import axios from 'axios';

const Carousel = () => {
  const [projects, setProjects] = useState([]);
  const carouselRef = useRef();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects'); // Create an endpoint to fetch projects
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useFrame(() => {
    if (carouselRef.current) {
      carouselRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={carouselRef} position={[0, 0.5, -3]}>
      {projects.map((project, index) => (
        <mesh key={index} position={[index * 1.5 - 1.5, 0, 0]}>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      ))}
    </group>
  );
};

export default Carousel;
