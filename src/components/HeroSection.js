import React from 'react';
import './HeroSection.css'; // Estilos específicos para el Hero Section
import { Link } from 'react-router-dom'; // Importamos Link para manejar navegación
const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Sistema de Control de Riego Inteligente</h1>
        <p className="hero-description">
          Tecnología avanzada para la gestión eficiente de recursos hídricos en agricultura y jardinería.
        </p>
        <div className="hero-buttons">
          <Link to="/construction" className="btn btn-primary">Conoce más   </Link>
          
          <Link to="/construction" className="btn btn-secondary">Contactanos</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;