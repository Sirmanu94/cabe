import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// IMPORTIAMO LE TUE IMMAGINI DAGLI ASSETS EXACTLY COME HAI CHIESTO
import skyBg from "../assets/1.png";             // Immagine 1 (Cielo/Sfondo)
import buildingSketch from "../assets/2.png";    // Immagine 2 (Sketch dei palazzi)
import buildingReal from "../assets/3.png";      // Immagine 3 (Palazzo reale)
import foremanGroup from "../assets/4.png";      // Immagine 4 (Ingegneri in primo piano)

const HeroParallax = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ------------------------------------------------------------
  // ORCHESTRAZIONE DELLE ANIMAZIONI (Cinematografica & Senza Bordi)
  // ------------------------------------------------------------

  // A. LIVELLO BASE: SFONDO (Cielo)
  // Partiamo da scale 1.05 così i bordi sono sempre fuori.
  const scaleSky = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const ySky = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // B. LIVELLI MEZZO PIANO (Sketch e Palazzo Reale)
  // Usiamo la stessa animazione di movimento per entrambi, così rimangono perfettamente allineati
  const scaleBuildings = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const yBuildings = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  // Il trucco della trasformazione: lo sketch sfuma via, il reale appare
  const opacitySketch = useTransform(scrollYProgress, [0, 0.35, 0.6], [1, 1, 0]);
  const opacityReal = useTransform(scrollYProgress, [0, 0.35, 0.6], [0, 0, 1]);

  // C. LIVELLO PRIMO PIANO (Ingegneri)
  // Si ingrandiscono e scivolano dolcemente in basso, uscendo dall'inquadratura (effetto "superamento")
  const scaleFore = useTransform(scrollYProgress, [0, 0.5], [1.05, 1.8]);
  const yFore = useTransform(scrollYProgress, [0, 0.5], ["0%", "25%"]);
  const opacityFore = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.8, 0]);

  // D. TESTI E UI OVERLAY (Spostati nel cielo libero in alto a sinistra)
  const opacityText1 = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const yText1 = useTransform(scrollYProgress, [0, 0.25], ["0%", "-30px"]);

  const opacityText2 = useTransform(scrollYProgress, [0.4, 0.6, 0.85, 1], [0, 1, 1, 0]);
  const yText2 = useTransform(scrollYProgress, [0.4, 0.6], ["30px", "0%"]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#f4f7f9]">
      
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{
          // Maschera per dissolvere il fondo ed evitare linee nette
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
        }}
      >
        {/* 1. SFONDO (Cielo) */}
        <motion.div style={{ scale: scaleSky, y: ySky }} className="absolute inset-0 z-10 w-full h-full">
          <img 
            src={skyBg} 
            alt="Cielo" 
            className="w-full h-full object-cover object-center" 
          />
        </motion.div>

        {/* 2. PALAZZO REALE (Dietro, si rivela sfumando) */}
        <motion.div 
          style={{ scale: scaleBuildings, y: yBuildings, opacity: opacityReal }} 
          className="absolute inset-0 z-20 w-full h-full origin-bottom"
        >
          <img 
            src={buildingReal} 
            alt="Palazzo Reale" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* 3. SKETCH (Sopra il palazzo reale, sparisce sfumando) */}
        <motion.div 
          style={{ scale: scaleBuildings, y: yBuildings, opacity: opacitySketch }} 
          className="absolute inset-0 z-30 w-full h-full origin-bottom"
        >
          <img 
            src={buildingSketch} 
            alt="Sketch dei palazzi" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* 4. INGEGNERI (Primissimo piano) */}
        <motion.div 
          style={{ scale: scaleFore, y: yFore, opacity: opacityFore }} 
          className="absolute inset-0 z-40 w-full h-full origin-bottom"
        >
          <img 
            src={foremanGroup} 
            alt="Ingegneri CABE" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* OVERLAY TESTUALE (Stile ultra-moderno e pulito) */}
        <div className="absolute inset-0 z-50 flex flex-col justify-start items-center px-8 md:px-20 pt-[15vh] md:pt-[20vh] ml-[-60vh] pointer-events-none">
          
          {/* PRIMO TESTO (Iniziale) */}
          <motion.div style={{ opacity: opacityText1, y: yText1 }} className="absolute max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-[#00a89d]"></div>
              <h2 className="text-white font-bold tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">
                Ingegneria e Architettura
              </h2>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-white leading-[1.1] drop-shadow-xl">
              INNOVAZIONE E <br />
              <span className="text-[#b3e5fc]">SOSTENIBILITÀ</span>
            </h1>
            <p className="text-white/90 text-lg md:text-2xl font-light drop-shadow-lg max-w-xl leading-relaxed">
              Progettazione strutturale e impiantistica integrata per opere destinate a durare nel tempo.
            </p>
          </motion.div>

          {/* SECONDO TESTO (Appare durante la trasformazione) */}
          <motion.div style={{ opacity: opacityText2, y: yText2 }} className="absolute max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-[#00a89d]"></div>
              <h2 className="text-white font-bold tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">
                La Nostra Visione
              </h2>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-white leading-[1.1] drop-shadow-xl">
              DALLO SCHIZZO <br />
              <span className="text-[#00a89d] drop-shadow-none">ALLA REALTÀ</span>
            </h1>
            <p className="text-white/90 text-lg md:text-2xl font-light drop-shadow-lg max-w-xl leading-relaxed mb-10">
              Curiamo ogni dettaglio tecnico per trasformare i vostri progetti in solide certezze.
            </p>
            <button className="pointer-events-auto px-10 py-4 bg-[#134f72] text-white font-bold tracking-wider uppercase text-sm hover:bg-[#00a89d] transition-colors shadow-2xl">
              Scopri i nostri Servizi
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroParallax;