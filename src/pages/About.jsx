import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

// Dati fittizi per il team (puoi modificarli in seguito)
const teamMembers = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: "Nome Cognome",
  role: "Ingegnere",
  desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut."
}));

const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 bg-cabe-dark min-h-screen relative overflow-hidden">
      
      {/* Sfondi decorativi */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-cabe-blue/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute inset-0 bg-blueprint-pattern opacity-5 pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Intestazione Chi Siamo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 mt-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-cabe-teal"></div>
            <span className="text-cabe-teal font-medium tracking-[0.2em] uppercase text-sm">La Nostra Storia</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-12">
            Oltre la <span className="text-transparent bg-clip-text bg-gradient-to-r from-cabe-teal to-cabe-blue">Progettazione.</span>
          </h1>

          <div className="bg-white/[0.02] border border-white/10 p-8 md:p-12 backdrop-blur-sm relative">
             <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-cabe-teal to-transparent"></div>
             <p className="text-gray-300 text-lg leading-relaxed font-light">
                CABE è una società di ingegneria e architettura specializzata nella progettazione ed esecuzione di lavori pubblici e privati. Sul campo, abbiamo maturato una profonda competenza nella progettazione architettonica, strutturale, infrastrutturale e impiantistica. Il nostro team di professionisti è in grado di affrontare con successo le sfide tecniche e gestionali, offrendo soluzioni tradizionali e innovative. La forza del nostro gruppo di lavoro ci permette di garantire un servizio di alta qualità e di eccellenza.
             </p>
          </div>
        </motion.div>

        {/* Sezione Il Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center md:items-start mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Il nostro Team</h2>
            <div className="h-[2px] w-24 bg-cabe-teal"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mt-10">
            {teamMembers.map((member) => (
              <div key={member.id} className="relative bg-white/[0.03] border border-white/10 p-8 pt-20 text-center hover:bg-white/[0.05] transition-all duration-300 group mt-12">
                
                {/* Avatar fluttuante (esce dalla card) */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                  <div className="w-32 h-32 rounded-full border-4 border-[#070d14] bg-gradient-to-br from-cabe-teal to-cabe-blue flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                     {/* Se hai le foto, mettile in un tag img qui. Altrimenti icona placeholder */}
                     <User size={48} className="text-white opacity-80" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cabe-teal transition-colors">{member.name}</h3>
                <div className="text-cabe-teal font-medium text-sm mb-4 uppercase tracking-wider">{member.role}</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;