import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Complesso Residenziale 'Aurora'",
    category: "Progettazione & Direzione",
    description: "Realizzazione di un complesso residenziale ecosostenibile con certificazione energetica A4 e sistemi di domotica integrata.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Polo Logistico Industriale",
    category: "Ingegneria Strutturale",
    description: "Sviluppo strutturale e impiantistico per un nuovo hub logistico di 25.000 mq, ottimizzato per carichi pesanti e automazione.",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2836?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Riqualificazione Centro Storico",
    category: "Restauro & Consulenza",
    description: "Intervento di restauro conservativo e adeguamento sismico di un edificio storico del 1800, preservando l'estetica originale.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  },
];

const Projects = () => {
  const targetRef = useRef(null);
  
  // Traccia lo scroll verticale in questa sezione (alta 400vh)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Trasforma lo scroll verticale in movimento orizzontale
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} id="progetti" className="relative h-[400vh] bg-cabe-dark">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Scritta gigante in background */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 z-0 opacity-[0.02] pointer-events-none select-none">
            <h2 className="text-[12rem] md:text-[20rem] font-bold text-white leading-none tracking-tighter">WORKS</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-10 md:px-32 relative z-10 items-center">
          
          {/* Intro / Chi Siamo */}
          <div className="min-w-[320px] md:min-w-[500px] pr-10 md:pr-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-cabe-teal"></div>
              <span className="text-cabe-teal font-medium tracking-[0.2em] uppercase text-sm">Chi Siamo</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight text-white">
              Progettiamo il <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cabe-teal to-cabe-blue">
                Futuro.
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md border-l-2 border-cabe-teal pl-6 leading-relaxed">
              CABE è una società di ingegneria e architettura specializzata nell'esecuzione di lavori pubblici e privati. 
              <br /><br />
              <span className="text-white font-medium">Scorri per esplorare le nostre realizzazioni.</span>
            </p>
          </div>

          {/* Card dei Progetti */}
          {projects.map((project) => (
            <div key={project.id} className="group relative h-[450px] w-[320px] md:h-[600px] md:w-[450px] overflow-hidden bg-cabe-dark border border-white/10 flex-shrink-0 transition-all duration-500 hover:border-cabe-teal/50">
              <div className="absolute inset-0 overflow-hidden bg-cabe-dark">
                {/* Le immagini partono in bianco e nero (grayscale) e prendono colore all'hover! */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cabe-dark via-cabe-dark/60 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex flex-col justify-end h-full">
                <div className="mb-4">
                    <span className="text-cabe-teal text-xs font-semibold tracking-[0.15em] uppercase border border-cabe-teal/30 px-3 py-1.5 bg-cabe-dark/50 backdrop-blur-md">
                        {project.category}
                    </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-cabe-teal transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                    {project.description}
                </p>
                <button className="inline-flex items-center gap-2 text-white hover:text-cabe-teal text-sm font-bold uppercase tracking-wider transition-colors w-fit">
                  Dettagli <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};

export default Projects;