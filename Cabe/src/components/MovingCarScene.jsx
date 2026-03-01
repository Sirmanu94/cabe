import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, MeshReflectorMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

import citybg from '../assets/sfondo2.png'; 

// ==========================================
// 1. IL MODELLO DELL'AUTO
// ==========================================
const Car = () => {
  const { scene } = useGLTF('/ferrari.glb'); 
  return (
    <group position={[0, -0.02, 0]}>
      <primitive object={scene} scale={1} rotation={[0, Math.PI, 0]} />
    </group>
  );
};

// Helper per creare una sfumatura radiale (bianco al centro, nero ai bordi)
function createAlphaMap() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Il centro (512, 512) è opaco (bianco), i bordi a raggio 512 sono trasparenti (nero)
    const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
    gradient.addColorStop(0, 'white');    // Pieno centro
    gradient.addColorStop(0.3, 'white');  // Zona solida per l'auto e la strada
    gradient.addColorStop(0.8, 'black');  // Inizia a sfumare forte
    gradient.addColorStop(1, 'black');    // Bordi invisibili
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);
    
    return new THREE.CanvasTexture(canvas);
  }
// ==========================================
// 2. LA SCENA 3D CONTROLLATA DALLO SCROLL
// ==========================================
const ScrollControlledScene = ({ scrollYProgress }) => {
  const leftLineRef = useRef();
  const rightLineRef = useRef();
  const alphaMap = React.useMemo(() => createAlphaMap(), []);
  // Riferimenti per le luci rosse sospese
  const leftLightRef = useRef();
  const rightLightRef = useRef();

  useFrame((state) => {
    const scroll = scrollYProgress.get();

    // A. REGIA DELLA TELECAMERA
    let camX = THREE.MathUtils.lerp(8, 0, Math.min(scroll / 0.3, 1));
    let camZ = THREE.MathUtils.lerp(2, -7.5, Math.min(scroll / 0.3, 1));
    let camY = THREE.MathUtils.lerp(1.8, 1.2, Math.min(scroll / 0.3, 1));
    
    state.camera.position.set(camX, camY, camZ);
    state.camera.lookAt(0, 0.8, 0);

    // B. CAMERA SHAKE (Tremolio per la velocità)
    if (scroll > 0.4 && scroll < 0.8) {
      const shakeAmount = 0.015 * ((scroll - 0.4) * 2); 
      state.camera.position.y += Math.sin(state.clock.elapsedTime * 60) * shakeAmount;
      state.camera.position.x += Math.cos(state.clock.elapsedTime * 50) * shakeAmount;
    }

    // C. ANIMAZIONE STRISCE BIANCHE E LUCI ROSSE IN PROFONDITÀ
    let speedMult = 0;
    const elementsOpacity = THREE.MathUtils.lerp(0, 0.8, Math.min(Math.max((scroll - 0.1) / 0.2, 0), 1));

    if (scroll > 0.1 && scroll < 0.8) {
      speedMult = THREE.MathUtils.lerp(0, 80, Math.min((scroll - 0.1) / 0.3, 1)); 
    } else if (scroll >= 0.8) {
      speedMult = THREE.MathUtils.lerp(80, 0, (scroll - 0.8) / 0.2); 
    }

    if (leftLineRef.current && rightLineRef.current && leftLightRef.current && rightLightRef.current) {
      // CALCOLO PROFONDITÀ: Nascono lontanissime (z=30) e sfrecciano verso la telecamera (z=-10)
      const zPosLines = 30 - ((state.clock.elapsedTime * speedMult) % 40);
      const zPosLights = 40 - ((state.clock.elapsedTime * speedMult * 1.5) % 60); // Le luci vanno ancora più veloci

      // Muoviamo le strisce a terra
      leftLineRef.current.position.z = zPosLines;
      rightLineRef.current.position.z = zPosLines;
      leftLineRef.current.material.opacity = elementsOpacity;
      rightLineRef.current.material.opacity = elementsOpacity;

      // Muoviamo le luci rosse in aria
      leftLightRef.current.position.z = zPosLights;
      rightLightRef.current.position.z = zPosLights;
      leftLightRef.current.material.opacity = elementsOpacity;
      rightLightRef.current.material.opacity = elementsOpacity;
    }
  });

  return (
    <group>
      <Car />
      
      {/* LUCE ROSSA SOTTO L'AUTO (Genera il riflesso rosso sull'asfalto) */}
      <pointLight position={[0, 0.5, -2]} intensity={5} color="#ff0000" distance={6} decay={2} />
      
      {/* IL PAVIMENTO RIFLETTENTE (Ora è trasparente e gigantesco, niente bordi netti!) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
  {/* Abbastanza grande da coprire la visuale, ma la sfumatura nasconderà i bordi */}
  <planeGeometry args={[100, 100]} /> 
  <MeshReflectorMaterial
    blur={[400, 100]} 
    resolution={1024} 
    mixBlur={1.5} 
    mixStrength={80}
    roughness={0.6} 
    depthScale={1.2} 
    color="#050505" 
    metalness={0.9} 
    transparent 
    opacity={0.6} // Opacità base del vetro
    alphaMap={alphaMap} // QUESTA È LA MAGIA! Sfuma solo i bordi dell'asfalto
  />
</mesh>

      {/* STRISCE BIANCHE LATERALI (A terra) */}
      <mesh ref={leftLineRef} position={[-2.5, 0, 0]}>
        <boxGeometry args={[0.08, 0.01, 6]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
      <mesh ref={rightLineRef} position={[2.5, 0, 0]}>
        <boxGeometry args={[0.08, 0.01, 6]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>

      {/* LUCI ROSSE (Neon sospesi in aria che sfrecciano) */}
      <mesh ref={leftLightRef} position={[-4, 1.5, 0]}>
        {/* Parallelepipedi lunghi 8 metri, sottili, che fanno da scia luminosa */}
        <boxGeometry args={[0.1, 0.1, 8]} />
        <meshBasicMaterial color="#ff0000" transparent opacity={0} />
      </mesh>
      <mesh ref={rightLightRef} position={[4, 1.5, 0]}>
        <boxGeometry args={[0.1, 0.1, 8]} />
        <meshBasicMaterial color="#ff0000" transparent opacity={0} />
      </mesh>
    </group>
  );
};

// ==========================================
// 3. COMPONENTE PRINCIPALE (HTML + 3D)
// ==========================================
const MovingCarScene = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Animazioni UI
  const speed = useTransform(scrollYProgress, [0.3, 0.7], [0, 340]);
  const rpmWidth = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "100%"]);
  const dashOffset = useTransform(scrollYProgress, [0.3, 0.7], [377, 0]);
  
  const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-30%"]);
  
  const uiOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const uiRightX = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]); 
  const uiLeftX = useTransform(scrollYProgress, [0.3, 0.4], [-50, 0]); 

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#020202]">
      <div className="sticky top-0 h-screen w-full overflow-hidden font-sans">
        
        {/* 1. SFONDO FOTOGRAFICO HTML */}
        <div className="absolute inset-0 z-0">
          <img 
            src={citybg} 
            alt="Dark Background" 
            className="w-full h-full object-cover opacity-60" 
          />
        </div>

        {/* 2. IL CANVAS 3D CON LA MAGIA DELLA MASCHERA CSS */}
{/* 2. IL CANVAS 3D (Pulito, senza maschere CSS che sbiadiscono l'auto!) */}
<div className="absolute inset-0 z-10">
  <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }} gl={{ alpha: true, antialias: true }}>
    <Environment preset="studio" />
    <spotLight position={[0, 10, 5]} angle={0.6} penumbra={1} intensity={5} color="#ffffff" />
    <spotLight position={[5, 5, -5]} angle={0.4} penumbra={1} intensity={3} color="#ff0000" />
    <ambientLight intensity={0.2} />
    
    <Suspense fallback={null}>
      <ScrollControlledScene scrollYProgress={scrollYProgress} />
    </Suspense>
  </Canvas>
