import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

// Definiamo i nostri link in modo più furbo
const navLinks = [
  { name: 'Home', target: 'home' },
  // Facciamo puntare il link "Chi Siamo" direttamente alla nuova pagina dedicata!
  { name: 'Chi Siamo', target: '/chisiamo' }, 
  { name: 'Servizi', target: 'servizi' },
  { name: 'Progetti', target: 'progetti' },
  { name: 'Contatti', target: 'contatti' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Hook di React Router per la navigazione
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // La nostra funzione magica per gestire i click
  const handleNavClick = (e, target) => {
    e.preventDefault();

    // Se è un link a una pagina vera (inizia con "/")
    if (target.startsWith('/')) {
      navigate(target);
      window.scrollTo(0, 0);
      return;
    }

    // Se il target è "home"
    if (target === 'home') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Se è un link a una sezione (Servizi, Progetti, Contatti)
    if (location.pathname !== '/') {
      // Se non siamo in Home, navighiamo verso Home + hash (es. /#servizi)
      navigate(`/#${target}`);
    } else {
      // Se siamo già in Home, scrolliamo in modo fluido fino all'ID
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-500 ${
        scrolled ? 'bg-cabe-dark/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent'
      }`}
    >
      <div 
        className="text-2xl font-bold tracking-widest text-white flex items-center gap-2 cursor-pointer"
        onClick={(e) => handleNavClick(e, 'home')}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-cabe-teal to-cabe-blue rounded-sm"></div>
        <span>CABE</span>
      </div>

      <ul className="hidden md:flex gap-10 text-sm font-medium tracking-wide text-gray-300">
        {navLinks.map((item) => (
          <li key={item.name}>
            <button 
              onClick={(e) => handleNavClick(e, item.target)} 
              className="hover:text-cabe-teal transition-colors duration-300 relative group uppercase cursor-pointer bg-transparent border-none outline-none"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cabe-teal transition-all duration-300 group-hover:w-full"></span>
            </button>
          </li>
        ))}
      </ul>

      <button 
        onClick={(e) => handleNavClick(e, 'contatti')}
        className="hidden md:block px-6 py-2 bg-white/5 border border-white/20 rounded-none text-sm font-semibold tracking-wider hover:bg-cabe-teal hover:border-cabe-teal hover:text-white transition-all duration-300"
      >
        CONTATTACI
      </button>
    </motion.nav>
  );
};

export default Navbar;