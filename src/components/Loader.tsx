import React from 'react';

const Loader: React.FC = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );
};

export default Loader;