import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ArchitectureCanvas from './ArchitectureCanvas';

const Hero = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Tracciamo lo scroll della sezione Hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Aggiorniamo uno stato locale per passarlo al Canvas 3D (per far girare la casa)
// NUOVO CODICE AGGIORNATO PER FRAMER MOTION
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(latest);
    });
  }, [scrollYProgress]);

  // ANIMAZIONI TESTO 1 (Appare subito, scompare a metà scroll)
  const opacityText1 = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const yText1 = useTransform(scrollYProgress, [0, 0.4], ["0%", "-50%"]);

  // ANIMAZIONI TESTO 2 (Appare a metà scroll, rimane fino alla fine)
  const opacityText2 = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);
  const yText2 = useTransform(scrollYProgress, [0.4, 0.6], ["50%", "0%"]);

  return (
    // La sezione è alta 200vh per dare il tempo allo scroll di agire
    <section ref={containerRef} className="relative h-[200vh] bg-cabe-bg">
      
      {/* Contenitore Sticky: rimane fisso sullo schermo finché non finisce la sezione */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Sfondo Blueprint chiaro */}
        <div className="absolute inset-0 bg-blueprint-pattern opacity-40 z-0 pointer-events-none"></div>

        {/* IL CANVAS 3D IN BACKGROUND */}
        <ArchitectureCanvas scrollProgress={progress} />

        {/* STRATO TESTI IN SOVRAPPOSIZIONE (Ignora il mouse così puoi ruotare il 3D dietro) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-6">
          
          {/* PRIMO TESTO */}
          <motion.div 
            style={{ opacity: opacityText1, y: yText1, position: 'absolute' }}
            className="flex flex-col items-center"
          >
            <h2 className="text-cabe-teal font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm bg-white/50 backdrop-blur-sm py-1 px-4 rounded-full border border-cabe-light">
              Ingegneria e Architettura
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-cabe-blue leading-tight drop-shadow-md">
              INNOVAZIONE E <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cabe-teal to-cabe-cyan">
                SOSTENIBILITÀ
              </span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl font-light">
              Progettazione strutturale e impiantistica per opere destinate a durare. <br/>
              <span className="font-medium text-cabe-teal text-sm uppercase tracking-widest mt-4 block">
                [ Scorri verso il basso o ruota il modello ]
              </span>
            </p>
          </motion.div>

          {/* SECONDO TESTO (Esce dopo che hai scrollato un po') */}
          <motion.div 
            style={{ opacity: opacityText2, y: yText2, position: 'absolute' }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-cabe-blue leading-tight drop-shadow-md">
              Curiamo ogni <br />
              <span className="text-cabe-teal">Dettaglio.</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-lg mx-auto font-light mb-8 bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/50">
              Dallo studio di fattibilità alla direzione dei lavori. 
              Soluzioni integrate per trasformare la tua visione in realtà.
            </p>
            <button className="pointer-events-auto px-8 py-4 bg-cabe-blue text-white font-bold tracking-wider uppercase text-sm hover:bg-cabe-teal transition-all shadow-[0_10px_30px_rgba(19,79,114,0.2)] hover:shadow-[0_10px_30px_rgba(0,168,157,0.4)]">
              I Nostri Servizi
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;