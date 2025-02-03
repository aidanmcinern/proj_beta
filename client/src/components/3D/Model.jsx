import { useModelAnimation } from '../../hooks/useModelAnimation';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';



const Model = ({ position = [0, -1.5, 0], onLoaded }) => {
    const gltf = useGLTF('/pub_model.glb');
    const mixer = useModelAnimation(gltf);
    
    // Rest of component...
    onLoaded();
    useFrame((state, delta) => {
      if (mixer.current) mixer.current.update(delta / 2);
    });
  
    return (
      <primitive object={gltf.scene} scale={[1, 1, 1]} position={position} />
    );
  };

export default Model;