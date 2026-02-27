import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#05090d] border-t border-white/5 pt-20 pb-10 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Colonna 1: Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="text-2xl font-bold tracking-widest text-white flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-gradient-to-br from-cabe-teal to-cabe-blue rounded-sm"></div>
                <span>CABE</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Consulenza e soluzioni di progettazione ingegneristica e architettonica per imprese pubbliche e private.
            </p>
          </div>

          {/* Colonna 2: Link Rapidi */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Esplora</h4>
            <ul className="space-y-3">
              {['Home', 'Chi Siamo', 'Servizi', 'Progetti', 'Contatti'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-cabe-teal transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 3: Social */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Seguici</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-cabe-teal transition-colors text-sm group">
                <Facebook size={18} className="group-hover:-translate-y-1 transition-transform" /> Facebook
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-cabe-teal transition-colors text-sm group">
                <Instagram size={18} className="group-hover:-translate-y-1 transition-transform" /> Instagram
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-cabe-teal transition-colors text-sm group">
                <Linkedin size={18} className="group-hover:-translate-y-1 transition-transform" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Colonna 4: Legale */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Legale</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-cabe-teal transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cabe-teal transition-colors text-sm">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cabe-teal transition-colors text-sm">Termini e Condizioni</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} CABE - P.IVA 10507651213. Tutti i diritti riservati.
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            Developed with <span className="text-cabe-teal">♥</span> by 081Lab
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;