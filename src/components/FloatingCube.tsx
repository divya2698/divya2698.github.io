import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface FloatingCubeProps {
  position: [number, number, number];
  size: number;
  color: string;
}

const FloatingCube: React.FC<FloatingCubeProps> = ({ position, size, color }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Rotate the cube
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
    
    // Make the cube float up and down
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.005;
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default FloatingCube;