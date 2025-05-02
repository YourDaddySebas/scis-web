import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ControlPanel from './components/ControlPanel';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta raíz apunta al índice original */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <Features />
              <Footer />
            </>
          }
        />
        {/* Ruta para el login */}
        <Route path="/login" element={<LoginPage />} />
        {/* Ruta para el panel de control */}
        <Route path="/control-panel" element={<ControlPanel />} />
        {/* Ruta para la página de error */}
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;