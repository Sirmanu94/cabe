import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const AboutPreview = () => {
  return (
    <section id="chisiamo" className="py-32 px-6 bg-[#070d14] relative z-10 border-t border-white/5 overflow-hidden">
      
      {/* Decorazione di sfondo (cerchio sfumato) */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cabe-blue/10 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Griglia decorativa in sottofondo */}
      <div className="absolute inset-0 bg-blueprint-pattern opacity-10 pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Colonna Testo (a sinistra) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-cabe-teal"></div>
              <span className="text-cabe-teal font-medium tracking-[0.2em] uppercase text-sm">
                Chi Siamo
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
              Esperienza e Innovazione <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cabe-teal to-cabe-blue">
                al tuo servizio.
              </span>
            </h2>
            
            <div className="relative">
              {/* Linea verticale decorativa a fianco del testo */}
              <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-cabe-teal to-transparent opacity-50"></div>
              
              <div className="pl-6 space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed font-light">
                  <strong className="text-white font-medium">CABE</strong> è una società di ingegneria e architettura specializzata nella progettazione ed esecuzione di lavori pubblici e privati.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Sul campo, abbiamo maturato una profonda competenza nella progettazione architettonica, strutturale, infrastrutturale e impiantistica. Il nostro team di professionisti è in grado di affrontare con successo le sfide tecniche e gestionali, offrendo soluzioni tradizionali e innovative.
                </p>
                <p className="text-gray-400 leading-relaxed italic">
                  La forza del nostro gruppo di lavoro ci permette di garantire un servizio di alta qualità e di eccellenza.
                </p>
              </div>
            </div>

            <div className="mt-12">
     <Link to="/chisiamo" className="group inline-flex items-center gap-3 px-8 py-4 border border-cabe-teal text-cabe-teal hover:bg-cabe-teal hover:text-white transition-all duration-300 font-semibold tracking-wider uppercase text-sm w-fit">
  Scopri il nostro team
  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
</Link>
            </div>
          </motion.div>

          {/* Colonna Immagine/Composizione (a destra) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Box decorativo dietro l'immagine */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-cabe-teal/20 -z-10"></div>
            
            {/* Contenitore Immagine con filtro */}
            <div className="relative h-[500px] w-full overflow-hidden bg-cabe-dark">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" 
                alt="Team CABE al lavoro" 
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
              />
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070d14] via-transparent to-transparent"></div>
            </div>

            {/* Badge fluttuante */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-[#0a1118] border border-cabe-teal/30 p-6 shadow-2xl backdrop-blur-md hidden md:block"
            >
              <div className="text-4xl font-bold text-cabe-teal mb-1">10+</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">Anni di Esperienza</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreview; // <-- Questa è la riga fondamentale!