import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

// Un blocco astratto che simula un elemento architettonico in costruzione
const BuildingBlock = ({ position, size }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#0a1118" transparent opacity={0.8} />
      {/* Edges crea l'effetto "wireframe/blueprint" sui bordi */}
      <Edges scale={1} threshold={15} color="#00a89d" /> 
    </mesh>
  );
};

const AbstractBuilding = () => {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    // Rotazione lenta e continua del complesso architettonico
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      // Leggera oscillazione sull'asse X legata al mouse per un effetto 3D profondo
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 20,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Composizione astratta di grattacieli/strutture */}
      <BuildingBlock position={[0, 0, 0]} size={[2, 4, 2]} />
      <BuildingBlock position={[2.5, -0.5, 1]} size={[1.5, 3, 1.5]} />
      <BuildingBlock position={[-2, -1, -1]} size={[1.5, 2, 1.5]} />
      <BuildingBlock position={[1, 1, -2.5]} size={[1, 3, 1]} />
      {/* Una base piana ("il terreno di cantiere") */}
      <BuildingBlock position={[0, -2.2, 0]} size={[8, 0.2, 8]} />
    </group>
  );
};

const ArchitectureCanvas = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [5, 3, 8], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#134f72" />
        <AbstractBuilding />
        {/* Nebbia per fondere il 3D con lo sfondo scuro */}
        <fog attach="fog" args={['#0a1118', 5, 20]} />
      </Canvas>
    </div>
  );
};

export default ArchitectureCanvas;