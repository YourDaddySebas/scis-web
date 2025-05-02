import React from 'react';
import './Features.css'; // Estilos específicos para esta sección

const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        <div className="feature-item">
          <div className="feature-icon">
            <i className="bi bi-sliders"></i> {/* Icono de control preciso */}
          </div>
          <h3>Control Precise</h3>
          <p>Gestión exacta del flujo de agua según necesidades específicas.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">
            <i className="bi bi-speedometer2"></i> {/* Icono de monitoreo */}
          </div>
          <h3>Monitoreo en Tiempo Real</h3>
          <p>Datos actualizados constantemente para toma de decisiones.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">
            <i className="bi bi-phone"></i> {/* Icono de control remoto */}
          </div>
          <h3>Control Remoto</h3>
          <p>Accede desde cualquier dispositivo con conexión a internet.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;