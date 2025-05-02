import React from 'react';
import './HeroSection.css'; // Estilos específicos para el Hero Section

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Sistema de Control de Riego Inteligente</h1>
        <p className="hero-description">
          Tecnología avanzada para la gestión eficiente de recursos hídricos en agricultura y jardinería.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary">Conoce más</button>
          <button className="btn btn-secondary">Panel de Control</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;