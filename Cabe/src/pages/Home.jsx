import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import Hero from '../components/Hero'; // Rimuovi o commenta
import HeroParallax from '../components/HeroParallax'; // <-- Importa il nuovo
import AboutPreview from '../components/AboutPreview';
import Servizi from '../components/Servizi';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import MotoParallaxHero from '../components/MotoParallaxHero';
import MovingCarScene from '../components/MovingCarScene';
import ScuderiaFeatures from '../components/ScuderiaFerrari';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      {/* Sostituiamo il Canvas 3D e la vecchia Hero con il nuovo, ultra-wow parallasse cinematografico */}
      <MovingCarScene/>
      <ScuderiaFeatures />
      <MotoParallaxHero/>
      <HeroParallax /> 

      {/* Questo div contiene il resto delle sezioni, scorre SOPRA la Hero
          z-10 per assicurarci che il gradiente della Hero non lo copra e che scorra bene.
          L'ombra è molto delicata per non tagliare lo spazio. */}
      <div className="relative z-10 shadow- bg-cabe-bg"> 
        <AboutPreview />
        <Servizi />
        <Projects />
        <Contact />
      </div>
    </>
  );
};

export default Home;