import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutPreview from '../components/AboutPreview';
import Servizi from '../components/Servizi';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  const location = useLocation();

  // Questo useEffect scatta ogni volta che carichi la Home o cambia l'URL
  useEffect(() => {
    if (location.hash) {
      // Se c'è un hash nell'URL (es. #servizi), toglie il #
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      
      // Mettiamo un piccolissimo ritardo per assicurarci che la pagina sia renderizzata
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Se non c'è hash e sei appena tornato alla home, vai in cima
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <div className="relative z-0">
        <Hero />
      </div>

      <div className="relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"> 
        <AboutPreview />
        <Servizi />
        <Projects />
        <Contact />
      </div>
    </>
  );
};

export default Home;