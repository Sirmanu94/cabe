import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, LineChart, Compass, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Direzione dei Lavori",
    desc: "Ci occupiamo della gestione completa del cantiere, assicurando che i lavori vengano perfettamente eseguiti rispettando tempi e budget prestabiliti. Curiamo ogni aspetto tecnico, burocratico e amministrativo.",
    icon: HardHat,
  },
  {
    id: 2,
    title: "Consulenza e Studi di Fattibilità",
    desc: "Forniamo consulenza tecnica e realizziamo studi approfonditi per valutare la fattibilità e la sostenibilità di ogni progetto, ottimizzando le risorse e minimizzando i rischi.",
    icon: LineChart,
  },
  {
    id: 3,
    title: "Progettazione",
    desc: "Architettonica, strutturale e impiantistica. Creiamo spazi funzionali, efficienti ed esteticamente gradevoli, sviluppando soluzioni sicure con i materiali e le tecnologie più avanzate.",
    icon: Compass,
  }
];

// Varianti per l'animazione a cascata (Stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2 // Ritardo di 0.2s tra una card e l'altra
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const Servizi = () => {
  return (
    <section id="servizi" className="py-32 px-6 relative z-10 bg-cabe-dark border-t border-white/5">
      
      {/* Elemento decorativo di sfondo */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cabe-teal/5 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Intestazione Sezione */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-cabe-teal"></div>
            <span className="text-cabe-teal font-medium tracking-[0.2em] uppercase text-sm">
              Competenze
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            I Nostri <span className="text-transparent bg-clip-text bg-gradient-to-r from-cabe-teal to-cabe-blue">Servizi</span>
          </h2>
        </motion.div>

        {/* Griglia Card */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={service.id}
                variants={cardVariants}
                className="group relative bg-white/[0.02] border border-white/10 p-10 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
              >
                {/* Effetto bagliore hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-cabe-teal/0 to-cabe-teal/0 group-hover:to-cabe-teal/10 transition-all duration-500 z-0"></div>
                
                {/* Linea superiore che si anima */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-cabe-teal group-hover:w-full transition-all duration-700 ease-out"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icona */}
                  <div className="mb-8 p-4 bg-cabe-dark border border-white/10 inline-block text-cabe-teal group-hover:text-white group-hover:bg-cabe-teal transition-colors duration-300">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>

                  {/* Testi */}
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-cabe-teal transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base flex-grow mb-8 group-hover:text-gray-300 transition-colors">
                    {service.desc}
                  </p>

                  {/* Bottone Link */}
                  <a href="#" className="inline-flex items-center gap-2 text-cabe-teal text-sm font-semibold tracking-wider uppercase mt-auto group-hover:text-white transition-colors w-fit">
                    Scopri di più <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Servizi;