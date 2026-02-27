import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <ReactLenis root>
      <Router>
        <div className="bg-cabe-dark text-white font-sans selection:bg-cabe-teal selection:text-white min-h-screen flex flex-col">
          
          {/* La Navbar è fuori dalle Routes, così appare su tutte le pagine */}
          <Navbar />
          
          {/* Main content che cambia in base alla rotta */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chisiamo" element={<About />} />
            </Routes>
          </main>

          {/* Il Footer appare su tutte le pagine */}
          <Footer />

        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;