import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Il componente per la singola Card interattiva
const FeatureCard = ({ title, subtitle, icon, description, delay }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Effetto "Torcia" che segue il mouse
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: delay }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-80 rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden group cursor-pointer"
    >
      {/* Il bagliore rosso che segue il mouse */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,0,0,0.15), transparent 40%)`
        }}
      />
      
      {/* Bordo illuminato al passaggio del mouse */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,0,0,0.4), transparent 40%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          borderRadius: '16px'
        }}
      />

      {/* Contenuto della Card */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-end">
        <div className="mb-auto">
          {/* Icona vettoriale minimal (sostituibile con SVG reali) */}
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#ff0000]/50 transition-colors duration-500">
            <span className="text-[#ff0000] text-xl">{icon}</span>
          </div>
          <h4 className="text-[#ff0000] text-[10px] tracking-[0.3em] uppercase mb-2">{subtitle}</h4>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ff0000] transition-colors duration-300">{title}</h3>
        </div>
        <p className="text-white/50 text-sm font-light leading-relaxed group-hover:text-white/80 transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Il layout principale della sezione
const ScuderiaFeatures = () => {
  return (
    <section className="relative w-full bg-[#020202] py-32 px-6 md:px-20 overflow-hidden font-sans">
      
      {/* Decorazione di sfondo (linea rossa sfumata al centro) */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#ff0000] to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Intestazione della sezione */}
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="text-[#ff0000] font-bold tracking-[0.4em] uppercase text-xs mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#ff0000]"></span> Innovazione
            </h2>
            <h1 className="text-5xl md:text-7xl text-white font-black tracking-tighter uppercase leading-[1.1]">
              Ingegneria <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">Senza Limiti.</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 text-sm max-w-sm md:text-right"
          >
            Ogni componente è progettato per dominare l'aria, ridurre il peso e massimizzare la trazione in ogni condizione di guida.
          </motion.p>
        </div>

        {/* Griglia delle Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            delay={0.1}
            icon="💨"
            subtitle="Aerodinamica"
            title="DRS Attivo"
            description="L'ala posteriore in fibra di carbonio adatta l'incidenza in millisecondi, riducendo la resistenza in rettilineo e massimizzando il carico in curva."
          />
          <FeatureCard 
            delay={0.3}
            icon="⚡"
            subtitle="Power Unit"
            title="Sistema Ibrido V8"
            description="La sinergia perfetta tra un motore termico da 4.0 litri e tre motori elettrici fornisce una coppia istantanea di oltre 1.000 Nm."
          />
          <FeatureCard 
            delay={0.5}
            icon="🏎️"
            subtitle="Telaio"
            title="Monoscocca Carbonio"
            description="Tecnologia derivata direttamente dalla Formula 1. Il telaio garantisce una rigidità torsionale estrema mantenendo il peso ai minimi termini."
          />
        </div>

      </div>
    </section>
  );
};

export default ScuderiaFeatures;