</div>

        {/* 3. INTERFACCIA UTENTE */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          
          <motion.div style={{ opacity: introOpacity, y: introY }} className="absolute top-[15%] left-[5%] max-w-2xl">
            <div className="overflow-hidden mb-2">
              <motion.h2 
                initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-[#ff0000] font-bold tracking-[0.4em] uppercase text-sm mb-2 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]"
              >
                Scuderia Ferrari
              </motion.h2>
            </div>
            <h1 className="text-7xl md:text-8xl text-white font-black tracking-tighter uppercase leading-none drop-shadow-2xl">
              Adrenalina <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Pura.</span>
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-[2px] w-16 bg-[#ff0000] shadow-[0_0_10px_#ff0000]"></div>
              <p className="text-white/80 text-sm font-medium uppercase tracking-widest">Inizia lo scroll</p>
            </div>
          </motion.div>

          <motion.div style={{ opacity: uiOpacity, x: uiLeftX }} className="absolute top-[25%] left-[5%] w-72 bg-black/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hidden md:block shadow-[0_0_40px_rgba(255,0,0,0.05)]">
            <h3 className="text-white font-bold text-[11px] tracking-[0.2em] uppercase mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              Assetto Corsa <span className="text-[#ff0000]">Attivo</span>
            </h3>
            
            <div className="mb-6">
              <div className="flex justify-between text-[9px] text-white/50 uppercase tracking-widest mb-2">
                <span>Rpm</span>
                <span className="text-[#ff0000]">Limit</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div style={{ width: rpmWidth }} className="h-full bg-gradient-to-r from-orange-500 to-[#ff0000] shadow-[0_0_10px_#ff0000]" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-white/40 text-[10px] uppercase tracking-wider">G-Force (Lat)</p>
                <p className="text-[#ff0000] font-mono text-xl font-bold">1.4 G</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-white/40 text-[10px] uppercase tracking-wider">Downforce</p>
                <p className="text-white font-mono text-xl font-bold">Max</p>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: uiOpacity, x: uiRightX }} className="absolute top-[25%] right-[5%] w-72 bg-black/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hidden md:block shadow-[0_0_40px_rgba(255,0,0,0.05)]">
            <h3 className="text-[#ff0000] font-bold text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="w-2 h-2 rounded-full bg-[#ff0000] animate-pulse"></span> Telemetria
            </h3>
            
            <div className="space-y-5">
              <div className="relative group">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Power Unit</p>
                <p className="text-white font-mono text-xl font-bold">V8 Twin-Turbo</p>
              </div>
              <div className="relative group">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Cavalli Erogati</p>
                <p className="text-white font-mono text-xl font-bold">1,000 CV</p>
              </div>
              <div className="relative group">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Trazione</p>
                <p className="text-white font-mono text-xl font-bold">AWD Ibrida</p>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: uiOpacity }} className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#ff0000]/20 rounded-full blur-[40px]"></div>
              
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="112" cy="112" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <motion.circle 
                  cx="112" cy="112" r="70" fill="none" stroke="#ff0000" strokeWidth="6" 
                  strokeDasharray="440" 
                  style={{ strokeDashoffset: dashOffset }} 
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_15px_rgba(255,0,0,1)]" 
                />
              </svg>
              
              <div className="text-center mt-3 z-10">
                <motion.span className="text-7xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg">
                  {useTransform(speed, (v) => Math.round(v))}
                </motion.span>
                <p className="text-[#ff0000] font-bold tracking-[0.4em] uppercase text-[12px] mt-1">KM/H</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MovingCarScene;