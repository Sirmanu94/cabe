import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contatti" className="py-32 px-6 bg-cabe-dark relative z-10 border-t border-white/5">
      
      {/* Sfondo decorativo */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cabe-blue/10 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Colonna Sinistra: Informazioni */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-cabe-teal"></div>
              <span className="text-cabe-teal font-medium tracking-[0.2em] uppercase text-sm">
                Iniziamo un progetto
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              Costruiamo qualcosa di <span className="text-transparent bg-clip-text bg-gradient-to-r from-cabe-teal to-cabe-blue">Straordinario.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-12 max-w-md">
              Siamo pronti ad ascoltare le tue idee e trasformarle in solide realtà. Contattaci per una consulenza o uno studio di fattibilità.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-cabe-teal group-hover:bg-cabe-teal group-hover:text-white transition-colors duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Sede Centrale</h4>
                  <p className="text-gray-400 text-sm">Via Campana 192, 80010<br/>Quarto (NA)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-cabe-teal group-hover:bg-cabe-teal group-hover:text-white transition-colors duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Recapiti</h4>
                  <p className="text-gray-400 text-sm">+39 081 876 8096<br/>+39 347 113 8404</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-cabe-teal group-hover:bg-cabe-teal group-hover:text-white transition-colors duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-gray-400 text-sm">studiotecnicocabe@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonna Destra: Form di Contatto (Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.02] border border-white/10 p-8 md:p-12 backdrop-blur-sm relative overflow-hidden"
          >
            {/* Linea superiore decorativa */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cabe-teal to-cabe-blue"></div>

            <h3 className="text-2xl font-bold text-white mb-8">Richiedi Informazioni</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Nome *</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cabe-teal focus:ring-1 focus:ring-cabe-teal transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Cognome *</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cabe-teal focus:ring-1 focus:ring-cabe-teal transition-all" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email *</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cabe-teal focus:ring-1 focus:ring-cabe-teal transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Telefono</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cabe-teal focus:ring-1 focus:ring-cabe-teal transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Messaggio *</label>
                <textarea rows="4" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cabe-teal focus:ring-1 focus:ring-cabe-teal transition-all resize-none" required></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-gradient-to-r from-cabe-blue to-cabe-teal text-white font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(0,168,157,0.3)] transition-all duration-300 transform hover:-translate-y-1 mt-4">
                Invia Richiesta
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Inviando questo modulo accetti la nostra Privacy Policy.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;