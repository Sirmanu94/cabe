import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. IL MODELLO VERO E PROPRIO (De-commentalo quando hai il file house.glb!)

const RealModel = ({ scrollProgress }) => {
  // Carica il modello dalla cartella public
  const { scene } = useGLTF('/house.glb');
  const modelRef = useRef();

  useFrame(() => {
    // Ruota il modello in base allo scroll (da 0 a 360 gradi)
    if (modelRef.current) {
      modelRef.current.rotation.y = scrollProgress * Math.PI * 2;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -1, 0]} />;
};


// 2. IL PLACEHOLDER (Una villa moderna minimalista creata col codice per farti testare subito l'effetto)
const PlaceholderVilla = ({ scrollProgress }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Rotazione morbida basata sullo scroll
      // Aggiungiamo un po' di inerzia per farlo sembrare più fluido
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        scrollProgress * Math.PI * 2,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Corpo principale */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
      </mesh>
      {/* Vetrata/Piscina */}
      <mesh position={[1, 0, 1.5]} castShadow>
        <boxGeometry args={[2, 1.8, 0.5]} />
        <meshStandardMaterial color="#b3e5fc" transparent opacity={0.6} roughness={0} />
      </mesh>
      {/* Tetto spiovente/moderno */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[4.4, 0.2, 3.4]} />
        <meshStandardMaterial color="#134f72" roughness={0.5} />
      </mesh>
      {/* Base/Terreno */}
      <mesh position={[0, -1.1, 0]} receiveShadow>
        <boxGeometry args={[6, 0.2, 5]} />
        <meshStandardMaterial color="#e6e6e6" />
      </mesh>
    </group>
  );
};

const ArchitectureCanvas = ({ scrollProgress }) => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [5, 3, 8], fov: 40 }} shadows>
        
        {/* Illuminazione fotorealistica chiara */}
        <ambientLight intensity={0.7} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          color="#ffffff" 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        <Environment preset="city" /> {/* Aggiunge riflessi realistici sui vetri */}

        <Suspense fallback={null}>
          {/* Un effetto fluttuante molto premium */}
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
            
            {/* SOSTITUISCI PlaceholderVilla con RealModel quando hai il file! */}
            <RealModel scrollProgress={scrollProgress} />
            
          </Float>

          {/* Ombra di contatto super realistica sotto il modello */}
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#134f72" />
        </Suspense>

        {/* Controlli per l'utente: permette di ruotare col mouse ma impedisce lo zoom e il pan per non rompere il layout */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4} // Limita la rotazione verticale
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default ArchitectureCanvas;