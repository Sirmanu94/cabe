import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// IMPORT ASSETS (Sostituisci con i tuoi)
import skyBg from "../assets/sfondo.png"; 
import roadImg from "../assets/strada.png";
import motoImg from "../assets/moto.png";
import speedoImg from "../assets/km.png";
import sparksImg from "../assets/sintille.png";
import ArchitectureCanvas from "./ArchitectureCanvas"; // Importa il tuo 3D


const MotoParallaxHero = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ------------------------------------------------------------
  // ORCHESTRAZIONE DELLO SCROLL (Da 0 a 1)
  // ------------------------------------------------------------

  // 1. SFONDO E STRADA (Effetto tunnel visivo)
  const scaleSky = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const ySky = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  
  // La strada si zooma tantissimo per dare l'effetto di movimento in avanti
  const scaleRoad = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.8, 2.5]);
  const yRoad = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // 2. LA MOTO (Inizia ferma, poi "accelera", fa una leggera impennata e va avanti)
  const scaleMoto = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1.3, 1.8]);
  const xMoto = useTransform(scrollYProgress, [0, 0.4, 0.8], ["0%", "-10%", "-30%"]); // Si sposta a sinistra per far spazio alla UI
  const rotateMoto = useTransform(scrollYProgress, [0, 0.3, 0.6], ["0deg", "-5deg", "0deg"]); // Leggera impennata

  // 3. SCINTILLE/VELOCITÀ (Escono dallo schermo verso di te)
  const scaleSparks = useTransform(scrollYProgress, [0, 0.6, 1], [1, 3, 5]);
  const opacitySparks = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 0]);

  // 4. UI MECCANICA E TESTI (Appaiono a metà scroll)
  // Testo Iniziale
  const opacityTitle = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yTitle = useTransform(scrollYProgress, [0, 0.15], ["0%", "-50px"]);

  // HUD (Contachilometri)
  const opacityHUD = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const scaleHUD = useTransform(scrollYProgress, [0.3, 0.45], [0.8, 1]);
  const rotateHUD = useTransform(scrollYProgress, [0.3, 0.8], ["-45deg", "45deg"]); // Dà l'idea che i giri del motore salgano

  // Callouts Meccanici (Linee che puntano ai pezzi della moto)
  const opacitySpecs = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const xSpecs = useTransform(scrollYProgress, [0.4, 0.55], ["50px", "0px"]);

  return (
    // Altezza 400vh permette di avere tempo per scorrere tutte le animazioni
    <section ref={ref} className="relative h-[400vh] bg-[#050505]">
      
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-1000"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
        }}
      >
        {/* 1. CIELO */}
        <motion.div style={{ scale: scaleSky, y: ySky }} className="absolute inset-0 z-0 w-full h-full">
          <img src={skyBg} alt="Sky" className="w-full h-full object-cover object-center" />
        </motion.div>

        {/* 2. STRADA */}
        <motion.div style={{ scale: scaleRoad, y: yRoad }} className="absolute inset-0 z-10 w-full h-full origin-bottom">
          <img src={roadImg} alt="Road" className="w-full h-full object-cover object-center" />
        </motion.div>

        {/* 3. MOTO */}
        <motion.div 
          style={{ scale: scaleMoto, x: xMoto, rotateZ: rotateMoto }} 
          className="absolute inset-0 z-20 w-full h-full origin-bottom flex items-center justify-center"
        >
          <img src={motoImg} alt="Moto" className="max-w-[80%] max-h-[80%] object-contain" />
        </motion.div>

        {/* 4. SCINTILLE / VELOCITÀ (Primo piano estremo) */}
        <motion.div style={{ scale: scaleSparks, opacity: opacitySparks }} className="absolute inset-0 z-50 w-full h-full origin-center pointer-events-none">
          <img src={sparksImg} alt="Sparks" className="w-full h-full object-cover object-center" />
        </motion.div>

        {/* =========================================
            UI OVERLAYS (Testi e Div Meccanici)
            ========================================= */}

        {/* TITOLO INIZIALE (Sparisce quasi subito) */}
        <motion.div style={{ opacity: opacityTitle, y: yTitle }} className="absolute z-30 flex flex-col items-center pointer-events-none mt-[-20vh]">
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter drop-shadow-2xl italic">
            Adrenaline
          </h1>
          <p className="text-[#ff3b30] font-bold tracking-[0.5em] uppercase mt-2">Born to be wild</p>
        </motion.div>

        {/* HUD & SPECS (Appaiono a metà scroll sulla destra) */}
        <motion.div 
          style={{ opacity: opacitySpecs, x: xSpecs }} 
          className="absolute right-[5%] top-[25%] z-40 flex flex-col gap-12 pointer-events-none w-80"
        >
          {/* Callout 1: Motore */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-4 w-full">
              <div className="h-[1px] w-full bg-gradient-to-l from-[#ff3b30] to-transparent"></div>
              <div className="w-3 h-3 rounded-full bg-[#ff3b30] shadow-[0_0_15px_#ff3b30]"></div>
            </div>
            <h3 className="text-white font-bold text-2xl mt-2 font-mono">1000cc V4 Engine</h3>
            <p className="text-gray-400 text-sm text-right">Liquid-cooled, 4-stroke, DOHC, 4-valve</p>
          </div>

          {/* Callout 2: Aerodinamica */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-4 w-full">
              <div className="h-[1px] w-full bg-gradient-to-l from-[#00d8ff] to-transparent"></div>
              <div className="w-3 h-3 rounded-full bg-[#00d8ff] shadow-[0_0_15px_#00d8ff]"></div>
            </div>
            <h3 className="text-white font-bold text-2xl mt-2 font-mono">Aero Winglets</h3>
            <p className="text-gray-400 text-sm text-right">Carbon fiber downforce generation</p>
          </div>
        </motion.div>

        {/* CONTACHILOMETRI (Appare a sinistra in basso) */}
        <motion.div 
          style={{ opacity: opacityHUD, scale: scaleHUD }}
          className="absolute left-[5%] bottom-[10%] z-40 pointer-events-none w-48 h-48 md:w-64 md:h-64"
        >
           {/* Immagine base del contachilometri */}
           <img src={speedoImg} alt="HUD" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,216,255,0.3)]" />
           
           {/* Se vuoi fare il figo, aggiungiamo un bagliore rotante in puro CSS/Framer per simulare i giri */}
           <motion.div 
              style={{ rotateZ: rotateHUD }}
              className="absolute inset-0 rounded-full border-t-4 border-[#ff3b30] blur-[2px]"
           />
        </motion.div>

      </div>
    </section>
  );
};

export default MotoParallaxHero;